"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentFrom from "@/app/components/StudentFrom";
import Modal from "@/app/components/Modal";
import { CSVLink } from "react-csv";

const Dashboard = () => {
  const [teacherData, setTeacherData] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [exportData, setExportData] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const router = useRouter();

  const headers = [
    { label: "Student_id", key: "student_id" },
    { label: "StudentName	", key: "studentname" },
    { label: "Classes", key: "classes" },
    { label: "Date", key: "date" },
    { label: "Status	", key: "status" },
    { label: "Status	", key: "status" },
  ];

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const res = await axios.get("/api/teacher/getDataFrom");
        console.log(res.data);
        setTeacherData(res.data.data);
      } catch (error) {
        console.log("Error fetching teacher data:", error);
      }
    };
    fetchTeacherData();
  }, []);

  useEffect(() => {
    const fetchstudentData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/student/studentData");
        setStudentData(res.data.data);
        setFilterData(res.data.data);
        setExportData(res.data.data);
      } catch (error) {
        console.log("Error fetching teacher data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchstudentData();
  }, []);

  const handleLogOut = async () => {
    try {
      await axios.get("/api/teacher/logout");
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getStudentData = (value) => {
    const fil = filterData.filter(
      (index) =>
        index.studentname.toLowerCase().includes(value) ||
        index.date.toLowerCase().includes(value) ||
        index.student_id.toLowerCase().includes(value)
    );
    setStudentData(fil);
  };

  return (
    <>
      <header className="container">
        <div className=" container w-[100%] h-20 border-b-2 shadow-md shadow-green-500 border-green-500 text-black flex justify-between ">
          <div className="w-[70%] h-20 font-bold uppercase align-middle flex  my-auto ">
            <h4 className="my-auto pl-9 leading-10 tracking-[1px] text-xl">
              Welcome - {teacherData.username}
            </h4>
          </div>
          <div className="hidden md:flex w-[30%] h-20  justify-evenly align-middle  ">
            <Link href="" className=" my-auto " onClick={handleLogOut}>
              <button className=" text-sm w-[150px] h-12 bg-red-900  hover:bg-green-400 my-auto text-white font-bold py-2 px-4 rounded-lg">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </header>
      <main className=" container w-full h-[85vh] mx-auto pt-7">
        <div className="flex w-[80%] h-20  mx-auto justify-between ">
          <div className="my-auto">
            <input
              type="text"
              onChange={(e) => getStudentData(e.target.value)}
              placeholder="filter by date  or subject"
              className="w-[80px] lg:w-full bg-transparent placeholder:text-slate-800 placeholder:text-sm text-slate-700 text-md border border-green-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              required
            />
          </div>
          <div className="my-auto">
            <CSVLink
              data={exportData}
              headers={headers}
              filename={"StudentData.csv"}
              className=" w-[100px] text-[10px] lg:text-sm lg:w-[200px] h-12 bg-blue-500   hover:bg-green-400 my-auto text-white font-bold py-2 px-4 rounded-lg"
            >
              {" "}
              Export All Students Data
            </CSVLink>
          </div>

          <Link href="" className=" my-auto " onClick={openModal}>
            <button className="w-[100px] text-sm lg:text-sm lg:w-[200px] h-12 bg-blue-500   hover:bg-green-400 my-auto text-white font-bold py-2 px-4 rounded-lg">
              Create a new Record
            </button>
          </Link>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <StudentFrom />
        </Modal>

        {loading ? (
          <>
            <div className="flex justify-center items-center h-full">
              <div className="w-[300px] h-20 bg-gray-200 rounded-md p-4">
                <h2 className="text-center text-gray-700">Loading...</h2>
              </div>
            </div>
          </>
        ) : (
          <div className=" container  overflow-y-scroll w-[85%  h-[85%]">
            <table className="w-[80%] border-collapse border mx-auto border-gray-200">
              <thead>
                <tr className="bg-green-300">
                  <th className="border border-gray-200 p-2">Student_id</th>
                  <th className="border border-gray-200 p-2">StudentName</th>
                  <th className="border border-gray-200 p-2">Classes</th>
                  <th className="border border-gray-200 p-2">Date</th>
                  <th className="border border-gray-200 p-2">Status</th>
                  <th className="border border-gray-200 p-2">Mail-ID</th>
                  <th className="border border-gray-200 p-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((user) => (
                  <tr key={user._id} className="text-center font-bold">
                    <td className="border border-gray-200 p-2">
                      {user.student_id}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {user.studentname}
                    </td>
                    <td className="border border-gray-200 p-2">
                      {user.classes}
                    </td>
                    <td className="border border-gray-200 p-2">{user.date}</td>
                    <td
                      className={
                        user.status === "absent"
                          ? "text-red-600 border border-gray-200 p-2"
                          : "text-green-500  border border-gray-200 p-2"
                      }
                    >
                      {user.status}
                    </td>
                    <td className="border border-gray-200 p-2">{user.email}</td>
                    <td className="border border-gray-200 p-2 ">
                      <Link
                        href={`/teacher/dashboard/${user._id}`}
                        className=" my-auto "
                      >
                        <button className=" text-sm w-[100px] h-[50px] bg-blue-900   hover:bg-blue-400 my-auto text-white font-bold py-2 px-4 rounded-lg">
                          view
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export default Dashboard;
