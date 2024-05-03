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

router.get('/volup.html(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname,'..','views','volup.html'));
});
  
router.get('/hh_login_page(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname,'..','views','hh_login_page.html'));
});
  
module.exports = router;