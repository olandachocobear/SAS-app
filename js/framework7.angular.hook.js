Framework7.prototype.plugins.angular = function(app, params) {
  function compile(newPage) {
    try {
      var $page = $(newPage);
      var injector = angular.element("[ng-app]").injector();
     
      var $compile = injector.get("$compile");
      
      var $timeout = injector.get("$timeout");
      var $scope = injector.get("$rootScope");

      $scope = $scope.$$childHead;
      $timeout(function() {
		// render new page here..
        $compile($page)($scope);
        
      })
    } catch (e) {
      //console.error("Some Error Occured While Compiling The Template", e);
    }
  }

  function removeOldPage(pageData){
    var $oldPage =  $(".views .view .pages .page").not( $(pageData.container));
    if( $oldPage.length > 0){
      var controllerName = $oldPage.attr("ng-controller");
      
      var $scope = angular.element('[ng-controller='+controllerName+']').scope();

      if($scope){
        $scope.$destroy();
        $oldPage.fadeOut( 200)
		setTimeout(function() {
			$oldPage.remove();
		}, 100);
      }
    }
  }

  return {
    hooks: {
      pageInit: function(pageData) {
        console.log('page Init')
        //console.log(pageData)
        compile(pageData.container);
      },
      pageAfterAnimation  : function(pageData){
        console.log('old page destroy~')
        removeOldPage(pageData);
      }
    }
  }
};