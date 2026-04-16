"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ModulesPage() {
  const { id } = useParams();
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/modules/${id}`)
      .then(res => res.json())
      .then(setModules);
  }, [id]);

  return (
    <div className="p-6">
      <h1>Modules</h1>

      {modules.map((m: any) => (
        <div key={m.id} className="p-4 border mb-3">
          <h2>{m.title}</h2>
          <button>Mark Complete</button>
        </div>
      ))}
    </div>
  );
}