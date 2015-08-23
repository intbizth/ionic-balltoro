class Config extends Config
    ###*
    # @param {object} $stateProvider
    # @param {object} $urlRouterProvider
    # @param {object} $ionicConfigProvider See http://ionicframework.com/docs/api/provider/$ionicConfigProvider/
    ###
    constructor: (
        TORO,
        $ionicConfigProvider,
        DSProvider,
        DSHttpAdapterProvider
    ) ->
        config = $ionicConfigProvider
        angular.extend DSProvider.defaults, {
        }

        angular.extend DSHttpAdapterProvider.defaults, {
            basePath: TORO.ENVIRONMENT['@@environment'].api.baseUrl
            forceTrailingSlash: yes
        }

        # TODO:
        # $locationProvider.html5Mode yes
