const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: "string", required: "true" }, 

});



module.exports(mongoose.Model("User", userSchema))