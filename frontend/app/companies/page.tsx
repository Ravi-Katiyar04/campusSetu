"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const [filters, setFilters] = useState({
    year: "",
    role: "",
    package: "",
    search: "",
  });

  const [page, setPage] = useState(1);

  // FETCH FROM BACKEND
  const fetchCompanies = async () => {
    setLoading(true);

    try {
      const query = new URLSearchParams();

      if (filters.year) query.append("year", filters.year);
      if (filters.role) query.append("role", filters.role);
      if (filters.package) query.append("package", filters.package);
      if (filters.search) query.append("search", filters.search);

      query.append("page", String(page));
      query.append("limit", "10");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies?${query.toString()}`,{
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      setCompanies(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">Placement Companies</h1>
        <p className="text-gray-500">
          Explore companies, packages, and interview experiences
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4">

        {/* SEARCH */}
        <input
          placeholder="Search company (Google, Amazon...)"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
          className="border p-2 rounded w-full md:w-60"
        />

        {/* YEAR */}
        <select
          value={filters.year}
          onChange={(e) =>
            setFilters({ ...filters, year: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>

        {/* ROLE */}
        <input
          placeholder="Role (SDE, Intern...)"
          value={filters.role}
          onChange={(e) =>
            setFilters({ ...filters, role: e.target.value })
          }
          className="border p-2 rounded"
        />

        {/* PACKAGE */}
        <select
          value={filters.package}
          onChange={(e) =>
            setFilters({ ...filters, package: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="">All Packages</option>
          <option value="5+">5+ LPA</option>
          <option value="10+">10+ LPA</option>
          <option value="15+">15+ LPA</option>
          <option value="20+">20+ LPA</option>
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-500">Loading companies...</div>
      )}

      {/* COMPANY LIST */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {companies.map((company: any) => (
          <div
            key={company.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{company.name}</h2>
              <span className="text-green-600 font-bold">
                {company.packageOffered} LPA
              </span>
            </div>

            {/* META */}
            <div className="text-sm text-gray-600 mb-3 space-y-1">
              <p>🎯 Role: {company.role}</p>
              <p>📅 Year: {company.year}</p>
              <p>👨‍🎓 Placed: {company.studentsPlaced}</p>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-700 text-sm line-clamp-2">
              {company.description}
            </p>

            {/* QUICK ACTION */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Eligibility: {company.eligibility}
              </span>

              <button 
              onClick={() => router.push(`/companies/${company.id}`)}
              className="text-blue-600 cursor-pointer text-sm hover:underline">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {!loading && companies.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No companies found.
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2">Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}