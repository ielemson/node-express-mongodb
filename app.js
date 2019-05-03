//import express
const express = require('express');

//import express handlebars
const exphbs  = require('express-handlebars');

//initialize express
const app = express();

//use the public folder
app.use(express.static('public'));

//require body parser
const  bodyParser = require('body-parser');

//REQUIRE MONGOOSE 
const mongoose = require('mongoose');

//Connect to mongoose
mongoose.connect('mongodb://localhost/vidieaDB',{
useNewUrlParser: true
})
//using the promise to log information once db is connected successfully
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err));

//Load Idea Model
require('./Models/Idea');
const Idea = mongoose.model('ideas');

//HANDLE BAR MIDDLEWARE
app.engine('handlebars', exphbs({
defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//how to use middleware
// app.use((req ,res , next)=>{
//     console.log(Date.now());
//     next();
// });

//INDEX ROUTE
//the app.get is a function that is used to create url for the application. 
//we also have app.post for writing data into the db.
//we do have app.put to update data in the db.
//and also app.delete to delete that from the db.


//the app.get grabs the url and serve it to the localhost to be displayed in our application
app.get('/' , (req , res)=>{
//req = request 
//res = response
//req comes before res
const title = "Welcome";
res.render('index' , {
title:title
});
});

//ideas request form
app.get('/about' , (req , res)=>{
res.render('about');
});


app.get('/ideas/add' , (req , res)=>{
res.render('ideas/add');
});


app.get('/ideas' , (req , res)=>{
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas=>{
        res.render('ideas/index',{
            ideas:ideas
        });
    })
  
    });
    

app.post('/ideas' , (req , res)=>{
let errors = [];

if(!req.body.title){
errors.push({text:'please add a title'});
}

if(!req.body.details){
errors.push({text:'please enter some details'});
}

if(errors.length>0){
res.render('ideas/add' , {
errors:errors,
title:req.body.title,
details:req.body.details
});
}else{
    // res.send('Passed');
    const newUser = {
        title:req.body.title,
        details:req.body.details
    }
    new Idea(newUser)
    .save()
    .then(idea=>{
        res.redirect('/ideas');
    })
}
});

//nodemon is used to continuouesly load the serve while we make changes to the serve.
//the nodemon can be installed either locally or globally.
//globally: npm install g nodemon
//locally: npm install nodemon

//when the nodemon is installed globally, it is not put into our package or node_module folder, we will need to run a command to know where it is installed.
//the cmd is npm root -g

//after installation , we can now start our server by typing *nodemon*  intead of node app
/*
to be able to carry out post request i.e put , delete, we need a third party dependency known as body parser. this can be installed through npm
npm install --save body-parser

*/
const port = 5000;

app.listen(port, ()=>{
console.log(`server started on port ${port}`);
});