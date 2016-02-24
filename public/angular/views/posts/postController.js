
myApp.controller("postCtrl", function($scope, $state, $http) {

    $scope.post = {};
    $scope.user = {};
    $scope.tags = [];

    $scope.createPost = function () {
        console.log($scope.post);
        $http.post("/createPost", $scope.post)
            .then(function (response) {
                var data = response.data;
                console.log(data);
                $scope.post = {};
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


    $scope.getTags = function() {
        $http.post("/getTags")
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.tags = r;
            });
    };
    $scope.getTags();

});
