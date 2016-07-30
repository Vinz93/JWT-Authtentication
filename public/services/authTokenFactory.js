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
