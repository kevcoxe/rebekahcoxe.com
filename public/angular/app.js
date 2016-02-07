var myApp = angular.module('myApp', ['ui.router', 'textAngular']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "angular/views/home/home.html",
            controller: "homeCtrl",
        });

    $urlRouterProvider.otherwise("/");
});
