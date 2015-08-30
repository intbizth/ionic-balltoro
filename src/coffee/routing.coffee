class Routing extends Config
    constructor: ($stateProvider, $urlRouterProvider) ->
        $stateProvider
            .state('app',
                url: '/app'
                abstract: true
                templateUrl: 'templates/menu.html'
                controller: 'mainController'

            ).state('app.matches',
                url: '/matches'
                views:
                    menuContent:
                        controller: 'matchController'
                        templateUrl: 'templates/matches.html'

            ).state('app.search',
                url: '/search'
                views:
                    menuContent:
                        templateUrl: 'templates/search.html'

            ).state('app.browse',
                url: '/browse'
                views:
                    menuContent:
                        templateUrl: 'templates/browse.html'

            ).state('app.playlists',
                url: '/playlists'
                views:
                    menuContent:
                        controller: 'playlistsController'
                        templateUrl: 'templates/playlists.html'

            ).state 'app.single',
                url: '/playlists/:playlistId'
                views:
                    menuContent:
                        controller: 'playlistController'
                        templateUrl: 'templates/playlist.html'

          # if none of the above states are matched, use this as the fallback
          $urlRouterProvider.otherwise '/app/matches'
          return
