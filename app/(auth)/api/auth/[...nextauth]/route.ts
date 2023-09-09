import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const ALLOW_LIST_USERS = process.env.ALLOW_LIST_USERS?.split(',') ?? [];

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.email && ALLOW_LIST_USERS.includes(user.email)) {
        return true;
      }
      return false;
    },
  },
});

export { handler as GET, handler as POST };
