class NewsDetail extends Controller then constructor: (
    $scope, $stateParams, NewsStore
) ->
    $scope.newsId = $stateParams.id

    promise = new NewsStore().find $stateParams.newsId,
        scope: $scope
        key: 'r'
