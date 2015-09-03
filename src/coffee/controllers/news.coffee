class News extends Controller
    constructor: ($scope, NewsStore) ->
        store = new NewsStore()
        store.load $scope

        store.on 'sync', ->
            console.log arguments
