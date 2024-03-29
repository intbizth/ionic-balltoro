// Generated by CoffeeScript 1.10.0
(function() {
  var Favorite,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Favorite = (function(superClass) {
    extend(Favorite, superClass);

    function Favorite($scope, $mdSidenav) {
      $scope.open = function() {
        $mdSidenav('Toggle_right').open();
      };
      $scope.close = function() {
        return $mdSidenav('Toggle_right').close();
      };
      $scope.teamList = [
        {
          imgURL: 'https://adium.im/images/services/icon-msn.png',
          name: 'My Team Overview'
        }, {
          imgURL: 'https://adium.im/images/services/icon-aim.png',
          name: 'Chonburi FC VS'
        }, {
          imgURL: 'https://adium.im/images/services/icon-yahoo.png',
          name: 'Liverpool'
        }, {
          imgURL: 'https://adium.im/images/services/icon-googletalk.png',
          name: 'FC Barcelona'
        }, {
          imgURL: 'https://adium.im/images/services/icon-twitter.png',
          name: 'S.S.C. Napoli'
        }, {
          imgURL: 'https://adium.im/images/services/icon-facebook.png',
          name: 'Olympique Lynonais'
        }
      ];
      $scope.myTeam = [
        {
          name: 'My Team'
        }, {
          name: 'Thai Premier League'
        }, {
          name: 'Premier League'
        }, {
          name: 'LA LIGA'
        }, {
          name: 'SERIE A'
        }, {
          name: 'LIGUE 1'
        }
      ];
    }

    return Favorite;

  })(Controller);

}).call(this);

//# sourceMappingURL=favorite.js.map
