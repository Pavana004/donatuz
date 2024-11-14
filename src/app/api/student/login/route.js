"use server";

import connect from "@/app/utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "@/app/models/student";

connect();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const student = await Student.findOne({ email });
    if (!student) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // password check

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // creating token auth

    const tokenLoad = {
      id: student._id,
      email: student.email,
      password: student.password,
    };

    const token = jwt.sign(tokenLoad, "secretkey", {
      expiresIn: "1d",
    });

    const res = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    res.cookies.set("token", token, { httpOnly: true });
    return res;
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid credentials." },
      { status: 401 }
    );
  }
}

export async function GET(req, { params }) {
  connect();

  try {
    const student = await StudentData.findById(params.id).populate("");
    return NextResponse.json({ student }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
