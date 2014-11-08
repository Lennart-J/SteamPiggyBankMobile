'use strict';
angular.module('SteamPiggyBank.directives', [])

.directive('holder', function() {
	return {
		link: function(scope, element) {
			Holder.run({
				images: element[0],
				nocss: true
			});
		}
	};
});

