const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const replySchema = new Schema({
  commentId:{type:String, required:true},  
  reply: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  postOrder: { type: String, required: true, default: Date.now }
});

module.exports = mongoose.model("Reply", replySchema);
