
myApp.controller("profileCtrl", function($scope, $state, $http) {

    $scope.user = {};

    $scope.getUser = function() {
        $http.post("/getUser")
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.user = r;
            });
    };
    $scope.getUser();

});
