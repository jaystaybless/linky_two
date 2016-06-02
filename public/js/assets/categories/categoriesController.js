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

	$scope.add = function() {
		console.log($scope.categories)
		$http.post('/categories', $scope.categories).success(function(response) {
			console.log(response)
			refresh();
		})
	} 
	
	$scope.edit = function () {
		$scope.hideInfo = true;
		console.log($scope.hideInfo)
	}
	
	$scope.remove = function(categories_id) {
		console.log(categories_id)
		$http.delete('/categories/' + categories_id).success(function(response) {
			$scope.hideInfo = false;
			refresh();
		})
		
	}
	
	$scope.update = function(categories) {

		console.log('client put ')
		console.log(categories)
		$http.put('/categories/' + categories.categories_id, categories).success(function(response) {
			console.log('put');
			$scope.hideInfo = false;
			refresh();
		})
	}
      $scope.message = "Categories";  
});
