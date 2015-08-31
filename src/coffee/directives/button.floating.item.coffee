class FloatingButtonItem extends Directive
    constructor: ->
        return {
            restrict: 'E'
            scope:
                title: '@'
                icon: '@'
            template:
                '<div class="item" title="{{title}}">' +
                    '<i class="icon ion-{{icon}}"></i>' +
                '</div>'
        }
