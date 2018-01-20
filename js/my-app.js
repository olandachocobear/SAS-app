/*
var myApp=new Framework7({
        material: true,
        //new: 
        pushState: true,
        angular: true
      });


var $$=Dom7;

var view1=myApp.addView('#view-1');
var view2=myApp.addView('#view-2',{dynamicNavbar:true});
var view3=myApp.addView('#view-3');
var view4=myApp.addView('#view-4');


*/


/* Hiding top Tab Bars */ 
// ==================
$('body').on('click', '.item-link.change-page', function(){
  setTimeout(function(){
    //$("#toolbar").css('zIndex',0)
  },0)
});


$('body').on('click', '.back.link', function(){
  $("#toolbar").css('zIndex',5001)
});



/* COMPLETION FORM */
// =================

   $('body').on('click', '.complete_chk', function(){
		console.log('changed')
		
		$("#complain_txt").removeAttr('disabled').focus();
		$(".buttons-row").fadeIn(400);
  });

   function enable_comment(){
      $("#complain_txt").removeAttr('disabled').focus();
      $(".buttons-row").fadeIn(400);
  }


  $('body').on('click', '.open-preloader', function () {
      
//	  myApp.showPreloader('Updating Tasks..');
//      setTimeout(function () {
//          myApp.hidePreloader();

/*           myApp.mainView.router.back({
           force: true,
           url: '#view-3'
          }); */

//        console.log(myApp.mainView.history);

//        view3.router.back();
//        $("#toolbar").css('zIndex',5001)


//      }, 2500);
  });



  $('body').on('click', '.skip_comment', function(){
     myApp.showIndicator();
        setTimeout(function () {
            myApp.hideIndicator();

            view3.router.back();
            $("#toolbar").css('zIndex',5001)

        }, 850);

  });


  /* GPS FORM */
  // =================

  function set_map() {
      view1.router.back();
      $("#absenBtn").removeAttr('disabled');
  }


/*
$(".sortable-handler").on('mousedown', function() {
  console.log('down');
  myApp.destroyPullToRefresh('view-2')
});


$('document').ready(function(){

  myApp.sortableToggle('.sortable');

});
 */
