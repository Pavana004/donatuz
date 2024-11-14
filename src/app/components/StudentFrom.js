"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const StudentFrom = () => {
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState({
    studentname: "",
    student_id: "",
    classes: "",
    date: "",
    status: "",
    email: "",
  });

  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post("/api/student/studentData", studentData);
      setStudentData({
        studentname: "",
        student_id: "",
        classes: "",
        date: "",
        status: "",
        email: "",
      });
      router.push("/teacher/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="container w-full h-[85vh] flex justify-center align-middle  pt-3 ">
        <div className=" shadow-md shadow-green-300 p-5 rounded-lg  w-full h-[85vh] ">
          <h1 className="text-xl font-bold my-4 uppercase leading-10 text-green-500 text-center">
            Student-From
          </h1>
          <form className="flex flex-col gap-8 " onSubmit={handleSubmit}>
            <div className="container grid grid-cols-1 gap-9 w-[80%] h-full  mx-auto">
              <input
                name="studentname"
                onChange={handleChange}
                value={studentData.studentname}
                type="text"
                placeholder="StudentName"
                className="w-full bg-transparent placeholder:text-slate-800 text-slate-700 text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                required
              />
              <input
                name="student_id"
                value={studentData.student_id}
                onChange={handleChange}
                type="text"
                placeholder="Roll Number"
                className="w-full bg-transparent placeholder:text-slate-800 text-slate-700 text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                required
              />
              <input
                name="email"
                value={studentData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter Email-ID"
                className="w-full bg-transparent placeholder:text-slate-800 text-slate-700 text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                required
              />
              <div>
                <select
                  name="classes"
                  onChange={handleChange}
                  value={studentData.classes}
                  className="w-full bg-transparent placeholder:text-slate-800 text-slate-700 text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                >
                  <option>Status....</option>
                  <option value="math">Math</option>
                  <option value="history">History</option>
                  <option value="computerScience">Computer-Science</option>
                  <option value="english">English</option>
                  <option value="tamil">Tamil</option>
                </select>
              </div>

              <input
                name="date"
                value={studentData.date}
                onChange={handleChange}
                type="date"
                placeholder="Date"
                className="w-full bg-transparent placeholder:text-slate-800 text-slate-700 text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                required
              />
              <div>
                <select
                  name="status"
                  value={studentData.status}
                  onChange={handleChange}
                  className="w-full bg-transparent  text-slate-700 text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                >
                  <option>Status....</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end w-[80%]  mx-auto">
              <button className="bg-green-500 text-white font-bold cursor-pointer px-6 py-2 w-24 flex justify-center ">
                {loading ? (
                  <span className="animate-spin text-white mr-3">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-50"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                    </svg>
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default StudentFrom;
