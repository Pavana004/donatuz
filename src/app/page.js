import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className=" container flex flex-col gap-6 items-center justify-center h-[80vh] bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 uppercase">welcome</h1>

        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-800">
          Student Attendance Tracker
        </h1>
        <div className="flex justify-center md:hidden  w-[30%] h-20   align-middle  ">
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
      <Footer />
    </>
  );
}
