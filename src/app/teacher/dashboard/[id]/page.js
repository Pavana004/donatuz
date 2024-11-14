"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const IndividualStudentData = () => {
  const [individualData, setIndividualData] = useState([]);
  const [updateData, setUpdateData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState({
    studentname: "",
    student_id: "",
    classes: "",
    status: "",
    email: "",
  });

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const handleFindOne = async () => {
      try {
        const res = await axios.get(`/api/student/studentData/${params.id}`);
        console.log(res.data.student);
        setIndividualData(res.data.student);
      } catch (error) {
        console.log(error);
      }
    };

    handleFindOne();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/student/studentData/${params.id}`);
      router.push("/teacher/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateChange = ({ target: { name, value } }) => {
    setIsEditMode({ ...isEditMode, [name]: value });
  };

  const handleUpdateChangeSubmit = async (e) => {
    e.preventDefault();

    try {
      try {
        setLoading(true);
        await axios.put(`/api/student/studentData/${params.id}`, isEditMode);
        router.push("/teacher/dashboard");
        router.refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="w-[80%]  mx-auto pt-5">
        <Link href="/teacher/dashboard">
          <button className=" text-md w-[50px] h-[50px] bg-gray-300 rounded-full text-center    hover:bg-blue-400 my-auto text-white font-bold py-2 px-4 ">
            <FaArrowLeft className="text-center" color="black" />
          </button>
        </Link>
      </div>
      <div className="container w-full h-[80vh] flex  justify-center align-middle ">
        <div className="my-auto w-[50%] h-[80%]  shadow-md shadow-green-400 grid grid-cols-1 justify-center">
          <h1 className="text-center uppercase text-green-400 text-xl font-bold ">
            Student Data
          </h1>

          {updateData === false ? (
            <div className="flex justify-center ">
              <div className=" w-[50%] h-60  grid grid-cols-1 p-5 font-sans ">
                <p className="font-bold">
                  StudentName:{" "}
                  <span className="font-medium uppercase">
                    {individualData.studentname}
                  </span>
                </p>
                <p className="font-bold">
                  Student_id:{" "}
                  <span className="font-medium uppercase">
                    {individualData.student_id}
                  </span>
                </p>
                <p className="font-bold">
                  Classes:{" "}
                  <span className="font-medium uppercase">
                    {individualData.classes}
                  </span>
                </p>
                <p className="font-bold">
                  Email:{" "}
                  <span className="font-medium ">{individualData.email}</span>
                </p>
                <p className="font-bold">
                  Status:{" "}
                  <span
                    className={
                      individualData.status === "absent"
                        ? "text-red-600 uppercase font-medium"
                        : "text-green-500 uppercase font-medium"
                    }
                  >
                    {individualData.status}
                  </span>
                </p>
              </div>
              <div className=" w-[50%] h-60  grid grid-cols-1 p-5  ">
                <input
                  name="text"
                  type="text"
                  placeholder="StudentName"
                  className="w-full h-10 bg-transparent placeholder:text-slate-800 placeholder:text-sm text-slate-700 text-md border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  required
                />
                <textarea
                  name="text"
                  rows="2"
                  className="w-full bg-transparent placeholder:text-slate-800 placeholder:text-sm text-slate-700 text-md border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Message*"
                />
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleUpdateChangeSubmit}>
                <div className="w-[80%] h-[150px]  grid grid-cols-2 gap-6 p-5 mx-auto">
                  <input
                    name="studentname"
                    value={isEditMode.studentname}
                    onChange={handleUpdateChange}
                    type="text"
                    placeholder="StudentName"
                    className="w-full bg-transparent placeholder:text-slate-800 placeholder:text-sm text-slate-700 text-md border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    required
                  />
                  <input
                    name="student_id"
                    value={isEditMode.student_id}
                    onChange={handleUpdateChange}
                    type="text"
                    placeholder="Student_id"
                    className="w-full bg-transparent placeholder:text-slate-800 placeholder:text-sm text-slate-700 text-md border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    required
                  />
                  <input
                    name="email"
                    value={isEditMode.email}
                    onChange={handleUpdateChange}
                    type="text"
                    placeholder="Email"
                    className="w-full bg-transparent placeholder:text-slate-800 placeholder:text-sm text-slate-700 text-md border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    required
                  />
                  <div>
                    <select
                      name="classes"
                      onChange={handleUpdateChange}
                      value={isEditMode.status}
                      className="w-full bg-transparent placeholder:text-slate-800 placeholder:text-sm text-slate-700 text-md border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    >
                      <option>Status....</option>
                      <option value="math">Math</option>
                      <option value="history">History</option>
                      <option value="computerScience">Computer-Science</option>
                      <option value="english">English</option>
                      <option value="tamil">Tamil</option>
                    </select>
                  </div>

                  <div>
                    <select
                      name="status"
                      onChange={handleUpdateChange}
                      value={isEditMode.status}
                      className="w-full bg-transparent placeholder:text-slate-800 placeholder:text-sm text-slate-700 text-md border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    >
                      <option>Status....</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </div>
                </div>
                <div className="w-[80%]  mx-auto flex justify-end  ">
                  <button
                    type="submit"
                    className=" text-md w-[100px] h-12 bg-blue-400 my-auto text-white font-bold py-2 px-4 rounded-lg"
                  >
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
                      "Submit..."
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          <div className="flex justify-center gap-4">
            <button
              onClick={handleDelete}
              className=" text-md w-[100px] h-12 bg-red-700   hover:bg-red-400 my-auto text-white font-bold py-2 px-4 rounded-lg"
            >
              Delete
            </button>

            <button
              onClick={() => setUpdateData((prev) => !prev)}
              className=" text-md w-[100px] h-12 bg-green-700   hover:bg-green-400 my-auto text-white font-bold py-2 px-4 rounded-lg"
            >
              {updateData === false ? "Edit" : "Cancel"}
            </button>
            <button className=" text-md w-[200px] h-12 bg-blue-600   hover:bg-blue-400 my-auto text-white font-bold py-2 px-4 rounded-lg">
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualStudentData;
