class Register extends Controller

    constructor: ($scope) ->
        @scope = $scope

        # Define login with in root scope to access on any childs.
        @setupRegister()

    setupRegister: ->
        @scope.registerData = {}

        @scope.placeholder =
            email: 'Please enter your email'
            password: 'Password'
            repassword: 'Confirm-Password'
