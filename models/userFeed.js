const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userFeedSchema = new Schema({
  post: {    type: "string",    required: true,  },
});


module.exports(mongoose.Model("UserFeed", userFeedSchema))