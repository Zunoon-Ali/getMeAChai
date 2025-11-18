import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        await connectDb();

        if (!user.email) return false;

        const existing = await User.findOne({ email: user.email });

        if (!existing) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
          });
        }
      }
      return true;
    },

    async session({ session }) {
      await connectDb();

      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.username = dbUser.username;
        session.user.id = dbUser._id.toString();
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
