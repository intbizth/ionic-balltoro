class Clubs extends Factory then constructor: (NgBackboneCollection, Club) ->
    return NgBackboneCollection.extend
        model: Club

class Club extends Factory then constructor: (NgBackboneModel) ->
    return NgBackboneModel.extend
        defaults:
            _links: null

        getLogo: (size) ->
            if angular.isUndefined(size)
                logo = @._links.logo

            if angular.isUndefined(@._links['logo_' + size])
                logo = @._links.logo

            logo = @._links['logo_' + size]

            return if logo? then logo.href else null
