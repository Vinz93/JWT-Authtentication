app.factory("UserFactory",function ($http, AuthTokenFactory, $q) {
  return{
    login: login,
    logout: logout,
    getUser: getUser
  };
  function login(username, password) {
    return $http.post("/login",{
      username: username,
      password: password
    }).then(function (res) {
      AuthTokenFactory.setToken(res.data.token);
      return res;
    });
  }
  function logout() {
    AuthTokenFactory.setToken();
  }

  function getUser() {
    if(AuthTokenFactory.getToken()){
      return $http.get("/me");
    }else{
      return $q.reject({data : " client has no auth token"});
    }

  }
});
