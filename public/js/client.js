alert('test')

var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/categories',{
			templateUrl: 'partials/categories.html',
			controller: 'categoriesController'})
        .when('/sub_categories', {
			templateUrl: 'partials/sub_categories.html', 
			controller: 'sub_categoryController'})
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

app.controller('categoriesController', function($scope){
    console.log("Categories Page has loaded")
      $scope.message = "Welcome to the Categories Page";  
});

app.controller('sub_categoryController', function($scope){
    console.log("Sub Categories Page has loaded")
      $scope.message = "Welcome to the Sub Categories Page";  
});