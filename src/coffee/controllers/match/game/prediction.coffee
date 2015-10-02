class MatchGamePrediction extends Controller then constructor: (
    $scope, $timeout, Und, Chance
) ->

    $scope.events =
        items: [],
        match:
            halftime: false
            end: false
        next: false
        loadData: ->
            items = this.fakeItems()
            this.items =  items
#            console.log('events:loadData', this.items.length, JSON.stringify(this.items))
            return
        doRefresh: ->
            console.log 'events:doRefresh'
            $this = this
            $timeout(->
                console.log 'events:doRefresh2'
                $this.loadData()
                $scope.$broadcast 'scroll.refreshComplete'
                return
            , 2000)
            return
        fakeItem: (config) ->
            item =
                id: Und.random(1, 9999999)
            if typeof config isnt 'undefined' and config.start
                item.icon = null
                item.dot = 'large'
                item.name = ''
                item.description = 'เริ่มการแข่งขัน'
                item.align = 'right'
                item.time = '00:00'
            else if typeof config isnt 'undefined' and config.halftime
                item.icon = null
                item.dot = 'halftime'
                item.name = ''
                item.description = 'ครึ่งหลัง'
                item.align = 'right'
                item.time = '45:00'
            else if typeof config isnt 'undefined' and config.end
                minute = Und.random(90, 110)
                second = Chance.second()
                time =  minute + ':' + second
                item.icon = null
                item.dot = 'large'
                item.name = ''
                item.description = 'จบการแข่งขัน'
                item.align = 'right'
                item.time = time
            else
                minute = Chance.minute()
                if Chance.pick([true, false]) then minute += 15
                second = Chance.second()
                if minute < 10 then minute = '0' + minute
                if second < 10 then second = '0' + second
                time =  minute + ':' + second
                if parseInt(minute) >= 45 and parseInt(second) > 1
                    this.match.halftime = true
                item.icon = Chance.pick(['yellow_card', 'red_card', 'yellow_red_card', 'goal'])
                item.dot = 'normal'
                item.name = Chance.name()
                item.description = ''
                item.align = Chance.pick(['left', 'right'])
                item.time = time
            return item
        fakeItems: ->
            $scope.$broadcast 'event.start'
            items = [this.fakeItem({start: true})]
            i = 0
            ii = Und.random(0, 30)
            while i < ii
                item = this.fakeItem()
                items.push item
                i++
            if this.match.halftime
                items.push this.fakeItem({halftime: true})
            if Chance.pick([true, false])
                this.match.end = true
                items.push this.fakeItem({end: true})
            items = Und.sortBy(items, (value) ->
                return parseFloat value.time
            )
            $scope.$broadcast 'event.complete'
            return items

    $scope.events.loadData()

    $scope.finishMatch = true

    $scope.progressData =
        [
            { value:80 , color:'#FF3B30', won:yes, status:'-left' }
            { value:20 , color:'#FAAF40', won:no, status:'-right' }
        ]
