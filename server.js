const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

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

app.use(express.static(path.join(__dirname)));

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



app.listen(port, function (){
  console.log(`Server running on port ${port}`);
});
