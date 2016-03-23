var registrationModule = angular.module("registrationModule", ["ngRoute", "ngGrid", "cgBusy", "ui.bootstrap", "LocalStorageModule"])
.config(function ($routeProvider, $locationProvider) {
    

    $routeProvider
    .when('/', {
        templateUrl: '/AngularJS/Templates/Ordenes.html',
        controller: 'ordenController'
    })
    .when('/registro', {

        templateUrl: '/AngularJS/Templates/Registro.html',
        controller: 'loginController'
    })
    .when('/login', {

        templateUrl: '/AngularJS/Templates/Login.html',
        controller: 'loginController'
    })
    .when('/cuenta', {
        templateUrl: '/AngularJS/Templates/EditarRegistro.html',
        controller: 'loginController'
    });

    $locationProvider.html5Mode(true);
});

registrationModule.run(function ($rootScope) {
    $rootScope.empleado = "";
    $rootScope.cliente = "";
})

 
var app=angular.module("app",['ngRoute']);

function MainController($scope,$location) {
    
    $scope.navegar=function() {
        $location.path("/AngularJS/Templates/Ordenes.html");
    };
    
    
}
