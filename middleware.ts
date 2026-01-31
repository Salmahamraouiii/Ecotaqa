export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/settings/:path*",
        "/map/:path*",
        "/buildings/:path*",
        "/api/dashboard/:path*"
    ]
}
