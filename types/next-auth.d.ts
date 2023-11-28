import NextAuth, { Profile } from "next-auth"
import { GoogleProfile } from "next-auth/providers/google"

declare module "next-auth" {
    interface Session extends DefaultSession {
        profile: GoogleProfile,
        is_tutor: boolean
    }
}