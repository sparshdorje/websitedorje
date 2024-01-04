import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const loginCredentialsHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    debugger;
    console.log(body);
    const res = UserService.getAccessToken({
      email,
      password,
    });

    return res;
  } catch (error) {
    debugger;
    console.log(error);
    return 'ERROR';
  }
};

const registerCredentialsHandler = async (req, res) => {
  try {
    return null;
  } catch (error) {
    console.log(error);
    return 'ERROR';
  }
};

export const authOptions = {
  providers: [
    Providers.Credentials({
      id: 'login',
      name: 'Login Provider',
      authorize: async (credentials) => {
        try {
          const userToken = await loginCredentialsHandler({
            body: credentials,
            method: 'POST',
          });
          return Promise.resolve(userToken);
        } catch (error) {
          return Promise.reject(new Error(error.message));
        }
      },
    }),
    Providers.Credentials({
      id: 'register',
      name: 'Register Provider',
      authorize: async (credentials) => {
        try {
          const userToken = await registerCredentialsHandler({
            body: credentials,
            method: 'POST',
          });
          return Promise.resolve(userToken);
        } catch (error) {
          return Promise.reject(new Error(error.message));
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7775999,
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.guest = user.guest;
        token.email = user.userEmail;
        token.userId = user.userId;
        token.userHash = user.hash;
        token.phone = user.phone;
        token.name = user.name;
        token.accessToken = user.access_token;
        token.expiresIn = Date.now() + (user.expires_in || 5200000) * 1000;
        token.refreshToken = user.refresh_token;
        token.accountHash = user['acc-hash'];
      }

      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.guest = token.guest;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.userHash = token.userHash;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.accountHash = token.accountHash;
        session.user.expiresIn = token.expiresIn;
        session.user.userId = token.userId;
        session.maxAge = token.expiresIn;
        session.error = token.error;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
