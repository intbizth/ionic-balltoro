###*
# NOTE:
#   With the new view caching in Ionic, Controllers are only called
#   when they are recreated or on app start, instead of every page change.
#   To listen for when this page is active (for example, to refresh data),
#   listen for the $ionicView.enter event:
#     $scope.$on('$ionicView.enter', function(e) {
#     });
###
class Main extends Controller

    constructor: ($scope, $rootScope, $ionicModal, $timeout, $cordovaOauth) ->
        @scope = $scope
        @rootScope = $rootScope
        @modal = $ionicModal
        @timeout = $timeout
        @oauth = $cordovaOauth
        # Login indicator state
        $rootScope.IsLoggedIn = no

        # Define login with in root scope to access on any childs.
        @setupLogin()
        @setupMenus()
        @setupCollapse()

# @param {object} $scope App root scope.
    setupLogin: ->
# Form data for the login modal
        @scope.loginData = {}

        # Create the login modal that we will use later
        @modal.fromTemplateUrl(
            'templates/user/login.html', scope: @scope
        )
        .then (modal) =>
            @scope.modal = modal
            # requirement of jshint
            return

        # Triggered in the login modal to close it
        @scope.closeLogin = =>
            @scope.modal.hide()

        # Open the login modal
        @scope.login = =>
            @scope.modal.show()

        # Perform the login action when the user submits the login form
        @scope.doLogin = =>
            console.log 'Doing login', @scope.loginData

            # simulate login state
            @rootScope.IsLoggedIn = yes
            @scope.closeLogin()

        # Simulate a login delay. Remove this and replace with your login
        # code if using a login system
        #@timeout ->
        #    $scope.closeLogin()
        #, 1000
        return

    setupMenus: ->
        @scope.menus =
            news: [
                {text: 'All', link: 'app.news', logo: ''}
                {text: 'Thai Premier League', link: 'app.news', logo: ''}
                {text: 'English Premier League', link: 'app.news', logo: ''}
            ]

            leagues: [
                {text: 'All', link: 'app.leagues', logo: ''}
                {text: 'Thai Premier League', link: 'app.leagues', logo: ''}
                {text: 'English Premier League', link: 'app.leagues', logo: ''}
            ]

            setting: [
                {text: 'USER SETTING', link: 'app.profile', logo: './img/sidebar/profile_setting_2x.png'}
                {text: 'GAME SETTING', link: 'app.account-profile-game', logo: './img/sidebar/game_setting_2x.png'}
            ]

    setupCollapse: ->
        @scope.active = true
        @scope.active1 = true
        @scope.active2 = true
        @scope.active3 = true
        @scope.settingactive = true
