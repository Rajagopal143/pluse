import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "./prisma";
import jwt from "jsonwebtoken";
import { SECRET_KEY, verifyPassword } from "./utils";


export const authProvider: AuthOptions = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.jwt = user.token; // Store JWT token in session
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.token = token.jwt; // Attach JWT to session
            }
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            id: "login",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                // Check if the user exists
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error("User not found");
                }
                
                // Validate password using bcryptjs.compare
                const isValidPassword = await verifyPassword(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid credentials");
                }
                
                console.log(isValidPassword)
                // Generate JWT token
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    SECRET_KEY,
                    { expiresIn: "1d" } // Token expires in 7 days
                );

                // Return user data with JWT token
                return { id: user.id, email: user.email, name: user.name, token };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in `.env`
};
