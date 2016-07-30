app.factory("RandomUserFactory", function($http) {
    return {
        getUser: getUser
    };

    function getUser() {
        return $http.get("/users/random");
    }
});
