import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    error: '/register',
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("Missing username or password");

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user)
          throw new Error("Invalid email or password");

        if (!user.password)
          throw new Error("Invalid account");

        if (!(await compare(credentials.password, user.password)))
          throw new Error("Invalid email or password");

        if (!user.active)
          throw new Error("Please verify your email");

        return {
          id: user.id + '',
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token?.sub && session?.user)
        session.user.id = token.sub;
      return session;
    },
    async jwt({ token, trigger }) {
      if (trigger === "signIn") {
        if (!token.email || !token.sub)
          throw new Error("Invalid account");

        const emailUser = await prisma.user.findFirst({
          where: {
            email: token.email,
            providerId: null,
          },
        });
        if (!emailUser) {
          const providerUser = await prisma.user.upsert({
            where: {
              providerId: token.sub,
            },
            create: {
              name: token.name,
              email: token.email,
              image: token.picture,
              providerId: token.sub,
              active: true,
            },
            update: {
              name: token.name,
              email: token.email,
              image: token.picture,
            }
          });
          token.sub = providerUser.id;
        } else {
          if (token.picture) {
            const alsoProviderUser = await prisma.user.findFirst({
              where: {
                providerId: token.sub,
              },
            });
            if (!alsoProviderUser) {
              await prisma.user.update({
                where: {
                  email: token.email,
                },
                data: {
                  name: token.name,
                  password: null,
                  image: token.picture,
                  providerId: token.sub,
                  active: true,
                }
              });
              token.sub = emailUser.id;
            } else {
              await prisma.user.delete({
                where: {
                  email: token.email,
                },
              });
              const providerUser = await prisma.user.update({
                where: {
                  providerId: token.sub,
                },
                data: {
                  name: token.name,
                  email: token.email,
                  image: token.picture,
                }
              });
              token.sub = providerUser.id;
            }
          }
        }
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
