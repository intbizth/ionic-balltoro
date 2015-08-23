class Match extends Controller
    constructor: ($scope, Matches, $log, $ionicLoading) ->
        promise = new Matches().fetch
            success: (data) ->
                $scope.matches = data.$collection
                ## 3 styles of accessor
                #console.log data.get(18).home_club
                #console.log data.get(18).$attributes.home_club
                #console.log data.get(18).get('home_club')
