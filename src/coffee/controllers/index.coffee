class Index extends Controller then constructor: (
    $scope, Matches, Match
) ->
    new Matches().load $scope

    $scope.matches = $scope.store.$collection


