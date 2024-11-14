import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema(
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

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
