  var app = angular.module('app', [] , function config($httpProvider){
    // Los interceptores modifican las peticiones http
    // en este caso se añade el token a la cabezera.
    $httpProvider.interceptors.push("AuthInterceptor");
  });
