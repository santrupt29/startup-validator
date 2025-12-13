const BASE_URL = "http://localhost:3001/api";

export async function createIdea(data) {
  const res = await fetch(`${BASE_URL}/ideas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to create idea");
  }

  return res.json();
}

export async function getIdeas() {
  const res = await fetch(`${BASE_URL}/ideas`);
  return res.json();
}

export async function getIdeaById(id) {
  const res = await fetch(`${BASE_URL}/ideas/${id}`);
  return res.json();
}
