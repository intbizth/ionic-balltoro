'use strict';
(function () {
    var App;
    App = function () {
        function App() {
            return [
                'ionic',
                'ngCordova',
                'templates',
                'ngCordovaOauth'
            ];
        }
        return App;
    }();
    angular.module('balltoro', new App());
}.call(this));
(function () {
    var TORO;
    TORO = function () {
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
                            baseUrl: 'http://demo.balltoro.com/api/',
                            proxy: ''
                        }
                    },
                    prod: {
                        api: {
                            baseUrl: 'http://api.balltoro.com/api/',
                            proxy: ''
                        }
                    },
                    sim: {
                        api: {
                            baseUrl: 'http://demo.balltoro.com/api/',
                            proxy: ''
                        }
                    }
                },
                API: function (path) {
                    return this.ENVIRONMENT.dev.api.baseUrl + path;
                }
            };
        }
        return TORO;
    }();
    angular.module('balltoro').constant('TORO', TORO());
}.call(this));
(function () {
    var Run;
    Run = function () {
        function Run($rootScope, $ionicPlatform, $location, $cordovaKeyboard, $cordovaToast, LogLine) {
            $rootScope.$spinnerIcon = 'ripple';
            LogLine.len(32).startup();
            $ionicPlatform.ready(function () {
                LogLine.ready();
                if (window.cordova) {
                    $cordovaKeyboard.hideAccessoryBar(true);
                    $cordovaKeyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    return StatusBar.styleDefault();
                }
            });
        }
        return Run;
    }();
    angular.module('balltoro').run([
        '$rootScope',
        '$ionicPlatform',
        '$location',
        '$cordovaKeyboard',
        '$cordovaToast',
        'LogLine',
        Run
    ]);
}.call(this));
(function () {
    var Config;
    Config = function () {
        /**
     * @param {object} $stateProvider
     * @param {object} $urlRouterProvider
     * @param {object} $ionicConfigProvider See http://ionicframework.com/docs/api/provider/$ionicConfigProvider/
     */
        function Config(TORO, $ionicConfigProvider, $ionicLoadingConfig) {
            $ionicLoadingConfig.template = '<ion-spinner icon="lines"></ion-spinner>';
        }
        return Config;
    }();
    angular.module('balltoro').config([
        'TORO',
        '$ionicConfigProvider',
        '$ionicLoadingConfig',
        Config
    ]);
}.call(this));
(function () {
    var Routing;
    Routing = function () {
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
                views: { menuContent: { templateUrl: 'templates/search.html' } }
            }).state('app.browse', {
                url: '/browse',
                views: { menuContent: { templateUrl: 'templates/browse.html' } }
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
    }();
    angular.module('balltoro').config([
        '$stateProvider',
        '$urlRouterProvider',
        Routing
    ]);
}.call(this));
(function () {
    var NgBackbone;
    NgBackbone = function () {
        function NgBackbone($http, _) {
            var http, methodMap, sync;
            methodMap = {
                create: 'POST',
                update: 'PUT',
                patch: 'PATCH',
                'delete': 'DELETE',
                read: 'GET'
            };
            http = function () {
                return $http.apply($http, arguments);
            };
            sync = function (method, model, options) {
                var httpMethod, params, xhr;
                if (_.isUndefined(options)) {
                    options = {};
                }
                httpMethod = options.method || methodMap[method];
                params = { method: httpMethod };
                if (!options.url && !_.isUndefined(model.url)) {
                    params.url = model.url;
                }
                if (_.isUndefined(options.data) && model && (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH')) {
                    params.data = angular.toJson(options.attrs || model.toJSON(options));
                }
                if (httpMethod === 'GET' && !_.isUndefined(options.data)) {
                    params.params = options.data;
                }
                xhr = http(_.extend(params, options));
                xhr.then(function (data, status, headers, config) {
                    options.xhr = {
                        status: status,
                        headers: headers,
                        config: config
                    };
                    if (!_.isUndefined(options.success) && _.isFunction(options.success)) {
                        options.success(data);
                    }
                });
                xhr['catch'](function (data, status, headers, config) {
                    options.xhr = {
                        status: status,
                        headers: headers,
                        config: config
                    };
                    if (!_.isUndefined(options.error) && _.isFunction(options.error)) {
                        options.error(data);
                    }
                });
                model.trigger('request', model, xhr, _.extend(params, options));
                return xhr;
            };
            return _.extend(Backbone, {
                sync: sync,
                ajax: http
            });
        }
        return NgBackbone;
    }();
    angular.module('balltoro').factory('NgBackbone', [
        '$http',
        '_',
        NgBackbone
    ]);
}.call(this));
(function () {
    var NgBackboneCollection;
    NgBackboneCollection = function () {
        function NgBackboneCollection(TORO, NgBackbone, NgBackboneModel, $rootScope, $ionicLoading, _) {
            var BASE_URL, PROXY;
            PROXY = TORO.ENVIRONMENT.dev.api.proxy;
            BASE_URL = TORO.ENVIRONMENT.dev.api.baseUrl;
            return NgBackbone.PageableCollection.extend({
                model: NgBackboneModel,
                mode: 'infinite',
                state: {
                    pageSize: 10,
                    total: 0
                },
                queryParams: {
                    pageSize: 'limit',
                    totalRecords: 'total',
                    totalPages: 'pages'
                },
                constructor: function () {
                    Object.defineProperty(this, '$collection', {
                        enumerable: false,
                        get: function (_this) {
                            return function () {
                                if (_this.mode === 'infinite') {
                                    return _this.fullCollection.models;
                                }
                                return _this.models;
                            };
                        }(this)
                    });
                    this.$status = {
                        deleting: false,
                        loading: false,
                        saving: false,
                        syncing: false
                    };
                    this.on('request', function (model, xhr, options) {
                        var method;
                        method = options.method.toUpperCase();
                        return this.setStatus({
                            deleting: method === 'DELETE',
                            loading: method === 'GET',
                            saving: method === 'POST' || method === 'PUT',
                            syncing: false
                        });
                    });
                    this.on('sync error', this.resetStatus);
                    this.on('destroy', this.resetStatus);
                    this.on('sync', function () {
                        if (this.mode === 'infinite') {
                            return $rootScope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    });
                    NgBackbone.PageableCollection.apply(this, arguments);
                },
                parseState: function (resp, queryParams, state, options) {
                    this.state.total = resp.data.total;
                    this.state.totalPages = resp.data.pages;
                    return this.state;
                },
                parseLinks: function (resp, options) {
                    var defs, first, next, previous, _links;
                    _links = _.result(resp.data, '_links');
                    if (_links) {
                        defs = { href: '' };
                        first = _.result(_links, 'first', defs);
                        next = _.result(_links, 'next', defs);
                        previous = _.result(_links, 'previous', defs);
                        return {
                            first: first.href,
                            next: next.href,
                            prev: previous
                        };
                    } else {
                        return NgBackbone.PageableCollection.prototype.parseLinks.apply(this, arguments);
                    }
                },
                parseRecords: function (resp) {
                    var data;
                    data = _.result(resp.data, '_embedded');
                    if (data) {
                        return data.items;
                    }
                    return resp.data;
                },
                hasMorePage: function () {
                    return this.state.total > 0 && this.state.total > this.state.totalRecords;
                },
                setStatus: function (key, value, options) {
                    var attr, attrs;
                    if (_.isUndefined(key)) {
                        return this;
                    }
                    if (_.isObject(key)) {
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
                resetStatus: function () {
                    return this.setStatus({
                        deleting: false,
                        loading: false,
                        saving: false,
                        syncing: false
                    });
                },
                getCollection: function () {
                    return this.$collection;
                },
                /*
         * Shortcut to fetch collection.
         *
         * @param {object} options The `options` can be `$scope` for short-hand or
         *    {
         *        scope: $scope
         *        storeKey: 'store' # the name to be used in view.
         *        collectionKey: 'collection' # the name to be used in view.
         *    }
         */
                load: function (options) {
                    var $scope;
                    $scope = options.scope || options;
                    $scope[options.storeKey || 'store'] = this;
                    this.on('sync', function (model) {
                        $scope[options.collectionKey || 'collection'] = model.$collection;
                        return $ionicLoading.hide();
                    });
                    $ionicLoading.show();
                    this.getFirstPage();
                    return this;
                }
            });
        }
        return NgBackboneCollection;
    }();
    angular.module('balltoro').factory('NgBackboneCollection', [
        'TORO',
        'NgBackbone',
        'NgBackboneModel',
        '$rootScope',
        '$ionicLoading',
        '_',
        NgBackboneCollection
    ]);
}.call(this));
(function () {
    var NgBackboneModel;
    NgBackboneModel = function () {
        function NgBackboneModel($rootScope, NgBackbone) {
            var propertyAccessor, propertyQuickAccessor;
            propertyAccessor = function (key) {
                Object.defineProperty(this.$attributes, key, {
                    enumerable: true,
                    configurable: true,
                    get: function (_this) {
                        return function () {
                            return _this.get(key);
                        };
                    }(this),
                    set: function (_this) {
                        return function (newValue) {
                            _this.set(key, newValue);
                        };
                    }(this)
                });
            };
            propertyQuickAccessor = function (key) {
                Object.defineProperty(this, key, {
                    enumerable: true,
                    configurable: true,
                    get: function (_this) {
                        return function () {
                            if (!_.isUndefined(_this.attributes[key])) {
                                return _this.$attributes[key];
                            } else {
                                return _this[key];
                            }
                        };
                    }(this),
                    set: function (_this) {
                        return function (newValue) {
                            if (!_.isUndefined(_this.attributes[key])) {
                                _this.attributes[key] = newValue;
                            } else {
                                _this[key] = newValue;
                            }
                        };
                    }(this)
                });
            };
            return NgBackbone.RelationalModel.extend({
                constructor: function () {
                    this.$status = {
                        deleting: false,
                        loading: false,
                        saving: false,
                        syncing: false
                    };
                    this.on('request', function (model, xhr, options) {
                        var method;
                        method = options.method.toUpperCase();
                        return this.setStatus({
                            deleting: method === 'DELETE',
                            loading: method === 'GET',
                            saving: method === 'POST' || method === 'PUT',
                            syncing: true
                        });
                    });
                    this.on('sync error', this.resetStatus);
                    return NgBackbone.RelationalModel.apply(this, arguments);
                },
                set: function (key, val, options) {
                    var output;
                    output = NgBackbone.RelationalModel.prototype.set.apply(this, arguments);
                    this.setBinding(key, val, options);
                    return output;
                },
                setStatus: function (key, value, options) {
                    var attr, attrs;
                    if (_.isUndefined(key)) {
                        return this;
                    }
                    if (_.isObject(key)) {
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
                resetStatus: function () {
                    return this.setStatus({
                        deleting: false,
                        loading: false,
                        saving: false,
                        syncing: false
                    });
                },
                setBinding: function (key, val, options) {
                    var attr, attrs, unset;
                    if (_.isUndefined(key)) {
                        return this;
                    }
                    if (_.isObject(key)) {
                        attrs = key;
                        options = val;
                    } else {
                        (attrs = {})[key] = val;
                    }
                    options = options || {};
                    if (_.isUndefined(this.$attributes)) {
                        this.$attributes = {};
                    }
                    unset = options.unset;
                    for (attr in attrs) {
                        if (unset && this.$attributes.hasOwnProperty(attr)) {
                            delete this.$attributes[attr];
                        } else if (!unset && !this.$attributes[attr]) {
                            propertyAccessor.call(this, attr);
                            propertyQuickAccessor.call(this, attr);
                        }
                    }
                    return this;
                },
                removeBinding: function (attr, options) {
                    return this.setBinding(attr, void 0, _.extend({}, options, { unset: true }));
                }
            });
        }
        return NgBackboneModel;
    }();
    angular.module('balltoro').factory('NgBackboneModel', [
        '$rootScope',
        'NgBackbone',
        NgBackboneModel
    ]);
}.call(this));
(function () {
    var Club, Clubs;
    Clubs = function () {
        function Clubs(TORO, NgBackboneCollection, Club) {
            return NgBackboneCollection.extend({
                model: Club,
                url: TORO.API('clubs/')
            });
        }
        return Clubs;
    }();
    Club = function () {
        function Club(NgBackboneModel, _) {
            return NgBackboneModel.extend({
                defaults: { _links: null },
                getLogo: function (size) {
                    var logo;
                    logo = _.isUndefined(size) || _.isUndefined(this._links['logo_' + size]) ? this._links.logo : this._links['logo_' + size];
                    return _.result(logo, 'href');
                }
            });
        }
        return Club;
    }();
    angular.module('balltoro').factory('Clubs', [
        'TORO',
        'NgBackboneCollection',
        'Club',
        Clubs
    ]).factory('Club', [
        'NgBackboneModel',
        '_',
        Club
    ]);
}.call(this));
(function () {
    var Match, Matches;
    Matches = function () {
        function Matches(TORO, NgBackboneCollection, Match) {
            return NgBackboneCollection.extend({
                model: Match,
                url: TORO.API('matches/')
            });
        }
        return Matches;
    }();
    Match = function () {
        function Match(NgBackboneModel, Club, Clubs) {
            return NgBackboneModel.extend({
                relations: [
                    {
                        type: 'HasOne',
                        key: 'home_club',
                        relatedModel: Club
                    },
                    {
                        type: 'HasOne',
                        key: 'away_club',
                        relatedModel: Club
                    }
                ]
            });
        }
        return Match;
    }();
    angular.module('balltoro').factory('Matches', [
        'TORO',
        'NgBackboneCollection',
        'Match',
        Matches
    ]).factory('Match', [
        'NgBackboneModel',
        'Club',
        'Clubs',
        Match
    ]);
}.call(this));
/**
 * NOTE:
 *   With the new view caching in Ionic, Controllers are only called
 *   when they are recreated or on app start, instead of every page change.
 *   To listen for when this page is active (for example, to refresh data),
 *   listen for the $ionicView.enter event:
 *     $scope.$on('$ionicView.enter', function(e) {
 *     });
 */
(function () {
    var Main;
    Main = function () {
        function Main($scope, $ionicModal, $timeout, $cordovaOauth) {
            this.scope = $scope;
            this.modal = $ionicModal;
            this.timeout = $timeout;
            this.oauth = $cordovaOauth;
            this.setupLogin(this.scope);
        }
        Main.prototype.setupLogin = function ($scope) {
            $scope.loginData = {};
            this.modal.fromTemplateUrl('templates/login.html', { scope: $scope }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.closeLogin = function () {
                return $scope.modal.hide();
            };
            $scope.login = function () {
                return $scope.modal.show();
            };
            $scope.doLogin = function (_this) {
                return function () {
                    console.log('Doing login', $scope.loginData);
                    return _this.oauth.github('2aee92f1bde492399bf4', 'x', ['email'], { redirect_uri: 'http://d3c2cde1.ngrok.io' }).then(function (result) {
                        return console.info(angular.toJson(result));
                    }, function (error) {
                        return console.log(angular.toJson(error));
                    });
                };
            }(this);
        };
        return Main;
    }();
    angular.module('balltoro').controller('mainController', [
        '$scope',
        '$ionicModal',
        '$timeout',
        '$cordovaOauth',
        Main
    ]);
}.call(this));
(function () {
    var Match;
    Match = function () {
        function Match($scope, Matches) {
            new Matches().load($scope);
        }
        return Match;
    }();
    angular.module('balltoro').controller('matchController', [
        '$scope',
        'Matches',
        Match
    ]);
}.call(this));
(function () {
    var Playlist;
    Playlist = function () {
        function Playlist() {
        }
        return Playlist;
    }();
    angular.module('balltoro').controller('playlistController', [Playlist]);
}.call(this));
(function () {
    var Playlists;
    Playlists = function () {
        function Playlists($scope) {
            $scope.playlists = [
                {
                    title: 'Reggae',
                    id: 1
                },
                {
                    title: 'Chill',
                    id: 2
                },
                {
                    title: 'Dubstep',
                    id: 3
                },
                {
                    title: 'Indie',
                    id: 4
                },
                {
                    title: 'Rap',
                    id: 5
                },
                {
                    title: 'Cowbell',
                    id: 6
                }
            ];
        }
        return Playlists;
    }();
    angular.module('balltoro').controller('playlistsController', [
        '$scope',
        Playlists
    ]);
}.call(this));
(function () {
    var LogLine;
    LogLine = function () {
        function LogLine() {
            var appName, brandName, defaultLen, defaultSymbol;
            defaultLen = 32;
            defaultSymbol = '.';
            appName = 'TORO';
            brandName = 'INTBIZTH';
            return {
                appName: function (appName) {
                    appName = appName;
                    return this;
                },
                brandName: function (brandName) {
                    brandName = brandName;
                    return this;
                },
                len: function (len) {
                    defaultLen = len;
                    return this;
                },
                symbol: function (symbol) {
                    defaultSymbol = symbol;
                    return this;
                },
                platform: function () {
                    return this.print([ionic.Platform.platform().toUpperCase()], defaultLen, defaultSymbol, defaultSymbol);
                },
                brand: function () {
                    return this.print(brandName + ' - MOBILE', defaultLen, defaultSymbol);
                },
                app: function () {
                    return this.print(appName + ' APP STARTED', defaultLen, defaultSymbol);
                },
                rockNroll: function () {
                    return this.print('Rock \'n Roll!! READY.', defaultLen, defaultSymbol);
                },
                footer: function () {
                    return this.print(defaultSymbol, defaultLen, defaultSymbol, defaultSymbol);
                },
                startup: function () {
                    this.platform();
                    this.brand();
                    return this.app();
                },
                ready: function () {
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
                print: function (text, len, symbol, spacing) {
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
    }();
    angular.module('balltoro').factory('LogLine', [LogLine]);
}.call(this));
(function () {
    var _;
    _ = function () {
        function _() {
            return window._;
        }
        return _;
    }();
    angular.module('balltoro').factory('_', [_]);
}.call(this));
(function () {
    var Auth;
    Auth = function () {
        function Auth() {
            this.$get = function () {
            };
        }
        return Auth;
    }();
    angular.module('balltoro').provider('authProvider', [Auth]);
}.call(this));
(function () {
    var FacebookAuth;
    FacebookAuth = function () {
        function FacebookAuth() {
            this.$get = function () {
            };
        }
        return FacebookAuth;
    }();
    angular.module('balltoro').provider('facebookAuthProvider', [FacebookAuth]);
}.call(this));
(function () {
    var ToroAuth;
    ToroAuth = function () {
        function ToroAuth() {
            this.$get = function () {
            };
        }
        return ToroAuth;
    }();
    angular.module('balltoro').provider('toroAuthProvider', [ToroAuth]);
}.call(this));