const express = require('express'); 
const router  = express.Router();
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const axios = require('axios');
const session = require('express-session');
const Auth = require('../../config/isAuthenticate');


router.get('/',function(req,res){
    res.redirect('login');
});

router.get('/register',function(req,res){
    res.render('register', {name: 'regis'});
});

router.get('/user', Auth, function(req, res){
    res.render('user',{token: req.session.token});
});

router.get('/login',function(req,res){
    res.render('login');
});

module.exports = router;