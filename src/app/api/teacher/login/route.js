"use server";

import connect from "@/app/utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Teacher from "@/app/models/teacher";
import jwt from "jsonwebtoken";

connect();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // password check

    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 401 }
      );
    }

    // creating token auth

    const tokenLoad = {
      id: teacher._id,
      email: teacher.email,
      password: teacher.password,
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
