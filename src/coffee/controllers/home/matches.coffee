class HomeMatches extends Controller then constructor: (
    $scope, Matches
) ->
    new Matches().load $scope
    $scope.quantity = 5;
