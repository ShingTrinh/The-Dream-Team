require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser');
const PORT = 3000;

//conect to mongodb
connectDB();

const app = express();

//custom middleware logger
app.use(logger);

/*
//cross origin resource sharing 
const whitelist = ['http://127.0.0.1:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if( whitelist.indexOf(origin) != -1 || !origin ){
        callback(null,true);
    }else{
      callback(new Error('Not Allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
*/
//middleware to handle different types of data
app.use(express.urlencoded( {extended: false}));
app.use(express.json());
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/scripts')));

//routes
app.use('/',require('./routes/root'));
app.use('/register',require('./routes/register')); //registers users
app.use('/auth',require('./routes/auth')); 
app.use('/refresh',require('./routes/refresh')); 
app.use('/logout',require('./routes/logout')); 


app.use(verifyJWT); //everything under this line is needs to be verified by JWT
app.use('/employees',require('./routes/api/employees')); //admins


app.all('*', (req,res) => {
  res.status(404);
  if(req.accepts('html')) {
    res.sendFile(path.join(__dirname,'views','404.html'));
  }else if(req.accepts('json')) {
    res.json({error: "404 Not Found"});
  }else {
    res.type('txt').send("404 Not Found");
  }

});

app.use(errorHandler);


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
});
