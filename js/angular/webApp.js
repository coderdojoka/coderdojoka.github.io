var app = angular.module('webApp', ['ngResource']);

app.factory('EventService', function ($resource) {
    return $resource('https://zen.coderdojo.com/api/2.0/events/search', null, {
	    'search': {method: 'POST', isArray: true},
	});
});

app.run(function($rootScope) {
    $rootScope.color = 'blue';
});
