class Leagues extends Controller then constructor: (
    $scope, $ionicLoading, Matches, Competitions, Moment
) ->
    lastNextDay = null
    lastPrevDay = null
    $scope.items = []

    new Competitions().load
        scope: $scope
        storeKey: 'competitionStore'
        collectionKey: 'competitions'

    store = new Matches null,
        url: Matches::url + 'today'
        state: pageSize: 100

    options =
        scope: $scope
        storeKey: 'matchStore'
        collectionKey: 'matchCollection'

    promise = store.load options

    #$ionicLoading.show()
    #promise.finally -> $ionicLoading.hide()

    $scope.$watchCollection 'matchCollection', (collection) ->
        $scope.items = items = store.buildItemStack collection

        if items and items.length
            lastNextDay = items[0].value.format 'YYYY-MM-D'
            lastPrevDay = Moment(items[items.length - 1].value.match_day).format 'YYYY-MM-D'

    $scope.loadNextDayMatches = ->
        return unless lastNextDay
        # tell store to prepend collection.
        store.prepend = yes
        # set filter
        options.fetch = yes
        options.data =
            criteria:
                next: lastNextDay

        promise = store.fetch options
        promise.finally -> $scope.$broadcast 'scroll.refreshComplete'
        promise.then -> $scope.matchCollection = store.getCollection()

    $scope.loadPrevDayMatches = ->
        return unless lastPrevDay
        # set filter
        options.fetch = yes
        options.data =
            criteria:
                prev: lastPrevDay

        promise = store.fetch options
        promise.finally -> $scope.$broadcast 'scroll.refreshComplete'
        promise.then (xhr) ->
            $scope.hasMorePage = !!xhr.data.total
            $scope.matchCollection = store.getCollection()

    $scope.hasMorePage = yes

