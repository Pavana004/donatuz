import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className=" container flex flex-col gap-6 items-center justify-center h-[80vh] bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 uppercase">welcome</h1>

        <h1 className="text-4xl font-bold text-gray-800">
          Student Attendance Tracker
        </h1>
      </div>
      <Footer />
    </>
  );
}
