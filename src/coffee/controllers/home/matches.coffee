class HomeMatches extends Controller
    constructor: ($scope, Matches) ->
        new Matches().load $scope

        $scope.quantity = 3;
