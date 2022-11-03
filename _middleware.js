import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";
const secret = process.env.JWT_KEY;

export default async function middleware(req) {
  const jwt = req.cookies.get("OutsiteJWT");
  const url = req.url;
  const { pathname } = req.nextUrl;
  if (url.includes("/dashboard")) {
    if (jwt === undefined) {
      return NextResponse.redirect("/admin");
    }
    try {
      verify(jwt, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect("/admin");
    }
  }
  return NextResponse.next();
}
