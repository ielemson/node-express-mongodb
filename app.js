//import express
const express = require('express');

//import path for file linking
const path = require('path');

//import express handlebars
const exphbs = require('express-handlebars');

//imoport method override:::::::::::::::
const methodOverride = require('method-override');

//import passport instance
const passport = require('passport')

//import flash- session
const flash = require('connect-flash');

//import express-session
const session = require('express-session');

//initialize express
const app = express();

//import route files for ideas
const ideas = require('./routes/ideas');
//import route files for ideas


//import route files for users
const users = require('./routes/users');
//import route files users


// LOAD PASSPORT CONFIG
require('./config/passport')(passport);

//use the public folder , Static folder
app.use(express.static(path.join(__dirname,'public')));

//require body parser
const bodyParser = require('body-parser');

//REQUIRE MONGOOSE 
const mongoose = require('mongoose');

//Connect to mongoose :This also creates the database, and inside the DB we have two tables: users and ideas
mongoose.connect('mongodb://localhost/video_idea_DB', {
useNewUrlParser: true
})
//using the promise to log information once db is connected successfully
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));



//HANDLE BAR MIDDLEWARE
app.engine('handlebars', exphbs({
defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Method Override Middleware :::::::::::::
app.use(methodOverride('_method'));


//Express Session Middleware:::::::::::
app.use(session({
secret: 'secret',
resave: true,
saveUninitialized: true
}));
//Express Session Middleware::::::::::::

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//CONNECT FLASH
app.use(flash());

app.use((req, res, next) =>{
res.locals.success_msg = req.flash('success_msg');
res.locals.error_msg = req.flash('error_msg');
res.locals.error = req.flash('error');
res.locals.user = req.user || null;
next();
});


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
app.get('/', (req, res) => {
//req = request 
//res = response
//req comes before res
const title = "Welcome";
res.render('index', {
title: title
});
});

//about page ::::::::::::::::::::::::::::::::::::::::
app.get('/about', (req, res) => {
res.render('about');
});
//about page  ::::::::::::::::::::::::::::::::::::::::


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

//use the imported routes
app.use('/ideas' , ideas);
//use the imported routes

//use the imported routes
app.use('/users' , users);
//use the imported routes
const port = 5000;

app.listen(port, () => {
console.log(`server started on port ${port}`);
});