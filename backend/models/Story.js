const mongoose = require("mongoose");

// Define the Story Schema
const storySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for the user who created the story
    required: true,
  },
  storyList: [
    {
      caption: {
        type: String,
        required: true,
      },
      image: {
        public_id: String,
        url: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 24 * 60 * 60 * 1000), // Set a default expiration (e.g., 24 hours)
      },
    },
  ],
});

// Create the Story model
const Story = mongoose.model("Story", storySchema);

module.exports = Story;
