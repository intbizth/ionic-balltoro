class Run extends Run then constructor: (
    $rootScope, $ionicPlatform, $location, $cordovaKeyboard, $cordovaToast
) ->
    # default spinner icon
    $rootScope.$spinnerIcon = 'ripple'

    $ionicPlatform.ready ->

        # Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        # for form inputs)
        if window.cordova # native mode
            $cordovaKeyboard.hideAccessoryBar yes
            $cordovaKeyboard.disableScroll yes

        if window.StatusBar
            # org.apache.cordova.statusbar required
            StatusBar.styleDefault()

    # State debuging
    ###
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
    ###
