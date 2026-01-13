import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { signInSchema } from "./zod";
import getUserFromDb from "@/actions/user";
import { verify } from "argon2";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await getUserFromDb(email);
          if (!user) return null;

          const isPasswordValid = await verify(user.password, password);
          if (!isPasswordValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
          };
        } catch (error) {
          if (error instanceof ZodError) return null;
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (!session.user || !token.sub) return session;

      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: { id: true, name: true, surname: true, email: true },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.name = dbUser.name;
        session.user.surname = dbUser.surname;
        session.user.email = dbUser.email;
      }

      return session;
    },
  },
});
