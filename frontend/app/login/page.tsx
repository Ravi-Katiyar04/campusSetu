
"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("student");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        loginUser({
          email: studentId,
          password,
        })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        router.push("/"); // redirect to home
      } else {
        console.log("Login failed:", resultAction.payload);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="relative hidden md:flex flex-col justify-center px-10 text-white bg-gradient-to-br from-blue-600 to-indigo-600">
          <div className="absolute inset-0 opacity-10">
            <div className="w-32 h-32 bg-white rounded-xl absolute top-10 left-10 rotate-12"></div>
            <div className="w-24 h-24 bg-white rounded-full absolute top-40 right-20"></div>
            <div className="w-28 h-28 bg-white rounded-xl absolute bottom-20 left-20"></div>
            <div className="w-16 h-16 bg-white rounded-xl absolute bottom-10 right-16 rotate-45"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Image src="/assets/knit-logo.png" alt="CampusSetu Logo" width={40} height={40}></Image>
              <h2 className="text-lg font-semibold">CampusSetu</h2>
            </div>

            <h1 className="text-3xl font-bold mb-4">
              Welcome Back!
            </h1>

            <p className="text-blue-100">
              Sign in to access your Kamla Nehru Institute Of Technology CampusSetu portal.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="text-3xl mb-2">🏛</div>
            <h2 className="text-2xl font-semibold">Login</h2>
            <p className="text-gray-500 text-sm">
              Welcome to Kamla Nehru Institute Of Technology, Sultanpur
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Student ID */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Student ID / Roll Number
              </label>
              <input
                type="text"
                placeholder="Enter your student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Account Type
              </label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className=" text-sm text-gray-500 ">
                  Already have an account?{" "}
                  <span
                    onClick={() => router.push("/register")}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Register
                  </span>
                </p>
              </div>

              {/* Forgot */}
              <div>
                <p className="text-sm">
                  <span
                    onClick={() => router.push("/#")}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </span>
                </p>

              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact Us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}