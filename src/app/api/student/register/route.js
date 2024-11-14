"use server";

import connect from "@/app/utils/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Student from "@/app/models/student";

connect();

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    const exitUser = await Student.findOne({ email });
    if (exitUser) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );
    }

    //password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user in database
    const newUser = new Student({ username, email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
