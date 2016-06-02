app.controller('aLinkController', function($scope, $http, $routeParams){
    console.log("aLinkController is in action")
	
	var links_id = $routeParams.links_id;
	console.log(links_id);
	
	var refresh = function () {
		console.log(links_id)
		$http.get('/links/' + links_id).success(function (response) {
			console.log(response)
			$scope.linksList = response;	
			//$scope.linkLists = "";
			//$scope.hideInfo = false;
			console.log($scope.hideInfo)
			;
		});	
	};
refresh()
	
	$scope.edit = function () {
		$scope.hideInfo = true;
		console.log($scope.hideInfo)
	};
	
	$scope.updateLink = function (links) {
		console.log(links)
		console.log(links.links_id)
		
		$http.put('/links/' + links.links_id, links).success(function (response) {
			console.log(response);
			$scope.hideInfo = false
			refresh();
			//refreshLinksList();
		});
	};
	
	$scope.removeLink = function (links) {
		console.log(links)
		console.log(links.links_id)
		console.log(links.sub_categories_id)
		$http.delete('/links/' + links.links_id).success(function (response) {
			console.log(response)
			$scope.hideInfo = false
			refresh();
		});
	};
	
    $scope.message = "Link Details";  
});
