const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, unique:true, required: true}, 
  password: {type:String, required:true},
  family:[
    {type:String, unique:true}    
  ],
  friendRequest:[
    {type:String, unique:true}
  ],
  pendingRequest:[
    {type:String, unique:true}
  ]

});



module.exports = mongoose.model("User", userSchema)

