var express = require('express');
var faker = require('faker');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var user = {
  name: "Vincenzo",
  password: "123"
};

var jwtSecret = "juhaklsjhdskl";

var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
// middleware que proteje las rutas con el token que viene en el header de las peticiones
// tambien añade un campo al request (req.user) que contiene la informacion del token
// descodificada.
app.use(expressJwt({ secret: jwtSecret}).unless({path: ['/login']}));


app.get("/users/random", function(req, res) {
    var user = faker.helpers.createCard();
    user.avatar = faker.image.avatar();
    res.json(user);
});

// jwt crea un token con el nombre del usuario y el secret .
app.post("/login", authenticate, function (req, res) {
  var token = jwt.sign({
    name: user.name},jwtSecret);
  res.json({
    user: user,
    token: token});
});

app.get("/me",function (req,res) {
  res.json(req.user);
});

// middleware para authenticacion.
function authenticate(req, res, next) {
  var body = req.body;
  if(!body.username || !body.password){
    res.status(400).send("Must provide a username and password");
    return false;
  }
  if(body.username !== user.name || body.password !== user.password){
    res.status(401).send("User or password are incorrect");
    return false;
  }
  next();
}

app.listen(3000, function() {
    console.log('Server running on port 3000');
});
