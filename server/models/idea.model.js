import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    aiReport: Object
  },
  { timestamps: true }
);

export default mongoose.models.Idea ||
  mongoose.model("Idea", IdeaSchema);
