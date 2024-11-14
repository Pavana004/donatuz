"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" container w-[100%] h-20 bg-gray-900 text-white flex justify-between ">
      <div className="w-[70%] h-20 font-bold uppercase align-middle flex  my-auto ">
        <Link href="/" className="my-auto">
          <h4 className="my-auto pl-9 leading-10 tracking-[1px]">
            Student Attendance Tracker
          </h4>
        </Link>
      </div>
      <div className="hidden md:flex w-[30%] h-20  justify-evenly align-middle  ">
        <Link href="/student/studentLogin" className=" my-auto ">
          <button className=" text-sm w-[150px] h-12 bg-green-500 hover:bg-green-400 my-auto text-white font-bold py-2 px-4 rounded">
            Student-Login
          </button>
        </Link>

        <Link href="/teacher/teacherLogin" className=" my-auto ">
          <button className=" text-sm w-[150px] h-12 bg-green-500 hover:bg-green-400 my-auto text-white font-bold py-2 px-4 rounded">
            Teacher-login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
