"use client";

import { useState } from "react";
import { createIdea } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const idea = await createIdea({ title, description });
      router.push(`/ideas/${idea._id}`);
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 border rounded"
      >
        <h1 className="text-2xl font-bold text-center">
          AI Startup Idea Validator
        </h1>

        <input
          className="w-full p-2 border rounded"
          placeholder="Startup Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Describe your idea..."
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Analyzing..." : "Validate Idea"}
        </button>
      </form>
    </main>
  );
}
