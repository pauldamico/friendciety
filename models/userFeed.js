const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userFeedSchema = new Schema({
  post: { type: String, required: true },
  postOrder: { type: String, required: true, default: Date.now },
  username: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  replies: [
    {     
      reply: { type: String, required: true },
      userId:{ type: Schema.Types.ObjectId, ref: "User", required: true },
      username:{type:String, required:true},
      postOrder: { type: String, required: true, default: Date.now },
    },
  ],
  likes: [{ type: String }],
  dislikes: [{ type: String }],
});

module.exports = mongoose.model("UserFeed", userFeedSchema);
