export {default} from "next-auth/middleware"

export const config = {
    matcher: [
        '/session',
        '/auctions/create',
    ],
    pages: {
        signIn: '/api/auth/signin'
    }
}