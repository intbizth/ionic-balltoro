class Match extends Controller then constructor: (
    $scope, Matches, Match
) ->
    new Matches().load $scope
