import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connect from "@/app/utils/database";
import Student from "@/app/models/student";

connect();

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    const extractToken = jwt.verify(token, "secretkey");
    const student = await Student.findById(extractToken.id);
    return NextResponse.json({ data: student });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
