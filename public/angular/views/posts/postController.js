
myApp.controller("postCtrl", function($scope, $state, $http) {

    $scope.post = {};
    $scope.user = {};

    $scope.createPost = function () {
        $http.post("/createPost", $scope.post)
            .then(function (response) {
                var data = response.data;
                console.log(data);
            });
    };

    $scope.getUser = function() {
        $http.post("/getUser")
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.user = r;
                $scope.post.user_id = r._id;
            });
    };
    $scope.getUser();

});
