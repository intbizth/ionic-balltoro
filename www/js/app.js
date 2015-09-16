'use strict';
(function () {
    var App;
    App = function () {
        function App() {
            return [
                'ionic',
                'pascalprecht.translate',
                'ngCordova',
                'ngMaterial',
                'templates',
                'ngCordovaOauth',
                'ngAnimate'
            ];
        }
        return App;
    }();
    angular.module('balltoro', new App());
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
            });    /*
      $rootScope.$on '$stateChangeStart', (event, toState, toParams, fromState, fromParams) ->
        console.log '$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams
        console.log arguments
        return
      $rootScope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams) ->
        console.log '$stateChangeError - fired when an error occurs during transition.'
        console.log arguments
        return
      $rootScope.$on '$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) ->
        console.log '$stateChangeSuccess to ' + toState.name + ' - fired once the state transition is complete.'
        console.log arguments
        return
       */
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
    var CFG;
    CFG = function () {
        function CFG() {
            var ApiConfig, Config;
            Config = {
                VERSION: '0.0.1',
                HTTP_STATUS_CODES: {
                    '401': 'Unauthorized',
                    '403': 'Forbidden',
                    '404': 'Not Found',
                    '500': 'Internal Service Error'
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
                }
            };
            ApiConfig = Config.ENVIRONMENT.dev.api;
            return angular.extend(Config, {
                API: {
                    getPath: function (path) {
                        return ApiConfig.baseUrl + path;
                    },
                    getProxy: function () {
                        return ApiConfig.proxy;
                    },
                    getBaseUrl: function () {
                        return ApiConfig.baseUrl;
                    }
                }
            });
        }
        return CFG;
    }();
    angular.module('balltoro').constant('CFG', CFG());
}.call(this));
(function () {
    var Routing;
    Routing = function () {
        function Routing($stateProvider, $urlRouterProvider) {
            var state;
            state = $stateProvider.state;
            state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/main.html',
                controller: 'mainController'
            });
            state('app.home', {
                url: '/home',
                abstract: true,
                views: {
                    content: {
                        controller: 'homeIndexController',
                        templateUrl: 'templates/home/index.html'
                    }
                }
            });
            state('app.home.index', {
                url: '/index',
                views: {
                    'home-news': {
                        controller: 'homeNewsController',
                        templateUrl: 'templates/home/news.html'
                    },
                    'home-matches': {
                        controller: 'homeMatchesController',
                        templateUrl: 'templates/home/matches.html'
                    },
                    'home-ads': { templateUrl: 'templates/home/ads.html' },
                    'home-matchtalk': { templateUrl: 'templates/home/matchtalk.html' }
                }
            });
            state('app.matches', {
                url: '/matches',
                views: {
                    content: {
                        controller: 'matchController',
                        templateUrl: 'templates/match/index.html'
                    }
                }
            });
            state('app.matches-show', {
                url: '/matches/:id',
                views: {
                    content: {
                        controller: 'matchShowController',
                        templateUrl: 'templates/match/show.html'
                    }
                }
            });
            state('app.search', {
                url: '/search',
                views: { content: { templateUrl: 'templates/search.html' } }
            });
            state('app.browse', {
                url: '/browse',
                views: { content: { templateUrl: 'templates/browse.html' } }
            });
            state('app.playlists', {
                url: '/playlists',
                views: {
                    content: {
                        controller: 'playlistsController',
                        templateUrl: 'templates/playlists.html'
                    }
                }
            });
            state('app.single', {
                url: '/playlists/:playlistId',
                views: {
                    content: {
                        controller: 'playlistController',
                        templateUrl: 'templates/playlist.html'
                    }
                }
            });
            state('app.news', {
                url: '/news',
                views: {
                    content: {
                        controller: 'newsController',
                        templateUrl: 'templates/news/index.html'
                    }
                }
            });
            state('app.news-show', {
                url: '/news/show/:newsId',
                views: {
                    content: {
                        controller: 'newsDetailController',
                        templateUrl: 'templates/news/show.html'
                    }
                }
            });
            state('app.register', {
                url: '/register',
                views: {
                    content: {
                        controller: 'registerController',
                        templateUrl: 'templates/user/register.html'
                    }
                }
            });
            state('app.profile', {
                url: '/profile',
                views: { content: { templateUrl: 'templates/user/profile/index.html' } }
            });
            state('app.profile-edit', {
                url: '/profile-edit',
                views: { content: { templateUrl: 'templates/user/profile/edit.html' } }
            });
            state('app.account-profile-game', {
                url: '/account-profile-game',
                views: { content: { templateUrl: 'templates/account/profile/game.html' } }
            });
            state('app.account-profile-favorite', {
                url: '/account-profile-favorite',
                views: { content: { templateUrl: 'templates/account/profile/favorite.html' } }
            });
            $urlRouterProvider.otherwise('/app/home/index');
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
    var Setting;
    Setting = function () {
        /**
     * @param {object} $stateProvider
     * @param {object} $urlRouterProvider
     * @param {object} $ionicConfigProvider See http://ionicframework.com/docs/api/provider/$ionicConfigProvider/
     */
        function Setting(CFG, $ionicConfigProvider, $ionicLoadingConfig) {
            $ionicLoadingConfig.template = '<ion-spinner icon="lines"></ion-spinner>';
        }
        return Setting;
    }();
    angular.module('balltoro').config([
        'CFG',
        '$ionicConfigProvider',
        '$ionicLoadingConfig',
        Setting
    ]);
}.call(this));
(function () {
    var Trans, Translation, TranslationRun;
    Trans = function () {
        function Trans($parse, $translate) {
            var filter;
            filter = function (translationId, interpolateParams, interpolation) {
                if (!angular.isObject(interpolateParams)) {
                    interpolateParams = $parse(interpolateParams)(this);
                }
                return $translate.instant(translationId, interpolateParams, interpolation);
            };
            if ($translate.statefulFilter()) {
                filter.$stateful = true;
            }
            return filter;
        }
        return Trans;
    }();
    Translation = function () {
        function Translation($translateProvider, $translatePartialLoaderProvider) {
            $translateProvider.useLoader('$translatePartialLoader', { urlTemplate: 'translations/{lang}/{part}.json' });
            $translateProvider.preferredLanguage('th-TH');
            $translateProvider.fallbackLanguage('th-TH');
            $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        }
        return Translation;
    }();
    TranslationRun = function () {
        function TranslationRun($translate, $translatePartialLoader) {
            $translatePartialLoader.addPart('common').addPart('match').addPart('news');
            $translate.refresh();
        }
        return TranslationRun;
    }();
    angular.module('balltoro').filter('trans', [
        '$parse',
        '$translate',
        Trans
    ]).config([
        '$translateProvider',
        '$translatePartialLoaderProvider',
        Translation
    ]).run([
        '$translate',
        '$translatePartialLoader',
        TranslationRun
    ]);
}.call(this));
(function () {
    var NgBackbone;
    NgBackbone = function () {
        function NgBackbone($http, Und) {
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
                if (Und.isUndefined(options)) {
                    options = {};
                }
                httpMethod = options.method || methodMap[method];
                params = { method: httpMethod };
                if (!options.url && Und.isDefined(model.url)) {
                    params.url = model.url;
                }
                if (Und.isUndefined(options.data) && model && (httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH')) {
                    params.data = angular.toJson(options.attrs || model.toJSON(options));
                }
                if (httpMethod === 'GET' && Und.isDefined(options.data)) {
                    params.params = options.data;
                }
                xhr = http(Und.extend(params, options));
                xhr.then(function (data, status, headers, config) {
                    options.xhr = {
                        status: status,
                        headers: headers,
                        config: config
                    };
                    if (Und.isDefined(options.success) && Und.isFunction(options.success)) {
                        options.success(data);
                    }
                });
                xhr['catch'](function (data, status, headers, config) {
                    options.xhr = {
                        status: status,
                        headers: headers,
                        config: config
                    };
                    if (Und.isDefined(options.error) && Und.isFunction(options.error)) {
                        options.error(data);
                    }
                });
                model.trigger('request', model, xhr, Und.extend(params, options));
                return xhr;
            };
            return Und.extend(Backbone, {
                sync: sync,
                ajax: http
            });
        }
        return NgBackbone;
    }();
    angular.module('balltoro').factory('NgBackbone', [
        '$http',
        'Und',
        NgBackbone
    ]);
}.call(this));
(function () {
    var NgBackboneCollection;
    NgBackboneCollection = function () {
        function NgBackboneCollection(CFG, NgBackbone, NgBackboneModel, $q, $rootScope, $ionicLoading, Und) {
            var BASE_URL, PROXY;
            PROXY = CFG.API.getProxy();
            BASE_URL = CFG.API.getBaseUrl();
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
                    NgBackbone.PageableCollection.prototype.constructor.apply(this, arguments);
                },
                parseState: function (resp, queryParams, state, options) {
                    this.state.total = resp.data.total;
                    this.state.totalPages = resp.data.pages;
                    return this.state;
                },
                parseLinks: function (resp, options) {
                    var defs, first, next, previous, _links;
                    _links = Und.result(resp.data, '_links');
                    if (_links) {
                        defs = { href: '' };
                        first = Und.result(_links, 'first', defs);
                        next = Und.result(_links, 'next', defs);
                        previous = Und.result(_links, 'previous', defs);
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
                    data = Und.result(resp.data, '_embedded');
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
                    if (Und.isUndefined(key)) {
                        return this;
                    }
                    if (Und.isObject(key)) {
                        attrs = key;
                        options = value;
                    } else {
                        (attrs = {})[key] = value;
                    }
                    options = options || {};
                    for (attr in this.$status) {
                        if (attrs.hasOwnProperty(attr) && Und.isBoolean(attrs[attr])) {
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
                    this.on('sync', function (store) {
                        $scope[options.collectionKey || 'collection'] = store.$collection;
                        $ionicLoading.hide();
                        if (store.alias) {
                            return $rootScope['$' + store.alias] = this;
                        }
                    });
                    $ionicLoading.show();
                    this.getFirstPage();
                    return this;
                },
                /*
         * Shortcut to find model in the collection.
         *
         * @param {object} options The `options` can be `$scope` for short-hand or
         *    {
         *        scope: $scope
         *        key: 'r' # the name to be used in view.
         *    }
         *
         * @return Promise
         * @see https://docs.angularjs.org/api/ng/service/$q
         */
                find: function (attr, options) {
                    var $scope, applyOptions, model, store;
                    if (!Und.isObject(attr)) {
                        attr = { id: attr };
                    }
                    if (options) {
                        $scope = options.scope || options;
                    }
                    applyOptions = function (model) {
                        if (options) {
                            $scope = options.scope || options;
                            return $scope[options.key || 'r'] = model;
                        }
                    };
                    if ($rootScope['$' + this.alias]) {
                        store = $rootScope['$' + this.alias];
                        if (store.fullCollection) {
                            model = store.fullCollection.get(attr.id);
                        }
                    }
                    return $q(function (_this) {
                        return function (resolve, reject) {
                            var promise;
                            if (model) {
                                resolve(model);
                                return applyOptions.call(_this, model);
                            } else {
                                $ionicLoading.show();
                                model = new _this.model();
                                promise = model.fetch({
                                    url: model.url + attr.id,
                                    success: function (model) {
                                        resolve(model);
                                        return applyOptions.call(this, model);
                                    },
                                    error: function (xhr) {
                                        reject(xhr);
                                        return applyOptions.call(this, null);
                                    }
                                });
                                return promise['finally'](function () {
                                    return $ionicLoading.hide();
                                });
                            }
                        };
                    }(this));
                }
            });
        }
        return NgBackboneCollection;
    }();
    angular.module('balltoro').factory('NgBackboneCollection', [
        'CFG',
        'NgBackbone',
        'NgBackboneModel',
        '$q',
        '$rootScope',
        '$ionicLoading',
        'Und',
        NgBackboneCollection
    ]);
}.call(this));
(function () {
    var NgBackboneModel;
    NgBackboneModel = function () {
        function NgBackboneModel($q, $rootScope, $http, NgBackbone, Und) {
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
                            if (Und.isDefined(_this.attributes[key])) {
                                return _this.$attributes[key];
                            } else {
                                return _this[key];
                            }
                        };
                    }(this),
                    set: function (_this) {
                        return function (newValue) {
                            if (Und.isDefined(_this.attributes[key])) {
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
                    return NgBackbone.RelationalModel.prototype.constructor.apply(this, arguments);
                },
                set: function (key, val, options) {
                    var output;
                    output = NgBackbone.RelationalModel.prototype.set.apply(this, arguments);
                    this.setBinding(key, val, options);
                    return output;
                },
                parse: function (resp, xhr) {
                    if (Und.isDefined(resp.data)) {
                        return resp.data;
                    }
                    return resp;
                },
                setStatus: function (key, value, options) {
                    var attr, attrs;
                    if (Und.isUndefined(key)) {
                        return this;
                    }
                    if (Und.isObject(key)) {
                        attrs = key;
                        options = value;
                    } else {
                        (attrs = {})[key] = value;
                    }
                    options = options || {};
                    for (attr in this.$status) {
                        if (attrs.hasOwnProperty(attr) && Und.isBoolean(attrs[attr])) {
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
                    if (Und.isUndefined(key)) {
                        return this;
                    }
                    if (Und.isObject(key)) {
                        attrs = key;
                        options = val;
                    } else {
                        (attrs = {})[key] = val;
                    }
                    options = options || {};
                    if (Und.isUndefined(this.$attributes)) {
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
                    return this.setBinding(attr, void 0, Und.extend({}, options, { unset: true }));
                },
                /**
         * Get model's embeded links.
         *
         * @param {string} name Link name.
         * @param {function|null} collection A model collection constructor.
         *
         * @return Promise with (Collection|Model|Object|null)
         * @see https://docs.angularjs.org/api/ng/service/$q
         */
                getLinked: function (name, collection) {
                    return $q(function (_this) {
                        return function (resolve, reject) {
                            var obj;
                            obj = Und.result(_this._links, name);
                            if (!obj) {
                                return resolve(null);
                            } else if (collection) {
                                return new collection().fetch({
                                    url: obj.href,
                                    success: function (store) {
                                        return resolve(store);
                                    },
                                    error: function (xhr) {
                                        return reject(xhr);
                                    }
                                });
                            } else {
                                return $http;
                            }
                        };
                    }(this));
                }
            });
        }
        return NgBackboneModel;
    }();
    angular.module('balltoro').factory('NgBackboneModel', [
        '$q',
        '$rootScope',
        '$http',
        'NgBackbone',
        'Und',
        NgBackboneModel
    ]);
}.call(this));
(function () {
    var Index;
    Index = function () {
        function Index($scope, Matches, Match) {
            new Matches().load($scope);
            $scope.matches = $scope.store.$collection;
        }
        return Index;
    }();
    angular.module('balltoro').controller('indexController', [
        '$scope',
        'Matches',
        'Match',
        Index
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
        function Main($scope, $rootScope, $ionicModal, $timeout, $cordovaOauth) {
            this.scope = $scope;
            this.rootScope = $rootScope;
            this.modal = $ionicModal;
            this.timeout = $timeout;
            this.oauth = $cordovaOauth;
            $rootScope.IsLoggedIn = false;
            this.setupLogin();
            this.setupMenus();
            this.setupCollapse();
        }
        Main.prototype.setupLogin = function () {
            this.scope.loginData = {};
            this.modal.fromTemplateUrl('templates/user/login.html', { scope: this.scope }).then(function (_this) {
                return function (modal) {
                    _this.scope.modal = modal;
                };
            }(this));
            this.scope.closeLogin = function (_this) {
                return function () {
                    return _this.scope.modal.hide();
                };
            }(this);
            this.scope.login = function (_this) {
                return function () {
                    return _this.scope.modal.show();
                };
            }(this);
            this.scope.doLogin = function (_this) {
                return function () {
                    console.log('Doing login', _this.scope.loginData);
                    _this.rootScope.IsLoggedIn = true;
                    return _this.scope.closeLogin();
                };
            }(this);
        };
        Main.prototype.setupMenus = function () {
            return this.scope.menus = {
                leagues: [
                    {
                        text: 'Thai Premier League',
                        link: ''
                    },
                    {
                        text: 'English Premier League',
                        link: ''
                    }
                ],
                setting: [
                    {
                        text: 'USER SETTING',
                        link: '/#/app/profile'
                    },
                    {
                        text: 'GAME SETTING',
                        link: '/#/app/account-profile-game'
                    }
                ]
            };
        };
        Main.prototype.setupCollapse = function () {
            return this.scope.active = true;
        };
        return Main;
    }();
    angular.module('balltoro').controller('mainController', [
        '$scope',
        '$rootScope',
        '$ionicModal',
        '$timeout',
        '$cordovaOauth',
        Main
    ]);
}.call(this));
(function () {
    var Match;
    Match = function () {
        function Match($scope, Matches, Match) {
            new Matches().load({
                scope: $scope,
                storeKey: 'store',
                collectionKey: 'collection'
            });
            $scope.$watchCollection('collection', function (cs) {
                var match, seasonId, _i, _len, _results;
                if (!cs) {
                    return;
                }
                $scope.matches = [];
                seasonId = 0;
                _results = [];
                for (_i = 0, _len = cs.length; _i < _len; _i++) {
                    match = cs[_i];
                    if (seasonId !== match.season.id) {
                        $scope.matches.push({
                            season: match.season,
                            items: []
                        });
                        seasonId = match.season.id;
                    }
                    _results.push($scope.matches[$scope.matches.length - 1].items.push(match));
                }
                return _results;
            });
        }
        return Match;
    }();
    angular.module('balltoro').controller('matchController', [
        '$scope',
        'Matches',
        'Match',
        Match
    ]);
}.call(this));
(function () {
    var MatchShow;
    MatchShow = function () {
        function MatchShow($scope, $stateParams, Matches, Activities) {
            var promise;
            promise = new Matches().find($stateParams.id, $scope);
            promise.then(function (model) {
                promise = model.getLinked('activities', Activities);
                return promise.then(function (r) {
                    return console.log(r);
                });
            });
        }
        return MatchShow;
    }();
    angular.module('balltoro').controller('matchShowController', [
        '$scope',
        '$stateParams',
        'Matches',
        'Activities',
        MatchShow
    ]);
}.call(this));
(function () {
    var News;
    News = function () {
        function News($scope, NewsStore) {
            new NewsStore().load($scope);
        }
        return News;
    }();
    angular.module('balltoro').controller('newsController', [
        '$scope',
        'NewsStore',
        News
    ]);
}.call(this));
(function () {
    var NewsDetail;
    NewsDetail = function () {
        function NewsDetail($scope, $stateParams, NewsStore) {
            new NewsStore().find($stateParams.newsId, {
                scope: $scope,
                key: 'r'
            });
        }
        return NewsDetail;
    }();
    angular.module('balltoro').controller('newsDetailController', [
        '$scope',
        '$stateParams',
        'NewsStore',
        NewsDetail
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
    var Register;
    Register = function () {
        function Register($scope) {
            this.scope = $scope;
            this.setupRegister();
        }
        Register.prototype.setupRegister = function () {
            this.scope.registerData = {};
            return this.scope.placeholder = {
                email: 'Please enter your email',
                password: 'Password',
                repassword: 'Confirm-Password'
            };
        };
        return Register;
    }();
    angular.module('balltoro').controller('registerController', [
        '$scope',
        Register
    ]);
}.call(this));
(function () {
    var FloatingButton;
    FloatingButton = function () {
        function FloatingButton(Und) {
            return {
                restrict: 'E',
                transclude: true,
                scope: {
                    title: '@',
                    icon: '@'
                },
                template: '<div class="ux-floating-button" ng-class="{open:clicked}">' + '<div class="item toggle" ng-click="open()" title="{{title}}">' + '<i class="icon ion-{{icon}}"></i>' + '</div>' + '<div class="menu" ng-class="{in:isIn, out:isOut}" ng-transclude>' + '</div>' + '</div>',
                compile: function (element, attr) {
                    if (Und.isUndefined(attr.icon)) {
                        attr.icon = 'settings';
                    }
                },
                controller: function ($scope) {
                    $scope.clicked = false;
                    $scope.isIn = false;
                    $scope.isOut = false;
                    return $scope.open = function () {
                        $scope.clicked = !$scope.clicked;
                        $scope.isIn = $scope.clicked;
                        return $scope.isOut = !$scope.clicked;
                    };
                }
            };
        }
        return FloatingButton;
    }();
    angular.module('balltoro').directive('floatingButton', [
        'Und',
        FloatingButton
    ]);
}.call(this));
(function () {
    var FloatingButtonItem;
    FloatingButtonItem = function () {
        function FloatingButtonItem() {
            return {
                restrict: 'E',
                scope: {
                    title: '@',
                    icon: '@'
                },
                template: '<div class="item" title="{{title}}">' + '<i class="icon ion-{{icon}}"></i>' + '</div>'
            };
        }
        return FloatingButtonItem;
    }();
    angular.module('balltoro').directive('floatingButtonItem', [FloatingButtonItem]);
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
    var Und;
    Und = function () {
        function Und() {
            return window._.extend(window._, { isDefined: angular.isDefined });
        }
        return Und;
    }();
    angular.module('balltoro').factory('Und', [Und]);
}.call(this));
/**
 * Country Model Collection
 *
 * @author liverbool <phaiboon@intbizth.com>
 */
(function () {
    var Activities, Activity;
    Activities = function () {
        function Activities(NgBackboneCollection, Activity) {
            return NgBackboneCollection.extend({
                model: Activity,
                alias: 'activities'
            });
        }
        return Activities;
    }();
    /**
   * Country Model
   */
    Activity = function () {
        function Activity(CFG, NgBackboneModel) {
            return NgBackboneModel.extend({});
        }
        return Activity;
    }();
    angular.module('balltoro').factory('Activities', [
        'NgBackboneCollection',
        'Activity',
        Activities
    ]).factory('Activity', [
        'CFG',
        'NgBackboneModel',
        Activity
    ]);
}.call(this));
/**
 * Club Model Collection
 *
 * @author liverbool <phaiboon@intbizth.com>
 */
(function () {
    var Club, Clubs;
    Clubs = function () {
        function Clubs(NgBackboneCollection, Club) {
            return NgBackboneCollection.extend({
                model: Club,
                url: Club.prototype.url,
                alias: 'clubs'
            });
        }
        return Clubs;
    }();
    /**
   * Club Model
   */
    Club = function () {
        function Club(CFG, NgBackboneModel, Country, Und) {
            return NgBackboneModel.extend({
                url: CFG.API.getPath('clubs/'),
                relations: [{
                        type: 'HasOne',
                        key: 'country',
                        relatedModel: Country
                    }],
                defaults: { _links: null }
            });    /**
       * Get club logo specify the size.
       *
       * @param {string} size The size of image eg. 70x70
       *
       * @return {string} Logo path
       */
        }
        return Club;
    }();
    angular.module('balltoro').factory('Clubs', [
        'NgBackboneCollection',
        'Club',
        Clubs
    ]).factory('Club', [
        'CFG',
        'NgBackboneModel',
        'Country',
        'Und',
        Club
    ]);
}.call(this));
/**
 * Country Model Collection
 *
 * @author liverbool <phaiboon@intbizth.com>
 */
(function () {
    var Countries, Country;
    Countries = function () {
        function Countries(NgBackboneCollection, Country) {
            return NgBackboneCollection.extend({
                model: Country,
                url: Country.prototype.url,
                alias: 'countries'
            });
        }
        return Countries;
    }();
    /**
   * Country Model
   */
    Country = function () {
        function Country(CFG, NgBackboneModel) {
            return NgBackboneModel.extend({ url: CFG.API.getPath('countries/') });
        }
        return Country;
    }();
    angular.module('balltoro').factory('Countries', [
        'NgBackboneCollection',
        'Country',
        Countries
    ]).factory('Country', [
        'CFG',
        'NgBackboneModel',
        Country
    ]);
}.call(this));
(function () {
    var Match, Matches;
    Matches = function () {
        function Matches(NgBackboneCollection, Match) {
            return NgBackboneCollection.extend({
                model: Match,
                url: Match.prototype.url,
                alias: 'matches'
            });
        }
        return Matches;
    }();
    Match = function () {
        function Match(CFG, NgBackboneModel, Club) {
            return NgBackboneModel.extend({
                url: CFG.API.getPath('matches/'),
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
        'NgBackboneCollection',
        'Match',
        Matches
    ]).factory('Match', [
        'CFG',
        'NgBackboneModel',
        'Club',
        Match
    ]);
}.call(this));
/**
 * News Model Collection
 *
 * @author beer <kannipa@intbizth.com>
 */
(function () {
    var News, NewsStore;
    NewsStore = function () {
        function NewsStore(NgBackboneCollection, News) {
            return NgBackboneCollection.extend({
                model: News,
                url: News.prototype.url + 'latest'
            });
        }
        return NewsStore;
    }();
    /**
   * News Model
   */
    News = function () {
        function News(CFG, NgBackboneModel) {
            return NgBackboneModel.extend({ url: CFG.API.getPath('news/') });
        }
        return News;
    }();
    angular.module('balltoro').factory('NewsStore', [
        'NgBackboneCollection',
        'News',
        NewsStore
    ]).factory('News', [
        'CFG',
        'NgBackboneModel',
        News
    ]);
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
(function () {
    var HomeIndex;
    HomeIndex = function () {
        function HomeIndex($scope) {
            $scope.shared = 'Hey, I am an abs.';
        }
        return HomeIndex;
    }();
    angular.module('balltoro').controller('homeIndexController', [
        '$scope',
        HomeIndex
    ]);
}.call(this));
(function () {
    var HomeMatches;
    HomeMatches = function () {
        function HomeMatches($scope, Matches) {
            new Matches().load($scope);
            $scope.quantity = 3;
        }
        return HomeMatches;
    }();
    angular.module('balltoro').controller('homeMatchesController', [
        '$scope',
        'Matches',
        HomeMatches
    ]);
}.call(this));
(function () {
    var HomeNews;
    HomeNews = function () {
        function HomeNews($scope, NewsStore) {
            new NewsStore().load($scope);
            $scope.quantity = 3;
        }
        return HomeNews;
    }();
    angular.module('balltoro').controller('homeNewsController', [
        '$scope',
        'NewsStore',
        HomeNews
    ]);
}.call(this));