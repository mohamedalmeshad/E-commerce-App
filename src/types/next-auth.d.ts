import  { DefaultSession } from "next-auth"
import { UserI } from "@/interfaces/user"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserI & DefaultSession["user"]
  }
  interface User extends UserI {
    _id: string;
    role: string;
  }
}
