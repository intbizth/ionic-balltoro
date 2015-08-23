'use strict';
(function() {
  var App;

  App = (function() {
    function App() {
      return ['ionic', 'templates', 'js-data', 'ngCordovaOauth'];
    }

    return App;

  })();

  angular.module('balltoro', new App());

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
        },
        ENVIRONMENT: {
          dev: {
            api: {
              baseUrl: ''
            }
          },
          prod: {
            api: {
              baseUrl: 'http://api.balltoro.com'
            }
          },
          sim: {
            api: {
              baseUrl: 'http://demo.balltoro.com'
            }
          }
        }
      };
    }

    return TORO;

  })();

  angular.module('balltoro').constant('TORO', TORO());

}).call(this);

(function() {
  var Run;

  Run = (function() {
    function Run($rootScope, $ionicPlatform, $location, LogLine) {
      LogLine.len(32).startup();
      $ionicPlatform.ready(function() {
        LogLine.ready();
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

  angular.module('balltoro').run(['$rootScope', '$ionicPlatform', '$location', 'LogLine', Run]);

}).call(this);

(function() {
  var Config;

  Config = (function() {

    /**
     * @param {object} $stateProvider
     * @param {object} $urlRouterProvider
     * @param {object} $ionicConfigProvider See http://ionicframework.com/docs/api/provider/$ionicConfigProvider/
     */
    function Config(TORO, $ionicConfigProvider, DSProvider, DSHttpAdapterProvider) {
      var config;
      config = $ionicConfigProvider;
      angular.extend(DSProvider.defaults, {});
      angular.extend(DSHttpAdapterProvider.defaults, {
        basePath: TORO.ENVIRONMENT['dev'].api.baseUrl,
        forceTrailingSlash: true
      });
    }

    return Config;

  })();

  angular.module('balltoro').config(['TORO', '$ionicConfigProvider', 'DSProvider', 'DSHttpAdapterProvider', Config]);

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
      }).state('app.matches', {
        url: '/matches',
        views: {
          menuContent: {
            controller: 'matchController',
            templateUrl: 'templates/matches.html'
          }
        }
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
            controller: 'playlistsController',
            templateUrl: 'templates/playlists.html'
          }
        }
      }).state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          menuContent: {
            controller: 'playlistController',
            templateUrl: 'templates/playlist.html'
          }
        }
      });
      $urlRouterProvider.otherwise('/app/matches');
      return;
    }

    return Routing;

  })();

  angular.module('balltoro').config(['$stateProvider', '$urlRouterProvider', Routing]);

}).call(this);


/**
    @modifiedBy liverbool <nukboon@gmail.com>
    @origin     https://github.com/adrianlee44/ng-backbone
 */

(function() {
  var NgBackbone;

  NgBackbone = (function() {
    function NgBackbone($http) {
      var ajax, methodMap, processResponse, sync;
      methodMap = {
        create: 'POST',
        update: 'PUT',
        patch: 'PATCH',
        "delete": 'DELETE',
        read: 'GET'
      };
      processResponse = function(response) {
        if (angular.isDefined(response.data._embedded)) {
          response.data = response.data._embedded.items;
        }
        return response.data;
      };
      ajax = function() {
        return $http.apply($http, arguments);
      };
      sync = function(method, model, options) {
        var httpMethod, params, xhr;
        if (angular.isUndefined(options)) {
          options = {};
        }
        httpMethod = options.method || methodMap[method];
        params = {
          method: httpMethod
        };
        if (!options.url && angular.isDefined(model.url)) {
          params.url = model.url;
        }
        if (angular.isUndefined(options.data) && model && (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH')) {
          params.data = angular.toJson(options.attrs || model.toJSON(options));
        }
        if (httpMethod === 'GET' && angular.isDefined(options.data)) {
          params.params = options.data;
        }
        xhr = ajax(angular.extend(params, options));
        xhr.then(function(data, status, headers, config) {
          options.xhr = {
            status: status,
            headers: headers,
            config: config
          };
          if (angular.isDefined(options.success) && angular.isFunction(options.success)) {
            options.success(processResponse(data));
          }
        });
        xhr["catch"](function(data, status, headers, config) {
          options.xhr = {
            status: status,
            headers: headers,
            config: config
          };
          if (angular.isDefined(options.error) && angular.isFunction(options.error)) {
            options.error(data);
          }
        });
        model.trigger('request', model, xhr, angular.extend(params, options));
        return xhr;
      };
      return angular.extend(Backbone, {
        sync: sync,
        ajax: ajax
      });
    }

    return NgBackbone;

  })();

  angular.module('balltoro').factory('NgBackbone', ['$http', NgBackbone]);

}).call(this);


/**
    @modifiedBy liverbool <nukboon@gmail.com>
    @origin     https://github.com/adrianlee44/ng-backbone
 */

(function() {
  var NgBackboneCollection;

  NgBackboneCollection = (function() {
    function NgBackboneCollection(NgBackbone, NgBackboneModel) {
      return NgBackbone.Collection.extend({
        model: NgBackboneModel,
        constructor: function() {
          this.$status = {
            deleting: false,
            loading: false,
            saving: false,
            syncing: false
          };
          this.on('request', function(model, xhr, options) {
            this.$setStatus({
              deleting: options.method === 'DELETE',
              loading: options.method === 'GET',
              saving: options.method === 'POST' || options.method === 'PUT',
              syncing: false
            });
          });
          this.on('sync error', this.$resetStatus);
          this.on('destroy', this.$resetStatus);
          Object.defineProperty(this, '$collection', {
            enumerable: false,
            get: (function(_this) {
              return function() {
                return _this.models;
              };
            })(this)
          });
          NgBackbone.Collection.apply(this, arguments);
        },
        $setStatus: function(key, value, options) {
          var attr, attrs;
          if (angular.isUndefined(key)) {
            return this;
          }
          if (angular.isObject(key)) {
            attrs = key;
            options = value;
          } else {
            (attrs = {})[key] = value;
          }
          options = options || {};
          for (attr in this.$status) {
            if (attrs.hasOwnProperty(attr) && _.isBoolean(attrs[attr])) {
              this.$status[attr] = attrs[attr];
            }
          }
        },
        $resetStatus: function() {
          return this.$setStatus({
            deleting: false,
            loading: false,
            saving: false,
            syncing: false
          });
        },
        getCollection: function() {
          return this.$collection;
        }
      });
    }

    return NgBackboneCollection;

  })();

  angular.module('balltoro').factory('NgBackboneCollection', ['NgBackbone', 'NgBackboneModel', NgBackboneCollection]);

}).call(this);


/**
    @modifiedBy liverbool <nukboon@gmail.com>
    @origin     https://github.com/adrianlee44/ng-backbone
 */

(function() {
  var NgBackboneModel;

  NgBackboneModel = (function() {
    function NgBackboneModel($rootScope, NgBackbone) {
      var defineProperty, definePropertyQuickAccessor;
      defineProperty = function(key) {
        Object.defineProperty(this.$attributes, key, {
          enumerable: true,
          configurable: true,
          get: (function(_this) {
            return function() {
              return _this.get(key);
            };
          })(this),
          set: (function(_this) {
            return function(newValue) {
              _this.set(key, newValue);
            };
          })(this)
        });
      };
      definePropertyQuickAccessor = function(key) {
        Object.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          get: (function(_this) {
            return function() {
              if (angular.isDefined(_this.attributes[key])) {
                return _this.$attributes[key];
              } else {
                return _this[key];
              }
            };
          })(this),
          set: (function(_this) {
            return function(newValue) {
              if (angular.isDefined(_this.attributes[key])) {
                _this.attributes[key] = newValue;
              } else {
                _this[key] = newValue;
              }
            };
          })(this)
        });
      };
      return NgBackbone.RelationalModel.extend({
        constructor: function() {
          this.$status = {
            deleting: false,
            loading: false,
            saving: false,
            syncing: false
          };
          this.on('request', function(model, xhr, options) {
            this.$setStatus({
              deleting: options.method === 'DELETE',
              loading: options.method === 'GET',
              saving: options.method === 'POST' || options.method === 'PUT',
              syncing: true
            });
          });
          this.on('sync error', this.$resetStatus);
          return NgBackbone.RelationalModel.apply(this, arguments);
        },
        set: function(key, val, options) {
          var output;
          output = NgBackbone.RelationalModel.prototype.set.apply(this, arguments);
          this.$setBinding(key, val, options);
          return output;
        },
        $resetStatus: function() {
          return this.$setStatus({
            deleting: false,
            loading: false,
            saving: false,
            syncing: false
          });
        },
        $setBinding: function(key, val, options) {
          var attr, attrs, unset;
          if (angular.isUndefined(key)) {
            return this;
          }
          if (angular.isObject(key)) {
            attrs = key;
            options = val;
          } else {
            (attrs = {})[key] = val;
          }
          options = options || {};
          if (angular.isUndefined(this.$attributes)) {
            this.$attributes = {};
          }
          unset = options.unset;
          for (attr in attrs) {
            if (unset && this.$attributes.hasOwnProperty(attr)) {
              delete this.$attributes[attr];
            } else if (!unset && !this.$attributes[attr]) {
              defineProperty.call(this, attr);
              definePropertyQuickAccessor.call(this, attr);
            }
          }
          return this;
        },
        $setStatus: function(key, value, options) {
          var attr, attrs;
          if (angular.isUndefined(key)) {
            return this;
          }
          if (angular.isObject(key)) {
            attrs = key;
            options = value;
          } else {
            (attrs = {})[key] = value;
          }
          options = options || {};
          for (attr in this.$status) {
            if (attrs.hasOwnProperty(attr) && _.isBoolean(attrs[attr])) {
              this.$status[attr] = attrs[attr];
            }
          }
        },
        $removeBinding: function(attr, options) {
          return this.$setBinding(attr, void 0, angular.extend({}, options, {
            unset: true
          }));
        }
      });
    }

    return NgBackboneModel;

  })();

  angular.module('balltoro').factory('NgBackboneModel', ['$rootScope', 'NgBackbone', NgBackboneModel]);

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
    function Main($scope, $ionicModal, $timeout, $cordovaOauth) {
      this.scope = $scope;
      this.modal = $ionicModal;
      this.timeout = $timeout;
      this.oauth = $cordovaOauth;
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
      $scope.doLogin = (function(_this) {
        return function() {
          console.log('Doing login', $scope.loginData);
          return _this.oauth.github('2aee92f1bde492399bf4', '7f8515bf6f25eda295a96c9e25317eef5a686878', ['email'], {
            redirect_uri: 'http://d3c2cde1.ngrok.io'
          }).then(function(result) {
            return console.info(angular.toJson(result));
          }, function(error) {
            return console.log(angular.toJson(error));
          });
        };
      })(this);
    };

    return Main;

  })();

  angular.module('balltoro').controller('mainController', ['$scope', '$ionicModal', '$timeout', '$cordovaOauth', Main]);

}).call(this);

(function() {
  var Match;

  Match = (function() {
    function Match($scope, Matches, $log, $ionicLoading) {
      var promise;
      promise = new Matches().fetch({
        success: function(data) {
          return $scope.matches = data.$collection;
        }
      });
    }

    return Match;

  })();

  angular.module('balltoro').controller('matchController', ['$scope', 'Matches', '$log', '$ionicLoading', Match]);

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
    function Playlists($scope) {
      $scope.playlists = [
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

  angular.module('balltoro').controller('playlistsController', ['$scope', Playlists]);

}).call(this);

(function() {
  var LogLine;

  LogLine = (function() {
    function LogLine() {
      var appName, brandName, defaultLen, defaultSymbol;
      defaultLen = 32;
      defaultSymbol = '.';
      appName = 'TORO';
      brandName = 'INTBIZTH';
      return {
        appName: function(appName) {
          appName = appName;
          return this;
        },
        brandName: function(brandName) {
          brandName = brandName;
          return this;
        },
        len: function(len) {
          defaultLen = len;
          return this;
        },
        symbol: function(symbol) {
          defaultSymbol = symbol;
          return this;
        },
        platform: function() {
          return this.print([ionic.Platform.platform().toUpperCase()], defaultLen, defaultSymbol, defaultSymbol);
        },
        brand: function() {
          return this.print(brandName + ' - MOBILE', defaultLen, defaultSymbol);
        },
        app: function() {
          return this.print(appName + ' APP STARTED', defaultLen, defaultSymbol);
        },
        rockNroll: function() {
          return this.print('Rock \'n Roll!! READY.', defaultLen, defaultSymbol);
        },
        footer: function() {
          return this.print(defaultSymbol, defaultLen, defaultSymbol, defaultSymbol);
        },
        startup: function() {
          this.platform();
          this.brand();
          return this.app();
        },
        ready: function() {
          this.rockNroll();
          return this.footer();
        },

        /**
         * Print log text.
         *
         * @param {string|array} text Display text, an array given will add padding aroun text.
         * @param {int} len Block width.
         * @param {string} symbol The symbol text.
         * @param {string} spacing Spacing for print text.
         */
        print: function(text, len, symbol, spacing) {
          var odd, str1, str2;
          if (typeof text === 'object') {
            text = ' ' + text[0] + ' ';
          }
          if (!symbol) {
            symbol = '+';
          }
          if (!spacing) {
            spacing = ' ';
          }
          odd = text.length % 2 ? len : len - 1;
          str1 = str2 = Array(Math.ceil((odd - text.length) / 2)).join(spacing);
          if (odd === len) {
            str2 = str2.substr(1);
          }
          return console.log(symbol + str1 + text + str2 + symbol);
        }
      };
    }

    return LogLine;

  })();

  angular.module('balltoro').factory('LogLine', [LogLine]);

}).call(this);

(function() {
  var Club, Clubs;

  Clubs = (function() {
    function Clubs(NgBackboneCollection, Club) {
      return NgBackboneCollection.extend({
        model: Club
      });
    }

    return Clubs;

  })();

  Club = (function() {
    function Club(NgBackboneModel) {
      return NgBackboneModel.extend({
        defaults: {
          _links: null
        },
        getLogo: function(size) {
          var logo;
          if (angular.isUndefined(size)) {
            logo = this._links.logo;
          }
          if (angular.isUndefined(this._links['logo_' + size])) {
            logo = this._links.logo;
          }
          logo = this._links['logo_' + size];
          if (logo != null) {
            return logo.href;
          } else {
            return null;
          }
        }
      });
    }

    return Club;

  })();

  angular.module('balltoro').factory('Clubs', ['NgBackboneCollection', 'Club', Clubs]).factory('Club', ['NgBackboneModel', Club]);

}).call(this);

(function() {
  var Match, Matches;

  Matches = (function() {
    function Matches(NgBackboneCollection, Match) {
      return NgBackboneCollection.extend({
        model: Match,
        url: '/api/matches/'
      });
    }

    return Matches;

  })();

  Match = (function() {
    function Match(NgBackboneModel, Club, Clubs) {
      return NgBackboneModel.extend({
        relations: [
          {
            type: 'HasOne',
            key: 'home_club',
            relatedModel: Club
          }, {
            type: 'HasOne',
            key: 'away_club',
            relatedModel: Club
          }
        ]
      });
    }

    return Match;

  })();

  angular.module('balltoro').factory('Matches', ['NgBackboneCollection', 'Match', Matches]).factory('Match', ['NgBackboneModel', 'Club', 'Clubs', Match]);

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

(function() {
  var Store;

  Store = (function() {
    function Store() {
      var doRefresh;
      doRefresh = function(DS) {
        return console.log(DS);
      };
      this.apiBasePath = '/api/';
      this["default"] = {
        loadingIndicator: null,
        refreshMode: 'infinite',
        deserialize: function(model, response) {
          if (typeof response.data._embedded === 'object') {
            return response.data._embedded.items;
          } else {
            return response.data;
          }
        },
        load: function(args) {
          var $scope, loading, options, params, promise, resourceName;
          args = args || {};
          $scope = args.scope || null;
          params = args.params || {};
          options = args.options || {};
          resourceName = pluralize(this.name);
          loading = {
            enable: args.indicator !== false,
            indicator: this.loadingIndicator,
            start: function() {
              if (this.enable) {
                return this.indicator.show({
                  template: 'Loading...'
                });
              }
            },
            stop: function() {
              if (this.enable) {
                return this.indicator.hide();
              }
            }
          };
          if ($scope) {
            $scope.refresh = function() {
              return doRefresh(this);
            };
          }
          loading.start();
          promise = this.findAll(params, options);
          promise.then(function(data) {
            loading.stop();
            if ($scope) {
              $scope[resourceName] = data;
            }
          });
          promise["catch"](function() {
            loading.stop();
            if ($scope) {
              $scope[resourceName] = null;
            }
          });
          return promise;
        }
      };
      this.$get = function(DS, $ionicLoading) {
        this["default"].loadingIndicator = $ionicLoading;
        this.define = function(config) {
          if (typeof config === 'string') {
            config = {
              name: config
            };
          }
          this["default"].endpoint = this.apiBasePath + pluralize(config.name);
          return DS.defineResource(angular.extend(this["default"], config));
        };
        return this;
      };
    }

    return Store;

  })();

  angular.module('balltoro').provider('storeProvider', [Store]);

}).call(this);
