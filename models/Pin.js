const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    type: String,
    latitude: Number,
    longitude: Number,
    // Populate author from user data by using the user ID
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        // Populate author from user data by using the user ID
        author: { type: mongoose.Schema.ObjectId, ref: "User" }
      }
    ],
    votes: [
      {
        type: Schema.Types.ObjectId,
        default: []
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
