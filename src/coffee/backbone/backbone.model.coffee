class NgBackboneModel extends Factory then constructor: ($rootScope, NgBackbone) ->

    # Usage: model.$attributes.someKey
    defineProperty = (key) ->
        Object.defineProperty @$attributes, key,
            enumerable: true
            configurable: true
            get: => @get key
            set: (newValue) =>
                @set key, newValue
                return
        return

    # Usage: model.someKey
    definePropertyQuickAccessor = (key) ->
        Object.defineProperty @, key,
            enumerable: true
            configurable: true
            get: =>
                if !_.isUndefined(@attributes[key])
                    return @$attributes[key]
                else
                    return @[key]

            set: (newValue) =>
                if !_.isUndefined(@attributes[key])
                    @attributes[key] = newValue
                else @[key] = newValue
                return
        return

    return NgBackbone.RelationalModel.extend
        constructor: ->
            @$status =
                deleting: false
                loading: false
                saving: false
                syncing: false

            @on 'request', (model, xhr, options) ->
                @$setStatus
                    deleting: options.method == 'DELETE'
                    loading: options.method == 'GET'
                    saving: options.method == 'POST' or options.method == 'PUT'
                    syncing: true
                return

            @on 'sync error', @$resetStatus
            return NgBackbone.RelationalModel::constructor.apply @, arguments

        set: (key, val, options) ->
            output = NgBackbone.RelationalModel::set.apply @, arguments

            # Do not set binding if attributes are invalid
            @$setBinding key, val, options
            return output

        $resetStatus: ->
            @$setStatus
                deleting: false
                loading: false
                saving: false
                syncing: false

        $setBinding: (key, val, options) ->
            return @ if _.isUndefined(key)

            if _.isObject(key)
                attrs = key
                options = val
            else (attrs = {})[key] = val

            options = options or {}
            @$attributes = {} if _.isUndefined(@$attributes)
            unset = options.unset

            for attr of attrs
                if unset and @$attributes.hasOwnProperty(attr)
                    delete @$attributes[attr]
                else if !unset and !@$attributes[attr]
                    defineProperty.call @, attr
                    definePropertyQuickAccessor.call @, attr
            return @

        $setStatus: (key, value, options) ->
            return @ if _.isUndefined(key)

            if _.isObject(key)
                attrs = key
                options = value
            else (attrs = {})[key] = value

            options = options or {}

            for attr of @$status
                if attrs.hasOwnProperty(attr) and _.isBoolean(attrs[attr])
                    @$status[attr] = attrs[attr]
            return

        $removeBinding: (attr, options) ->
            @$setBinding attr, undefined, _.extend({}, options, unset: true)
