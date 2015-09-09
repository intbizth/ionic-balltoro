###*
# User Model Collection
#
# @author beer <kannipa@intbizth.com>
###
class Users extends Factory then constructor: (
    NgBackboneCollection, User
) ->
    return NgBackboneCollection.extend
        model: User
        url: User::url

###*
# User Model
###
class User extends Factory then constructor: (
    CFG, NgBackboneModel
) ->
    return NgBackboneModel.extend
        url: CFG.API.getPath 'users/'
