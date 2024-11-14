"use server";

import connect from "@/app/utils/database";
import { NextResponse } from "next/server";
import StudentData from "@/app/models/studentData";

export async function GET(req, { params }) {
  connect();

  try {
    const student = await StudentData.findById(params.id);
    return NextResponse.json({ student }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  connect();

  try {
    const body = await req.json();
    const Updated = await StudentData.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    return NextResponse.json(Updated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(req, { params }) {
  connect();

  try {
    const { id } = await params;
    await StudentData.findByIdAndDelete(id);
    return NextResponse.json({ message: "Student Data deleted." });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
