var app = angular.module('webApp', []);

app.run(function($rootScope) {
    $rootScope.color = 'blue';
});
