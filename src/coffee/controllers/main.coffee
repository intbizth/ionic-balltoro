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

    # @param {object} $scope App root scope.
    setupLogin: ->
        # Form data for the login modal
        @scope.loginData = {}

        # Create the login modal that we will use later
        @modal.fromTemplateUrl(
            'templates/login.html', scope: @scope
        ).then (modal) =>
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
            leagues: [
                {text: 'xxx', link: ''}
                {text: 'xxx', link: ''}
            ]

            setting:
                header:
                    text: 'SETTING'
                    icon: ''
                items: [
                    {text: 'USER SETTING', link: ''}
                    {text: 'GAME SETTING', link: ''}
                ]
##TODO: Beer'll edit collapse
#    toggleGroup: (group) ->
#        if @scope.isGroupShown(group)
#            @scope.shownGroup = group
#        else
#            @scope.shownGroup = group
#    return
#
#    isGroupShown: (group) ->
#        @scope.shownGroup == group
#    return
#
#    tester: (data) ->
#        id = @.attribute['data-click'].value
#        alert id
#    return
#