import NextAuthImport from "next-auth";
import CredentialsProviderImport from "next-auth/providers/credentials";
import GoogleProviderImport from "next-auth/providers/google";
import { connectDB } from "../../../../lib/db";
import Worker from "../../../../lib/models/Worker";
import User from "../../../../lib/models/User";
import bcrypt from "bcryptjs";


const CredentialsProvider =
  CredentialsProviderImport.default ?? CredentialsProviderImport;

const GoogleProvider =
  GoogleProviderImport.default ?? GoogleProviderImport;

const NextAuth = NextAuthImport.default ?? NextAuthImport;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        await connectDB();

        const worker = await Worker.findOne({
          email: credentials.email,
        }).select("+password");

        if (!worker) {
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          worker.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: worker._id.toString(),
          email: worker.email,
          name: `${worker.firstName} ${worker.lastName}`,
          role: worker.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login/user",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") return true;

      await connectDB();

      const googleId = profile?.sub;
      if (!googleId) return false;

      let existingUser = await User.findOne({
        $or: [{ googleId }, { email: user.email }],
      });

      if (!existingUser) {
        existingUser = await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          googleId,
          role: "user",
        });
      } else if (!existingUser.googleId) {
        existingUser.googleId = googleId;
        await existingUser.save();
      }

      user.id = existingUser._id.toString();
      user.role = existingUser.role;

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "worker";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
