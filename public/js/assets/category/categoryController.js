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

	$scope.updateCategory = function(category) {
		console.log('client put ')
		console.log(category)
		console.log(category.categories_id)
		$http.put('/categories/' + category.categories_id, category).success(function(response) {
			console.log('put on category route')
			$scope.hideInfo = false;
			refresh();
		})
	}
	
	$scope.removeCategory = function(category) {
		console.log('client delete category ')
		console.log(category)
		console.log(category.categories_id)
		$scope.hideInfo = false;
	}
	
	
	
	
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
		
	var refreshSubCategoriesList = function () {
		console.log('refreshSubCategoriesList test')
		//console.log(categories_id)
		$http.get('/categories/' + categories_id + '/sub_categories').success(function(response) {
			$scope.subCategoryList = response;
			$scope.subCategory = "";
			refresh()
		})
	}
refreshSubCategoriesList()

	$scope.edit = function () {
		$scope.hideInfo = true;
		console.log($scope.hideInfo)
	}
	
	$scope.updateSubCategory = function(subCategory) {
		console.log('client put ')
		console.log(subCategory)
		console.log(subCategory.sub_categories_id)
		$http.put('/sub_categories/' + subCategory.sub_categories_id, subCategory).success(function(response) {
			console.log('put on sub category route')
			$scope.hideInfo = false;
			refresh();
		})
	}
	
	
	$scope.remove = function(sub_categories_id) {
		console.log(sub_categories_id)
		$http.delete('/sub_categories/' + sub_categories_id).success(function(response) {
			console.log(response)
			//$scope.subCategoryList = response;
			$scope.hideInfo = false
			refreshSubCategoriesList()
		})
	
	}
	

      $scope.message = "Welcome to the Category Page";  
});