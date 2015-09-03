###*
# News Model Collection
#
# @author beer <kannipa@intbizth.com>
###
class NewsStore extends Factory then constructor: (
    CFG, NgBackboneCollection, News
) ->
    return NgBackboneCollection.extend
        model: News
        url: CFG.API.getPath 'news/latest'

###*
# News Model
###
class News extends Factory then constructor: (
    NgBackboneModel
) ->
    return NgBackboneModel.extend {}
