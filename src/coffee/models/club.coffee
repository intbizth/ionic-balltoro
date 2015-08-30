class Clubs extends Factory then constructor: (TORO, NgBackboneCollection, Club) ->
    return NgBackboneCollection.extend
        model: Club
        url: TORO.API 'clubs/'

class Club extends Factory then constructor: (NgBackboneModel, _) ->
    return NgBackboneModel.extend
        defaults:
            _links: null

        getLogo: (size) ->
            logo = if _.isUndefined(size) or _.isUndefined(@._links['logo_' + size])
                @._links.logo
            else @._links['logo_' + size]

            return _.result logo, 'href'
