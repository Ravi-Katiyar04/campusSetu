"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { registerUser } from "@/lib/features/auth/authSlice";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { registerLoading, error } =
    useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const result = await dispatch(
      registerUser({ name, email, password, rollNumber })
    );

    if (registerUser.fulfilled.match(result)) {
      router.push("/login");
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
              <Image
                src="/assets/knit-logo.png"
                alt="CampusSetu Logo"
                width={40}
                height={40}
              />
              <h2 className="text-lg font-semibold">CampusSetu</h2>
            </div>

            <h1 className="text-3xl font-bold mb-4">
              Join CampusSetu
            </h1>

            <p className="text-blue-100">
              Create your account to access the Kamla Nehru Institute Of
              Technology CampusSetu portal and track your academic journey.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="text-3xl mb-2">🎓</div>
            <h2 className="text-2xl font-semibold">Register</h2>
            <p className="text-gray-500 text-sm">
              Kamla Nehru Institute Of Technology, Sultanpur
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Student ID / Roll Number
              </label>
              <input
                type="text"
                placeholder="Enter your roll number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              {registerLoading ? "Creating Account..." : "Create Account"}
            </button>

            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}