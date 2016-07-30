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
