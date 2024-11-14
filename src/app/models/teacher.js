import mongoose from "mongoose";

const { Schema } = mongoose;

const teacherSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

export default Teacher;
