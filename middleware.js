import { NextResponse } from "next/server";

export async function middleware(req) {
  const response = new NextResponse();
  const url = req.nextUrl.clone();
  console.log(url);
  // get all the details of a cookie
  if (url.href.includes("/dashboard") || url.href.includes("/student")) {
    const adminCookie = req.cookies.get("admin_access_token");
    // has name and value
    if (adminCookie === undefined) {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }
  if (url.href.includes("/currentuser")) {
    const userCookie = req.cookies.get("access_token");
    if (userCookie === undefined) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/student/:path*", "/currentuser/:path*"],
};
