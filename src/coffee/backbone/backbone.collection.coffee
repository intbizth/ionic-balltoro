class NgBackboneCollection extends Factory then constructor: (TORO, NgBackbone, NgBackboneModel, _) ->
    PROXY = TORO.ENVIRONMENT["@@proxyPass"].api.proxy
    BASE_URL = TORO.ENVIRONMENT["@@proxyPass"].api.baseUrl

    # TODO:
    # - subscribe `reset` to make `ordering` of fullCollection to
    #   `append` or `prepend` eg. in `pull-refuesh` it make sense to be `prepend`

    return NgBackbone.PageableCollection.extend
        model: NgBackboneModel

        # configurations of:
        #     https://github.com/backbone-paginator/backbone.paginator
        mode: 'infinite'
        state:
            pageSize: 10
        queryParams:
            pageSize: 'limit'
            #totalRecords: 'total' # no need on server api.
            totalPages: 'pages'

        parseLinks: (resp, options) ->
            _links = _.result resp.data, '_links'

            if _links
                defs = href: ''
                first = _.result _links, 'first', defs
                next = _.result _links, 'next', defs
                previous = _.result _links, 'previous', defs

                return {
                    first: first.href.replace PROXY, BASE_URL
                    next: next.href.replace PROXY, BASE_URL
                    prev: previous.href.replace PROXY, BASE_URL
                }
            else return NgBackbone.PageableCollection::parseLinks.apply @ arguments

        parseRecords: (resp) ->
            data = _.result resp.data, '_embedded'
            resp.data = data.items if data

            return resp.data

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
                get: =>
                    return @fullCollection.models if @mode == 'infinite'
                    return @models

            NgBackbone.PageableCollection::constructor.apply @, arguments
            return

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

        $resetStatus: ->
            @$setStatus
                deleting: no
                loading: no
                saving: no
                syncing: no

        # get collection
        getCollection: -> @$collection
