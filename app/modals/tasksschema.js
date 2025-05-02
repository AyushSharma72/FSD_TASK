const mongoose = require("mongoose");

const tasksschema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], 
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

const tasksmodal =
  mongoose.models.tasks || mongoose.model("tasks", tasksschema);
export default tasksmodal;
