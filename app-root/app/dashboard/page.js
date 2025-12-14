// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { getIdeas } from "@/lib/api";

// export default function Dashboard() {
//   const [ideas, setIdeas] = useState([]);

//   useEffect(() => {
//     getIdeas().then(setIdeas);
//   }, []);

//   return (
//     <main className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

//       {ideas.length === 0 && <p>No ideas yet.</p>}

//       <div className="space-y-4">
//         {ideas.map((idea) => (
//           <div
//             key={idea._id}
//             className="border p-4 rounded flex justify-between items-center"
//           >
//             <div>
//               <h2 className="font-semibold">{idea.title}</h2>
//               <p className="text-sm text-gray-500">
//                 {new Date(idea.createdAt).toLocaleString()}
//               </p>
//             </div>

//             <Link
//               href={`/ideas/${idea._id}`}
//               className="text-blue-600"
//             >
//               View
//             </Link>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getIdeas } from "@/lib/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getIdeas()
      .then(setIdeas)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <Link href="/">
            <Button>Create New Idea</Button>
          </Link>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && ideas.length === 0 && (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No ideas yet. Create your first one 🚀
            </CardContent>
          </Card>
        )}

        {/* Ideas list */}
        <div className="space-y-4">
          {ideas.map((idea) => (
            <Card key={idea._id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">
                  {idea.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {new Date(idea.createdAt).toLocaleString()}
                </p>

                <Link href={`/ideas/${idea._id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
