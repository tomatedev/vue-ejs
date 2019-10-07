const express = require('express'); 
const jwt = require('jsonwebtoken');
const passport = require('passport');
const multer = require('multer');

const router  = express.Router();

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const db = require('../../config/database');
const keys = require('../../config/key');
const storage = require('../../config/storage');


router.put('/update/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    var sql = "Update Users SET firstname='"+req.body.firstname+"',lastname='"+req.body.lastname+"',email='"+req.body.email+"' WHERE id='"+req.params.id+"'";
    db.query(sql, 
    function (err, user, fields) {
        res.status(200).json({
            code: res.statusCode,
            message: 'Update Users',
            data: user
        });
    });
});


router.get('/',  passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('xx');
    db.query("SELECT * FROM users LIMIT 100", 
    function (err, result) {
        if (err) throw err;
        res.json({
            code: res.statusCode,
            message: 'users',
            data: result
        });
    })
});

router.post('/register',multer({storage:storage}).array('image'),   (req, res) => {
    var sql = "INSERT INTO users(firstname, lastname, email, password) VALUES('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.email+"','"+req.body.password+"')";
    db.query(sql, 
    function (err, result) {
       if (err) throw err;
        res.json({
            code: res.statusCode,
            message: 'Success',
            data: result
        });
    })
});

router.post('/add',  multer({storage:storage}).array('image'), (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json({
            code: res.statusCode,
            errors
        });
    }

    var sql = "SELECT * FROM users WHERE email='"+req.body.email+"'";
    db.query(sql, 
        function (err, result) {
        if(result.length > 0){
            errors.email = 'Email Already Exists';
            res.status(400).json({
                code: res.statusCode,
                errors
            });

        }else{

            const url = req.protocol +'://'+req.get('host');
            var sql = "INSERT INTO users(firstname, lastname, email, password) VALUES('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.email+"','"+req.body.password+"')";
            db.query(sql,
            function (err, result) {
                if (err) throw err;
        
                req.files.filter(function (file) {
                    var item =  url + "/images/" + file.filename
                    var sql = "INSERT INTO images(user_id, path) VALUES('"+result.insertId+"','"+item+"')";
                    db.query(sql);
                });
                
                res.json({
                    code: res.statusCode,
                    message: 'Success',
                    data: result
                });
            });
        }
    });
});

router.delete('/:id', (req, res) => {
    var sql = "DELETE FROM users WHERE id='"+req.params.id+"'";
    db.query(sql, 
    function (err, result) {
        res.json({
            code: res.statusCode,
            message: 'Delete Success',
            data: result
        });
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json({
            code: res.statusCode,
            errors
        });
    }

    var sql = "SELECT * FROM Users WHERE email='"+req.body.email+"' and password='"+req.body.password+"'";
    db.query(sql, 
    function (err, [user]) {
       if (err) throw err;
       const payload = { 
            id: user.id, 
            firstname: user.firstname, 
            lastname: user.lastname, 
            email: user.email
        };
        jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 }, 
            (err, token) => {
            res.json({
                success: true,
                token: 'Bearer ' + token
            });
        });
    })
});

router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
    console.log('s');
    var sql = "SELECT * FROM Users WHERE id='"+req.user.id+"'";
    db.query(sql, 
    function (err, user, fields) {
        res.status(200).json({
            code: res.statusCode,
            message: 'Current Users',
            data: user
        });
    });
});

router.get('/post', passport.authenticate('jwt', { session: false }), (req, res) => {
    var sql = "SELECT  posts.id,posts.message AS post FROM users LEFT JOIN posts ON  users.id = posts.user_id where posts.user_id = '"+req.user.id+"'";
    db.query(sql, 
        function (err, result) {
            res.status(200).json({
                code: res.statusCode,
                message: 'Post Of User',
                data: result
            });
        });
});

module.exports = router;