const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
  });
  
router.get('/SignUp.html(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname,'..','views','SignUp.html'));
});
  
router.get('/createEvent.html(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname,'..','views','createEvent.html'));
});

router.get('/adminEvent.html(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname,'..','views','adminEvent.html'));
});

router.post('/signup', function(req, res) {
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
  
module.exports = router;