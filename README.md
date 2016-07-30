#JWT Authentication


## JWT

Es un mecanismo de seguridad entre el cliente y el servidor, que permite identificar a los usuarios de manera unica
, donde el servidor genera un token que el cliente deberá almacenar en su localStorage , luego este token será enviado en
la cabezera de cada peticion http al servidor, mediante un middleware se descodificará el token y se dará o no acceso
a las rutas protegidas.

### Instalacion
```js
npm install

node server.js
  ```
###Creando el token
Se importa la libreria.

var jwt = require('jsonwebtoken');

Mediante un middleware se debe verificar si el usuario es válido,
luego de verificar se genera el token con la data y el secret,
finalmente es enviado al cliente.


```js
var jwtSecret = "juhaklsjhdskl";

// jwt crea un token con el nombre del usuario y el secret .
app.post("/login", authenticate, function (req, res) {
  var token = jwt.sign({
    name: user.name},jwtSecret);
  res.json({
    user: user,
    token: token});
});

  ```

### Guardando el Token (localStorage)

 $window.localStorage permite alamacenar en el localStorage,
 se almacena justo despues de que se recibe la respuesta del servidor.


```js

// Factory para guardar en localStorage
app.factory("AuthTokenFactory",function ($window) {
  var store = $window.localStorage;
  var key = "auth-token";

  return{
    getToken: getToken,
    setToken: setToken
  };

  function getToken() {
    return store.getItem(key);
  }

  function setToken(token) {
    if(token){
      store.setItem(key, token);
    }else{
      store.removeItem(key);
    }
  }

});

// funcion Login, se toma el token en la respuesta .
function login(username, password) {
  return $http.post("/login",{
    username: username,
    password: password
  }).then(function (res) {
    AuthTokenFactory.setToken(res.data.token);
    return res;
  });


```

### Interceptor al $httpProvider

Ahora se debe enviar el token en la cabezera de cada petición,
primero creamos el Interceptor como un factory, se verifica si hay un token y se coloca
en la cabezera (Authorization), ese necesario colocar el 'bearer ' antes del token.

```js
app.factory('AuthInterceptor',function (AuthTokenFactory) {
  return{
    request: addToken
  };

  function addToken(config) {
    var token = AuthTokenFactory.getToken();
    if (token){
      config.headers = config.headers || {};
      config.headers.Authorization = 'bearer ' + token;
    }
    return config;
  }

});

```
luego de esto se añade al arreglo de interceptores http

```js
var app = angular.module('app', [] , function config($httpProvider){
  $httpProvider.interceptors.push("AuthInterceptor");
});


```
### Descodificación del token

Con el middleware 'express-jwt' , podemos proteger las rutas, este se encargara de descodificar el token y verificar si es  válido (autorizado) para acceder a las rutas protegigas, ademas añade un campo a la petición (request.user) el cual contendrá la información del token descodificada.

.unless contiene las rutas que no estarán protegidas.

```js
app.use(expressJwt({ secret: jwtSecret}).unless({path: ['/login']}));

app.get("/me",function (req,res) {
  res.json(req.user);
});

```
