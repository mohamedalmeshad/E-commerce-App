import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credential',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'your-email@example.com' },
                password: { label: 'Password', type: 'password', placeholder: '*************' }
            },
            authorize: async (credentials, req) => {
                const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                    method: 'post',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { 'content-type': 'application/json' }
                })

                const payload = await response.json()
                console.log(payload);

                if (payload && payload.message == 'success') {
                    return {
                        id: payload.user._id, // Mapping _id to id for NextAuth
                        _id: payload.user._id, // Providing _id for UserI
                        name: payload.user.name,
                        email: payload.user.email,
                        role: payload.user.role,
                        token: payload.token
                    }
                }
                return null
            }

        })
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.token = user.token;
            }
            return token
        },
        session({ session, token }) {
            session.user.role = token.role as string;
            session.user.token = token.token as string;
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
    },
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }