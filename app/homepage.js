'use strict';

angular.module('cookEasy.homepage', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/homepage', {
    templateUrl: 'homepage.html',
    controller: 'homepageCtrl'
  });
}])

.controller('homepageCtrl', ['$scope', '$firebaseArray', '$window', 'CommonProp', function($scope, $firebaseArray, $window, CommonProp){
  var ref = firebase.database().ref().child('UserTestimonials');
  $scope.testimonials = $firebaseArray(ref);

  $scope.$watch('searchText', function(){
    CommonProp.setSearchText($scope.searchText);
  });

  $scope.toggleSearch = function(){
    $scope.showSearch = !$scope.showSearch;
  };

  $scope.redirectToRecipe = function(){
    $window.location.href='#!/recipe#top';
  };

  $scope.setSearchText = function(value) {
    CommonProp.setSearchText(value);
    $window.location.href='#!/recipe#top';
  };

  var fetchcartRef = firebase.database().ref().child('/ShoppingCart/Cart1');
  $scope.cartInfo = $firebaseArray(fetchcartRef);

  fetchcartRef.on('value', function(snapshot) {
    $scope.totalQuantity = snapshot.val().totalQuantity;
  });
}])
