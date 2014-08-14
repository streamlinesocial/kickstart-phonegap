angular.module('app.controllers', ['app.services'])

.controller('StatsCtrl', ['$scope', 'Contacts', function($scope, Contacts) {
    $scope.contacts = [
        // {"first_name": "bob", "last_name": "jones"}
    ];

    Contacts.all().then(function(contacts) {
        $scope.contacts = contacts;
    }, function(err) {
        console.log(err);
    });
}])

.controller('ContactsCtrl', function($scope, Contacts) {
    $scope.contacts = Contacts.all();

    Contacts.all().then(function(contacts) {
        $scope.contacts = contacts;
    }, function(err) {
        console.log(err);
    });
})

.controller('ContactDetailCtrl', function($scope, $stateParams, Contacts) {
  $scope.contact = Contacts.get($stateParams.contactId);
})

.controller('AccountCtrl', function($scope) {
});
