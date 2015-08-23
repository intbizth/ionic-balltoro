class Config extends Config
    ###*
    # @param {object} $stateProvider
    # @param {object} $urlRouterProvider
    # @param {object} $ionicConfigProvider See http://ionicframework.com/docs/api/provider/$ionicConfigProvider/
    ###
    constructor: (
        TORO,
        $ionicConfigProvider
    ) ->
        config = $ionicConfigProvider
        # TODO:
        # $locationProvider.html5Mode yes
