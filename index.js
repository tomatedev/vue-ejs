/* package */
const express = require('express')
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

const users = require('./services/users'); 
const viewLanding = require('./controllers/index'); 

const app = express()
app.use(bodyParser.urlencoded());
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use(passport.initialize()); require('./config/passport')(passport);
app.use(function (req, res, next) {
 //    ["http://localhost:3001", "http://localhost:3000"].map(function(domain) {
 //  		res.setHeader( "Access-Control-Allow-Origin", domain );
	// });
    res.setHeader( "Access-Control-Allow-Origin", "*" );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const port = 9000;

app.use(session({ 
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: true
}));

app.use('/', viewLanding);
app.use('/api/users', users);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))