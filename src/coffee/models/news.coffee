class NewsStore extends Factory then constructor: (CFG, NgBackboneCollection, News) ->
    return NgBackboneCollection.extend
        model: News
        url: CFG.API.getPath 'news/latest'

class News extends Factory then constructor: (NgBackboneModel, Und) ->
    return NgBackboneModel.extend
        defaults:
            _links: null
