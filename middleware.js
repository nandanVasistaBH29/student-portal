import { NextResponse } from "next/server";
export async function middleware2(req) {
  const url = req.nextUrl.clone();
  if (url.href.includes("/currentuser")) {
    const userCookie = req.cookies.get("access_token");
    if (userCookie === undefined) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
}
export async function middleware(req) {
  // get all the details of a cookie
  if (url.href.includes("/dashboard") || url.href.includes("/student")) {
    const adminCookie = req.cookies.get("admin_access_token");
    // has name and value
    if (adminCookie === undefined) {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/student/:path*", "/currentuser/:path*"],
};
