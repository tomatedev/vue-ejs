const express = require('express'); 
const router  = express.Router();
const cookieParser = require('cookie-parser');
const jsonwebtoken = require('jsonwebtoken');
const axios = require('axios');
const http = require('http');


// const jwtKey = process.env['JWT_KEY'] || 'shared-secret';
// const axios = require('axios');

const Auth = [
    cookieParser(),
    (req, res, next) => {
      req.headers.authorization = req.cookies['token'];
      console.log(req.headers.authorization);
    //   const options = {
    //     path: '/api/users/current',
    //     method: 'GET',
    //     headers: {
    //       'Authorization': req.headers.authorization
    //     }
    //   }

    //   const reqs = http.request(options, res => {
    //     console.log(`statusCode: ${res.statusCode}`)
      
    //     // res.on('data', d => {
    //     //   process.stdout.write(d)
    //     // })
    //   });
    //   await axios.get('/api/users/current', {
    //     name: "",
    //     parts: ""
    //     })
    //     .then( 
    //         (response) => { console.log(response) },
    //         (error) => { console.log(error) }
    //     );

    //   var authOptions = {
    //     method: 'GET',
    //     url: '/api/users/current',
    //     // data: qs.stringify(data),
    //     headers: {
    //         'Authorization': req.headers.authorization,
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     json: true
    //   };

    //   axios(authOptions).then(function(response){
    //       console.log('x');
    //     console.log(response.data);
    //     console.log(response.status);
    //   });

        // axios({
        //     url: '/api/users/current',
        //     method: 'GET',
        //     headers: {
        //         'Authorization': req.headers.authorization
        //     }
        // }).then(resp => {
        //     console.log(resp.data);
        // });




    //   console.log(req.headers.authorization);
      next();
    }
]



router.get('/',function(req,res){
    res.redirect('login');
   // res.render('index', {name: 'ffffffff'});
});

router.get('/register',function(req,res){
    res.render('register', {name: 'regis'});
});

router.get('/user', Auth, function(req,res){
    res.render('user',{token: req.headers.authorization});
});

router.get('/login',function(req,res){
    // res.coookie('jwt', 'sssssss');
    // const jwt = { items: [1,2,3] };
    // res.cookie('jwt', jwt);
    // res.json({ jwt });

    // const userId = 1;
    // const jwt = jsonwebtoken.sign({ sub: userId }, jwtKey);
    // res.coookie('jwt', jwt);
    // res.json({ userId });
    res.render('login');
});

module.exports = router;