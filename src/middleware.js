import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token");
  if (!token) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/teacher/dashboard",
    "/teacher/dashboard/:path*",
    "/student/studentDashboard",
  ],
};
