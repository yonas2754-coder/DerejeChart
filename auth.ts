// auth.ts

import { Auth } from "@auth/core";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "@auth/core/providers/credentials";

// Type Imports: Fixes "implicitly has an 'any' type" error
import type { JWT } from "next-auth/jwt"; 
import type { Session } from "next-auth";
import type { CallbacksOptions } from "@auth/core/types"; // Used to type the callbacks object

import prisma from './prisma/client'; 
import * as bcrypt from 'bcryptjs';

// Define the Callbacks object with explicit typing
const callbacks: CallbacksOptions = {
    // 1. JWT Callback
    async jwt({ token, user }) {
        const extendedToken = token as JWT; 
        
        if (user) {
            extendedToken.role = user.role; 
            extendedToken.id = user.id;
        }
        return extendedToken;
    },

    // 2. Session Callback
    async session({ session, token }) {
        const extendedToken = token as JWT; 
        const extendedSession = session as Session; 

        if (extendedToken) {
            extendedSession.user.role = extendedToken.role;
            extendedSession.user.id = extendedToken.id;
        }
        return extendedSession;
    },
};

const authOptions = {
    adapter: PrismaAdapter(prisma), 
    session: { strategy: "jwt" as const },
    
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: { email: { label: "Email" }, password: { label: "Password" } },
            
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const user = await prisma.user.findUnique({ where: { email: credentials.email as string } });
                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password as string, user.password);

                if (!isValid) return null;

                return {
                    id: user.id, 
                    email: user.email, 
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    
    callbacks, // Use the typed callbacks object
    
    pages: { signIn: '/login' }
};

export const { handlers, auth, signIn, signOut } = Auth(authOptions);