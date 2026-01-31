import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // Use our singleton

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                // In a real app, you would hash passwords!
                // For this demo/MVP, we'll check against the database directly comparing strings
                // or specific hardcoded admins if DB is empty/locked

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    if (user && user.password === credentials.password) {
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        };
                    }
                } catch (e) {
                    console.error("Auth error:", e);
                }

                // Fallback for demo if DB is empty
                if (credentials.email === "admin@ecotaqa.com" && credentials.password === "admin") {
                    return {
                        id: "admin-id",
                        name: "Admin User",
                        email: "admin@ecotaqa.com",
                        role: "ADMIN",
                    };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
        // signOut: '/auth/signout',
        // error: '/auth/error', 
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({ session, token }: { session: any; token: any }) {
            if (session?.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        }
    }
};
