var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

//here we create token
var createToken = (username,password) => {
    //to generate token use cmd jwt.sign
    var token = jwt.sign({username: username,passsword:password},"indiaismycountryandilovemycountryweloveourcountry");
    return token;
    
}  
//here we verify token
var verifyToken = (token) =>{
    try{
    var verification = jwt.verify(token, "indiaismycountryandilovemycountryweloveourcountry");
    return true;
    }
    catch(err){
        return false;
    }
    
}

var app = express();

//to get data from a POST request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var router = express.Router();

//here we create user
router.post('/create-user', function(req, res) {
  
  var username = req.body.username;
  var password = req.body.password;
  res.json({success: "user created",username: username,password: password})
  

});
//here we login user
router.post('/login-user', function(req, res) {
  
    var username = req.body.username;
    var password = req.body.password;
    var newtoken= createToken(username, password);
    // console.log(newtoken);
    res.json({tokenGenerated:newtoken});
   });

  //here we validate user
router.get('/validate-user', function(req, res) {
    console.log(req.headers.authorization);
    var token = req.headers.authorization.split(" ")[1]
    var result= verifyToken(token);
    res.json({succes:result});
  })

  



app.use('/api', router);
app.listen(3000);

