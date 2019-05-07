const mongoose = require('mongoose');
const schema = mongoose.Schema;

//CREATE SCHEMA
const UserSchema = new schema({
  first_name:{
    type:String,
    required:true
  },
  last_name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},

phone:{
    type:String,
    required:true
},

password:{
    type:String,
    required:true
},


  date:{
      type:Date,
      default:Date.now
  }
});

mongoose.model('users' ,UserSchema);