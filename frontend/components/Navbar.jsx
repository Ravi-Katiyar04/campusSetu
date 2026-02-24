"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { logout } from "../lib/features/auth/authSlice";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [dark, setDark] = useState(false);

    const logoutHandler = () => {
        dispatch(logout());
        setProfileOpen(false);
    };

    /* ---------------- Dark Mode ---------------- */

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    }, []);

    const toggleDarkMode = () => {
        console.log("Toggling dark mode. Current state:", dark);
        if (dark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }

        setDark(!dark);
    };


    /* ---------------- Navigation Links ---------------- */
    const navLinks = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Leaderboard", href: "/leaderboard" },
        { name: "Companies", href: "/companies" },
    ];

    const isActive = (path) =>
        pathname === path
            ? "text-blue-600 font-semibold"
            : "text-gray-600 dark:text-gray-300 hover:text-blue-600";

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* LEFT SECTION */}
                <div className="flex items-center gap-4">

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-xl text-gray-700 dark:text-gray-300"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    {/* Logo */}
                    <Image src="/assets/knit-logo.png" alt="CampusSetu Logo" width={40} height={40}></Image>
                    <Link href="/" className="text-2xl font-bold text-blue-600">
                        CampusSetu
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm ml-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={isActive(link.href)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Admin Link */}
                        {user?.role === "admin" && (
                            <Link
                                href="/admin"
                                className={isActive("/admin")}
                            >
                                Admin
                            </Link>
                        )}
                    </nav>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-6">

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleDarkMode}
                        className="text-lg text-gray-600 dark:text-gray-300"
                    >
                        <i className={`fa-solid ${dark ? "fa-sun" : "fa-moon"}`}></i>
                    </button>

                    {user ? (
                        <>
                            {/* Notification Bell */}
                            <button className="relative text-lg text-gray-600 dark:text-gray-300">
                                <i className="fa-regular fa-bell"></i>
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                                    3
                                </span>
                            </button>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <img
                                    src={user.avatar}
                                    alt="avatar"
                                    className="w-9 h-9 rounded-full cursor-pointer border"
                                    onClick={() => setProfileOpen(!profileOpen)}
                                />

                                {/* <i className="fas fa-user-circle fa-2x"></i> */}

                                {profileOpen && (
                                    <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 text-sm">

                                        <div className="px-4 py-2 border-b dark:border-gray-700">
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {user.role}
                                            </p>
                                        </div>

                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <i className="fa-regular fa-user mr-2"></i>
                                            Profile
                                        </Link>

                                        {user.role === "admin" && (
                                            <Link
                                                href="/admin"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <i className="fa-solid fa-shield-halved mr-2"></i>
                                                Admin Panel
                                            </Link>
                                        )}

                                        <button
                                            onClick={logoutHandler}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <i className="fa-solid fa-right-from-bracket mr-2"></i>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* MOBILE DROPDOWN */}
            {mobileOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-6 py-4 space-y-4 text-sm">

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block text-gray-600 dark:text-gray-300 hover:text-blue-600"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {user?.role === "admin" && (
                        <Link
                            href="/admin"
                            className="block text-gray-600 dark:text-gray-300 hover:text-blue-600"
                            onClick={() => setMobileOpen(false)}
                        >
                            Admin
                        </Link>
                    )}

                    {user ? (
                        <button
                            onClick={logoutHandler}
                            className="block text-left text-red-500"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                            onClick={() => setMobileOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
}
