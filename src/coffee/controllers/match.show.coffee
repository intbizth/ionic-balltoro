class MatchShow extends Controller then constructor: (
    $scope, $stateParams, Matches, Activities
) ->
    promise = new Matches().find $stateParams.id, $scope
    promise.then (model) ->
        promise = model.getCollectionLink 'activities', Activities
        promise.then (r) ->
            console.log r
