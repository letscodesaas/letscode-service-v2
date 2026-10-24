import mongoose from "mongoose";

const subscribersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Subscriber =
  mongoose.models.subscribers || mongoose.model("subscriber", subscribersSchema);
