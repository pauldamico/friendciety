const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const friendsSchema = new Schema({
  username:{type:String},
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  friends: [{user:{ type: String}, id:{type:String}, _id: false }],
  friendRequest: [],
  pendingRequest: [],
});

module.exports = mongoose.model("Friends", friendsSchema);
