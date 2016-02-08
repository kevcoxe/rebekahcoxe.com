myApp.controller("homeCtrl", function($scope, $state, $http) {

    $scope.posts = [];

    $scope.getPosts = function() {
        $http.post("/getPosts")
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.posts = r;
            });
    };
    $scope.getPosts();

});
