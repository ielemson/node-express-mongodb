

/* To use the the express router , we need to import view dependencies from express js*/
//:::: first we need to bring in express js into this dir.
const express = require('express');
//:::: first we need to bring in express js into this dir.

//:::: secondly we need to bring in the router from expess js

//:::: import the passport for login auth
const passport =require('passport');
//:::: import the passport for login auth::::::::::
const router = express.Router();
//:::: secondly we need to bring in the router from expess js

//::::Import mogoose for use
const mongoose = require('mongoose');
//::::Import mogoose for use

//Load Idea Model
require('../Models/User');
const User = mongoose.model('users');

//bring in bycrypt:::::
const bycrypt = require('bcryptjs');



///LOGIN ROUTE
router.get('/login', (req, res) => {
    res.render('users/login')
});
//LOGIN ROUTE

//REGISTER ROUTE
router.get('/register', (req, res) => {
    res.render('users/register')
});
//REGISTER ROUTE 

//::USER LOGIN FORM:::::::::::::::::::::::::::::
router.post('/login',(req, res,next)=>{
passport.authenticate('local',{
    successRedirect:'/ideas',
    failureRedirect:'/users/login',
    failureFlash:true
})(req,res,next);
});
//register form post:::::::::::::::::::
// req - > reqeust
// req.body -> request form body fields
router.post('/register', (req, res) => {
    // console.log(req.body)
    // res.send('register')

    let errors = [];
    if (req.body.password != req.body.cpassword) {
        errors.push({ text: 'password do not match' })
    }

    if (req.body.password.lenght < 4) {
        errors.push({ text: 'password must be at least 4 characters' })
    }

    if (!req.body.first_name) {
        errors.push({ text: 'Please enter your first name' })
    }

    if (!req.body.last_name) {
        errors.push({ text: 'please enter your last name' })
    }

    if (!req.body.email) {
        errors.push({ text: 'please enter your email' })
    }

    if (!req.body.password) {
        errors.push({ text: 'please enter your password' })
    }

    if (!req.body.cpassword) {
        errors.push({ text: 'please confirm your passoword' })
    }


    if (!req.body.phone) {
        errors.push({ text: 'please enter phone number' })
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            cpassword: req.body.cpassword,
            phone: req.body.phone

        });
    } else {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    req.flash('error_msg', 'Email already exist');
                    res.redirect('/users/register')
                } else {
                    const newUser = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        password: req.body.password,
                        cpassword: req.body.cpassword,
                        phone: req.body.phone
                    });
                    // res.send('passed');
                    bycrypt.genSalt(10, (err, salt) => {
                        bycrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You have been registered');
                                    res.redirect('/users/login')
                                        .catch(err => {
                                            console.log(err)
                                        });
                                });
                        });
                    });
                }
            });


    }
});
//register form post:::::::::::::::::::



//Logout Out Form

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out successfully');
    res.redirect('/users/login');
})
module.exports = router;