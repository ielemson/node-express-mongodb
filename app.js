//import express
const express = require('express');

//import express handlebars
const exphbs  = require('express-handlebars');
//initialize express
const app = express();


//HANDLE BAR MIDDLEWARE
app.engine('handlebars', exphbs({
    defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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


app.get('/about' , (req , res)=>{
res.render('about');
});


//nodemon is used to continuouesly load the serve while we make changes to the serve.
//the nodemon can be installed either locally or globally.
//globally: npm install g nodemon
//locally: npm install nodemon

//when the nodemon is installed globally, it is not put into our package or node_module folder, we will need to run a command to know where it is installed.
//the cmd is npm root -g

//after installation , we can now start our server by typing *nodemon*  intead of node app

const port = 5000;

app.listen(port, ()=>{
console.log(`server started on port ${port}`);
});