const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userFeedSchema = new Schema({
  post: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("UserFeed", userFeedSchema);
