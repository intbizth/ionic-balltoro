class Match extends Controller then constructor: (
    $scope, Matches, Match, $ionicHistory, $timeout, Und, Chance
) ->
    new Matches().load
        scope: $scope
        storeKey: 'store'
        collectionKey: 'collection'

    $scope.$watchCollection 'collection', (cs) ->
        return unless cs
        $scope.matches = []
        seasonId = 0

        for match in cs
            if seasonId != match.season.id
                $scope.matches.push
                    season: match.season
                    items: []
                seasonId = match.season.id

            $scope.matches[$scope.matches.length-1].items.push match
