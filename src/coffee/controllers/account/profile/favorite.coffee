class Favorite extends Controller
  constructor: ($scope, $mdSidenav) ->

    $scope.toggleRight = ->
      console.log 'Tog'
      $mdSidenav('Toggle_right').toggle()
      return
    $scope.close = ->
      $mdSidenav('Toggle_right').close()