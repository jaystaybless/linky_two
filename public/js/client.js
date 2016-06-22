alert('test')

var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/categories',{
			templateUrl: 'js/assets/categories/categories.html',
			controller: 'categoriesController'})
		.when('/categories/:categories_id',{
			templateUrl: 'js/assets/category/category.html',
			controller: 'categoryController'})
		.when('/links', {
			templateUrl: 'js/assets/links/links.html', 
			controller: 'linksController'})
		.when('/links/:links_id', {
			templateUrl: 'js/assets/links/links.html', 
			controller: 'aLinkController'})			
		.when('/register', {
			templateUrl: 'js/assets/authentication/register/register.html', 
			controller: 'registerController'})
		.when('/login', {
			templateUrl: 'js/assets/authentication/login/login.html', 
			controller: 'loginController'})
		.when('/about', {
			templateUrl: 'js/assets/about/about.html', 
			controller: 'aboutController'})
		.when('/contact', {
			templateUrl: 'js/assets/contact/contact.html', 
			controller: 'contactController'})
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
	
		//$scope.message = "Welcome to the Hardware Store"; 
		$scope.navbar = "js/assets/navbar/navbar.html"; 	  
});
