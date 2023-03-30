const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const postSchema = new Schema({
  post: { type: String, required: true },
  //image info
  image: {},
  video:{},
  postOrder: { type: String, required: true, default: Date.now },
  username: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: String }],
  dislikes: [{ type: String }],
});

module.exports = mongoose.model("Post", postSchema);


// reply: { type: String, required: true },
// userId:{ type: Schema.Types.ObjectId, ref: "User", required: true },
// username:{type:String, required:true},
// postOrder: { type: String, required: true, default: Date.now },
