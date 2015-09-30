#class HomeNews extends Controller
#    constructor: ($scope, NewsStore) ->
#        new NewsStore().load $scope
#
#        $scope.quantity = 3;
class HomeNews extends Controller then constructor: (
    $scope
) ->
    $scope.buildGridModel = (tileTmpl) ->
        console.log(aaa)
        it = undefined
        results = []
        j = 0
        while j < 3
            it = angular.extend({}, tileTmpl)
            it.title = it.title + j + 1
            it.span =
                row: 1
                col: 1
            switch j + 1
                when 1
                    it.background = 'red'
                    it.span.row = it.span.col = 2
                when 2
                    it.background = 'green'
                    it.span.row = it.span.col = 1
                when 3
                    it.background = 'darkBlue'
                    it.span.row = it.span.col = 1
                    break
            results.push it
            j++
        results

        @tiles = buildGridModel(background: '')
        return
