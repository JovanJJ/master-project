import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    firstName?: string;
    lastName?: string;
    profession?: string;
    profileImage?: string;
    location?: string;
    gender?: string;
    phone?: string;
    description?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    email: string;
  }
}
