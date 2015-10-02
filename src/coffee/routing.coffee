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
        url: '/matches-show/:id'
        #abstract: true
        views:
            content:
                controller: 'matchShowController'
                templateUrl: 'templates/match/show.html'

    state 'app.matches-show.game-prediction',
        url: '/game-prediction'
        views:
            'match-game-prediction':
                controller: 'matchGamePredictionController'
                templateUrl: 'templates/match/game-prediction/index.html'

    state 'app.matches-show.game-soccer',
        url: '/game-soccer'
        views:
            'match-game-soccer':
                controller: 'matchGameSoccerController'
                templateUrl: 'templates/match/game-soccer/index.html'

    state 'app.matches-show.statistic',
        url: '/statistic'
        views:
            'match-statistic':
                controller: 'matchShowController'
                templateUrl: 'templates/match/statistic/index.html'

    state 'app.leagues',
        url: '/leagues'
        views:
            content:
                controller: 'leaguesController'
                templateUrl: 'templates/league/index.html'

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

    state 'app.request-password',
        url: '/request-password'
        views:
            content:
                templateUrl: 'templates/user/password/request-password.html'

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

    state 'app.ranking',
        url: '/ranking'
#        abstract: yes
        views:
            content:
                controller: 'rankingIndexController'
                templateUrl: 'templates/ranking/index.html'

    state 'app.ranking.game-prediction',
        url: '/game-prediction'
        views:
            'game-prediction':
                controller: 'gamePredictionController'
                templateUrl: 'templates/ranking/game-prediction.html'

    state 'app.ranking.game-prediction-show',
        url: '/game-prediction/show/:id'
        views:
            'game-prediction':
                controller: 'gamePredictionDetailController'
                templateUrl: 'templates/ranking/game-prediction-show.html'

    state 'app.ranking.game-score',
        url: '/game-score'
        views:
            'game-score':
                controller: 'gameScoreController'
                templateUrl: 'templates/ranking/game-score.html'

    state 'app.ranking.game-score-show',
        url: '/game-score/show/:id'
        views:
            'game-score':
                controller: 'gameScoreDetailController'
                templateUrl: 'templates/ranking/game-score-show.html'

    # if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise '/app/home/index'
    return
