"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getIdeaById } from "@/lib/api";

export default function IdeaDetail() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);

  useEffect(() => {
    if (!id) return;
    getIdeaById(id).then(setIdea);
  }, [id]);

  if (!idea) return <p className="p-6">Loading...</p>;

  const r = idea.aiReport;

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">{idea.title}</h1>

      <section>
        <h2 className="font-semibold">Problem</h2>
        <p>{r.problem}</p>
      </section>

      <section>
        <h2 className="font-semibold">Customer</h2>
        <p>{r.customer}</p>
      </section>

      <section>
        <h2 className="font-semibold">Market</h2>
        <p>{r.market}</p>
      </section>

      <section>
        <h2 className="font-semibold">Competitors</h2>
        <ul className="list-disc ml-5">
          {r.competitor.map((c, i) => (
            <li key={i}>
              <strong>{c.name}:</strong> {c.differentiation}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {r.tech_stack.map((t, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-800 rounded text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold">Risk Level</h2>
        <p>{r.risk_level}</p>
      </section>

      <section>
        <h2 className="font-semibold">Profitability Score</h2>
        <p>{r.profitability_score}/100</p>
      </section>

      <section>
        <h2 className="font-semibold">Justification</h2>
        <p>{r.justification}</p>
      </section>
    </main>
  );
}

