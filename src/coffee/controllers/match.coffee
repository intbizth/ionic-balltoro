class Match extends Controller
    constructor: ($scope, MatchModel, $log, $ionicLoading) ->
        # load data
        MatchModel.load scope: $scope
