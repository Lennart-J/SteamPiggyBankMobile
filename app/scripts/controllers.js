'use strict';
angular.module('SteamPiggyBank.controllers', ['ngAnimate'])

.controller('IntroCtrl', function($scope, requestService, $state, $http, $q, $ionicSideMenuDelegate, $ionicBackdrop, $ionicSlideBoxDelegate, $ionicPopover, $ionicGesture, $ionicNavBarDelegate) {
	$ionicPopover.fromTemplateUrl('templates/popover.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});
	var promise = requestService.getAllApps();
	promise.then(function(data) {
		console.log(data);
	}, function(reason) {
		console.log(reason);
	}, function(update) {
		console.log(update);
		$scope.appItems = update;
	});
	var mainSlider = angular.element(document.querySelector('.slider-slides')),
		swipeGesture = null;

	// Called to navigate to the main app
	$scope.startApp = function() {
		$state.go('main');
	};
	$scope.next = function() {
		$ionicSlideBoxDelegate.select( $ionicSlideBoxDelegate.next() );
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.select( $ionicSlideBoxDelegate.previous() );
	};
	$scope.slide = function(index) {
		$ionicSlideBoxDelegate.select(index);
	};

	$scope.openPopover = function($event) {
		var promise = requestService.getAllApps();
		promise.then(function(data) {
			console.log(data);
		}, function(reason) {
			console.log(reason);
		}, function(update) {
			console.log(update);
			$scope.popoverContent = update;
			console.log($scope.popoverContent.length);
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

	var showSideMenuOnSwipe = function() {
		$scope.toggleLeft();
	};

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

	$scope.appList = [{
		'id': 286140,
		'title': 'Title1',
		'price': 'Price'
	}, {
		'id': 286140,
		'title': 'Title2',
		'price': 'Price'
	}, {
		'id': 286140,
		'title': 'Title3',
		'price': 'Price'
	}, {
		'id': 286140,
		'title': 'Title4',
		'price': 'Price'
	}, {
		'id': 286140,
		'title': 'Title5',
		'price': 'Price'
	}, {
		'id': 286140,
		'title': 'Title6',
		'price': 'Price'
	}, {
		'id': 286140,
		'title': 'Title7',
		'price': 'Price'
	}, {
		'id': 286140,
		'title': 'Title8',
		'price': 'Price'
	}];

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.$watch($ionicSideMenuDelegate.isOpenLeft, function(bool) {
		if (bool) {
			$ionicSlideBoxDelegate.$getByHandle('main-slider').enableSlide(false);
			$ionicSlideBoxDelegate.$getByHandle('gallery-slider').enableSlide(false);
		} else {
			$ionicSlideBoxDelegate.$getByHandle('main-slider').enableSlide(true);
			$ionicSlideBoxDelegate.$getByHandle('gallery-slider').enableSlide(true);
		}
	});

	$scope.$watch($ionicSlideBoxDelegate.selected, function(index) {

		if (index === 0) {
			swipeGesture = $ionicGesture.on('swiperight', showSideMenuOnSwipe, mainSlider);
		} else if (swipeGesture !== null) {
			$ionicGesture.off(swipeGesture, 'swiperight', showSideMenuOnSwipe);
		}
	});
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
	$scope.onTouch = function() {
		$ionicSlideBoxDelegate.$getByHandle('main-slider').enableSlide(false);
	};
	$scope.onRelease = function() {
		$ionicSlideBoxDelegate.$getByHandle('main-slider').enableSlide(true);
	};
	$scope.data = [{
		'id': 286140,
		'name': 'Test_0'
	}, {
		'id': 286140,
		'name': 'Test_1'
	}, {
		'id': 286140,
		'name': 'Test_2'
	}];

	$scope.getDealName = function() {
		var weekday = 'Hallo';
		return weekday;
		/*if (weekday.toString() === 'Sunday' || 'Saturday' || 'Friday') {
			return 'Weekend Deals';
		} else {
			return 'Weeklong Deals';
		}*/
	};
})

.controller('PigCtrl', function($scope) {
	$scope.pigs = [{
		'src': '../images/loadingPigStay.png'
	}, {
		'src': '../images/loadingPigMid.png'
	}, {
		'src': '../images/loadingPigJump.png'
	}, {
		'src': '../images/loadingPigMid.png'
	}];



});