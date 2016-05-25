app.controller('categoriesController', function($scope, $http){
    console.log("categoriesController is in action")
	
	var refresh = function () {	
	$http.get('/categories').success(function(response) {
		console.log('I got the data I requested');
		$scope.categorieslist = response;
		$scope.categories = "";
	});
}

refresh();
	
	
	
	
	
	
	
	
      $scope.message = "Welcome to the Categories Page";  
});
