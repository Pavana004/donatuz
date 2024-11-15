"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const res = await axios.get("/api/student/studentLoginData");
        console.log(res.data);
        setStudentData(res.data.data);
      } catch (error) {
        console.log("Error fetching teacher data:", error);
      }
    };
    fetchTeacherData();
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.get("/api/teacher/logout");
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className="container">
        <div className=" container w-[100%] h-20 border-b-2 shadow-md shadow-green-500 border-green-500 text-black flex justify-between ">
          <div className="w-[70%] h-20 font-bold uppercase align-middle flex  my-auto ">
            <h4 className="my-auto pl-9 leading-10 tracking-[1px] text-xl">
              Student Attendance Tracker
            </h4>
          </div>
          <div className="w-[100px] flex lg:w-[30%] h-20  justify-evenly align-middle  ">
            <Link href="" className=" my-auto " onClick={handleLogOut}>
              <button className=" text-sm w-[150px] h-12 bg-red-900  hover:bg-green-400 my-auto text-white font-bold py-2 px-4 rounded-lg">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container w-full h-[85vh] mx-auto pt-7  flex justify-center">
        <div className=" w-[100%] h-[100%] lg:w-[800px] lg:h-[400px]  shadow-md shadow-green-500 my-auto">
          <h1 className="text-xl font-bold my-4 uppercase leading-10 text-green-500 text-center">
            Student Dashboard
          </h1>
          <div className="w-full h-20  text-center uppercase font-bold align-middle flex justify-center">
            <h1 className="my-auto">Welcome - {studentData.username}</h1>
          </div>
          <div className="w-full h-auto overflow-hidden   text-center uppercase font-bold align-middle lg:flex lg:justify-evenly ">
            <div className="w-[200px] h-[200px] relative shadow-lg shadow-green-300  rounded-full flex flex-col  justify-center">
              <p className="text-center text-sm my-auto ">
                Total classes attended
              </p>
            </div>
            <div className="w-[200px] h-[200px] shadow-lg shadow-green-300  rounded-full flex  flex-col align-middle justify-center">
              <p>Total classes missed</p>
            </div>
            <div className="w-[200px] h-[200px] shadow-lg shadow-green-300  rounded-full flex  flex-col align-middle justify-center">
              <p>Attendance percentage</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default StudentDashboard;
