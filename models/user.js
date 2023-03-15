const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const userSchema = new Schema({
  username: { type: String, unique:true, required: true}, 
  password: {type:String, required:true},
  friends:[ {user:String, id:String, _id:false} ],
 
  friendRequest:[   
  ],
  pendingRequest:[    
  ]

});

userSchema.pre("save", function (next){                                   //encrypts password on signup
if(!this.isModified("password")) 
{return next()}
bcrypt.hash(this.password, 10, (err, hash)=>{
  if(err){
    next(err)
  }
  this.password = hash
  next()
})
})

userSchema.methods.checkPassword = function (passwordAttempt, callback){   //checks password with hashed password on login
  bcrypt.compare(passwordAttempt, this.password,(err, isMatch)=>{
    if(err){
    return callback(err)}
    return callback(null, isMatch)
  })
}

userSchema.methods.withoutPassword = function(){                           // removes password from sending in response
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model("User", userSchema)

