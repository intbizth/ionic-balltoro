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
                    baseUrl: ''
                    proxy: 'http://127.0.0.1:8001'
                    #proxy: 'http://demo.balltoro.com'
            prod:
                api:
                    baseUrl: 'http://api.balltoro.com'
                    proxy: ''
            sim:
                api:
                    #baseUrl: 'http://127.0.0.1:8000'
                    baseUrl: 'http://demo.balltoro.com'
                    proxy: ''
    }
