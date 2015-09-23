class GamePredictionDetail extends Controller
    constructor: ($scope) ->
        $scope.pointUsers = [
            bg: "./img/ranking/bg-point-user.png"
            game: "เกมทายผลทายสกอร์"
            gameEn: "Ranking"
            point: 0
            score: 0
        ,
            bg: "./img/ranking/bg-point-user2.png"
            game: "เกมทายสกอร์"
            gameEn: "Ranking"
            point: 0
            score: 0
        ,
            bg: "./img/ranking/bg-point-user3.png"
            game: "เกมทาย 11 ตัวจริง"
            gameEn: "Ranking"
            point: 0
            score: 0
        ];

        $scope.lastedPredictions = [
            date: "09/02/15"
            homeClub: "Chonburi FC"
            scoreHome: 4
            awayClub: "Suphanburi FC"
            scoreAway: 1
            handicap: "- 1.50"
            score: 5
        ,
            date: "17/01/15"
            homeClub: "Chonburi FC"
            scoreHome: 2
            awayClub: "Suphanburi FC"
            scoreAway: 2
            handicap: "+ 1.00"
            score: 0
        ,
            date: "08/10/14"
            homeClub: "Chonburi FC"
            scoreHome: 1
            awayClub: "Suphanburi FC"
            scoreAway: 1
            handicap: "+ 1.25"
            score: 5
        ,
            date: "20/10/14"
            homeClub: "Chonburi FC"
            scoreHome: 2
            awayClub: "Suphanburi FC"
            scoreAway: 1
            handicap: "- 0.25"
            score: 0
        ,
            date: "12/10/14"
            homeClub: "Chonburi FC"
            scoreHome: 3
            awayClub: "Suphanburi FC"
            scoreAway: 1
            handicap: "- 0.25"
            score: 5
        ];
