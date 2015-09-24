class Favorite extends Controller
  constructor: ($scope, $mdSidenav) ->

    $scope.open = ->
      $mdSidenav('Toggle_right').open()
      return
    $scope.close = ->
      $mdSidenav('Toggle_right').close()

    $scope.teamList = [
      {
        imgURL: 'https://adium.im/images/services/icon-msn.png',
        name: 'My Team Overview'
      },
      {
        imgURL: 'https://adium.im/images/services/icon-aim.png',
        name: 'Chonburi FC VS'
      },
      {
        imgURL: 'https://adium.im/images/services/icon-yahoo.png',
        name: 'Liverpool'
      },
      {
        imgURL: 'https://adium.im/images/services/icon-googletalk.png',
        name: 'FC Barcelona'
      },
      {
        imgURL: 'https://adium.im/images/services/icon-twitter.png',
        name: 'S.S.C. Napoli'
      },
      {
        imgURL: 'https://adium.im/images/services/icon-facebook.png',
        name: 'Olympique Lynonais'
      }
    ];

    $scope.myTeam = [
      {
        name: 'My Team'
      },
      {
        name: 'Thai Premier League'
      },
      {
        name: 'Premier League'
      },
      {
        name: 'LA LIGA'
      },
      {
        name: 'SERIE A'
      },
      {
        name: 'LIGUE 1'
      }
    ];
