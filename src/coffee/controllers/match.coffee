class Match extends Controller then constructor: (
    $scope, Matches, Match
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
            if seasonId != match.program_period.id
                $scope.matches.push
                    season: match.program_period
                    items: []
                seasonId = match.program_period.id

            $scope.matches[$scope.matches.length-1].items.push match
