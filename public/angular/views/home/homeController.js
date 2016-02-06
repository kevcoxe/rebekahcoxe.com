myApp.controller("homeCtrl", function($scope, $state, $http) {

    $scope.message = "Welcome!";

    $scope.getInfo = function() {

        $http.post("/info")
            .then(function (response) {
                $scope.message = response.data.message;
                console.log($scope.message);
            });

        console.log("Pressed");

    };

    $scope.postInfo = function() {

        var data = {
            message: "yo dog"
        };

        $http.post("/input", JSON.stringify(data))
            .then(function (response) {
                var r = response.data;
                console.log("posted!");
            });

    };

    $scope.makePost = function () {
        var data = {
            title: $scope.post_title,
            content: $scope.post_content
        };

        $http.post("/newPost", JSON.stringify(data))
            .then(function (response) {
                var r = response.data;
                console.log(r);

                $scope.post_title = "";
                $scope.post_content = "";
            });
    };

});
