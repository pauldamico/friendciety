const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const filesSchema = new Schema({
  profileImage: { type: String },
  images: [{path:{type: String}, postOrder:{type: String, required: true, default: Date.now }}],
  videos: [{path:{type: String}, postOrder:{type: String, required: true, default: Date.now }}],
  username:{type:String},
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Files", filesSchema);
