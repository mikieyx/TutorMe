import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "../../../lib/prisma";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: "https://accounts.google.com/o/oauth2/auth?response_type=code&hd=sjsu.edu"
        }),
    ],
    callbacks: {
        async jwt({token, account, profile}) {
            if (profile){
                token.profile = profile;
            }
            const user = await prisma.user.findUnique({
                where: {
                    email: token.profile.email
                }
            })
            if (user !== null) {
                token.is_tutor = user.is_Tutor
            }
            return token;
        },
        async session({session, token}) {
            session.profile = token.profile;
            session.is_tutor = token.is_tutor;
            return session;
        }
    }
}

export default NextAuth(authOptions)