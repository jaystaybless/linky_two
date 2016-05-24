alert('test')

var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/categories',{
			templateUrl: 'js/assets/categories/categories.html',
			controller: 'categoriesController'})
        .when('/sub_categories', {
			templateUrl: 'js/assets/sub_categories/sub_categories.html', 
			controller: 'sub_categoryController'})
		.when('/links', {
			templateUrl: 'js/assets/links/links.html', 
			controller: 'linksController'})
		.when('/register', {
			templateUrl: 'js/assets/authentication/register/register.html', 
			controller: 'registerController'})
		.when('/login', {
			templateUrl: 'js/assets/authentication/login/login.html', 
			controller: 'loginController'})
		.when('/logout', {
			redirectTo: '/index'})
		.otherwise({ redirectTo: '/index' });
        
	$locationProvider.html5Mode({
        enable:true,
        requireBase: false
    });
});

app.controller('indexController', function($scope){
    console.log("Index page has loaded")
      $scope.message = "Welcome to the Hardware Store";  
});
