myApp.controller("homeCtrl", function($scope, $state, $http) {

    $scope.user = {};
    $scope.posts = [];
    $scope.tags = [];
    $scope.featured_posts = 2;

    $scope.getUser = function() {
        $http.post("/getUser")
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.user = r;
            });
    };
    $scope.getUser();

    $scope.getPosts = function() {
        $http.post("/getPosts")
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.posts = r;
            });
    };
    $scope.getPosts();

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
