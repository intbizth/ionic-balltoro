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
            prod:
                api:
                    baseUrl: 'http://api.balltoro.com'
            sim:
                api:
                    baseUrl: 'http://127.0.0.1:8000'
    }
