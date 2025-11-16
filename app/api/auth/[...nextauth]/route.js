import NextAuth from "next-auth";
// import AppleProvider from "next-auth/providers/apple";
// import FacebookProvider from "next-auth/providers/facebook";
// import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";


export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),

    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "NextAuth.js <no-reply@example.com>",
    // }),
  ],
  callbacks: {
  async signIn({ user, account, profile }) {
    if (account.provider === "github") {
      // Connect to the database
      await mongoose.connect(process.env.MONGO_URI);

      // GitHub email might not always be returned, handle undefined
      const userEmail = user.email;
      if (!userEmail) return false; // Cannot sign in without email

      const currentUser = await User.findOne({ email: userEmail });

      if (!currentUser) {
        const newUser = new User({
          email: userEmail,
          username: userEmail.split("@")[0],
        });
        await newUser.save();
        user.name = newUser.username;
      } else {
        user.name = currentUser.username;
      }

      return true;
    }
    return true;
  },
},

});

export { authoptions as GET, authoptions as POST };
