class Routing extends Config then constructor: (
    $stateProvider, $urlRouterProvider
) ->
    state = $stateProvider.state

    state 'app',
        url: '/app'
        abstract: true
        templateUrl: 'templates/main.html'
        controller: 'mainController'

    state 'app.matches',
        url: '/matches'
        views:
            content:
                controller: 'matchController'
                templateUrl: 'templates/matches.html'

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

    state 'app.news',
        url: '/news'
        views:
            content:
                controller: 'newsController'
                templateUrl: 'templates/news/index.html'
#    TODO: "." not working on state more than second place
    state 'app.news_show',
        url: '/news/show/:newsId'
        views:
            content:
                controller: 'newsDetailController'
                templateUrl: 'templates/news/show.html'

    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise '/app/matches'
    return
