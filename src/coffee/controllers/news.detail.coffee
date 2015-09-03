class NewsDetail extends Controller
    constructor: ($scope, $stateParams, NewsStore) ->
        store = new NewsStore().loadPublised

#        class News extends Controller
#    constructor: ($scope, NewsStore) ->
#        new NewsStore().load $scope
