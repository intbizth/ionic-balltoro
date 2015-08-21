class Run extends Run
    constructor: ($ionicPlatform) ->
        $ionicPlatform.ready ->
            # Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            #  for form inputs)
            if window.cordova && window.cordova.plugins.Keyboard
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar yes
                cordova.plugins.Keyboard.disableScroll yes

            if window.StatusBar
                # org.apache.cordova.statusbar required
                StatusBar.styleDefault()
