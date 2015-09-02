###*
# Country Model Collection
#
# @author liverbool <phaiboon@intbizth.com>
###
class Countries extends Factory then constructor: (
    CFG, NgBackboneCollection, Country
) ->
    return NgBackboneCollection.extend
        model: Country
        url: CFG.API.getPath 'countries/'

###*
# Country Model
###
class Country extends Factory then constructor: (
    NgBackboneModel
) ->
    return NgBackboneModel.extend {}
