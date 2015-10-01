class Moment extends Filter then constructor: ( Moment )->

    return (value, option) ->
        switch option.toLowerCase()
            when 's'
                return value.format('L')
            when 'm'
                return value.format('LL')
            when 'l'
                return value.format('LLL')
