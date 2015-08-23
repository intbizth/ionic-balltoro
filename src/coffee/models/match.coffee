class Matches extends Factory
    constructor: (NgBackboneCollection, Match) ->
        return NgBackboneCollection.extend
            model: Match
            url: '/api/matches/'

class Match extends Factory
    constructor: (NgBackboneModel, Club, Clubs) ->
        return NgBackboneModel.extend
            relations: [{
                type: 'HasOne'
                key: 'home_club'
                relatedModel: Club
            }, {
                type: 'HasOne'
                key: 'away_club'
                relatedModel: Club
            }]
