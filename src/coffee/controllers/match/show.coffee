class MatchShow extends Controller then constructor: (
    $scope, $stateParams, Matches, Activities
) ->
    $scope.tabSelectedIndex = 0
    $scope.matchId = $stateParams.id

    promise = new Matches().find $scope.matchId,
        scope: $scope
        key: 'r'

    promise.then (model) ->
        model.getLinked 'activities', Activities

    $scope.$on '$stateChangeSuccess', (e, opt) ->
        switch opt.name
            when 'app.matches-show.game-prediction' then $scope.tabSelectedIndex = 0
#            when 'app.matches-show.game-soccer' then $scope.tabSelectedIndex = 1
            when 'app.matches-show.statistic' then $scope.tabSelectedIndex = 2
