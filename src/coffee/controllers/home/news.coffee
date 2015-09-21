class HomeNews extends Controller
    constructor: ($scope, NewsStore) ->
        new NewsStore().load $scope

        $scope.quantity = 3;
