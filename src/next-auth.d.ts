import "next-auth";
import "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      surname?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    surname?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    surname?: string | null;
  }
}
