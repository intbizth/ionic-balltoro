###*
# Match Model Collection
#
# @author liverbool <phaiboon@intbizth.com>
###
class Matches extends Factory then constructor: (
    CFG, NgBackboneCollection, Match
) ->
    return NgBackboneCollection.extend
        model: Match
        url: CFG.API.getPath 'matches/'

###*
# Match Model
###
class Match extends Factory then constructor: (
    NgBackboneModel, Club, Country
) ->
    return NgBackboneModel.extend
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
