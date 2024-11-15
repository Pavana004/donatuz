"use server";

import connect from "@/app/utils/database";
import { NextResponse } from "next/server";
import StudentData from "@/app/models/studentData";

connect();

export async function POST(req) {
  try {
    const { studentname, student_id, classes, status, date, email } =
      await req.json();

    //create new user in database
    const newUser = new StudentData({
      studentname,
      student_id,
      classes,
      status,
      date,
      email,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "Student Data registered." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const studentData = await StudentData.find();
    return NextResponse.json({ data: studentData });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
