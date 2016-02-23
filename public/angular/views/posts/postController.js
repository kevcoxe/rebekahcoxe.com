
myApp.controller("postCtrl", function($scope, $state, $http) {

    $scope.post = {};

    $scope.createPost = function () {
        $http.post("/createPost", $scope.post)
            .then(function (response) {
                var data = response.data;
                console.log(data);
            });
    };

});
