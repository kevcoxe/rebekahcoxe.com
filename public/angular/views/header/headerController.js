myApp.controller("headerCtrl", function($scope, $state, $http) {

    $scope.tags = [];

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
