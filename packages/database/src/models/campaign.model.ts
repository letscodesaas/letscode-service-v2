import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

export const Campaign =
  mongoose.models.campaigns || mongoose.model("campaign", campaignSchema);
