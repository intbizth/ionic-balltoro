// Generated by CoffeeScript 1.10.0
(function() {
  var Favorite,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Favorite = (function(superClass) {
    extend(Favorite, superClass);

    function Favorite($scope, $mdSidenav) {
      $scope.toggleRight = function() {
        console.log('Tog');
        $mdSidenav('Toggle_right').toggle();
      };
      $scope.close = function() {
        return $mdSidenav('Toggle_right').close();
      };
    }

    return Favorite;

  })(Controller);

}).call(this);

//# sourceMappingURL=favorite.js.map
