class Countries extends Factory then constructor: (CFG, NgBackboneCollection, Country) ->
    return NgBackboneCollection.extend
        model: Country
        url: CFG.API.getPath 'countries/'

class Country extends Factory then constructor: (NgBackboneModel, Und) ->
    return NgBackboneModel.extend
        defaults:
            _links: null
