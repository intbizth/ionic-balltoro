###*
    @modifiedBy liverbool <nukboon@gmail.com>
    @origin     https://github.com/adrianlee44/ng-backbone
###

class NgBackbone extends Factory then constructor: ($http, _) ->
    methodMap =
        create: 'POST'
        update: 'PUT'
        patch: 'PATCH'
        delete: 'DELETE'
        read: 'GET'

    processResponse = (response) ->
        if !_.isUndefined response.data._embedded
            response.data = response.data._embedded.items
        return response.data

    ajax = -> $http.apply $http, arguments
    sync = (method, model, options) ->
        # Default options to empty object
        if _.isUndefined options
            options = {}

        httpMethod = options.method or methodMap[method]
        params = method: httpMethod

        if !options.url and !_.isUndefined model.url
            params.url = model.url

        if _.isUndefined(options.data) and model and (httpMethod == 'POST' or httpMethod == 'PUT' or httpMethod == 'PATCH')
            params.data = angular.toJson(options.attrs or model.toJSON(options))

        # AngularJS $http doesn't convert data to querystring for GET method
        if httpMethod == 'GET' and !_.isUndefined options.data
            params.params = options.data

        xhr = ajax _.extend(params, options)
        xhr.then (data, status, headers, config) ->
            options.xhr =
                status: status
                headers: headers
                config: config

            if !_.isUndefined(options.success) and _.isFunction(options.success)
                options.success processResponse data
            return

        xhr.catch (data, status, headers, config) ->
            options.xhr =
                status: status
                headers: headers
                config: config

            if !_.isUndefined(options.error) and _.isFunction(options.error)
                options.error data
            return

        model.trigger 'request', model, xhr, _.extend(params, options)
        return xhr

    # Override Backbone ajax request
    return _.extend Backbone,
        sync: sync
        ajax: ajax
