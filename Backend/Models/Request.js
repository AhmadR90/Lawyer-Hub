const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
    },
    lawyerId: {
      type: String,
      ref: "Lawyer",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    message: {
      type: String,
      default: "Default message",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);
