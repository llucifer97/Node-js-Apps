const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const passport = require('passport');
//bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const question = require("./routes/api/question");


const app = express();

//Middle for body parser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to coonect to database

mongoose
    .connect(db)
    .then(() => console.log("MongoDB is connected successfully!"))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
    
//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);


//just for testing
app.get('/',(req,res) => {
    res.send("hey there big stack!")
});

//usable routes
app.use('/api/profile',profile)

app.use('/api/auth',auth)
app.use('/api/question',question)

const port = process.env.port || 5000;

app.listen(port,(req,res) => {
    console.log("server has started!");
    
})