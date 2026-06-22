const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  timeOfDay: { type: String, default: "Morning" },
  estimatedCost: { type: Number, default: 0 },
});

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: String, required: true },
    days: { type: Number, required: true },
    budgetType: { type: String, enum: ["Low", "Medium", "High"], required: true },
    interests: [{ type: String }],
    itinerary: [
      {
        dayNumber: Number,
        activities: [activitySchema],
      },
    ],
    estimatedBudget: {
      transport: { type: Number, default: 0 },
      accommodation: { type: Number, default: 0 },
      food: { type: Number, default: 0 },
      activities: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    hotels: [
      {
        name: String,
        tier: String,
        pricePerNight: Number,
        rating: String,
      },
    ],
    packingList: [
      {
        item: String,
        category: String,
        isPacked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
