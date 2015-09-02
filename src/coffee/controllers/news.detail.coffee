class NewsDetail extends Controller
    constructor: ($scope, $stateParams, News) ->
        console.log($stateParams)
        new News().setBinding $stateParams


#        class News extends Controller
#    constructor: ($scope, NewsStore) ->
#        new NewsStore().load $scope
