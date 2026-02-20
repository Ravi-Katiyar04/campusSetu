"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 mx-4 dark:bg-gray-900/60 mt-12 rounded-t-3xl shadow dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-3xl text-blue-600">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <span className="text-lg font-semibold tracking-wide">
              CampusSetu
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              "fa-envelope",
              "fa-linkedin-in",
              "fa-twitter",
              "fa-youtube",
            ].map((icon, index) => (
              <a
                key={index}
                href="#"
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-md transition"
              >
                <i className={`fa-brands ${icon} text-gray-600 dark:text-gray-300`}></i>
              </a>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 border-t dark:border-gray-700"></div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms & Conditions</Link>
          <Link href="#">Help Center</Link>
          <Link href="#">Contact Us</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Business Objectives</Link>
          <Link href="#">Pricing Plans</Link>
          <Link href="#">Payment Options</Link>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} copyrights reserved by CampusSetu
        </div>

      </div>
    </footer>
  );
}