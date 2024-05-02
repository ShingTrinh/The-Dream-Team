const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;

//custom middleware logger
app.use(logger);

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


app.use(express.urlencoded( {extended: false}));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hornets',
  password: 'secret123',
  database: 'hornet_helpers'
});

connection.connect(function(err){
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/scripts')));
app.use('/subdir',express.static(path.join(__dirname, '/public')));

app.use('/',require('./routes/root'));


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

app.get('/getEvents', function(req, res){
  const query = 'SELECT * FROM events';

  connection.query(query, function(error, results){
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(results);
    }
  });

});

app.post('/updateEvent', function(req, res){
  const event = req.body;
  const { id, title, description, date, time, categories } = event;
  const query = 'UPDATE events SET title=?, description=?, date=?, time=?, categories=? WHERE id=?';

  // Convert id to integer
  const eventId = parseInt(id);

  connection.query(query, [title, description, date, time, categories, eventId], function(error, results){
      if (error) {
          res.status(500).json({ error: error.message });
      } else {
          if (results.affectedRows === 0) {
              res.status(404).json({ error: 'Record not found' });
              console.log("NOT FOUND IN SERVERJS")
          } else {
              res.sendStatus(200);
          }
      }
  });
});

app.post('/signup', function(req, res) {
  const { firstName, lastName, email, studentID, password } = req.body;
  console.log("IN SIGNUP");

  console.log("first name: " + firstName);
  console.log("last name: " + lastName);
  console.log("email: " + email);
  console.log("studentID: " + studentID);
  console.log("password: " + password);

  const query = 'INSERT INTO users (first_name, last_name, email, studentID, password_hash) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [firstName, lastName, email, studentID, password], function(error, results) {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.sendStatus(200);
    }
  });

});

app.use(errorHandler);


app.listen(PORT, function (){
  console.log(`Server running on PORT ${PORT}`);
});
