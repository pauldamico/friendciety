const mongoose = require("mongoose");
const Schema = mongoose.Schema;






const messagesSchema = new Schema({
  receivedMessages: [
    {
      from: { type: String, required: true },
      to: { type: String, required: true },
      message: { type: String, required: true },
      image: { type: String},
      chatOrder: { type: String, required: true, default: Date.now },
      date: { type: String, required: true,},
    },
  ],
  sentMessages: [
    {
      from: { type: String, required: true },
      to: { type: String, required: true },
      message: { type: String, required: true },
      image: { type: String},
      chatOrder: { type: String, required: true, default: Date.now },
      date: { type: String, required: true, },
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
});




module.exports = mongoose.model("Messages", messagesSchema);
