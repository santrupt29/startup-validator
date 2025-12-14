"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getIdeas } from "@/lib/api";

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    getIdeas().then(setIdeas);
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {ideas.length === 0 && <p>No ideas yet.</p>}

      <div className="space-y-4">
        {ideas.map((idea) => (
          <div
            key={idea._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{idea.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(idea.createdAt).toLocaleString()}
              </p>
            </div>

            <Link
              href={`/ideas/${idea._id}`}
              className="text-blue-600"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
