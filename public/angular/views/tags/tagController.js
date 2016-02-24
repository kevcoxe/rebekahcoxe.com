
myApp.controller("tagCtrl", function($scope, $state, $stateParams, $http) {

    $scope.tagID = $stateParams.tagID;
    $scope.user = {};
    $scope.posts = [];

    $scope.getUser = function() {
        $http.post("/getUser")
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.user = r;
            });
    };
    $scope.getUser();

    $scope.getTagedPosts = function() {
        $http.post("/getTagedPosts", {tag: $scope.tagID})
            .then(function (response) {
                var r = response.data;
                console.log(r);
                $scope.posts = r;
            });
    };
    $scope.getTagedPosts();

});
