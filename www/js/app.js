'use strict';
var App;

App = (function() {
  function App() {
    return ['ionic', 'templates'];
  }

  return App;

})();

angular.module('balltoro', new App());

var Run;

Run = (function() {
  function Run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  }

  return Run;

})();

angular.module('balltoro').run(['$ionicPlatform', Run]);

var Config;

Config = (function() {
  function Config($stateProvider, $urlRouterProvider) {}

  return Config;

})();

angular.module('balltoro').config(['$stateProvider', '$urlRouterProvider', Config]);

var Routing;

Routing = (function() {
  function Routing($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'mainController'
    }).state('app.search', {
      url: '/search',
      views: {
        menuContent: {
          templateUrl: 'templates/search.html'
        }
      }
    }).state('app.browse', {
      url: '/browse',
      views: {
        menuContent: {
          templateUrl: 'templates/browse.html'
        }
      }
    }).state('app.playlists', {
      url: '/playlists',
      views: {
        menuContent: {
          templateUrl: 'templates/playlists.html',
          controller: 'playlistsController'
        }
      }
    }).state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        menuContent: {
          templateUrl: 'templates/playlist.html',
          controller: 'playlistController'
        }
      }
    });
    $urlRouterProvider.otherwise('/app/playlists');
    return;
  }

  return Routing;

})();

angular.module('balltoro').config(['$stateProvider', '$urlRouterProvider', Routing]);

var Main;

Main = (function() {
  function Main($scope, $ionicModal, $timeout) {
    $scope.loginData = {};
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      return $scope.modal = modal;
    });
    $scope.closeLogin = function() {
      return $scope.modal.hide();
    };
    $scope.login = function() {
      return $scope.modal.show();
    };
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);
      return $timeout(function() {
        return $scope.closeLogin();
      }, 1000);
    };
  }

  return Main;

})();

angular.module('balltoro').controller('mainController', ['$scope', '$ionicModal', '$timeout', Main]);

var Playlist;

Playlist = (function() {
  function Playlist() {}

  return Playlist;

})();

angular.module('balltoro').controller('playlistController', [Playlist]);

var Playlists;

Playlists = (function() {
  function Playlists() {
    this.playlists = [
      {
        title: 'Reggae',
        id: 1
      }, {
        title: 'Chill',
        id: 2
      }, {
        title: 'Dubstep',
        id: 3
      }, {
        title: 'Indie',
        id: 4
      }, {
        title: 'Rap',
        id: 5
      }, {
        title: 'Cowbell',
        id: 6
      }
    ];
  }

  return Playlists;

})();

angular.module('balltoro').controller('playlistsController', [Playlists]);
