// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { getIdeaById } from "@/lib/api";

// export default function IdeaDetail() {
//   const { id } = useParams();
//   const [idea, setIdea] = useState(null);

//   useEffect(() => {
//     if (!id) return;
//     getIdeaById(id).then(setIdea);
//   }, [id]);

//   if (!idea) return <p className="p-6">Loading...</p>;

//   const r = idea.aiReport;

//   return (
//     <main className="p-6 max-w-3xl mx-auto space-y-4">
//       <h1 className="text-3xl font-bold">{idea.title}</h1>

//       <section>
//         <h2 className="font-semibold">Problem</h2>
//         <p>{r.problem}</p>
//       </section>

//       <section>
//         <h2 className="font-semibold">Customer</h2>
//         <p>{r.customer}</p>
//       </section>

//       <section>
//         <h2 className="font-semibold">Market</h2>
//         <p>{r.market}</p>
//       </section>

//       <section>
//         <h2 className="font-semibold">Competitors</h2>
//         <ul className="list-disc ml-5">
//           {r.competitor.map((c, i) => (
//             <li key={i}>
//               <strong>{c.name}:</strong> {c.differentiation}
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h2 className="font-semibold">Tech Stack</h2>
//         <div className="flex flex-wrap gap-2">
//           {r.tech_stack.map((t, i) => (
//             <span
//               key={i}
//               className="px-2 py-1 bg-gray-800 rounded text-sm"
//             >
//               {t}
//             </span>
//           ))}
//         </div>
//       </section>

//       <section>
//         <h2 className="font-semibold">Risk Level</h2>
//         <p>{r.risk_level}</p>
//       </section>

//       <section>
//         <h2 className="font-semibold">Profitability Score</h2>
//         <p>{r.profitability_score}/100</p>
//       </section>

//       <section>
//         <h2 className="font-semibold">Justification</h2>
//         <p>{r.justification}</p>
//       </section>
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getIdeaById } from "@/lib/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function IdeaDetail() {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getIdeaById(id)
      .then(setIdea)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="p-6 max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-10 w-2/3" />
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </main>
    );
  }

  if (!idea) {
    return <p className="p-6 text-center">Idea not found.</p>;
  }

  const r = idea.aiReport;

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">{idea.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Generated on {new Date(idea.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Problem */}
      <Card>
        <CardHeader>
          <CardTitle>Problem</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{r.problem}</p>
        </CardContent>
      </Card>

      {/* Customer */}
      <Card>
        <CardHeader>
          <CardTitle>Target Customer</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{r.customer}</p>
        </CardContent>
      </Card>

      {/* Market */}
      <Card>
        <CardHeader>
          <CardTitle>Market Opportunity</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{r.market}</p>
        </CardContent>
      </Card>

      {/* Competitors */}
      <Card>
        <CardHeader>
          <CardTitle>Competitors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {r.competitor.map((c, i) => (
            <div key={i} className="text-sm">
              <span className="font-medium">{c.name}</span>
              <span className="text-muted-foreground">
                {" "}— {c.differentiation}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Tech Stack</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {r.tech_stack.map((t, i) => (
            <Badge key={i} variant="secondary">
              {t}
            </Badge>
          ))}
        </CardContent>
      </Card>

      {/* Risk & Profitability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{r.risk_level}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profitability Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">
              {r.profitability_score} / 100
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Justification */}
      <Card>
        <CardHeader>
          <CardTitle>AI Justification</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{r.justification}</p>
        </CardContent>
      </Card>
    </main>
  );
}

