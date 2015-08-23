###*
    @modifiedBy liverbool <nukboon@gmail.com>
    @origin     https://github.com/adrianlee44/ng-backbone
###

class NgBackboneCollection extends Factory then constructor: (NgBackbone, NgBackboneModel) ->
    return NgBackbone.Collection.extend
        model: NgBackboneModel
        constructor: ->
            # Initialize status object
            @$status =
                deleting: no
                loading: no
                saving: no
                syncing: no

            @on 'request', (model, xhr, options) ->
                @$setStatus
                    deleting: options.method == 'DELETE'
                    loading: options.method == 'GET'
                    saving: options.method == 'POST' or options.method == 'PUT'
                    syncing: no
                return

            @on 'sync error', @$resetStatus

            # For clearing status when destroy model on collection
            @on 'destroy', @$resetStatus

            Object.defineProperty @, '$collection',
                enumerable: no
                get: => @models

            NgBackbone.Collection.apply @, arguments
            return

        $setStatus: (key, value, options) ->
            return @ if angular.isUndefined(key)

            if angular.isObject(key)
                attrs = key
                options = value
            else (attrs = {})[key] = value

            options = options or {}

            for attr of @$status
                if attrs.hasOwnProperty(attr) and _.isBoolean(attrs[attr])
                    @$status[attr] = attrs[attr]
            return

        $resetStatus: ->
            @$setStatus
                deleting: no
                loading: no
                saving: no
                syncing: no

        # get collection
        getCollection: -> @$collection
