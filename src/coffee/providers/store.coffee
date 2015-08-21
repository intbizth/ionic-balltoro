class Store extends Provider
    constructor: ->
        doRefresh = (DS) ->
            console.log DS

        @apiBasePath = '/api/'
        @default =
            loadingIndicator: null
            refreshMode: 'infinite'
            deserialize: (model, response) ->
                if typeof response.data._embedded is 'object'
                    # TODO: integrate paginator
                    return response.data._embedded.items
                else
                    return response.data

            # add load method
            load: (args) ->
                args = args || {}
                $scope = args.scope || null
                params = args.params || {}
                options = args.options || {}
                resourceName = pluralize @name
                loading =
                    enable: args.indicator isnt no
                    indicator: @loadingIndicator
                    start: -> if @enable then @indicator.show template: 'Loading...'
                    stop: -> if @enable then @indicator.hide()

                # setup refresh
                if $scope then $scope.refresh = -> doRefresh @

                # start load
                loading.start()
                promise = @findAll params, options

                # success
                promise.then (data) ->
                    loading.stop()
                    $scope[resourceName] = data if $scope
                    return

                # error
                promise.catch ->
                    loading.stop()
                    $scope[resourceName] = null if $scope
                    return

                # must return promise
                return promise

        # setup provider
        @$get = (DS, $ionicLoading) ->
            @default.loadingIndicator = $ionicLoading

            @define = (config) ->
                # just define the name
                if typeof config is 'string'
                    config = name: config

                # plural name
                @default.endpoint = @apiBasePath + pluralize config.name

                # define resource
                DS.defineResource angular.extend @default, config

            # output provider
            return @
