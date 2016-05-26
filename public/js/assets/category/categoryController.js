app.controller('categoryController', function($scope, $http, $routeParams){
    console.log("categoryController is in action")
	

	var categories_id = $routeParams.categories_id
	
	$http.get('/categories/' + categories_id).success(function(response) {
		console.log('specific now complete on client');
		$scope.categoryDetails = response
	})
	
	
	$scope.addSubCategory = function() {
		console.log(categories_id)
		console.log($scope.category)
		$http.post('/categories/' + categories_id + '/sub_categories', $scope.category).success(function(response) {
			console.log(response)
			
		})
		
		}
	

      $scope.message = "Welcome to the Category Page";  
});