class Routing extends Config then constructor: (
    $stateProvider, $urlRouterProvider
) ->
    state = $stateProvider.state

    state 'app',
        url: '/app'
        abstract: true
        templateUrl: 'templates/main.html'
        controller: 'mainController'

    state 'app.home',
        url: '/home'
        abstract: true
        views:
            content:
                controller: 'homeIndexController'
                templateUrl: 'templates/home/index.html'

    state 'app.home.index',
        url: '/index'
        views:
            'home-news':
                controller: 'homeNewsController'
                templateUrl: 'templates/home/news.html'
            'home-matches':
                controller: 'homeMatchesController'
                templateUrl: 'templates/home/matches.html'
            'home-ads':
                templateUrl: 'templates/home/ads.html'
            'home-matchtalk':
                templateUrl: 'templates/home/matchtalk.html'

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

    state 'app.news',
        url: '/news'
        views:
            content:
                controller: 'newsController'
                templateUrl: 'templates/news/index.html'

    state 'app.news-show',
        url: '/news/show/:newsId'
        views:
            content:
                controller: 'newsDetailController'
                templateUrl: 'templates/news/show.html'

    state 'app.register',
        url: '/register'
        views:
            content:
                controller: 'registerController'
                templateUrl: 'templates/user/register.html'

    state 'app.profile',
        url: '/profile'
        views:
            content:
                templateUrl: 'templates/user/profile/index.html'

    state 'app.profile-edit',
        url: '/profile-edit'
        views:
            content:
                templateUrl: 'templates/user/profile/edit.html'

    state 'app.account-profile-game',
        url: '/account-profile-game'
        views:
            content:
                templateUrl: 'templates/account/profile/game.html'

    state 'app.account-profile-favorite',
        url: '/account-profile-favorite'
        views:
            content:
                controller: 'favoriteController'
                templateUrl: 'templates/account/profile/favorite.html'

    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise '/app/home/index'
    return
