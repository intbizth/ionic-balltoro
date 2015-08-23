class Clubs extends Factory then constructor: (NgBackboneCollection, Club) ->
    return NgBackboneCollection.extend
        model: Club

class Club extends Factory then constructor: (NgBackboneModel) ->
    return NgBackboneModel.extend
        defaults:
            _links: null

        getLogo: (size) ->
            logo = if angular.isUndefined(size) or angular.isUndefined(@._links['logo_' + size])
                @._links.logo
            else @._links['logo_' + size]

            return if logo? then logo.href else null
