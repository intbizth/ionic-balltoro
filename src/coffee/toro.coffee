class TORO extends Constant then constructor: ->
    return {
        VERSION: '0.0.1'
        HTTP_STATUS_CODES:
            '401': 'Unauthorized'
            '403': 'Forbidden'
            '404': 'Not Found'
        ENVIRONMENT:
            dev:
                api:
                    baseUrl: 'http://demo.balltoro.com/api/'
                    proxy: ''
            prod:
                api:
                    baseUrl: 'http://api.balltoro.com/api/'
                    proxy: ''
            sim:
                api:
                    #baseUrl: 'http://127.0.0.1:8000'
                    baseUrl: 'http://demo.balltoro.com/api/'
                    proxy: ''
        # Api path
        API: (path) -> @ENVIRONMENT['@@environment'].api.baseUrl + path
    }
