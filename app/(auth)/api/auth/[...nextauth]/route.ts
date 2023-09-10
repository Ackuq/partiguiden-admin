import NextAuth, { DefaultUser } from 'next-auth';
import GithubProvider, {
  GithubEmail,
  GithubProfile,
} from 'next-auth/providers/github';

const GITHUB_ORG = process.env.GITHUB_ORG;

declare module 'next-auth' {
  interface User extends DefaultUser {
    isOrgMember: boolean;
  }
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      authorization: {
        url: 'https://github.com/login/oauth/authorize',
        params: { scope: 'read:user user:email read:org' },
      },
      userinfo: {
        url: 'https://api.github.com/user',
        async request({ client, tokens }) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const profile = await client.userinfo<GithubProfile>(
            tokens.access_token!
          );

          if (!profile.email) {
            // If the user does not have a public email, get another via the GitHub API
            // See https://docs.github.com/en/rest/users/emails#list-public-email-addresses-for-the-authenticated-user
            const emailResponse = await fetch(
              'https://api.github.com/user/emails',
              {
                headers: { Authorization: `token ${tokens.access_token}` },
              }
            );

            if (emailResponse.ok) {
              const emails: GithubEmail[] = await emailResponse.json();
              profile.email = (
                emails.find((e) => e.primary) ?? emails[0]
              ).email;
            }
          }

          // Get the organization membership of the configured Github Org
          const organizationResponse = await fetch(
            `https://api.github.com/user/memberships/orgs/${GITHUB_ORG}`,
            {
              headers: { Authorization: `token ${tokens.access_token}` },
            }
          );

          if (organizationResponse.ok) {
            const organizationMembership = await organizationResponse.json();
            profile.membership_state = organizationMembership.state;
          }

          return profile;
        },
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          // Require user to be an active member of the configured organization
          isOrgMember: profile.membership_state === 'active',
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return user.isOrgMember;
    },
  },
});

export { handler as GET, handler as POST };
