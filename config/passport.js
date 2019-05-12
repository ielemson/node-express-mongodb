//import the local strategy
const LocalStrategy = require('passport-local').Strategy;


//import mongoose
const mongoose = require('mongoose');
//import bcrypt
const bcrypt = require('bcryptjs');

//Load User Model
const User = mongoose.model('users');

module.exports = passport => {
passport.use(new LocalStrategy({usernameField:'email'},(email,password,done)=>{
    User.findOne({
        email:email
    }).then(user=>{
        if(!user){
            return done(null , false,{message:'No user found'})
        }

        //Match Password
        bcrypt.compare(password , user.password,(err, isMatch)=>{
            if(err) throw err;

            if(isMatch){
                return done(null,user)
            }else{ return done(null , false,{message:'password incorrect'})}

        });
    });
}));




passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}