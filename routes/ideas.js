

/* To use the the express router , we need to import view dependencies from express js*/
//:::: first we need to bring in express js into this dir.
const express = require('express'); 
//:::: first we need to bring in express js into this dir.

//:::: secondly we need to bring in the router from expess js
const router = express.Router();
//:::: secondly we need to bring in the router from expess js


//import auth middleware
const {ensureAthenticated} = require('../helpers/auth');
//Load Idea Model

//::::Import mogoose for use
const mongoose = require('mongoose');
//::::Import mogoose for use


require('../Models/Idea');
const Idea = mongoose.model('ideas');


//ideas request  page  ::::::::::::::::::::::::::::::::::::::::
router.get('/add', ensureAthenticated , (req, res) => {
res.render('ideas/add');
});
//ideas request page ::::::::::::::::::::::::::::::::::::::::



//ideas list view page::::::::::::::::::::::::::::::::::::::::
router.get('/', ensureAthenticated ,(req, res) => {
Idea.find({user:req.user.id})
.sort({ date: 'desc' })
.then(ideas => {
res.render('ideas/index', {
ideas: ideas
});
})

});
//ideas list view page::::::::::::::::::::::::::::::::::::::::



//idea edit page::::::::::::::::::::::::::::::::::
router.get('/edit/:id', ensureAthenticated ,(req, res) => {
Idea.findOne({
_id: req.params.id
})
.then(idea => {
    if(idea.user!= req.user.id){
        req.flash('error_msg','Your Unauthorized');
        res.redirect('/ideas')
    }else{
        res.render('ideas/edit', {
            idea: idea
            });
    }

})

});
//ideas edit page::::::::::::::::::::::::::::::::::::::::



//ideas post submit to mongo DB::::::::::::::::::::::::::::::::::::::::
router.post('/add', ensureAthenticated ,(req, res) => {
let errors = [];

if (!req.body.title) {
errors.push({ text: 'please add a title' });
}

if (!req.body.details) {
errors.push({ text: 'please enter some details' });
}

if (errors.length > 0) {
res.render('ideas/add', {
errors: errors,
title: req.body.title,
details: req.body.details
});
} else {
// res.send('Passed');
const newUser = {
title: req.body.title,
details: req.body.details,
user:req.user.id
}
new Idea(newUser)
.save()
.then(idea => {
req.flash('success_msg' , 'Video Idea  Added')
res.redirect('/ideas');
})
}
});
//ideas post submit to mongo DB::::::::::::::::::::::::::::::::::::::::


//idea update route/put:::::::::::::::::::::::::::::::
/* to make the put function possible, we need help from a module called expressjs/method-override.. this can be installed using npm*/
router.put('/:id', ensureAthenticated ,(req, res) => {
Idea.findOne({
_id: req.params.id
})
.then(idea => {
idea.title = req.body.title;
idea.details = req.body.details;

idea.save()
.then(idea => {
req.flash('success_msg' , 'Video Idea Updated')
res.redirect('/ideas')
})
});

});
//idea update route/put:::::::::::::::::::::::::::::::


//idea delete route /method::::::::::::::::::::::::::::
router.delete('/:id', ensureAthenticated, (req, res) => {
Idea.deleteOne({ _id: req.params.id })
.then(() => {
req.flash('success_msg' , 'Video Idea Removed')
res.redirect('/ideas')
})
});

//:::: We need to export the folder to make it accessible
module.exports = router;
//:::: We need to export the folder to make it accessible
