const mongoose = require("mongoose");
const Reply = require("./reply.js");

const Schema = mongoose.Schema;
const userFeedSchema = new Schema({
  post: { type: String, required: true },
  postOrder: { type: String, required: true, default: Date.now },
  username: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [
    {
      comment: { type: String, required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      username: { type: String, required: true },
      postOrder: { type: String, required: true, default: Date.now },
      replies: [Reply.schema] // nested replies using replySchema
    },
  ],
  likes: [{ type: String }],
  dislikes: [{ type: String }],
});

module.exports = mongoose.model("UserFeed", userFeedSchema);


// reply: { type: String, required: true },
// userId:{ type: Schema.Types.ObjectId, ref: "User", required: true },
// username:{type:String, required:true},
// postOrder: { type: String, required: true, default: Date.now },