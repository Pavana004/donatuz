"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const TeachcerRegisterPage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/teacher/register", data);
      router.push("/teacher/teacherLogin");
    } catch (error) {
      console.log("Error during registration: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" container flex flex-col items-center justify-center h-[80vh] bg-gray-100">
        <div className="grid place-items-center  w-[500px] h-[500px] ">
          <div className=" shadow-md shadow-green-300 p-5 rounded-lg  w-[400px] h-[400px] ">
            <h1 className="text-xl font-bold my-4 uppercase leading-10 text-green-500">
              Teacher Register
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 ">
              <input
                name="username"
                value={data.username}
                onChange={handleChange}
                type="text"
                placeholder="Username"
                className="w-full bg-transparent placeholder:text-slate-800 text-slate-700 text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                required
              />
              <input
                name="email"
                onChange={handleChange}
                value={data.email}
                type="text"
                placeholder="Email"
                className="w-full bg-transparent placeholder:text-slate-800 text-slate-700 text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                required
              />
              <input
                name="password"
                value={data.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                className="w-full bg-transparent placeholder:text-slate-800 text-slate-700 text-lg border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                required
              />
              <div className="flex justify-end">
                <button className="bg-green-500 text-white font-bold cursor-pointer px-6 py-2 w-24 flex justify-end">
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeachcerRegisterPage;
