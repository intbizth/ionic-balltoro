class Run extends Run
    constructor: ($rootScope, $ionicPlatform, $location, LogLine) ->
        LogLine.len(32).startup()

        $ionicPlatform.ready ->
            LogLine.ready()

            # Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            # for form inputs)
            if window.cordova && window.cordova.plugins.Keyboard
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar yes
                cordova.plugins.Keyboard.disableScroll yes

            if window.StatusBar
                # org.apache.cordova.statusbar required
                StatusBar.styleDefault()

        #console.log $rootScope
        #$rootScope.$on '$locationChangeStart', (e) ->
        #    console.log e
