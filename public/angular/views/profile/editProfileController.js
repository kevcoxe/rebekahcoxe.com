myApp.controller("editProfileCtrl", function($scope, $state, $http) {

    $scope.posts = [];
    $scope.user = {};
    $scope.tags = [];
    $scope.pics = [];

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

    $scope.getPics = function() {
        $http.post("/getPics")
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.pics = r;
            });
    };
    $scope.getPics();


    $scope.updateUser = function() {
        $http.post("/updateUser", $scope.user)
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.user = r;
                $state.go("profile");
            });
    };


});
