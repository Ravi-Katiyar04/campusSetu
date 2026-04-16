"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ModulesPage() {
  const { id } = useParams();
  const [modules, setModules] = useState<any[]>([]);

  const fetchModules = async () => {
    console.log(id)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/modules/${id}`);
    const data = await res.json();
    console.log(data);
    
    setModules(data);
  };

  const markComplete = async (moduleId: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/progress/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ moduleId }),
      credentials: "include",
    });

    fetchModules();
  };

  useEffect(() => {
    fetchModules();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">📚 Modules</h1>

        {modules.map((m) => (
          <div key={m.id} className="bg-white p-5 rounded-xl shadow mb-4">

            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">{m.title}</h2>

              <button
                onClick={() => markComplete(m.id)}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:opacity-90"
              >
                Complete
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              {m.content}
            </p>

            {/* TASKS */}
            <div className="space-y-1">
              {m.tasks.map((t: any) => (
                <a
                  key={t.id}
                  href={t.link}
                  target="_blank"
                  className="text-blue-600 text-sm block hover:underline"
                >
                  🔗 {t.title}
                </a>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}