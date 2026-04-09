"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CompanyDetailsPage() {
  const { company_id } = useParams();
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    const fetchCompany = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/${company_id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setCompany(data);
    };

    if (company_id) fetchCompany();
  }, [company_id]);

  if (!company) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
        <p className="text-green-600 font-semibold text-lg mb-4">
          {company.packageOffered} LPA
        </p>

        {/* META */}
        <div className="text-gray-600 mb-4 space-y-1">
          <p>🎯 Role: {company.role}</p>
          <p>📅 Year: {company.year}</p>
          <p>👨‍🎓 Students Placed: {company.studentsPlaced}</p>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <h2 className="font-semibold">Description</h2>
          <p className="text-gray-700">{company.description}</p>
        </div>

        {/* ELIGIBILITY */}
        <div className="mb-4">
          <h2 className="font-semibold">Eligibility</h2>
          <p className="text-gray-700">{company.eligibility}</p>
        </div>

        {/* QUESTIONS */}
        <div className="mb-4">
          <h2 className="font-semibold">Questions Asked</h2>
          <ul className="list-disc ml-5">
            {company.questionsAsked?.map((q: string, i: number) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>

        {/* EXPERIENCE */}
        <div>
          <h2 className="font-semibold">Experience</h2>
          <p className="text-gray-700">{company.experience}</p>
        </div>
      </div>
    </div>
  );
}