'use strict';
(function() {
  var App;

  App = (function() {
    function App() {
      return ['ionic', 'templates'];
    }

    return App;

  })();

  angular.module('balltoro', new App());

}).call(this);

(function() {
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

}).call(this);

(function() {
  var TORO;

  TORO = (function() {
    function TORO() {
      return {
        VERSION: '0.0.1',
        HTTP_STATUS_CODES: {
          '401': 'Unauthorized',
          '403': 'Forbidden',
          '404': 'Not Found'
        }
      };
    }

    return TORO;

  })();

  angular.module('balltoro').constant('TORO', TORO());

}).call(this);

(function() {
  var Config;

  Config = (function() {

    /**
     * @param {object} $stateProvider
     * @param {object} $urlRouterProvider
     * @param {object} $ionicConfigProvider See http://ionicframework.com/docs/api/provider/$ionicConfigProvider/
     */
    function Config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
      var config, routor, state;
      state = $stateProvider;
      routor = $urlRouterProvider;
      config = $ionicConfigProvider;
    }

    return Config;

  })();

  angular.module('balltoro').config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', Config]);

}).call(this);

(function() {
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

}).call(this);


/**
 * NOTE:
 *   With the new view caching in Ionic, Controllers are only called
 *   when they are recreated or on app start, instead of every page change.
 *   To listen for when this page is active (for example, to refresh data),
 *   listen for the $ionicView.enter event:
 *     $scope.$on('$ionicView.enter', function(e) {
 *     });
 */

(function() {
  var Main;

  Main = (function() {
    function Main($scope, $ionicModal, $timeout) {
      this.scope = $scope;
      this.modal = $ionicModal;
      this.timeout = $timeout;
      this.setupLogin(this.scope);
    }

    Main.prototype.setupLogin = function($scope) {
      $scope.loginData = {};
      this.modal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.closeLogin = function() {
        return $scope.modal.hide();
      };
      $scope.login = function() {
        return $scope.modal.show();
      };
      $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        return this.timeout(function() {
          return $scope.closeLogin();
        }, 1000);
      };
    };

    return Main;

  })();

  angular.module('balltoro').controller('mainController', ['$scope', '$ionicModal', '$timeout', Main]);

}).call(this);

(function() {
  var Playlist;

  Playlist = (function() {
    function Playlist() {}

    return Playlist;

  })();

  angular.module('balltoro').controller('playlistController', [Playlist]);

}).call(this);

(function() {
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

}).call(this);

(function() {
  var Auth;

  Auth = (function() {
    function Auth() {
      this.$get = function() {};
    }

    return Auth;

  })();

  angular.module('balltoro').provider('authProvider', [Auth]);

}).call(this);

(function() {
  var FacebookAuth;

  FacebookAuth = (function() {
    function FacebookAuth() {
      this.$get = function() {};
    }

    return FacebookAuth;

  })();

  angular.module('balltoro').provider('facebookAuthProvider', [FacebookAuth]);

}).call(this);

(function() {
  var ToroAuth;

  ToroAuth = (function() {
    function ToroAuth() {
      this.$get = function() {};
    }

    return ToroAuth;

  })();

  angular.module('balltoro').provider('toroAuthProvider', [ToroAuth]);

}).call(this);
