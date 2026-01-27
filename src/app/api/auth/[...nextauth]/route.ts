import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Mock authentication logic
                // In a real app, query Prisma here: const user = await prisma.user.findUnique(...)

                if (credentials?.email === "admin@company.com" && credentials?.password === "password") {
                    return {
                        id: "1",
                        name: "Admin User",
                        email: "admin@company.com",
                        roles: ["ADMIN", "COMPANY"],
                    };
                }

                if (credentials?.email === "user@example.com" && credentials?.password === "password") {
                    return {
                        id: "2",
                        name: "John Doe",
                        email: "user@example.com",
                        roles: ["USER"],
                    };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).roles;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
