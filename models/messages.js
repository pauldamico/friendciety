const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messagesSchema = new Schema({
  receivedMessages: [
    {
      from: { type: String, required: true },
      message: { type: String, required: true },
      image: { type: String},
      dateReceived: { type: String, required: true, default: Date.now },
    },
  ],
  sentMessages: [
    {
      to: { type: String, required: true },
      message: { type: String, required: true },
      image: { type: String},
      dateSent: { type: String, required: true, default: Date.now },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model("Messages", messagesSchema);
