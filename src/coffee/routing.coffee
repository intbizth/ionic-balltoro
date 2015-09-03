class Routing extends Config then constructor: (
    $stateProvider, $urlRouterProvider
) ->
    state = $stateProvider.state

    state 'app',
        url: '/app'
        abstract: true
        templateUrl: 'templates/menu.html'
        controller: 'mainController'

    state 'app.matches',
        url: '/matches'
        views:
            content:
                controller: 'matchController'
                templateUrl: 'templates/match/index.html'

    state 'app.matches-show',
        url: '/matches/:id'
        views:
            content:
                controller: 'matchShowController'
                templateUrl: 'templates/match/show.html'

    state 'app.search',
        url: '/search'
        views:
            content:
                templateUrl: 'templates/search.html'

    state 'app.browse',
        url: '/browse'
        views:
            content:
                templateUrl: 'templates/browse.html'

    state 'app.playlists',
        url: '/playlists'
        views:
            content:
                controller: 'playlistsController'
                templateUrl: 'templates/playlists.html'

    state 'app.single',
        url: '/playlists/:playlistId'
        views:
            content:
                controller: 'playlistController'
                templateUrl: 'templates/playlist.html'

    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise '/app/matches'
    return
