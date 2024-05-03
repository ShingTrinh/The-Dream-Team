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
  
module.exports = router;