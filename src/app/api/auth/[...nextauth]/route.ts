import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "@/lib/axios";

export const authOptions: NextAuthOptions = {
  providers: [
    // ----- Normal Email/Password Login -----
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const response = await api.post("/identityapi/v1/auth/signin", {
          email: credentials.email,
          password: credentials.password,
        });

        const data = response.data;
        if (data?.success && data?.userData && data?.userProfileData) {
          return {
            id: data.userProfileData.user_id, // ✅ required by NextAuth
            accessToken: data.userData.access_token,
            refreshToken: data.userData.refresh_token,
            email: data.userProfileData.email,
            name: data.userProfileData.name,
            role: data.userProfileData.role,
            user_id: data.userProfileData.user_id,
          };
        }

        return null;
      },
    }),

    // ----- Google One Tap Login -----
    CredentialsProvider({
      id: "GoogleCredentials",
      name: "Google One Tap",
      credentials: {
        id_token: { label: "Google ID Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.id_token) return null;

        const response = await api.post("/identityapi/v1/auth/google-signin", {
          id_token: credentials.id_token,
        });

        const data = response.data;
        if (data?.success && data?.userData && data?.userProfileData) {
          return {
            id: data.userProfileData.user_id, // ✅ required
            accessToken: data.userData.access_token,
            refreshToken: data.userData.refresh_token,
            email: data.userProfileData.email,
            name: data.userProfileData.name,
            role: data.userProfileData.role,
            user_id: data.userProfileData.user_id,
          };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role;
        token.user_id = (user as any).user_id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          name: token.name,
          role: token.role,
          user_id: token.user_id,
        };
        (session as any).accessToken = token.accessToken;
        (session as any).refreshToken = token.refreshToken;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      baseUrl = "https://yetzu.com";
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
