class News extends Controller
    constructor: ($scope, NewsStore) ->
        new NewsStore().load $scope
