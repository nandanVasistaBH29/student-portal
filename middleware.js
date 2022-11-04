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
  if (url.href.includes("/me")) {
    console.log("hi");
    const userCookie = req.cookies.get("access_token");
    if (userCookie === undefined) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/student/:path*", "/me"],
};
// import { verify } from "jsonwebtoken";
// import { NextRequest } from "next/server";
// const secret = process.env.JWT_KEY;

// export default async function middleware(req) {
//   const jwt = req.cookies.get("OutsiteJWT");
//   const url = req.url;
//   const { pathname } = req.nextUrl;
//   if (url.includes("/dashboard")) {
//     if (jwt === undefined) {
//       return NextResponse.redirect("/admin");
//     }
//     try {
//       verify(jwt, secret);
//       return NextResponse.next();
//     } catch (error) {
//       return NextResponse.redirect("/admin");
//     }
//   }
//   return NextResponse.next();
// }
