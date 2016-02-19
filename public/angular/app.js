var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /state1
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "angular/views/home/home.html",
            controller: "homeCtrl",
        })
        .state('profile', {
            url: "/profile",
            templateUrl: "angular/views/profile/profile.html",
            controller: "profileCtrl",
        });

    $urlRouterProvider.otherwise("/");
});
