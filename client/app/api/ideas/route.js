import connectDB from "@/lib/db";
import Idea from "@/models/idea.model.js";
import "dotenv/config";
import openai from "@/lib/openai";
import { generatePrompt } from "@/lib/prompt";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function extractJSON(text) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

export async function OPTIONS() {
  return new Response(null, { headers });
}
export async function POST(req) {
  try {
    await connectDB();

    const { title, description } = await req.json();

    if (!title || !description) {
      return Response.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const prompt = generatePrompt(title, description);

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    // const aiReport = JSON.parse(
    //   aiResponse.choices[0].message.content
    // );
    const aiReport = extractJSON(
  aiResponse.choices[0].message.content
);


    const idea = await Idea.create({
      title,
      description,
      aiReport
    });

    // return Response.json(idea);
  return new Response(JSON.stringify(idea), {headers});


  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "AI analysis failed" },
      { status: 500 }
    );
  }
}


export async function GET() {
  await connectDB();
  const ideas = await Idea.find().sort({ createdAt: -1 });

  // return Response.json(ideas);
  return new Response(JSON.stringify(ideas), {headers});
}


