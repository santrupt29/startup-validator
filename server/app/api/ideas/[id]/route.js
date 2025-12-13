import "dotenv/config";
import connectDB from "@/lib/db";
import Idea from "@/models/idea.model.js";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export async function OPTIONS() {
  return new Response(null, { headers });
}
export async function GET(req, context) {
  await connectDB();

  const { id } = await context.params;

  const idea = await Idea.findById(id);

  if (!idea) {
    return Response.json(
      { error: "Idea not found" },
      { status: 404 }
    );
  }

//   return Response.json(idea);
    return new Response(JSON.stringify(idea), {headers})

}

export async function DELETE(req, context) {
  await connectDB();

  const { id } = await context.params;

  await Idea.findByIdAndDelete(id);

  return Response.json({ success: true });
}
