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

	$scope.specific = function(categories) {
		console.log(categories.categories_id);
		$http.get('/categories/' + categories.categories_id).success(function(response) {
			console.log('specific from Categories controller');
			console.log(response)
			$scope.categories = response;
			//$scope.categories = "";
		});
	}

	$scope.add = function() {
		console.log($scope.categories)
		$http.post('/categories', $scope.categories).success(function(response) {
			console.log(response)
			refresh();
		})
	} 
	
	$scope.remove = function(categories_id) {
		console.log(categories_id)
		$http.delete('/categories/' + categories_id).success(function(response) {
			refresh();
		})
		
	}
	
	$scope.update = function(categories) {

		console.log('client put ')
		console.log(categories)
		$http.put('/categories/' + categories.categories_id, categories).success(function(response) {
			console.log('put')
			refresh();
		})
	}
      $scope.message = "Welcome to the Categories Page";  
});
