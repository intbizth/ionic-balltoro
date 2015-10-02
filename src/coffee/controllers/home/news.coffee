class HomeNews extends Controller then constructor: (
    $scope, NewsStore
) ->
    new NewsStore().load $scope
    $scope.quantity = 5;
