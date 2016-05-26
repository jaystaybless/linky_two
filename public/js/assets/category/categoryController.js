app.controller('categoryController', function($scope, $http, $routeParams){
    console.log("categoryController is in action")
	

	var categories_id = $routeParams.categories_id
	
	var refresh = function () {
		$http.get('/categories/' + categories_id).success(function(response) {
		$scope.categoryDetails = response;
		$scope.category = "";
		})
	}
refresh()
	
	$scope.addSubCategory = function() {
		//console.log(categories_id)
		//console.log($scope.category)
		//console.log($scope.subCategory)
		$http.post('/categories/' + categories_id + '/sub_categories', $scope.subCategory).success(function(response) {
			console.log(response)
			$scope.subCategoryList = response;
			refresh()
		})
		
	}
		
	$scope.getSubCategories = function () {
		//console.log('test')
		//console.log(categories_id)
		$http.get('/sub_categories/'  + categories_id).success(function(response) {
			$scope.subCategoryList = response;
			$scope.subCategory = "";
			refresh()
		})
	}
	

      $scope.message = "Welcome to the Category Page";  
});