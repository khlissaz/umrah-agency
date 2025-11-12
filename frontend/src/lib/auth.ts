import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User, UserRole } from '@/types';

// Example: fake user database
const users: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    password: bcrypt.hashSync('password123', 10) as string,
    role: UserRole.ADMIN,
    language: 'en',
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Replace this with your own database lookup
        const user = users.find(u => u.email === credentials.email);

        if (!user) return null;

        const isPasswordValid = user.password
  ? await bcrypt.compare(credentials.password, user.password)
  : false;

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
  if (session.user) {
    (session.user as User).id = token.sub!;
    if (typeof token.role === 'string') {
      // Assign the appropriate UserRole value based on the string value
      (session.user as User).role = (UserRole as any)[token.role] as UserRole;
    } else {
      (session.user as User).role = token.role as UserRole;
    }
  }
  return session;
},
  },
  pages: {
    signIn: '/auth/signin',
  },
};
