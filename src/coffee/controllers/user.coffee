class User extends Controller
    constructor: ($scope, Users) ->
        new Users().load $scope
