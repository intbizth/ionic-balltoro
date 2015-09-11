class HomeNews extends Controller
    constructor: ($scope, NewsStore) ->
        new NewsStore().load $scope

#    constructor: ($scope) ->
#        $scope.news = 'Hey, I am News.'
