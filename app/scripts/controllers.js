'use strict';
angular.module('SteamPiggyBank.controllers', ['ngAnimate'])

.controller('IntroCtrl', function($scope, $ionicSideMenuDelegate, $state, $ionicBackdrop, $ionicSlideBoxDelegate, $ionicPopover, $ionicGesture, $http, $ionicNavBarDelegate) {
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});

	// Called to navigate to the main app
	$scope.startApp = function() {
		$state.go('main');
	};
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
	};
	$scope.slide = function(index) {
		$ionicSlideBoxDelegate.slide(index);
	};

	$scope.openPopover = function($event) {
		$http.get('http://store.steampowered.com/search/?specials=1').
			success(function(data) {
				$scope.popoverContent = data;
			});
		$scope.popover.show($event);
		
	};
	$scope.closePopover = function() {
	    $scope.popover.hide();
		};

  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
		if (index === 0) {
			setNavTitle('Special Deals');
		} else if (index === 1) {
			setNavTitle('All Current Deals');
		}
	};

	var setNavTitle = function(title) {
		$ionicNavBarDelegate.setTitle(title);
	};

	$scope.appList = [
		{'id': 286140, 'title': 'Title1', 'price': 'Price'},
		{'id': 286140, 'title': 'Title2', 'price': 'Price'},
		{'id': 286140, 'title': 'Title3', 'price': 'Price'},
		{'id': 286140, 'title': 'Title4', 'price': 'Price'},
		{'id': 286140, 'title': 'Title5', 'price': 'Price'},
		{'id': 286140, 'title': 'Title6', 'price': 'Price'},
		{'id': 286140, 'title': 'Title7', 'price': 'Price'},
		{'id': 286140, 'title': 'Title8', 'price': 'Price'}
	];

	$scope.toggleLeft = function() {
    	$ionicSideMenuDelegate.toggleLeft();
  	};
	

})

.controller('MainCtrl', function($scope, $state) {
	console.log('MainCtrl');

	$scope.toIntro = function() {
		$state.go('intro');
	};
})

.controller('GalleryCtrl', function($scope, $ionicSlideBoxDelegate) {
	$scope.showNext = function() {
		$ionicSlideBoxDelegate.next();
	};
	$scope.showPrev = function() {
		$ionicSlideBoxDelegate.previous();
	};
	$scope.slide = function(index) {
		$ionicSlideBoxDelegate.slide(index);
	};
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};
	$scope.data =[
			{'id': 286140, 'name': 'randomShit0'},
			{'id': 286140, 'name': 'randomShit1'},
			{'id': 286140, 'name': 'randomShit2'}
		];

	$scope.getDealName = function(){
		var weekday = "Hallo";
		return weekday;
		/*if (weekday.toString() === 'Sunday' || 'Saturday' || 'Friday') {
			return 'Weekend Deals';
		} else {
			return 'Weeklong Deals';
		}*/
	};	
})

.controller('PigCtrl', function($scope) {
	$scope.pigs = [
		{'src': '../images/loadingPigStay.png'},
		{'src': '../images/loadingPigMid.png'},
		{'src':'../images/loadingPigJump.png'},
		{'src':'../images/loadingPigMid.png'}
	];



});