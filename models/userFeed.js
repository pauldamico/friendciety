const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const oldDate = new Date('July 20, 69 20:17:40 GMT+00:00');



const userFeedSchema = new Schema({
  post: { type: String, required: true },
  postOrder:{type:String, required:true, default:oldDate.getTime()}, 
  username: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  replies:[{type:Schema.Types.ObjectId, ref: "userFeed"}],
  likes:[{type:String}],
  dislikes:[{type:String}]
});

module.exports = mongoose.model("UserFeed", userFeedSchema);
