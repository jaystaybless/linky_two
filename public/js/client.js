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
		.when('/categories/:categories_id/sub_categories', {
			templateUrl: 'js/assets/sub_categories/sub_categories.html', 
			controller: 'sub_categoryController'})
		/*	
		.when('/sub_categories/:categories_id', {
			templateUrl: 'js/assets/sub_categories/sub_categories.html', 
			controller: 'sub_categoryController'})
		*/	
		.when('/sub_categories', {
			templateUrl: 'js/assets/sub_categories/sub_categories.html', 
			controller: 'sub_categoryController'})				
		.when('/sub_categories/:sub_categories_id', {
			templateUrl: 'js/assets/sub_categories/sub_categoriesDetails.html', 
			controller: 'sub_categoriesDetailsController'})	
		.when('/sub_categories/:sub_categories_id/links', {
			templateUrl: 'js/assets/sub_categories/sub_categories.html', 
			controller: 'sub_categoryController'})	
			
		.when('/links/:id', {
			templateUrl: 'js/assets/links/links.html', 
			controller: 'linksController'})			
			
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
	
	$scope.edit = function () {
		console.log('clicked')
		$scope.hideInfo = true;
		console.log($scope.hideInfo)
	}
		$scope.message = "Welcome to the Hardware Store"; 
		$scope.navbar = "js/assets/navbar/navbar.html"; 	  
});
