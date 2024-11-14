import mongoose from "mongoose";

const { Schema } = mongoose;

const studentDataSchema = new Schema(
  {
    studentname: {
      type: String,
      required: true,
    },
    student_id: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    user: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },

  { timestamps: true }
);

const StudentData =
  mongoose.models.StudentData ||
  mongoose.model("StudentData", studentDataSchema);

export default StudentData;
