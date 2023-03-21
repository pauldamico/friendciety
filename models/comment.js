const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  postId: { type: String, required: true },
  comment: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  postOrder: { type: String, required: true, default: Date.now },
  replies: [
    {
      commentId: {type: Schema.Types.ObjectId, ref: "Comment", required: true, },
      reply: { type: String, required: true },
    },
  ], 
});

module.exports = mongoose.model("Comment", commentSchema);
