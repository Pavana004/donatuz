import connect from "@/app/utils/database";
import { NextResponse } from "next/server";
import Student from "@/app/models/student";
import StudentData from "@/app/models/studentData";

export async function GET(req, { params }) {
  connect();

  try {
    const student = await StudentData.find().populate({
      path: "Student",
      strictPopulate: false,
    });
    return NextResponse.json({ student }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
