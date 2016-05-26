app.controller('categoryController', function($scope, $http){
    console.log("categoryController is in action")
	

	$scope.specific = function(categories) {
		console.log(categories);
		$http.get('/categories/' + categories_id).success(function(response) {
			console.log('specific');
			$scope.categorieslist = response;
			//$scope.categories = "";
		});
	}

      $scope.message = "Welcome to the Category Page";  
});