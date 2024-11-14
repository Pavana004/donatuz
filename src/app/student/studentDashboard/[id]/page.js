"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const StudentIndividualData = () => {
  const [studentData, setStudentData] = useState([]);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    const fetchstudentData = async () => {
      try {
        const res = await axios.get(`/api/student/studentData/${params.id}`);
        setStudentData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("Error fetching teacher data:", error);
      }
    };
    fetchstudentData();
  }, []);

  return (
    <div>
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
            <tr className="text-center font-bold">
              <td className="border border-gray-200 p-2">
                {studentData.student_id}
              </td>
              <td className="border border-gray-200 p-2">
                {studentData.studentname}
              </td>
              <td className="border border-gray-200 p-2">
                {studentData.classes}
              </td>
              <td className="border border-gray-200 p-2">{studentData.date}</td>
              <td
                className={
                  studentData.status === "absent"
                    ? "text-red-600 border border-gray-200 p-2"
                    : "text-green-500  border border-gray-200 p-2"
                }
              >
                {studentData.status}
              </td>
              <td className="border border-gray-200 p-2">
                {studentData.email}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentIndividualData;
