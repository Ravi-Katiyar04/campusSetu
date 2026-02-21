
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* -------- Animated Counter Component -------- */
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [target]);

  return <span>{count.toLocaleString()}</span>;
}

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 dark:text-gray-200 transition-colors duration-300">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Empowering Students <br />
          <span className="text-blue-600">Track. Improve. Achieve.</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          CampusSetu is a smart academic progress platform designed to help
          students of Kamla Nehru Instistitude of Technology, Sultanpur track performance, build streaks, compete on leaderboards,
          and stay placement-ready.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            href="/dashboard"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* ---------------- STATS SECTION ---------------- */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              <Counter target={1200} />+
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Active Students
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              <Counter target={35000} />+
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Problems Solved
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              <Counter target={85} />%
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Placement Success Rate
            </p>
          </div>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

        {/* -------- LEFT SIDE (Dashboard Preview Card) -------- */}
        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 border dark:border-gray-800">

          <Image src="/assets/dashboard-preview.png" alt="Dashboard Preview" width={600} height={400}></Image>

        </div>

        {/* -------- RIGHT SIDE (Text Content) -------- */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Dedicated{" "}
            <span className="bg-blue-600 text-white px-4 py-1 rounded-xl">
              Dashboards
            </span>{" "}
            & Analytics
          </h1>

          <h2 className="text-2xl font-semibold mt-6">
            Personalized Insights. Smarter Decisions.
          </h2>

          <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            CampusSetu offers dedicated dashboards and integrated analytics
            designed for students, mentors, departments, and placement
            officers. Gain real-time visibility into performance, engagement,
            and academic growth through intuitive data insights.
          </p>

          <Link
            href="/dashboard"
            className="inline-block mt-10 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Explore Analytics Platform
          </Link>
        </div>

      </section>


      {/* ================= Career Readiness Suite ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Career{" "}
            <span className="bg-blue-600 text-white px-4 py-1 rounded-lg">
              Readiness
            </span>{" "}
            Suite
          </h1>
        </div>

        {/* ================= MODULE 1: AI Mock Interview ================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl font-bold leading-snug">
              Build, Practice, and Succeed — All in One Place
            </h2>

            <p className="mt-6 text-gray-600 dark:text-gray-400">
              Prepare for real-world interviews with AI-powered simulations,
              lifelike conversations, and instant feedback.
            </p>

            <ul className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong>Natural Conversation:</strong> Human-like AI responses</li>
              <li><strong>Role-Specific Questions:</strong> Industry-based scenarios</li>
              <li><strong>Performance Analytics:</strong> Detailed feedback reports</li>
              <li><strong>Adaptive Learning:</strong> Smart follow-up questions</li>
            </ul>

            <Link
              href="/dashboard"
              className="inline-block mt-8 border border-gray-900 dark:border-gray-200 px-6 py-2 rounded-full font-medium hover:bg-blue-100 dark:hover:bg-gray-800 transition"
            >
              Perfect Your Interview Skills →
            </Link>
          </div>

          {/* RIGHT CARD */}
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900/20 rounded-3xl opacity-10"></div>
            <Image src="/assets/mock-interview.png" alt="AI Mock Interview" width={500} height={300} className="rounded-xl shadow-lg" />
          </div>
        </div>

        {/* ================= MODULE 2: AI Resume Builder ================= */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT CARD */}
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900/20 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-white dark:bg-gray-900 shadow-2xl rounded-3xl dark:border-gray-800">

              <Image src="/assets/resume-builder.png" alt="AI Resume Builder" width={600} height={300} className="rounded-xl shadow-lg" />


            </div>
            <h3 className="text-2xl font-bold mt-6">
              AI Resume Builder
            </h3>

            <ul className="mt-6 space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong>Keyword Optimization:</strong> ATS-friendly keyword placement</li>
              <li><strong>Achievement Quantification:</strong> Measurable accomplishments</li>
              <li><strong>Professional Formatting:</strong> Industry-standard structure</li>
              <li><strong>Content Tailoring:</strong> Job-specific customization</li>
            </ul>

            <Link
              href="/dashboard"
              className="inline-block mt-8 border border-gray-900 dark:border-gray-200 px-6 py-2 rounded-full font-medium hover:bg-blue-100 dark:hover:bg-gray-800 transition"
            >
              Create Your Perfect Resume →
            </Link>
          </div>

          {/* RIGHT CONTENT */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold">
              Professional Resumes That Get Results
            </h2>

            <p className="mt-6 text-gray-600 dark:text-gray-400">
              Create a professional ATS-optimized resume in minutes with our
              intelligent resume builder.
            </p>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Beat automated screening systems and impress recruiters with
              industry-standard formatting and strategic keyword placement.
            </p>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Transform your duties into measurable accomplishments with
              job-specific customization for every application.
            </p>
          </div>
        </div>

      </section>


      {/* ================= Mentorship & Placement Section ================= */}
      <section className="bg-gray-100 dark:bg-gray-900/40 py-28">
        <div className="max-w-7xl mx-auto px-6 space-y-32">

          {/* ================= Mentorship & Progress Tracking ================= */}
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-5xl font-extrabold leading-tight">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg">
                  Mentorship
                </span>{" "}
                & Progress Tracking
              </h2>

              <h3 className="text-2xl font-semibold mt-6">
                Connect. Guide. Grow.
              </h3>

              <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                CampusSetu empowers mentors and faculty with AI-powered dashboards
                to monitor every student’s academic performance, goals, and career
                growth in one unified ecosystem.
              </p>

              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                With real-time analytics and visual progress reports, mentors can
                track skill development, identify learning gaps, and provide
                personalized feedback — shaping the leaders of tomorrow.
              </p>
            </div>

            {/* RIGHT IMAGE CARD */}
            <div className="relative">
              <Image src="/assets/mentorship.png" alt="Mentorship" width={500} height={300} className="rounded-xl shadow-lg" />
            </div>
          </div>

          {/* ================= Advanced Placement Tracking ================= */}
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* LEFT IMAGE CARD */}
            <div className="relative order-2 md:order-1">
              <Image src="/assets/placement-tracking.png" alt="Placement Tracking" width={500} height={300} className="rounded-xl shadow-lg" />
            </div>

            {/* RIGHT CONTENT */}
            <div className="order-1 md:order-2">
              <h2 className="text-5xl font-extrabold leading-tight">
                Advanced{" "}
                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg">
                  Placement
                </span>{" "}
                Tracking
              </h2>

              <h3 className="text-2xl font-semibold mt-6">
                End-to-End Placement Management & Analytics
              </h3>

              <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                Transform your placement process with our intelligent PAT Dashboard.
                From automated eligibility verification to comprehensive analytics,
                track every aspect of student placements with precision.
              </p>

              {/* Feature Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mt-8 text-sm">

                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-800">
                  <p className="font-semibold">Smart Eligibility Engine</p>
                  <p className="text-gray-500">
                    Auto-match students based on performance and criteria.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-800">
                  <p className="font-semibold">Real-Time Analytics</p>
                  <p className="text-gray-500">
                    Visual dashboards with trend tracking.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-800">
                  <p className="font-semibold">Role-Based Access Control</p>
                  <p className="text-gray-500">
                    Secure access for faculty and placement officers.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-800">
                  <p className="font-semibold">Automated Workflows</p>
                  <p className="text-gray-500">
                    Streamline notifications and bulk updates.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-14">
          Why Choose CampusSetu?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow hover:shadow-lg transition">
            <i className="fa-solid fa-chart-line text-3xl text-blue-600"></i>
            <h3 className="text-xl font-semibold mt-4">Progress Tracking</h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Monitor academic growth with real-time analytics and detailed
              performance insights.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow hover:shadow-lg transition">
            <i className="fa-solid fa-trophy text-3xl text-blue-600"></i>
            <h3 className="text-xl font-semibold mt-4">Leaderboard System</h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Compete with peers and stay motivated through rankings and XP
              milestones.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow hover:shadow-lg transition">
            <i className="fa-solid fa-building text-3xl text-blue-600"></i>
            <h3 className="text-xl font-semibold mt-4">Placement Ready</h3>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Track company preparation, internships, and placement readiness
              all in one dashboard.
            </p>
          </div>

        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <section className="bg-blue-600 py-20 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to Transform Your Academic Journey?
        </h2>

        <p className="mt-4 text-blue-100">
          Join CampusSetu today and take control of your success.
        </p>

        <Link
          href="/register"
          className="mt-8 inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Create Your Account
        </Link>
      </section>

    </div>
  );
}


