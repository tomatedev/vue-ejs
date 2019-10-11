const express = require('express'); 
const router  = express.Router();
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const axios = require('axios');
const session = require('express-session');
const Auth = require('../config/isAuthenticate');


router.get('/',function(req,res){
    res.redirect('login');
});

router.get('/register', function(req,res){
    let data = {
        isAuth: req.session.token,
        firstname: req.session.firstname,
        lastname: req.session.lastname,
    }
    res.render('register', data);
});

router.get('/user', Auth, function(req, res){
    let data = {
        isAuth: req.session.token,
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        token: req.session.token
    }
    res.render('user', data);
});

router.get('/login',function(req,res){
    let data = {
        isAuth: req.session.token,
        firstname: req.session.firstname,
        lastname: req.session.lastname
    }
    res.render('login', data);
});

module.exports = router;