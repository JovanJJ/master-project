import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db';
import Worker from '@/lib/models/Worker';
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
        };
      }
    })
  ],
  

  //layer 2 
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.profession = user.profession;
        token.profileImage = user.profileImage;
        token.location = user.location;
        token.gender = user.gender;
        token.phone = user.phone;
      }
      return token;
    },
    
    async session({ session, token }) {
      // Add token info to session
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.profession = token.profession as string;
        session.user.profileImage = token.profileImage as string;
        session.user.location = token.location as string;
        session.user.gender = token.gender as string;
        session.user.phone = token.phone as string;
      }
      return session;
    }
  },
  
  pages: {
    signIn: '/auth/login', // Custom login page
  },
  
  session: {
    strategy: 'jwt', // Use JWT for sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET, // Add to .env.local
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };