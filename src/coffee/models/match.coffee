###*
# Match Model Collection
#
# @author liverbool <phaiboon@intbizth.com>
###
class Matches extends Factory then constructor: (
    NgBackboneCollection, Match
) ->
    return NgBackboneCollection.extend
        model: Match
        url: Match::url
        alias: 'matches'

###*
# Match Model
###
class Match extends Factory then constructor: (
    CFG, NgBackboneModel, Club, Country
) ->
    return NgBackboneModel.extend
        url: CFG.API.getPath 'matches/'
        relations: [{
            type: 'HasOne'
            key: 'home_club'
            relatedModel: Club
        }, {
            type: 'HasOne'
            key: 'away_club'
            relatedModel: Club
        }, {
            type: 'HasOne'
            key: 'country'
            relatedModel: Country
        }]
