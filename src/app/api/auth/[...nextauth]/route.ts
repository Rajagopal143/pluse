import { authProvider } from "@/lib/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authProvider)

export { handler as GET, handler as POST }