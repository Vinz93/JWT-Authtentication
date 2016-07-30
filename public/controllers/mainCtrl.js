app.controller('MainCtrl', function($scope, RandomUserFactory, UserFactory) {

    //initialization
    UserFactory.getUser().then(function(res) {
        $scope.userLoged = res.data;
    });

    $scope.getRandomUser = function() {
        RandomUserFactory.getUser().then(function(res) {
                $scope.user = res.data;
            })
            .catch(handleError);
    }

    $scope.login = function() {
        UserFactory.login($scope.username, $scope.password).then(function(res) {
                $scope.userLoged = res.data.user;
                $scope.username = "";
                $scope.password = "";
            })
            .catch(handleError);
    }

    $scope.logout = function() {
        UserFactory.logout();
        $scope.userLoged = null;
    }

    function handleError(err) {
        console.log("Error :", err.data);
    }
});
