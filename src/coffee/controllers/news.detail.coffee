class NewsDetail extends Controller
    constructor: ($scope, $stateParams, NewsStore) ->
        new NewsStore()
            .find $stateParams.newsId,
                scope: $scope
                key: 'r'
