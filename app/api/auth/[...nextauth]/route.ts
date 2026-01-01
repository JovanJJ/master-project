import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from '@/lib/db';
import Worker from '@/lib/models/Worker';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        await connectDB();

        // Find worker with password field
        const worker = await Worker.findOne({ email: credentials.email }).select('+password');

        if (!worker) {
          throw new Error('Invalid email or password');
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(credentials.password, worker.password);

        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }

        // Return user object (without password)
        return {
          id: worker._id.toString(),
          email: worker.email,
          name: `${worker.firstName} ${worker.lastName}`,
          firstName: worker.firstName,
          lastName: worker.lastName,
          profession: worker.profession,
          profileImage: worker.profileImage,
          location: worker.location,
          gender: worker.gender,
          phone: worker.phone,
          description: worker.description,
          role: worker.role,
        };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
  ],
  pages: {
    signIn: "/login/user",
  },


  //layer 2 
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only handle Google here
      if (account?.provider !== "google") {
        return true;
      }

      try {
        await connectDB();

        // Google unique identifier
        const googleId = profile?.sub;

        if (!googleId) {
          console.error("No Google ID found in profile");
          return false;
        }

        // Try to find existing user
        let existingUser = await User.findOne({
          $or: [
            { googleId },
            { email: user.email }
          ]
        });

        // If user does not exist, create one
        if (!existingUser) {
          existingUser = await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            googleId,
            role: "user",
          });
        } else if (!existingUser.googleId) {
          // If user exists but doesn't have googleId, update it
          existingUser.googleId = googleId;
          await existingUser.save();
        }

        // Attach DB info to user object
        user.id = existingUser._id.toString();
        user.role = existingUser.role;

        return true;
      } catch (error) {
        console.error("Google sign-in error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // Runs on sign-in AND subsequent requests
      if (user) {
        token.id = user.id;
        token.email = user.email;

        // Credentials login → no role on user object
        token.role = user.role ?? "worker";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // We can safely cast here because we defined the types in step 2
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },


  session: {
    strategy: 'jwt', // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET, // Add to .env.local
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };