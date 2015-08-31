angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/browse.html","<ion-view view-title=\"Browse\"><ion-content><h1>Browse</h1></ion-content></ion-view>");
$templateCache.put("templates/login.html","<ion-modal-view><ion-header-bar><h1 class=\"title\">Login</h1><div class=\"buttons\"><button ng-click=\"closeLogin()\" class=\"button button-clear\">Close</button></div></ion-header-bar><ion-content><form ng-submit=\"doLogin()\"><div class=\"list\"><label class=\"item item-input\"><span class=\"input-label\">Username</span><input type=\"text\" ng-model=\"loginData.username\"/></label><label class=\"item item-input\"><span class=\"input-label\">Password</span><input type=\"password\" ng-model=\"loginData.password\"/></label><label class=\"item\"><button type=\"submit\" class=\"button button-block button-positive\">Log in</button></label></div></form></ion-content></ion-modal-view>");
$templateCache.put("templates/matches.html","<ion-view view-title=\"Matches\"><ion-content><ion-item collection-repeat=\"r in store.$collection\"><div><img ng-src=\"{{r.home_club.getLogo(\'70x70\')}}\" style=\"height:20px\"/>{{r.home_club.name}}\nVS<img ng-src=\"{{r.away_club.getLogo(\'70x70\')}}\" style=\"height:20px\"/>{{r.away_club.name}}</div></ion-item><ion-infinite-scroll ng-if=\"store.hasMorePage()\" on-infinite=\"store.getNextPage()\" distance=\"5%\" spinner=\"{{$spinnerIcon}}\"></ion-infinite-scroll></ion-content></ion-view>");
$templateCache.put("templates/menu.html","<ion-side-menus enable-menu-with-back-views=\"false\"><ion-side-menu-content><ion-nav-bar class=\"bar-stable\"><ion-nav-back-button></ion-nav-back-button><ion-nav-buttons side=\"left\"><button menu-toggle=\"left\" class=\"button button-icon button-clear ion-navicon\"></button></ion-nav-buttons></ion-nav-bar><ion-nav-view name=\"menuContent\"></ion-nav-view></ion-side-menu-content><ion-side-menu side=\"left\"><ion-header-bar class=\"bar-stable\"><h1 class=\"title\">Left</h1></ion-header-bar><ion-content><ion-list><ion-item menu-close=\"\" ng-click=\"login()\">Login</ion-item><ion-item menu-close=\"\" href=\"#/app/matches\">Matches</ion-item><ion-item menu-close=\"\" href=\"#/app/search\">Search</ion-item><ion-item menu-close=\"\" href=\"#/app/browse\">Browse</ion-item><ion-item menu-close=\"\" href=\"#/app/playlists\">Playlists</ion-item></ion-list></ion-content></ion-side-menu></ion-side-menus>");
$templateCache.put("templates/playlist.html","<ion-view view-title=\"Playlist\"><ion-content><h1>Playlist</h1></ion-content></ion-view>");
$templateCache.put("templates/playlists.html","<ion-view view-title=\"Playlists\"><ion-content><ion-list><ion-item ng-repeat=\"playlist in playlists\" href=\"#/app/playlists/{{playlist.id}}\">{{playlist.title}}</ion-item></ion-list></ion-content></ion-view>");
$templateCache.put("templates/search.html","<ion-view view-title=\"Search\"><ion-content><h1>Search</h1><floating-button title=\"Open Me\"><floating-button-item title=\"item 1\" icon=\"star\"></floating-button-item><floating-button-item title=\"item 2\" icon=\"funnel\"></floating-button-item><floating-button-item title=\"item 3\" icon=\"clipboard\"></floating-button-item><floating-button-item title=\"item 4\" icon=\"heart\"></floating-button-item></floating-button></ion-content></ion-view>");}]);