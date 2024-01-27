import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./auth.config";
import connectToDb from "@/lib/model";
import { User } from "@/lib/schema"
import bcrypt from "bcrypt";


const login = async (credentials)=>{
    try {
      connectToDb();

      const user = User.findOne({ username: credentials.username });

      if (!user || !user.isAdmin) throw new Error("wrong credentials");

      const isPassword = await bcrypt.compare(
        credentials.password,
        user.password,
      );

      if (!isPassword) throw new Error("Wrong credentials!");

      return user;

    } catch (error) {
       throw new Error("Failed to login!");
    }
}

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
});