class Routing extends Config
    constructor: ($stateProvider, $urlRouterProvider) ->
        $stateProvider
            .state('app',
                url: '/app'
                abstract: true
                templateUrl: 'templates/menu.html'
                controller: 'mainController'

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
                        templateUrl: 'templates/playlists.html'
                        controller: 'playlistsController'

            ).state 'app.single',
                url: '/playlists/:playlistId'
                views:
                    menuContent:
                        templateUrl: 'templates/playlist.html'
                        controller: 'playlistController'

          # if none of the above states are matched, use this as the fallback
          $urlRouterProvider.otherwise '/app/playlists'
          return
