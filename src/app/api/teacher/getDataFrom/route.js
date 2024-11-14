import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Teacher from "@/app/models/teacher";
import connect from "@/app/utils/database";

connect();

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value || "";
    const extractToken = jwt.verify(token, "secretkey");
    const teacher = await Teacher.findById(extractToken.id);
    return NextResponse.json({ data: teacher });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
