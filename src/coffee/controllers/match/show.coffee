class MatchShow extends Controller then constructor: (
    $scope, $stateParams, Matches, Activities
) ->
    $scope.matchId = $stateParams.id

    promise = new Matches().find $scope.matchId,
        scope: $scope
        key: 'r'

    promise.then (model) ->
        model.getLinked 'activities', Activities
