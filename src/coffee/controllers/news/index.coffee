class News extends Controller then constructor: (
    $scope, NewsStore
    ) ->
        new NewsStore().load $scope
