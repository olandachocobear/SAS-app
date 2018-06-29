/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // Application Constructor
    initialize: function() {
        console.log('fyeah')
		
		console.log('window.agent : ' + window.navigator.userAgent );
        
		this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        console.log('lanjut')
        //this.onDeviceReady()
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
	
		// registering Back button
		document.addEventListener("backbutton", onBackKeyDown, false);


        // Open any external link with InAppBrowser Plugin
        $(document).on('click', 'a[href^=http], a[href^=https]', function(e){

            e.preventDefault();
            var $this = $(this); 
            var target = $this.data('inAppBrowser') || '_blank';

            window.open($this.attr('href'), target);

        });


	angular.bootstrap(document.body, ["absenJobApp"]);

		if (window.device) {
			alert('Running Cordova ' + window.device.cordova);
		}
        
		function onBackKeyDown() {
			myApp.getCurrentView().router.back();
			$("#toolbar").css('zIndex',5001)
		}
		

        // Initialize Push Notifications
        // Uncomment the following initialization when you have made the appropriate configuration for iOS - http://goo.gl/YKQL8k and for Android - http://goo.gl/SPGWDJ
        //app.initPushwoosh();
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Register device for Push Notifications
    initPushwoosh: function() {
        var pushNotification = window.plugins.pushNotification;

		if(device.platform == "Android") {
			registerPushwooshAndroid();
		}
        if (device.platform == "iPhone" || device.platform == "iOS") {
            registerPushwooshIOS();
        }
    }

};

(function() {

	// BEGIN PUSH INITIALIZATION
	// ===========================
	function push_init(id) {
		alert('starting push_init');
		var push = PushNotification.init({
			android: {
				senderID: "54343666763"
			}
		});

		push.on('registration', function(data) {
			alert('ID: ' + data.registrationId);
			// ADD DEVICE TO DATABASE..
			$.ajax({
				url: 'http://sinergiadhikarya.co.id/public/api/push/register',
				type: "GET",
				dataType: "text",
				data: { id: id, device: navigator.userAgent, token: data.registrationId},

				success: function(rep) {
					alert('registered (msg: ' + rep + ')')
				},
				error: function() {
					toast("Push Registration process failed", "long", "bottom", -40);
				}
			});
		});

		push.on('notification', function(data) {
			alert(data.message);
			
			/*
			title_arr = data.message.split("-");

			awb = title_arr[0];

			if (data.title == 'Package Received')
			{
				//createNotification('OK2', 'AWB #'+data.AWB, 'Your Package has been Received');
				createNotification('OK2', awb, 'Your Package has been Received');
			}

			if (data.title == 'Package Arrived')
			{
				createNotification('SH', awb, 'Your Package has arrived on '+ title_arr[1]);
				//createNotification('SH', 'AWB #'+data.AWB, 'Your Package has arrived on '+data.dest);
			}
			*/

			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			// data.additionalData
		});

		push.on('error', function(e) {
			alert(  e.message );
		});
	}
	//============= END OF PUSH INITIALIZATION ===========



	//REMOVED 'google-maps'.ns() FROM LIST
    var app = angular.module('absenJobApp', ['angular-jwt', 'angularMoment', 'ngSanitize', 'appLocalStorage', 'LocalStorageModule', 'ui.map', 'ui.event', 'nvd3', 'ngCordova']);
    
    app.run(function() {
        myApp = new Framework7({
            modalTitle: 'Something\'s wrong..',
            material: true,
            pushState: true,
            angular: true,
			
			// added 15/01/18
			swipePanel:	'right',

			//added 31/01/18
			routes: [{
			    path: '/login/',
				content: 'login-screen.html'
			}]
        });
       
        mainView = myApp.addView('#mainView', {});
		
		view1=myApp.addView('#view-1',{dynamicNavbar:true});
        view2=myApp.addView('#view-2');
        view3=myApp.addView('#view-3');
        view4=myApp.addView('#view-4');
        view5=myApp.addView('#view-5');

    })

    app.config(function() {

        //landing screen
        //view1.router.loadPage("index-2.html")
        //window.location.hash = "#!/index.html";
    })
    
    
    // Home Controller
    app.controller('HomeController', function($scope, Data) {
        
        $scope.items = Data.items;

        $scope.showDetail = function(index){
            var selectedItem = $scope.items[index];
            Data.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage(selectedItem.page, {title: selectedItem.title, animation: 'slide'});
        }
        
    });
    
    // Menu Controller
    app.controller('MenuController', function($scope, MenuData) {
        
        $scope.items = MenuData.items;

        $scope.showDetail = function(index){
            var selectedItem = $scope.items[index];
            MenuData.selectedItem = selectedItem;

            $scope.ons.slidingMenu.setMainPage(selectedItem.page, {closeMenu: true})
            
        }
        
    });
    
    // Plugins Controller
    app.controller('PluginsController', function($scope, PluginsData) {
        $scope.items = PluginsData.items;
            
        $scope.showDetail = function(index){
            var selectedItem = $scope.items[index];
            PluginsData.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage('plugins/' + selectedItem.page, {title: selectedItem.title, animation: 'slide'});

        }
        
    });
    
    // Parameters Controller
    app.controller('ParametersController', function($scope) {
        var page = $scope.ons.navigator.getCurrentPage();
		console.log (page)
        $scope.param1 = page.options.param1;
    });
    
    // Map Controller
    app.controller('MapController', function($scope, MapData) {
        
        $scope.windowOptions = false;

        $scope.onClick = function () {
        this.windowOptions = !this.windowOptions;
        };

        $scope.closeClick = function () {
        this.windowOptions = false;
        };
        
        $scope.map = MapData.map;
        

        
    });
    
    // Contact Controller
    app.controller('ContactController', function($scope) {

        $scope.submitForm = function() {
            
            window.plugin.email.open({
                to:      ['username@company.com'],
                cc:      ['username1@company.com'],
                bcc:     ['username2@company.com'],
                subject: $scope.subject,
                body:    $scope.message
            });

        };

    });
    
    // News Controller
    app.controller('NewsController', function($scope, $http, NewsData) {
        
        $scope.news = [];
        
        $http({method: 'GET', url: NewsData.url}).
        success(function(data, status, headers, config) {
            $scope.news = data.result;
            $scope.letterLimit = NewsData.letterLimit;
        }).
        error(function(data, status, headers, config) {

        });
        
        $scope.showDetail = function(index) {
        var selectedItem = $scope.news[index];
        NewsData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('item.html', selectedItem);
        }
        
        // getNews() function()
        $scope.getNews = function() {
            // Filter News by $scope.search
            return $scope.news.filter(function(item) {
                
                // Filter News by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;
                
                // Filter News by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 || 
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;
                
                return itemDoesMatch;
            });
        };

        // Search Detail function()
        $scope.showSearchDetail = function(index) {
        var items = $scope.getNews();
        var selectedItem = items[index];
        NewsData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('new.html', selectedItem);
        }
        
    });
    
    // New Controller
    app.controller('NewController', function($scope, ServerPostsData) {
        //$scope.item = NewsData.selectedItem;
		$scope.item = ServerPostsData.selectedItem;
		console.log($scope.item);
     });

	// New Controller2 (item from Browse..)
    app.controller('NewController2', function($scope, ProductsData) {
        //$scope.item = NewsData.selectedItem;

		$scope.item = ProductsData.selectedItem;
		console.log($scope.item);
		

		$scope.swipedLeft = function(event) {
            /*    
            var title = document.getElementById('your_bid')
            isi = title.textContent;
            alert(isi)
            */
            
            eventFire(document.getElementById('rotateFwdbtn'), 'click');
		}
        
        $scope.swipedRight = function(event) {
            eventFire(document.getElementById('rotateBackbtn'), 'click');
		}        
     })


	// Products Controller
    app.controller('ProductsController', function($scope, $http, $timeout, ProductsData, localStorageService) {
        
		//'THROTTLE_MILLISECONDS' added on infinite-scroll.min.js directly... to hold back multiple, crazy loads

		$scope.hashtags = [];
		$scope.isLoading = false;
		$scope.search_title = "Search"
		$scope.search_param = ""

        $http({method: 'GET', url: ProductsData.url}).
        success(function(data, status, headers, config) {
			console.log('ay loaded..')
            $scope.products = data.result;
            $scope.letterLimit = ProductsData.letterLimit;
        }).
        error(function(data, status, headers, config) {

        });
        
        $scope.showDetail = function(index) {
        var selectedItem = $scope.products[index];
        ProductsData.selectedItem = selectedItem;
        //$scope.ons.navigator.pushPage('product.html', selectedItem);
		$scope.ons.navigator.pushPage('item2.html', selectedItem);
        }


		$scope.search = function(param) {
			console.log ('searching: ' + param);
			
			// retrieve API search..

	        $http({method: 'GET', url: ProductsData.url}).
			success(function(data, status, headers, config) {
				$scope.products = data.result;
				$scope.letterLimit = ProductsData.letterLimit;
			}).
			error(function(data, status, headers, config) {

			});
		}

		$scope.submit = function(event) {
			
			var $elm = $(event.currentTarget);

			if (event.keyCode == 13)  {
				// check if we want to search Ladang or product name...
				if ($elm.val()[0] != '#')
				{

					$scope.search_title = "Result for " + $elm.val();
					$scope.search_param = $elm.val()

					$scope.search($scope.search_param)

					$elm.val('').blur();
					
				}
				else  // if Ladang 
					$scope.addHashtag(event) 
			}

			else {   
					if (event.keyCode == 27 )
						$scope.clearHashtag(event) 
			}
		}

		// to check if it has hashtag keywords already
        if (localStorageService.get('searchHashtags')) {
            $scope.hashtags = localStorageService.get('searchHashtags');
        }
        
        $scope.addHashtag = function($event) {

			var elm = $event.currentTarget || $event.srcElement;
			var hashtag = $(elm).val().replace('#','');
			$(elm).val('').blur();
            
			$scope.hashtags.push(hashtag)
            localStorageService.set('searchHashtags',$scope.hashtags);

			console.log($scope.hashtags)
        };
        
		$scope.clearHashtag = function($evt) {
			localStorageService.remove ('searcHashtags')
			$scope.hashtags = []
			$($evt.currentTarget).blur()
			console.log ('hashtags resetto..')
		};

		$scope.removeHashtag = function($evt) {
			var elm = $evt.currentTarget || $evt.srcElement;
			var hashtag = $(elm).html()
			
			var index = $scope.hashtags.indexOf(hashtag);

			$scope.hashtags.splice(index, 1);
			localStorageService.set('searchHashtags',$scope.hashtags);
		}

		$scope.clearSearch = function() {
			$scope.products = [];
			$scope.hashtags = []; 			
			localStorageService.set('searchHashtags',$scope.hashtags);
			$scope.search_title = "Search"
			$scope.search_param = ""

			setTimeout('toggle_search()', 50);
		}


		// Infinite-scroll..
		// ==============

		// define mentok nye: 
		  $scope.canWeLoadMoreContent = function() {

			$timeout( function() {
				  console.log('load again?')
				return ($scope.products.length > $scope.products.total) ? false : true;
			}, 2500);
		  } 

		  $scope.retrieveList = function(page) {
			
			console.log('infinityy...');
			// retrieve API search..

	        $http({method: 'GET', url: ProductsData.url}).
			success(function(data, status, headers, config) {
				$scope.products.push ( data.result );
				$scope.letterLimit = ProductsData.letterLimit;
			}).
			error(function(data, status, headers, config) {

			});
		  }

		$scope.loadMore = function() {

			if (!$scope.isLoading )
			{
				console.log ('infinite scroll yo..');
				$scope.isLoading = true;

				$http({method: 'GET', url: ProductsData.url}).
				success(function(data, status, headers, config) {

					console.log ('new json came in..')
					$scope.isLoading = false
					
					data.result.forEach (function (item){
						$scope.products.push ( item );
					});
					
					console.log ($scope.products)
					$scope.letterLimit = ProductsData.letterLimit;
				}).
				error(function(data, status, headers, config) {

				});
			}
		}


    });

    // Product Controller
    app.controller('ProductController', function($scope, ProductsData) {
        $scope.item = ProductsData.selectedItem;
     });
    
    // Posts Controller
    app.controller('PostsController', function($scope, $http, PostsData) {
        
        $scope.msg = "Loading...";
        
        $http({method: 'GET', url: PostsData.url}).
        success(function(data, status, headers, config) {
            $scope.posts = data.posts;
            
            if ($scope.posts.length < 1)
            {
                $scope.msg = "Nothing found.";
            }else{
                $scope.msg = undefined;
            }

            var page = 1;
            // Define the number of the posts in the page
            var pageSize = 3;

            $scope.paginationLimit = function(data) {
            return pageSize * page;
            };

            $scope.hasMoreItems = function() {
            return page < ($scope.posts.length / pageSize);
            };

            $scope.showMoreItems = function() {
            page = page + 1;       
            }; 
            
        }).
        error(function(data, status, headers, config) {
        $scope.msg = 'An error occured:' + status;
        });
        
        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        PostsData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('post.html', selectedItem);
        }
        
    });
    
    // Post Controller
    app.controller('PostController', function($scope, PostsData) {
        $scope.item = PostsData.selectedItem;

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }
        
        $scope.sharePost = function () {
            
            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

     });
    
    // Server Posts Controller (Server side pagination with AngularJS)
    app.controller('ServerPostsController', function($scope, $http, $filter, ServerPostsData) {
        
        $scope.loadData = function () {
            
            $http({method: 'GET', url: ServerPostsData.url + 'page=' + $scope.page}).
            success(function(data, status, headers, config) {
                
                $scope.msg = "";
                $scope.more = data.pages !== $scope.page;
                $scope.posts = $scope.posts.concat(data.posts);
                $scope.status_bar = "Showing " + ($scope.posts.length === 0 ? "0" : "1") + " to " + $filter('number')($scope.posts.length) + " of " + $filter('number')(data.count_total) + " entries";

            }).
            error(function(data, status, headers, config) {
            $scope.msg = 'An error occured:' + status;
            });
            
        }

        $scope.showMoreItems = function () {
            $scope.page += 1;
            $scope.msg = "Loading...";
            $scope.loadData();
        }

        $scope.hasMoreItems = function () {
            return $scope.more;
        }

        $scope.page = 1;
        $scope.posts = [];
        $scope.more = true;
        $scope.status_bar = "";
        $scope.loadData();
        
        // getServerPosts() function()
        $scope.getServerPosts = function() {
            // Filter Server Posts by $scope.search
            return $scope.posts.filter(function(item) {
                
                // Filter Server Posts by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;
                
                // Filter Server Posts by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 || 
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;
                
                return itemDoesMatch;
            });
        };

        // Search Detail function()
        $scope.showSearchDetail = function(index) {
        var items = $scope.getServerPosts();
        var selectedItem = items[index];
        ServerPostsData.selectedItem = selectedItem;
		//console.log (selectedItem);
        $scope.ons.navigator.pushPage('item.html', selectedItem);
        }
        
    });
    
    // Server Post Controller
    app.controller('ServerPostController', function($scope, ServerPostsData) {
        $scope.item = ServerPostsData.selectedItem;
		
        
        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }
        
        $scope.sharePost = function () {
            
            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;
            
            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }
        
    });


	var $$=Dom7;
	
//Mozilla/5.0 (Linux; Android 6.0; Android/MRA58N) 
	if (window.navigator.userAgent.indexOf('Android') > -1)
	
		var toast = function (msg, duration, loc, fine_adj){
				window.plugins.toast.showWithOptions({
						  message: msg,
						  duration: duration,
						  position: loc,
						  addPixelsY: fine_adj  // added a negative value to move it up a bit (default 0) 
				});
		}
	
	else

		var toast = function (msg,duration,loc,fine_adj) {
			console.log (msg);
		}



	app.controller('LoginCtrl', function($scope, $rootScope, $http, LoginData, ProfileData, $cordovaPushV5, localStorageService) {
		
		//console.log($$("#txt_email").css());
		
		$scope.login = function( ) {
            
            $scope.checkOut = false;

			var url = LoginData.url //+ '?uname=' + $scope.txt_email + '&pass=' + $scope.txt_pass;

			console.log(url);

			myApp.showIndicator();

			$http({
				method: 'POST', 
				url: url,
				data: {
					pass: $scope.txt_pass,
					uname: $scope.txt_email
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },	// not www urlencoded
				transformRequest: function(obj) { 
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				}
			}).
			success(function(data, status, headers, config) {
				
				if (data.status == 200){
		            myApp.hideIndicator();

                    //geoloc..
                    $rootScope.officeLat = data.detail.latitude;
                    $rootScope.officeLng = data.detail.longitude;
                    localStorageService.set('lat', $rootScope.officeLat)
                    localStorageService.set('lng', $rootScope.officeLng)

					console.log('showing welcomeScreen')
					//myApp.loginScreen($("#lamanWelcome"), true) 
                    myApp.closeModal($("#lamanLogin"))

					// must init 1st!
					$rootScope.announcement_list = []

					// COMMENT HERE!!
					//storeSchedule()

					// ANNOUNCEMENT section..
					$scope.fetchAnnouncement()


					//$scope.checkPushRegistration();

                    // DONT FORGET to UNCOMMENT!!
					// $scope.pushInit($scope.txt_email);

					localStorageService.set("usr_token", data._tkn);

					toast("Login Success", "long", "bottom", -70);
					$rootScope.NIP = data.detail.no_ktp;
					// $rootScope.newCandidateFlag = (data.detail.status=='' && data.detail.no_NIK=='') ? true : false;
                    $rootScope.newCandidateFlag = (data.detail.kd_status_karyawan != 'KDKRY0011') ? true : false;
                    
                    $rootScope.minimumWorkHour = data.detail.senin;
                    localStorageService.set('workhour', $rootScope.minimumWorkHour)

					console.log('new candidate? ' + $rootScope.newCandidateFlag ) 

					//ProfileData.img = data.detail.foto; 
					// no more storing data to Factory, because we can't make two way binding. MUST USE the costly $watch
                    if (data.detail.foto!=null)
                        $rootScope.avatar = data.detail.foto; 
                    else
                        $rootScope.avatar = 'data:image/jpeg;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

					$rootScope.first_name= data.detail.nama_depan;
					$rootScope.last_name= data.detail.nama_belakang;
					
					//ProfileData.last_name= data.detail.nama_belakang;
					
					//console.log(ProfileData);

					if ($rootScope.newCandidateFlag)
					{
						//refresh view Sidebar
						view5.router.refreshPage(); 

						angular.element('#tab-1').addClass('disabled');
						angular.element('#tab-2').addClass('disabled');
						angular.element('#tab-3').addClass('disabled');

						// layer the App with Welcome Screen..
						
						myApp.loginScreen($("#lamanWelcome"), true) 
						console.log('Welcome screen displayed..')

						view4.router.refreshPage();

						// activing MAILBOX tab
						$$("#tab-2").removeClass('active');
								$$("#tab-4").addClass('active');

									$$("#view-2").removeClass('active');
									$$("#view-4").addClass('active');
					}
					else
					{
			console.log('employee with NIK detected..')

						view2.router.refreshPage();
						view3.router.refreshPage();
						view4.router.refreshPage();

						//view5.router.reloadContent();
						view5.router.refreshPage();

						myApp.showPreloader('Checking Profile..');

						setTimeout(function(){
							myApp.hidePreloader()

							myApp.showPreloader('Updating Tasks..');
							setTimeout(function() {
								myApp.hidePreloader();

							if(!$rootScope.newCandidateFlag){
								
								console.log('focus tab 1');
								$$("#tab-2").removeClass('active');
								$$("#tab-1").addClass('active');

									$$("#view-2").removeClass('active');
									$$("#view-1").addClass('active');
							}
							else {
								
								console.log('focus tab 2');
								$$("#tab-2").removeClass('active');
								$$("#tab-4").addClass('active');

									$$("#view-2").removeClass('active');
									$$("#view-4").addClass('active');
							}
							}, 1500);

						}, 2000);
					}
				}

				else{
					myApp.hideIndicator();
					toast("Wrong Password", "long", "bottom", -70);
				}

			}).
			error(function(data, status, headers, config) {
	            myApp.hideIndicator();
				//$scope.msg = 'An error occured:' + status;
				toast("An error occured:" + status, "long", "bottom", -70);
			});
		}

		$scope.fetchAnnouncement = function(){
			var promises = []
			promises.push(addAnnouncement('interview'));
			promises.push(addAnnouncement('test'));

			Promise.all(promises).then(function(all_announcement) {
				console.log(all_announcement)
				myApp.swiper($$('body').find('.swiper-container'), {pagination: '.swiper-pagination'});
			});
		}

		function getSchedule (type) {
			var announcement_obj = {}

			announcement_obj.id = localStorageService.get(type + '_id');
			announcement_obj.date = localStorageService.get(type + '_date');
			announcement_obj.complete_date = moment(new Date(announcement_obj.date)).locale("id").format("LL");
			announcement_obj.day = moment(new Date(announcement_obj.date)).locale("id").format("dddd");
			announcement_obj.hour = localStorageService.get(type + '_hour');
			announcement_obj.loc = 'Kantor SAS, Slipi';
			announcement_obj.type = localStorageService.get(type + '_type');
			announcement_obj.title = 'Jadwal ' + announcement_obj.type;
			announcement_obj.note = localStorageService.get(type + '_note');


			if(announcement_obj.hour.length != 0 && announcement_obj.hour.length < 10)
				announcement_obj.confirmed = true
			else
				announcement_obj.confirmed = false

			return announcement_obj;
		}

        function addAnnouncement(sched_type) {

            if (localStorageService.get(sched_type + '_id')) {
                var announcement_obj = getSchedule(sched_type);
				
				$rootScope.announcement_list.push(announcement_obj);
				return announcement_obj;
			}
        } 

        function storeSchedule (sched_data){
			// UNCOMMENT - this is Dummy!

			var sched_data = {
				"message":"Interview, Tgl: 28-05-2017 Harap konfirm Jam ketersediaan di bawah:",
				"schedule_type":"interview",
				"schedule_note":"Pakaian rapi, harum.",
				"schedule_date":"28-05-2017",
				"schedule_id":"INTV0001",
				"schedule_hour":"hubungi admin"
			};
			
			
            var sched_type = sched_data.schedule_type;
			var formatted_date = sched_data.schedule_date.substr(6,4) + '-' + sched_data.schedule_date.substr(3,2) + '-' + sched_data.schedule_date.substr(0,2)
            localStorageService.set(sched_type + '_id', sched_data.schedule_id);
            localStorageService.set(sched_type + '_date', formatted_date);
            localStorageService.set(sched_type + '_type', sched_data.schedule_type);
            localStorageService.set(sched_type + '_note', sched_data.schedule_note);
			localStorageService.set(sched_type + '_hour', sched_data.schedule_hour);

			// don't forget to add to the Carousell
			addAnnouncement(sched_type)
        }

        function unsetSchedule (sched_type, sched_id) {
            localStorageService.set(sched_type + '_confirmed', false)
        }

        $scope.confirmSchedule = function(sched_type) {
			var raw_data = getSchedule (sched_type) 

			var schedule_data = {}
			
			// rename key of params
			Object.keys(raw_data).forEach(function(key){
				schedule_data['schedule_'+key] = raw_data[key];
			})

			// open the dialog, push param with now-renamed key
            $scope.openScheduleConfirmDialog (schedule_data)
        }

		function confirmSchedule(type,tanggal,id,answer){
			$.ajax({
				url: 'http://sinergiadhikarya.co.id/public/api/schedule/'+type+'/',
				type: "GET",
				dataType: "text",
				data: { id:id, answer:answer},
				success: function(rep) {
					console.log('schedule confirmed.')
	
					if(answer.indexOf('admin')==-1)
						myApp.alert('<i class="f7-icons size-22">info</i> Anda telah mengkonfirmasi untuk ' + type + ' pada tanggal ' + tanggal + ' pukul ' + answer + '.','Schedule confirmed')
				},
				error: function() {
					toast("Confirm schedule failed. Check connection.", "long", "bottom", -40);
				}
			});  
		}

		function openWelcomeDialog() {
		 /*myApp.alert('Selamat Datang di Aplikasi SAS', 'WELCOME!', function(){
			toast("Silahkan melihat apakah ada pesan baru", "long", "bottom", -70);
		 });*/
			
		  /*
			//THIS IS FOR 'EASY'-TESTING THE SCHEDULE NOTIFS...
			//-----------------------------------------
			data = {
				additionalData: {
					schedule_type: 'test',
					schedule_note: 'Harap bawa CV dan Pas Foto.',
					schedule_date: '31 Desember 2018',
					schedule_id: 'TESPSKT0002'  // 'ITRV0001'
				}
			}

			var notifModal = myApp.modal({
				title: '<div style=margin-top:-4px>Info Jadwal ' + data.additionalData.schedule_type + '</div>',
				text: '<hr style="box-shadow:0px -1px 0px #00000085;margin-top:-6px;margin-bottom:5px" /><h3 style=color:brown><i class="f7-icons size-21">calendar</i> &nbsp;' + data.additionalData.schedule_date + '</h3> <h4 style=color:black>Silahkan pilih waktu ' + data.additionalData.schedule_type + ' yang dapat Anda datangi:</h4>',
				afterText:  '<h4><u>Note</u>:</h4> <h5 style=margin-top:-16px><i>' + data.additionalData.schedule_note +  '</h5></i><hr style="box-shadow:0px -1px 0px #00000022;margin-top:5px;margin-bottom:3px" />',
				verticalButtons: true,
				buttons: [
				  {
					text: '<i class="f7-icons size-10">alarm</i> <u>10:00 AM</u>',
					bold: true,
					onClick: function () {
					  confirmSchedule(data.additionalData.schedule_type, data.additionalData.schedule_date, data.additionalData.schedule_id, '10:00 am');
					}
				  },
				  {
					text: '<i class="f7-icons size-10">alarm</i> <u>14:00 PM</u>',
					bold: true,
					onClick: function () {
					  confirmSchedule(data.additionalData.schedule_type, data.additionalData.schedule_date, data.additionalData.schedule_id, '14:00 pm');
					}
				  },
				  {
					text: '<i class="f7-icons size-14">phone</i> Hubungi Admin',
					bold: true,
					onClick: function () {
  					  confirmSchedule(data.additionalData.schedule_type, data.additionalData.schedule_date, data.additionalData.schedule_id, 'menghubungi admin');
					}
				  },
				  {
					text: 'Ingatkan nanti lagi',
					bold: true,
					onClick: function () {
					  myApp.alert('<i class="f7-icons size-22">info</i> Pesan ini akan muncul lagi ketika Anda login kembali.','Schedule pending')
					}
				  }	
				]
			})
			*/
			
			var welcomeModal = myApp.modal({
				title: 'Welcome!',
				text: 'Selamat datang di Aplikasi Mobile SAS.',
				afterText:  '<div class="swiper-container" style="width: auto; margin:15px -15px -15px">'+
							  '<div class="swiper-pagination"></div>'+
							  '<div class="swiper-wrapper">'+
								'<div class="swiper-slide"><img src="https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAMgAAAAJGU2NTFlZDg2LTg1OTYtNDk4OC04MTUzLWE0NTI3ZDg5M2JhOQ.jpg" height="150" style="display:block"></div>' +
								'<div class="swiper-slide"><img src="https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAMgAAAAJGU2NTFlZDg2LTg1OTYtNDk4OC04MTUzLWE0NTI3ZDg5M2JhOQ.jpg" height="150" style="display:block"></div>'+
							  '</div>'+
							'</div>',
				buttons: [
				  {
					text: 'OK',
					bold: true,
					onClick: function () {
					  myApp.alert('<i class="f7-icons size-22">info</i> Harap periksa Mailbox untuk melihat pesan baru.','Langkah selanjutnya...')
					}
				  },
				]
			  })
			 
			  myApp.swiper($$(modal).find('.swiper-container'), {pagination: '.swiper-pagination'});

		}

		/* DULU perlu check ke DB apakah sudah keregister apa belon.. skarang handled by Query
		$scope.checkPushRegistration = function(ktp) {
			var url = CheckPushRegistration.url + '?ktp=' + ktp;

			$http({method: 'GET', url: url}).success(function(data, status, headers, config) {
				if (data.registered)
				{
					$scope.pushInit()
				}
			}).
			error(function(data, status, headers, config) {
				toast("Fail to check Push registration." + status, "long", "bottom", -70);
			});
		}
		*/

		$scope.pushInit = function(id) {

			toast("Registering push", "short", "bottom", -40);

			var push_options = {
				android: {
				  senderID: "54343666763"
				},
				ios: {
				  alert: "true",
				  badge: "true",
				  sound: "true"
				},
				windows: {}
			  };

			$cordovaPushV5.initialize(push_options).then(function() {

				// start listening for new notifications -- THIS IS JUST COMMAND TRIGGER (NO PARAM)
				$cordovaPushV5.onNotification();
				// start listening for errors
				$cordovaPushV5.onError();
				
				// register to get registrationId
				$cordovaPushV5.register().then(function(registrationId) {
					
					$.ajax({
						url: 'http://sinergiadhikarya.co.id/public/api/push/register',
						type: "GET",
						dataType: "text",
						data: { uname: id, device: navigator.userAgent, token: registrationId},
						success: function(rep) {
							console.log('token saved to DB.')
						},
						error: function() {
							toast("Saving token failed. Check database constraints..", "long", "bottom", -40);
						}
					});  
				}, function (err) {
					// handle error
					toast("error registering push: " + err, "short", "bottom", -40);
				})
			});
			  
		  // triggered every time notification received
		  $rootScope.$on('$cordovaPushV5:notificationReceived', function(event, data){
			// data.message,
			// data.title,
			// data.count,
			// data.sound,
			// data.image,
			console.log("msg: " + data.message)
			console.log("additionalData: " + data.additionalData)
			// data.additionalData
			
			// refresh the Inbox page...
			view4.router.refreshPage();

		if(data.additionalData.notif_type == 'schedule') {
			
            storeSchedule(data.additionalData);
			
			$scope.openScheduleConfirmDialog(data.additionalData);
		}


		else
		// if its Inbox message..
		{

			// if the app is already opened and currently viewed:
			if(data.additionalData.foreground){
				//alert('New message: ' + JSON.stringify(data.additionalData))
				
				var notifModal = myApp.modal({
					title: 'Pesan Baru',
					text: data.message,
					/*afterText:  '<div class="swiper-container" style="width: auto; margin:15px -15px -15px">'+
								  '<div class="swiper-pagination"></div>'+
								  '<div class="swiper-wrapper">'+
									'<div class="swiper-slide"><img src="https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAMgAAAAJGU2NTFlZDg2LTg1OTYtNDk4OC04MTUzLWE0NTI3ZDg5M2JhOQ.jpg" height="150" style="display:block"></div>' +
									'<div class="swiper-slide"><img src="https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAMgAAAAJGU2NTFlZDg2LTg1OTYtNDk4OC04MTUzLWE0NTI3ZDg5M2JhOQ.jpg" height="150" style="display:block"></div>'+
								  '</div>'+
								'</div>',*/
					buttons: [
					  {
						text: 'Tutup',
						bold: true,
						/*onClick: function () {
						  myApp.alert('<i class="f7-icons size-22">info</i> Harap periksa Mailbox untuk melihat pesan baru.','Langkah selanjutnya...')
						}*/
					  },
					]
				})

			}

			// if the app is in Background:
			else {
				//alert('Wake from behinddd!! ' + JSON.stringify(data.additionalData))
				var notifModal = myApp.modal({
					title: 'Pesan Baru',
					text: 'Silahkan buka tab Inbox',
					/*afterText:  '<div class="swiper-container" style="width: auto; margin:15px -15px -15px">'+
								  '<div class="swiper-pagination"></div>'+
								  '<div class="swiper-wrapper">'+
									'<div class="swiper-slide"><img src="https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAMgAAAAJGU2NTFlZDg2LTg1OTYtNDk4OC04MTUzLWE0NTI3ZDg5M2JhOQ.jpg" height="150" style="display:block"></div>' +
									'<div class="swiper-slide"><img src="https://media.licdn.com/mpr/mpr/AAEAAQAAAAAAAAMgAAAAJGU2NTFlZDg2LTg1OTYtNDk4OC04MTUzLWE0NTI3ZDg5M2JhOQ.jpg" height="150" style="display:block"></div>'+
								  '</div>'+
								'</div>',*/
					buttons: [
					  {
						text: 'OK',
						bold: true,
						/*onClick: function () {
						  myApp.alert('<i class="f7-icons size-22">info</i> Harap periksa Mailbox untuk melihat pesan baru.','Langkah selanjutnya...')
						}*/
					  },
					]
				})
			}
		}
		// end of if its a message..

		  });
		}

		/*			
			var push = PushNotification.init({
				android: {
					senderID: "54343666763"
				}
			});

			push.on('registration', function(data) {
				alert('ID: ' + data.registrationId);
				toast(data.registrationId, "long", "bottom", -40);
				// ADD DEVICE TO DATABASE..
				$.ajax({
					url: 'http://sinergiadhikarya.co.id/public/api/push/register',
					type: "GET",
					dataType: "text",
					data: { uname: id, device: navigator.userAgent, token: data.registrationId},

					success: function(rep) {
						alert('registered (msg: ' + rep + ')')
					},
					error: function() {
						toast("Push Registration process failed", "long", "bottom", -40);
					}
				});
			});

			push.on('notification', function(data) {
				alert('receiving message in front.')
				alert(data.message);
			});

			push.on('error', function(e) {
				toast(e, "short", "bottom", -40);
				alert(  e.message );
			});
		}
	*/
		
		$scope.openScheduleConfirmDialog = function(data) {
			var notifModal = myApp.modal({
				title: '<div style=margin-top:-4px>Info Jadwal ' + data.schedule_type + '</div>',
				text: '<hr style="box-shadow:0px -1px 0px #00000085;margin-top:-6px;margin-bottom:5px" /><center><h3 style=color:brown><i class="f7-icons size-21">calendar</i> &nbsp;' + data.schedule_date + '</h3></center> <h4 style=color:black>Silahkan pilih waktu ' + data.schedule_type + ' yang bisa Anda datangi:</h4>',
				afterText:  '<h4><u>Note</u>:</h4> <h5 style=margin-top:-14px><i>' + data.schedule_note +  '</h5></i><hr style="box-shadow:0px 1px 0px #00000044;margin-top:7px;margin-bottom:4px" />',
				verticalButtons: true,
				buttons: [
				  {
					text: '<i class="f7-icons size-10">alarm</i> <u>10:00 AM</u>',
					bold: true,
					onClick: function () {
					  confirmSchedule(data.schedule_type, data.schedule_date, data.schedule_id, '10:00 am');
					}
				  },
				  {
					text: '<i class="f7-icons size-10">alarm</i> <u>14:00 PM</u>',
					bold: true,
					onClick: function () {
					  confirmSchedule(data.schedule_type, data.schedule_date, data.schedule_id, '14:00 pm');
					}
				  },
				  {
					text: '<i class="f7-icons size-14">phone</i> Hubungi Admin',
					bold: true,
					onClick: function () {
  					  confirmSchedule(data.schedule_type, data.schedule_date, data.schedule_id, 'menghubungi admin');
					}
				  },
				  {
					text: 'Ingatkan nanti lagi',
					bold: true,
					onClick: function () {
					  //unsetSchedule(data.schedule_type, data.schedule_id);
                      
                      myApp.alert('<i class="f7-icons size-22">info</i> Pesan ini akan muncul lagi ketika Anda login kembali.','Schedule pending')
					}
				  }	
				]
			})
		}

		$scope.gotoInbox = function() {
			myApp.closeModal($("#lamanWelcome"), true) 
			$rootScope.onWelcome = false;
		}
			
	});


	app.controller('ProfileController', function($scope, $rootScope, $http, ProfileData, localStorageService) {
		
		$rootScope.onWelcome = true;

		console.log('init sidebar')
		
		$scope.gotoWelcome= function ( ){
			myApp.loginScreen($("#lamanWelcome"), true)
			$rootScope.onWelcome = true;
		}

		$scope.gotoTasks= function ( ){
			if($scope.onWelcome != undefined && $scope.onWelcome){
				myApp.closeModal($("#lamanWelcome"), true) 
				$rootScope.onWelcome = false;
			}
		}

		$scope.logout= function ( ){
			ProfileData = {};
			$rootScope.NIP = '';

			myApp.loginScreen($("#lamanLogin"), true) 
		}

	});


	app.controller('AbsenController', function($scope, $http, AbsenData, $rootScope, $interval, localStorageService) {
        
        intervalGeo = ""
        intervalWorkHour = null;
        $scope.absenDuration = {}
        $scope.msg = "Loading...";
		$scope.absen_txt = "ABSEN";
        $scope.break_txt = "ISTIRAHAT";
        $scope.geoWatchActive = false;
        $scope.geoloc_update="Getting location.."
        $scope.$watch('geoWatchActive', function(newVal){
            if(newVal){
                $scope.geoloc_update="Getting location.."

                intervalGeo = $interval(function(){
                    startGeoWatch($rootScope.officeLat, $rootScope.officeLng, function(insideBubble){
                        if(insideBubble)
                            $scope.openAbsenControls()
                        else
                            $scope.alertMoveCloser()
                    })
                }, 5000);
            }
            else
                if(intervalGeo != undefined)
                    $interval.cancel(intervalGeo);
        })   
        $scope.hasAbsen = (localStorageService.get('absenToday') == 1) ? true : false;
        $scope.absenTime = $scope.hasAbsen ? localStorageService.get('absenTime') : '';
        $scope.result = {"text":"", "validCode": 0, "validGeo": false};

        $scope.refreshTimer = function() {
            if ($rootScope.minimumWorkHour != ''){
                // if($rootScope.minimumWorkHour == $scope.absenDuration.hours)
                //     $scope.result.pastWorkHour = true;
            }
            else {
                if ($scope.checkout_timeleft.h == 0 && $scope.checkout_timeleft.m == 0 && $scope.checkout_timeleft.s == 0 ) {
                    $scope.result.pastWorkHour = true;
                    console.log($scope.result)
                    clearInterval(countdownn);


                //validGeo, pastWorkHour
                //console.log ($scope.hasAbsen && $scope.result.pastWorkHour)

                // console.log((!$scope.result.validGeo && $scope.result.pastWorkHour))
                // console.log((!$scope.result.validGeo && !$scope.result.pastWorkHour))
                // console.log(($scope.result.validGeo && !$scope.result.pastWorkHour) )
                // console.log(($scope.result.validGeo && $scope.result.pastWorkHour) )
                }


                $scope.$apply();
            }
        }

        $scope.countDownStart = function(target){
            //starting countdown:
                var d = new Date();

                var now = (target=='') ? moment(d) : moment(target);
                console.log(now);

                var target = now.add(5, 'second');

                var checkout_time = new Date(target.format())

                // toast('Checkout time: ' + checkout_time, "long", "bottom", -70);

                var count = new Countdown(checkout_time, new Date());
                
                countdownn = setInterval($scope.refreshTimer, 1000);

                count.countdown(function(obj) {
                   

                    $scope.checkout_timeleft = {};

                    $scope.checkout_timeleft.h = (obj.hours < 10 ? '0' : '') + obj.hours;
                    $scope.checkout_timeleft.m = (obj.minutes < 10 ? '0' : '') + obj.minutes;
                    $scope.checkout_timeleft.s = (obj.seconds < 10 ? '0' : '') + obj.seconds;
                   
                });
        }

        $scope.countWorkHourStart = function(start_time) {
                intervalWorkHour = $interval(function(){$scope.addSecondsToWorkhour(start_time)}, 1000);
        }

        $scope.addSecondsToWorkhour = function(start_time) {
                
                if (start_time != undefined){
                    $scope.absenDuration = moment.duration(moment().diff(moment(start_time)))._data
                }
                else{
                    $scope.absenDuration = {hours: 0, minutes: 0, seconds: 0}
                }

                // make this dynamic (from DB) Enable the workHourcheckout lock
                if ($scope.absenDuration.hours == $rootScope.minimumWorkHour)
                    $scope.result.pastWorkHour = true;
        }

            
        // ===============================
        // IF ABSEN HAS ALREADY STARTED...
        // *) disable the Absen button
        // *) Start the count-up
        // =============================
        if(localStorageService.get('absenTime') != null) {
            console.log(localStorageService.get('absenTime'))
            // alert('h'+$scope.absenTime);
            // $scope.countDownStart($scope.absenTime);
            console.log($scope.absenTime)
            $scope.countWorkHourStart($scope.absenTime);
            $scope.absenTime = localStorageService.get('absenTime');
            
            // $scope.countDownStart()
            $scope.absen_txt = "CHECK OUT " ;

            console.log($scope.validGeo)
            console.log($scope.hasAbsen)
            console.log($scope.result.pastWorkHour)
            console.log (!$scope.result.validGeo && !$scope.hasAbsen)
            console.log ($scope.hasAbsen && !$scope.result.pastWorkHour)

        }


		// Absen click
		$scope.boom = function() {

            console.log ($("#geo_toggle").prop);
            $("#geo_toggle").prop("checked", !($("#geo_toggle").prop("checked")));

            $scope.hasAbsen = true;

		// check ini mo checkin or checkout
		if( typeof $scope.checkout_timeleft == 'undefined' )
		{

		
			var d = new Date(); // for now
			$rootScope.absenTime = d;

		var url = AbsenData.start_url + '?nip=' + $rootScope.NIP;
		
		myApp.showIndicator();
		
		$http({method: 'GET', url: url}).
			success(function(data, status, headers, config) {
				
			if (data.status == 200){
	            myApp.hideIndicator();					

				$scope.result = {
					"text": "Anda Berhasil Absen!",
					"time": "Pkl. " + pad_zero(d.getHours()) + ':' + pad_zero(d.getMinutes()) + ':' + pad_zero(d.getSeconds()),
					"format": "(empty)",
					"cancelled": false,
                    "validGeo": true,
                    "pastWorkHour": false,
				};

				$scope.absen_txt = "CHECK OUT " ;

				console.log(JSON.stringify($scope.result))


                toast("Absen Started", "long", "bottom", -70);

                // $scope.countDownStart();
                $scope.countWorkHourStart(d);
                localStorageService.set('absenTime', moment(d).format('YYYY-MM-DD HH:mm'));
                
                console.log(localStorageService.get('absenTime'))
                localStorageService.set('absenToday', 1);

			}
			else if (data.status == 500){
	            myApp.hideIndicator();					
				
				toast('Absen fail: ' + data.error, "long", "bottom", -70);
			}
		});
		} // end of bikin absen


	else if ($scope.result.pastWorkHour)
	// function checkout...
	{
		myApp.confirm('Anda yakin?', 'Konfirmasi', checkOut);
	}
	
	else // checkout before its time...
	{
		myApp.alert('Anda belum boleh Checkout.');
	}

} //end of Function boom

    
		function checkOut() {
			$scope.checkOut = true;
            localStorageService.remove('absenToday');
            localStorageService.remove('absenTime');
            $scope.$apply()
            myApp.alert('You have been checked out.', 'Work\'s Done');
		}

		function pad_zero (original) {
			str = original.toString();
			return ((str.length==2) ? str: '0'+str);
		}


        $scope.checkGeoloc = function(){
            initAndCheckMap(function(status){
                if(status)
                    $scope.openAbsenControls()
                else
                    $scope.alertMoveCloser()
            })
        }

        $scope.openAbsenControls = function() {

            $interval.cancel(intervalGeo);
            
            $scope.geoloc_update="Result:"
            $scope.result.validGeo = true;
            $scope.result.geoloc_status = 'OK.'
            $scope.result.text = "Geoloc test pass. <br> (You're inside office radius.)"
            $scope.result.pastWorkHour = false;

            $scope.$apply();

            console.log($scope.result)

            //validGeo, !pastWorkHour

            console.log(!($scope.result.validGeo && !$scope.hasAbsen))
            console.log(($scope.result.pastWorkHour))

            console.log($scope.hasAbsen && $scope.result.pastWorkHour)

            console.log((!$scope.result.validGeo && $scope.hasAbsen))
            console.log((!$scope.result.validGeo && !$scope.hasAbsen))
            console.log(($scope.result.validGeo && !$scope.hasAbsen) )
            console.log(($scope.result.validGeo && $scope.hasAbsen) )
        }

        $scope.alertMoveCloser = function() {
            $scope.geoloc_update="Result:"
            $scope.result.validGeo = false;
            $scope.result.geoloc_status = 'Please go inside office area.'
            $scope.$apply();
        }

		$scope.scan = function() {

			// verify if it's on Emulator or Device..

			if(window.navigator.userAgent.indexOf('Android')>-1)
			{
					$scope.result.text = "Validating code..";
					$scope.result.format = 'QR';

					$scope.$apply()
					
					toast('Check-in ID: ' + $scope.result.text, "long", "bottom", -70);
					//alert(JSON.stringify(result))

					$scope.result.text = 'Checking Geoloc..';
                        
                    $scope.result.validCode = 1;

                    $scope.checkGeoloc();
			}

			else
		{

            cordova.plugins.barcodeScanner.scan(function(result) {
				if (result.text=='')
				{
					toast("Nothing was scanned. Try again.", "short", "bottom", -70);
				}
				else
				{
					$scope.result.text = "Validating code..";
					$scope.result.format = result.format;
					$scope.result.cancelled = result.cancelled;

					$scope.$apply()
					
					toast('Check-in ID: ' + result.text, "long", "bottom", -70);
					//alert(JSON.stringify(result))

					setTimeout(function(){
						$scope.result.text = 'Ready to absen..';
						$scope.result.validCode = 1;
						$scope.$apply();
					}, 3000);
				}
            }, function(error) {
                $scope.error = error;
            }, 
			{
				resultDisplayDuration: 500,
				format: "QR_CODE",
				orientation : "portrait"
			});
		
		}
        }

	});

	app.controller('TabController', function($scope, $rootScope) {
		
		$rootScope.job_count = 0;
		$rootScope.inbox_count = 0;

	});

    app.controller('JobListController', function($scope, $rootScope, $http, JobListData, JobReportListData) {
        
        $scope.msg = "Loading...";
		console.log ('entering joblist')
        
        var init = function(url, callback) {
			var url = (url=='') ? JobListData.url : url
			
			url += '?nip=' + $rootScope.NIP + '&spk=' + $rootScope.SPK;

			$http({method: 'GET', url: url}).
			success(function(data, status, headers, config) {
				
				$scope.joblist = data.joblist;
				

				job_unstarted= 0;
				data.joblist.forEach (function(k,i) {
					
					if(k.start_at==null)
						job_unstarted++;
					
					console.log(data.joblist.length + ' '  +i);
					if(i == (data.joblist.length -1))
					{
						count_up(job_unstarted);
					}
					
					/*
					asynchronous(function(data){
						if(i === data.joblist.length -1)
							console.log('forEach done! ' + job_unstarted )
					});
					*/
				})

				console.log("Job returned: " + $scope.joblist.length )
				if ($scope.joblist.length < 1)
				{
					$scope.msg = "No task for today.";
				} else {
					$scope.msg = undefined;
				}
				callback (null, 1)
			}).
			error(function(data, status, headers, config) {
				$scope.msg = 'An error occured:' + status;
				callback (err,null)
			});
        }

        init('', function (err,success){
			if(err)
				alert($scope.msg);
		});

		var count_up = function(target) {
			if ($rootScope.job_count < target)
			{
				$rootScope.job_count = $rootScope.job_count + 1;
				setTimeout (function(){
					count_up (target);
					$rootScope.$apply();
				}, 300);
			}
		}
		
		$scope.startJob = function($index,$jobparent) {
			myApp.showIndicator();
console.log($index + '--------' + $jobparent);
			var url = JobListData.update_url + '?nip=' + $rootScope.NIP + '&kd_job=' + $scope.joblist[$jobparent].joblist[$index].id ;

			console.log(url);
			
			$http({method: 'GET', url: url}).
			success(function(data, status, headers, config) {
				
				if (data.status == 200){
		            myApp.hideIndicator();

					var d=new Date()
					var hour = (d.getHours()<10) ? '0'+d.getHours() : d.getHours()
					var minute = (d.getMinutes()<10) ? '0'+d.getMinutes() : d.getMinutes()

					$scope.joblist[$index].start_at = hour+":"+minute
					
					view3.router.refreshPage();

					$scope.$apply()
					
					
					
					$rootScope.job_count--;
					
					toast("Job started from now", "long", "bottom", -70);
				}

			}).
			error(function(data, status, headers, config) {
	            myApp.hideIndicator();
				//$scope.msg = 'An error occured:' + status;
				toast("An error occured:" + status, "long", "bottom", -70);
			});

        }

		$scope.showDetail = function(index) {
            var selectedItem = $scope.categories[index];
            CategoriesData.selectedItem = selectedItem;
            $scope.ons.navigator.pushPage('category-posts.html', selectedItem);
        }

		var ptrContent = $$('.pull-to-refresh-content');
		ptrContent.on('ptr:refresh', function (e) {

			$rootScope.job_count = 0;
			setTimeout(function(){
				init('', function(err,success){
					if(success)
						myApp.pullToRefreshDone();
				});
			}, 500);
		});
        
    });


    app.controller('InboxController', function($scope, $rootScope, $http, InboxData) {
        
		console.log ('checking inbox')
        
		var init = function(url, callback) {
			var url = (url=='') ? InboxData.url : url
			
			url += '?ktp=' + $rootScope.NIP;

			$http({method: 'GET', url: url}).
			success(function(data, status, headers, config) {
				
				console.log (data);
				$scope.msg_list = data.msglist;
				
				msg_unread= 0;
				data.msglist.forEach (function(k,i) {
					if(k.dari!=k.latest_respondent && k.read_date==null) {
						msg_unread++;
						k.newFlag= true;
					}
				})

				$rootScope.inbox_count = msg_unread

				console.log("Msg found : " + $scope.msg_list.length + ", unread: " + msg_unread )

				if ($scope.msg_list.length < 1)
				{
					$scope.msg = "Inbox empty.";
				} else {
					$scope.msg = undefined;
				}
				callback (null, 1)
			}).
			error(function(data, status, headers, config) {
				$scope.msg = 'An error occured:' + status;
				callback (err,null)
			});
        }

        init('', function (err,success){
			if(err)
				alert($scope.msg);
		});


		var ptrContent = $$('.pull-to-refresh-content');
		ptrContent.on('ptr:refresh', function (e) {

			//$rootScope.job_count = 0;
			setTimeout(function(){
				view4.router.refreshPage();
				myApp.pullToRefreshDone();
			}, 500);
		});

		
		$scope.readMsg = function(index) {
			$$("#toolbar").css('zIndex',0);

			console.log('reading msg: ' + JSON.stringify($scope.msg_list[index]))
			InboxData.item = $scope.msg_list[index]
		}
    });

    app.controller('ReplyController', function($scope, $http, $rootScope, JobReportListData, InboxData) {
		
		var item = InboxData.item;
		$scope.judul = item.judul;

	});

    app.controller('MessageController', function($scope, $interval, $http, $rootScope, JobReportListData, InboxData) {
        
		$scope.conversation = []
		$scope.conversation = InboxData.conversation;

		// listen for changes on conversation..
		$scope.$watch( 
			function() { 
				return InboxData.conversation;
			}, 
			function (newVal, oldVal, scope){ 
				if(newVal){
					scope.conversation = newVal;
				}
			}
		);

		//console.log(InboxData.item);

		var item = InboxData.item;
		
		var url = InboxData.item_url //+ '?ktp=' + $rootScope.NIP + '&thread_id=' + item.kode_compos;
		console.log (url);


		$scope.from = item.dari;
		$scope.judul = item.judul;
		
		$rootScope.thread_id = item.kode_compos; //item.kd_push;

		
		$scope.init = function() {
			console.log($rootScope.thread_id);
			console.log($rootScope.NIP);

			//myApp.showPreloader('Fetching message..');

			$http({
			  method: 'GET', 
			  url: url  + '?ktp=' + $rootScope.NIP + '&thread_id=' + $rootScope.thread_id
			}).
				success(function(data, status, headers, config) {

					myApp.hidePreloader();
					data.conversation.forEach (function(k,i) {
						if(i>0)
							data['conversation'][i]['isReply'] = true;
						else
							data['conversation'][i]['isReply'] = false;
					});

					InboxData.conversation = data.conversation;
					// code above will trigger '$watch', thus updating the $scope.conversation..			
				}).
				error(function(data, status, headers, config) {
					console.log('gagal fetch msg')
					myApp.hidePreloader();
					$scope.msg = 'An error occured:' + status;
				});
		}

		$scope.deletePost = function($index) {
			$scope.conversation.msg.splice($index,1);
		}

		$scope.openReply = function() {
			console.log('open reply comment...')
			myApp.pickerModal($("#replyModal"), true);
			//myApp.popup($("#lamanReply"), true);
			//myApp.loginScreen($("#lamanLogin"), true) 
			//myApp.addView('#lamanReply')
		}

		$scope.postReply = function() {

			$http({
				 method: 'POST', 
				 url: url, 
				 data:{ thread_id: $rootScope.thread_id, ktp: $rootScope.NIP, reply: $scope.reply_txt},
				 headers: { 'Content-Type': 'application/x-www-form-urlencoded' },	// not www urlencoded
				 //headers: {'Content-Type': undefined }
	
			// ===========================================
			// IMPORTANT to transform to multipart/form !! //
			// ==========================================
				 transformRequest: function(obj) { 
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				}
			}).
			success(function(data, status, headers, config) {
				console.log (data);
				myApp.closeModal($("#replyModal"));
				$scope.init()
				toast("Pesan terkirim", "long", "bottom", -70);					
			}).
			error(function(data, status, headers, config) {
				console.log('gagal post reply')
				myApp.alert('Pesan gagal terkirim.', 'Something\'s wrong..');
				toast("Gagal terkirim, coba lagi.", "long", "bottom", -70);					
				$scope.msg = 'An error occured:' + status;
			});	
		}

		$scope.jobDone = function() {
			myApp.showPreloader('Updating Tasks..');

			var url = JobReportData.url + "?nip=" + $rootScope.NIP + "&kd_job=" + $scope.id + "&msg=" + $$("#complain_txt").val();
			
			$http({method: 'GET', url: url}).
			success(function(data, status, headers, config) {
				
				if (data.status == 200) {
					
					view3.router.refreshPreviousPage();
					setTimeout(function() {
						//view3.router.back({
						//	reloadPrevious: true
						//});

						view3.router.back()
						
						$("#toolbar").css('zIndex',5001)
						myApp.hidePreloader();
					}, 1000);
				}
			}).
			error(function(data, status, headers, config) {
				$scope.msg = 'An error occured:' + status;
			});			
		}

		$scope.init();

		//timeout utk hilangkan beige from latest unread msg, HERE...
    }); 





//edit to remove class ng-scope from ng-repeated 
// -----------------------------------
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);
// --------------------------------

    // Job Report List 
    app.controller('JobReportListController', function($scope, $rootScope, $http, JobReportListData, JobReportData) {
        
        $scope.msg = "Loading...";
        
		var init = function(url, callback) {
			var url = JobReportListData.url + "?nip=" + $rootScope.NIP;

			$http({method: 'GET', url: url}).
			success(function(data, status, headers, config) {

				console.log('displaying report list');
				$scope.done = data.done;
				$scope.total = data.total;

				$scope.jobreportlist = data.joblist;

				if ($scope.jobreportlist.length < 1)
				{
					$scope.msg = "No task for today.";
				} else {
					$scope.msg = undefined;
				}
				
			}).
			error(function(data, status, headers, config) {
				$scope.msg = 'An error occured:' + status;
			});
		}

		init('', function (err,success){

			if(err)
				alert($scope.msg);
			else
				console.log('reload view3');
		});

		function pad_zero (original) {
			str = original.toString();
			return ((str.length==2) ? str: '0'+str);
		}

        $scope.getMinute = function(date) {
			var date = new Date(date)
			return pad_zero(date.getHours()) + ":" + pad_zero(date.getMinutes())	
		}

        $scope.reportJob = function(index) {
			
			/*
			if ($scope.jobreportlist[index].start_at=='' || $scope.jobreportlist[index].start_at==null)
			{
				myApp.alert('Task tersebut belum Anda mulai. <br><br> Silakan cek laman List Job.');
				return;
			}
			*/


            console.log(index)
			console.log('before:' + $rootScope.job_count)
            var selectedItem = $scope.jobreportlist[index];
			
			// check if it has started?
			if (selectedItem.start_at==null)
			{
				alert('Task ini belum Anda mulai. Aktifkan lewat menu List Job');
			}
			else {
				// check if it has reported already before
				if (selectedItem.report_date==null || selectedItem.report_date=='')
				{
					JobReportData.item = selectedItem;			
					$$("#toolbar").css('zIndex',0);
				}
				else
					alert('Anda sudah melaporkan task ini.')
			}
    
			console.log('now:' + $rootScope.job_count)

            //$scope.ons.navigator.pushPage('report.html', selectedItem);
            //window.location.href = 'report.html';
        }
        
    });    


    app.controller('JobReportController', function($scope, $http, $rootScope, JobReportListData, JobReportData) {
                
		var item = JobReportData.item;
		
		$scope.nama_job = item.nama_job;
		$scope.deskripsi_job = item.deskripsi_job
		$scope.start_at = item.start_at
		$scope.kode_detail_job = item.kode_detail_job
		$scope.id = item.id

		
		$scope.jobDone = function() {
			myApp.showPreloader('Updating Tasks..');

			var url = JobReportData.url + "?nip=" + $rootScope.NIP + "&kd_job=" + $scope.id + "&msg=" + $$("#complain_txt").val();
			
			$http({method: 'GET', url: url}).
			success(function(data, status, headers, config) {
				
				if (data.status == 200) {
					
					view3.router.refreshPreviousPage();
					setTimeout(function() {
						//view3.router.back({
						//	reloadPrevious: true
						//});

						view3.router.back()
						
						$("#toolbar").css('zIndex',5001)
						myApp.hidePreloader();
					}, 1000);
				}
			}).
			error(function(data, status, headers, config) {
				$scope.msg = 'An error occured:' + status;
			});			
		}
        
    }); 


    app.controller("RootCtrl", ["$scope", "$compile", "$rootScope", "localStorageService", "jwtHelper", function($scope, $compile, $rootScope, localStorageService, jwtHelper) {
        $scope.title = "Framework7(a)";
		
		$rootScope.NIP = '123';
		$rootScope.SPK = '';

		$rootScope.tanggal_today = moment(new Date()).locale("id").format("LL");

        var dynamicPageIndex = 0;
		
		//try to move checking token logic to here...
		//console.log(localStorageService.get("usr_token"))
		if (localStorageService.get("usr_token")!=null)
		{
			console.log(jwtHelper.decodeToken(localStorageService.get("usr_token")));
			console.log(jwtHelper.getTokenExpirationDate(localStorageService.get("usr_token")));
			console.log(jwtHelper.isTokenExpired(localStorageService.get("usr_token")));

			if (jwtHelper.isTokenExpired(localStorageService.get("usr_token")))
			{
				myApp.loginScreen($("#lamanLogin"), true);
			}
			else {
				// do the fetch data process here...

				var data = jwtHelper.decodeToken(localStorageService.get("usr_token"))

				console.log(data);

					//myApp.loginScreen($("#lamanWelcome"), true) 

					toast("Logging in: " + data.detail.email, "long", "bottom", -70);

					$rootScope.NIP = data.detail.no_ktp;
        
					$rootScope.newCandidateFlag = (data.detail.kd_status_karyawan != 'KDKRY0011') ? true : false;
          //$rootScope.newCandidateFlag = (data.detail.status=='' && data.detail.no_NIK=='') ? true : false;

                    $rootScope.officeLat = localStorageService.get('lat')
                    $rootScope.officeLng = localStorageService.get('lng')
                    $rootScope.minimumWorkHour = localStorageService.get('workhour')
                    console.log("============"  + $rootScope.minimumWorkHour)

					console.log('new candidate? ' + $rootScope.newCandidateFlag ) 

					//ProfileData.img = data.detail.foto; 
					// no more storing data to Factory, because we can't make two way binding. MUST USE the costly $watch
					$rootScope.avatar = data.detail.foto; 

					$rootScope.first_name= data.detail.nama_depan;
					$rootScope.last_name= data.detail.nama_belakang;
					
					//ProfileData.last_name= data.detail.nama_belakang;
					
					//console.log(ProfileData);

					// ANNOUNCEMENT section...
					$rootScope.announcement_list = []

					var promises = []
					promises.push(addAnnouncement('interview'));
					promises.push(addAnnouncement('test'));

					Promise.all(promises).then(function(all_announcement) {
						console.log(all_announcement)
						myApp.swiper($$('body').find('.swiper-container'), {pagination: '.swiper-pagination'});
					});
					
					if ($rootScope.newCandidateFlag)
					{
						//refresh view Sidebar
						view5.router.refreshPage(); 

						angular.element('#tab-1').addClass('disabled');
						angular.element('#tab-2').addClass('disabled');
						angular.element('#tab-3').addClass('disabled');

						// layer the App with Welcome Screen..
						
						myApp.loginScreen($("#lamanWelcome"), true) 
						console.log('Welcome screen displayed..')

						view4.router.refreshPage();

						// activing MAILBOX tab
						$$("#tab-2").removeClass('active');
								$$("#tab-4").addClass('active');

									$$("#view-2").removeClass('active');
									$$("#view-4").addClass('active');
					}
					else
					{
			console.log('employee with NIK detected..')

						view2.router.refreshPage();
						view3.router.refreshPage();
						view4.router.refreshPage();

						//view5.router.reloadContent();
						view5.router.refreshPage();

						myApp.showPreloader('Checking Profile..');

						setTimeout(function(){
							myApp.hidePreloader()

							myApp.showPreloader('Updating Tasks..');
							setTimeout(function() {
								myApp.hidePreloader();

							if(!$rootScope.newCandidateFlag){
								
								console.log('focus tab 1');
								$$("#tab-2").removeClass('active');
								$$("#tab-1").addClass('active');

									$$("#view-2").removeClass('active');
									$$("#view-1").addClass('active');
							}
							else {
								
								console.log('focus tab 2');
								$$("#tab-2").removeClass('active');
								$$("#tab-4").addClass('active');

									$$("#view-2").removeClass('active');
									$$("#view-4").addClass('active');
							}
							}, 1500);

						}, 2000);
					}


				}


			}
			
		
		else
			myApp.loginScreen($("#lamanLogin"), true);

		function addAnnouncement(sched_type) {

            if (localStorageService.get(sched_type + '_id')) {
                var announcement_obj = getSchedule(sched_type);
				
				$rootScope.announcement_list.push(announcement_obj);
				return announcement_obj;
			}
        }

		function getSchedule (type) {
			var announcement_obj = {}

			announcement_obj.id = localStorageService.get(type + '_id');
			announcement_obj.date = localStorageService.get(type + '_date');
			announcement_obj.complete_date = moment(new Date(announcement_obj.date)).locale("id").format("LL");
			announcement_obj.day = moment(new Date(announcement_obj.date)).locale("id").format("dddd");
			announcement_obj.hour = localStorageService.get(type + '_hour');
			announcement_obj.loc = 'Kantor SAS, Slipi';
			announcement_obj.type = localStorageService.get(type + '_type');
			announcement_obj.title = 'Jadwal ' + announcement_obj.type;
			announcement_obj.note = localStorageService.get(type + '_note');


			if(announcement_obj.hour.length != 0 && announcement_obj.hour.length < 10)
				announcement_obj.confirmed = true
			else
				announcement_obj.confirmed = false

			return announcement_obj;
		}
    }])


    // Categories Controller
    app.controller('CategoriesController', function($scope, $http, CategoriesData) {
        
        $scope.msg = "Loading...";
        
        $http({method: 'GET', url: CategoriesData.url}).
        success(function(data, status, headers, config) {
            $scope.categories = data.categories;
            
            if ($scope.categories.length < 1)
            {
                $scope.msg = "Nothing found.";
            }else{
                $scope.msg = undefined;
            }

            var page = 1;
            // Define the initial number of the categories in the page
            var pageSize = 10;

            $scope.paginationLimit = function(data) {
            return pageSize * page;
            };

            $scope.hasMoreItems = function() {
            return page < ($scope.categories.length / pageSize);
            };

            $scope.showMoreItems = function() {
            page = page + 1;       
            }; 
            
        }).
        error(function(data, status, headers, config) {
        $scope.msg = 'An error occured:' + status;
        });
        
        $scope.showDetail = function(index) {
        var selectedItem = $scope.categories[index];
        CategoriesData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('category-posts.html', selectedItem);
        }
        
    });
    
    // Category Posts Controller
    app.controller('CategoryPostsController', function($scope, $http, $filter, CategoriesData) {
        
        $scope.msg = "Loading...";
        
        $scope.loadData = function () {

            $http({method: 'GET', url: CategoriesData.category_url + 'id=' + CategoriesData.selectedItem.id + '&page=' + $scope.page}).
            success(function(data, status, headers, config) {
                
                $scope.msg = "";
                $scope.title = CategoriesData.selectedItem.title;
                $scope.more = data.pages !== $scope.page;
                $scope.posts = $scope.posts.concat(data.posts);
                $scope.status_bar = "Showing " + ($scope.posts.length === 0 ? "0" : "1") + " to " + $filter('number')($scope.posts.length);

            }).
            error(function(data, status, headers, config) {
            $scope.msg = 'An error occured:' + status;
            });
            
        }

        $scope.showMoreItems = function () {
            $scope.page += 1;
            $scope.msg = "Loading...";
            $scope.loadData();
        }

        $scope.hasMoreItems = function () {
            return $scope.more;
        }

        $scope.page = 1;
        $scope.posts = [];
        $scope.title="";
        $scope.more = true;
        $scope.status_bar = "";
        $scope.loadData();
        
        // getCategoryPosts() function()
        $scope.getCategoryPosts = function() {
            // Filter Category Posts by $scope.search
            return $scope.posts.filter(function(item) {
                
                // Filter Category Posts by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;
                
                // Filter Category Posts by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 || 
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;
                
                return itemDoesMatch;
            });
        };

        // Search Detail function()
        $scope.showSearchDetail = function(index) {
        var items = $scope.getCategoryPosts();
        var lastSelectedItem = items[index];
        CategoriesData.lastSelectedItem = lastSelectedItem;
        $scope.ons.navigator.pushPage('category-post.html', lastSelectedItem);
        }
        
    });
    
    // Category Post Controller
    app.controller('CategoryPostController', function($scope, CategoriesData) {
        $scope.item = CategoriesData.lastSelectedItem;
        
        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }
        
        $scope.sharePost = function () {
            
            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;
            
            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }
        
     });
    
   // RSS: Feeds Controller
    app.controller('FeedsController', function($scope, $http, FeedData, FeedStorage) {
        
        $scope.msg = "Loading...";
        $scope.feeds = "";

        $http({method: 'JSONP', url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(FeedData.url)}).
        success(function(data, status, headers, config) {
            
            if (!data.responseData) {
                $scope.data = FeedStorage.get();
                $scope.msg = "Offline Mode - The device is unable to get the data.";

                $scope.title = $scope.data.feed.title;
                $scope.description = $scope.data.feed.description;
                $scope.link = $scope.data.feed.link;
                $scope.feeds = $scope.data.feed.entries;
            } else {
                $scope.title = data.responseData.feed.title;
                $scope.description = data.responseData.feed.description;
                $scope.link = data.responseData.feed.link;
                $scope.feeds = data.responseData.feed.entries;
                
                // Save feeds to the local storage
                FeedStorage.save(data.responseData);
                
                $scope.msg = "";
            }

        }).
        error(function(data, status, headers, config) {
        
        $scope.data = FeedStorage.get();
        $scope.msg = 'Offline Mode - An error occured:' + status;
            
        $scope.title = $scope.data.feed.title;
        $scope.description = $scope.data.feed.description;
        $scope.link = $scope.data.feed.link;
        $scope.feeds = $scope.data.feed.entries;  
            
        });

        var page = 1;
        // Define the number of the feed results in the page
        var pageSize = 5;

        $scope.paginationLimit = function(data) {
        return pageSize * page;
        };
        
        $scope.hasMoreItems = function() {
        return page < ($scope.feeds.length / pageSize);
        };

        $scope.showMoreItems = function() {
        page = page + 1;       
        }; 
        
        $scope.showDetail = function(index) {
        var selectedItem = $scope.feeds[index];
        FeedData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('feed.html', selectedItem);
        }
        
    });
    
    // RSS: Feed Controller
    app.controller('FeedController', function($scope, FeedData) {
        $scope.item = FeedData.selectedItem;
        
        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }
        
        $scope.sharePost = function () {
            
            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.link;
            
            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }
        
     });
    
    // About: About Controller
    app.controller('AboutController', function($scope, $http, AboutData) {
        
        $http({method: 'GET', url: AboutData.url}).
        success(function(data, status, headers, config) {
            $scope.about = data.result;
        }).
        error(function(data, status, headers, config) {

        });
        
        $scope.showDetail = function(index) {
        var selectedItem = $scope.about[index];
        AboutData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('member.html', selectedItem);
        }
        
    });
    
    // About: Member Controller
    app.controller('MemberController', function($scope, AboutData) {
        $scope.item = AboutData.selectedItem;
     });

	// Invoice Controller 
    app.controller('InvoiceController', function($scope, $http, InvoicesData) {

        $http({method: 'GET', url: InvoicesData.open_invoice}).
		    success(function(data, status, headers, config) {
				$scope.opens_total = data.total;
		        $scope.opens = data.result; 
		}).
			error(function(data, status, headers, config) {
	    });

        $http({method: 'GET', url: InvoicesData.closed_invoice}).
		    success(function(data, status, headers, config) {
				$scope.paids_total = data.total;
		        $scope.paids = data.result; 
		}).
			error(function(data, status, headers, config) {
	    });

		$scope.showDetail = function(index) {
			$scope.ons.navigator.pushPage('tab-invoice_detail.html', {invoice: $scope.opens[index]});
		}
	});


	// Invoice Detail Controller 
    app.controller('InvoiceDetailController', function($scope) {

        var page = $scope.ons.navigator.getCurrentPage();
		console.log ( page );
        $scope.invoice = page.options.invoice;

	});


    // Gallery Controller
    app.controller('GalleryController', function($scope, $http, ProductsData, GalleryData, UpdatesData, EndingSoonData, LosingData, NewestData) {

        var items = GalleryData.items;
		//var ending = EndingSoonData.result;

        $http({method: 'GET', url: EndingSoonData.url}).
		    success(function(data, status, headers, config) {
		        $scope.ending = data.result; 
		}).
			error(function(data, status, headers, config) {
	    });


        $http({method: 'GET', url: LosingData.url}).
		    success(function(data, status, headers, config) {
		        $scope.losing= data.result; 
		}).
			error(function(data, status, headers, config) {
	    });


        $http({method: 'GET', url: NewestData.url}).
		    success(function(data, status, headers, config) {
		        $scope.newest = data.result; 
		}).
			error(function(data, status, headers, config) {
	    });


        function addSlides(target) {
            angular.forEach(items,function(item,index){
                target.push({
                    label: item.label,
                    picture: item.src,
                    time: item.time,
                    item: (index + 1)
                });
            });
         };

        $scope.slides = [];
        addSlides($scope.slides);


        $scope.showDetail = function(segment,index) {
			var selectedItem = $scope[segment][index];
			console.log(selectedItem);
			ProductsData.selectedItem = selectedItem
			$scope.ons.navigator.pushPage('item2.html', {data: selectedItem});
        }

		
		// for Updates..
		// -------------
        $http({method: 'GET', url: UpdatesData.url}).
		    success(function(data, status, headers, config) {
		        $scope.updates = data.result; 
				//console.log($scope.updates);
		}).
			error(function(data, status, headers, config) {
	    });



    });

    // Settings Controller
    app.controller('SettingsController', function($scope, SettingsData, localStorageService, FeedStorage) {
        $scope.settings = SettingsData.items;

        if (localStorageService.get('settings')) {
            $scope.settings = localStorageService.get('settings');
			
        }
        
		console.log ($scope.settings);

        $scope.saveSettings = function() {
            localStorageService.clearAll();
            localStorageService.add('settings',$scope.settings);
        };
        
        $scope.clearLocalStorage = function() {
        FeedStorage.clear();
        }
        
    });
    
    // Modal View: Modal Controller
    app.controller('ModalController', function($scope) {
        
        $scope.show = function () {
            modal.show();
        }
        
        $scope.hide = function () {
            modal.hide();
        }
        
     });
    
    // Feed Plugin: Categories Controller
    app.controller('FeedPluginCategoriesController', function($scope, $http, FeedPluginData) {

        $http({method: 'GET', url: FeedPluginData.url}).
        success(function(data, status, headers, config) {
            $scope.categories = data.categories; 
        }).
        error(function(data, status, headers, config) {

        });

        $scope.showDetail = function(index) {
        var selectedItem = $scope.categories[index];
        FeedPluginData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('feed-category.html', {title : selectedItem.title});
        }

    });
    
    // Feed Plugin: Category Controller
    app.controller('FeedPluginCategoryController', function($scope, FeedPluginData) {

        $scope.title = FeedPluginData.selectedItem.title;
        $scope.items = FeedPluginData.selectedItem.items;

        $scope.showDetail = function(index) {
        var selectedItem = $scope.items[index];
        FeedPluginData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('feed-master.html', {title : selectedItem.title});
        }

    });
    
    // Feed Plugin: Master Controller
    app.controller('FeedPluginMasterController', function($scope, $http, FeedPluginData) {
        
        $scope.msg = "Loading...";
        $scope.feeds = "";

        $http({method: 'JSONP', url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(FeedPluginData.selectedItem.url)}).
        success(function(data, status, headers, config) {
            
            if (!data.responseData) {
                $scope.msg = "The device is unable to get the data.";
            } else {
                $scope.title = data.responseData.feed.title;
                $scope.description = data.responseData.feed.description;
                $scope.link = data.responseData.feed.link;
                $scope.feeds = data.responseData.feed.entries;
                
                $scope.msg = "";
            }

        }).
        error(function(data, status, headers, config) {
        $scope.msg = 'An error occured:' + status; 
        });

        var page = 1;
        // Define the number of the feed results in the page
        var pageSize = 4;

        $scope.paginationLimit = function(data) {
        return pageSize * page;
        };
        
        $scope.hasMoreItems = function() {
        return page < ($scope.feeds.length / pageSize);
        };

        $scope.showMoreItems = function() {
        page = page + 1;       
        }; 
        
        $scope.showDetail = function(index) {
        var selectedItem = $scope.feeds[index];
        FeedPluginData.selectedItem = selectedItem;
        $scope.ons.navigator.pushPage('feed-detail.html', selectedItem);
        }
        
		$scope.mediaObject = function(item) {
			return (item && item.mediaGroups) ? item.mediaGroups[0].contents[0] : {url:''};
		}

		$scope.hasVideo = function(item) {
			var media = $scope.mediaObject(item);
            
            //JAVASCRIPT: condition ? val1 : val2
            //return media.type ? (media.type == "video/mp4") : (media.url ? (media.url.indexOf(".mp4") != -1) : false);
			return media.type ? (media.type == "video/mp4") : false;
		}
        
		$scope.hasAudio = function(item) {
			var media = $scope.mediaObject(item);
            
            //JAVASCRIPT: condition ? val1 : val2
			return media.type ? (media.type == "audio/mp3") : false;
		}
        
        
        
    });

    // Feed Plugin: Detail Controller
    app.controller('FeedPluginDetailController', function($scope, $sce, FeedPluginData) {
        $scope.item = FeedPluginData.selectedItem;
        
		$scope.mediaObject = function(item) {
			return (item && item.mediaGroups) ? item.mediaGroups[0].contents[0] : {url:''};
		}

		$scope.hasVideo = function(item) {
			var media = $scope.mediaObject(item);
            
            //JAVASCRIPT: condition ? val1 : val2
            //return media.type ? (media.type == "video/mp4") : (media.url ? (media.url.indexOf(".mp4") != -1) : false);
			return media.type ? (media.type == "video/mp4") : false;
		}
        
		$scope.hasAudio = function(item) {
			var media = $scope.mediaObject(item);
            
            //JAVASCRIPT: condition ? val1 : val2
			return media.type ? (media.type == "audio/mp3") : false;
		}
        
        $scope.getTrustedResourceUrl = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
        
        $scope.loadURL = function () {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open($scope.item.link,'_blank');
        }
        
        $scope.shareFeed = function () {
            
            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.link;
            
            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }
        
     });
    
    // NVD3 View: NVD3 Controller
    app.controller('NVD3Controller', function($scope, NVD3Data) {
        
        var data = NVD3Data;
        
        /* Chart options */
        $scope.options = data.options;

        /* Chart data */
        $scope.data = data.data;
        
     });
    
    // PLUGINS: Device Controller
    app.controller('DeviceController', function($scope) {
        
        $scope.device = device;
        
    });
    
    // PLUGINS: Geolocation Controller
    app.controller('GeolocationController', function($scope) {

/*
        $scope.latitude = '0';
        $scope.longitude = '0';
        $scope.accuracy = '0';
        $scope.altitude = '0';
        $scope.altitudeAccuracy = '0';
        $scope.heading = '0';
        $scope.speed = '0';
        $scope.timestamp = '0';
        $scope.error = '';
        $scope.model = { map: undefined };
        $scope.markers = [];
 
        $scope.showResult = function () {
            return $scope.error == '';
        }
 
        $scope.mapOptions = {
            center: new google.maps.LatLng($scope.latitude, $scope.longitude),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        $scope.showPosition = function (position) {
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.altitude = position.coords.altitude;
            $scope.altitudeAccuracy = position.coords.altitudeAccuracy;
            $scope.heading = position.coords.heading;
            $scope.speed = position.coords.speed;
            $scope.timestamp = position.timestamp;
            $scope.$apply();
 
            var latlng = new google.maps.LatLng($scope.latitude, $scope.longitude);
            $scope.model.map.setCenter(latlng);
            $scope.markers.push(new google.maps.Marker({ map: $scope.model.map, position: latlng }));
        }
 
        $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User does not allow the app to retrieve position information."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "The device is unable to retrieve a position. In general, this means the device is not connected to a network or can't get a satellite fix."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        }
 
        $scope.getLocation = function () {
            if (navigator.geolocation) {
                var options = { enableHighAccuracy: true };
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError, options);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }
 
        $scope.getLocation();
*/
    });
    
    // PLUGINS: Notifications Controller
    app.controller('NotificationsController', function($scope) {
        
        $scope.alertNotify = function() {
        navigator.notification.alert("Sample Alert",function() {console.log("Alert success")},"My Alert","Close");
        };

        $scope.beepNotify = function() {
        navigator.notification.beep(1);
        };

        $scope.vibrateNotify = function() {
        navigator.notification.vibrate(3000);
        };

        $scope.confirmNotify = function() {
        navigator.notification.confirm("My Confirmation",function(){console.log("Confirm Success")},"Are you sure?",["Ok","Cancel"]);
        };
        
    });
    
    // Barcodescanner Controller
    app.controller('BarcodescannerController', function($scope) {
        
        $scope.scan = function() {
            cordova.plugins.barcodeScanner.scan(function(result) {
                $scope.result = result;
                $scope.$apply();
            }, function(error) {
                $scope.error = error;
                $scope.$apply();
            });
        }
        
    });
    
    // Filter
    app.filter('partition', function($cacheFactory) {
          var arrayCache = $cacheFactory('partition');
          var filter = function(arr, size) {
            if (!arr) { return; }
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));        
            }
            var cachedParts;
            var arrString = JSON.stringify(arr);
            cachedParts = arrayCache.get(arrString+size); 
            if (JSON.stringify(cachedParts) === JSON.stringify(newArr)) {
              return cachedParts;
            }
            arrayCache.put(arrString+size, newArr);
            return newArr;
          };
          return filter;
        });


})();




            function fetch_entities(page, options, start, size, callback, refresh){
                start = start?start:0;
                size = size?size:SIZE;
                api_counter = 1;
                var params = '';
                var url = 'http://bestandtrending.com/api/fetch_rivis/';
                if (page == 'discover'){
                    if (options.state == 'upcoming'){
                        params='query=upcoming';
                    }else if (options.state == 'nearby'){
                        if (options.geos) {
                            params = 'geos=' + options.geos;
                        }else if (options.geo) {
                            params = 'geo=' + options.geo;
                        }else{
                            params = 'geo=not';
                        }
                    }else if (options.state == 'trending'){
                        params='sort=trending';
                        params += '&query='+ encodeURIComponent(DISCOVER_QUERY);
                    }else if (options.state == 'recent'){
                        params='sort=recent';
                        params += '&query='+ encodeURIComponent(DISCOVER_QUERY);
                    }

                }



                var initial_load = true;

                if ((!start) && (!refresh)){
                    var entities = [];
                    if (page == 'discover'){
                        if (options.state == 'trending') {
                             entities = ENTITES.DISCOVER_TRENDING;
                        }else if (options.state == 'recent') {
                            entities = ENTITES.DISCOVER_RECENT;
                        }else if (options.state == 'upcoming') {
                            entities = ENTITES.DISCOVER_UPCOMING;
                        }
                    }

                    if (entities.length) {
                        initial_load = false;
                        var TIMEOUT_LIST =  setTimeout(function(){ load_entities(page, options, entities, start, size); }, 0);
                    }/*else{
                        NProgress.start();
                    }*/
                }/*else{
                    NProgress.start();
                }
                if (USER_INFO.session){
                    params+='&apikey='+USER_INFO.session;
                }

                params+='&page_type='+page+'&page_source=bnt_';
                if (ANDROID){
                    params+='android';
                }else if (IOS){
                    params+='ios';
                }else{
                    params+='web';
                }*/

                $.support.cors = true;
                $.ajax({
                url: url,
                data: params+'&counter='+api_counter+'&search=true&start='+start+'&size='+size,
                dataType: 'JSON',
                type: 'POST'
                }).always(function (response, e) {
                    //NProgress.done();
                    if (callback){
                        callback();
                    }
                    if (response.response){
                        if (response.response.status != undefined){
                            if (response.new_app_version){
                                ons.notification.alert({
                                  message: 'Please update your App, new version available.',
                                  callback: function() {

                                  }
                                });
                            }
                            if ((response.anonymous) && (page == 'profile')){
                                //USER_INFO = {};
                                mainTabbar.setActiveTab(0);
                            }
                            if (response.response.status){
                                if (api_counter == response.counter){
                                    if ((response.result.length) && (!start)) {
                                        var entities = [];
                                        if (page == 'discover-avoid'){ // Disabled for now
                                            if (options.state == 'trending') {
                                                 entities = ENTITES.DISCOVER_TRENDING;
                                            }else if (options.state == 'recent') {
                                                entities = ENTITES.DISCOVER_RECENT;
                                            }else if (options.state == 'upcoming') {
                                                entities = ENTITES.DISCOVER_UPCOMING;
                                            }
                                            var match = true;
                                            if (entities.length){
                                                if (response.result.length == entities.length) {
                                                    for (var i = 0; i < entities.length; i += 1) {
                                                        if (entities[i].id != response.result[i].id){
                                                            match = false;
                                                            break;
                                                        }
                                                    }
                                                }else{
                                                    match = false;
                                                }
                                            }else{
                                                match = false;
                                            }
                                            if (match){
                                                if (options.state == 'trending') {
                                                    ENTITES.DISCOVER_TRENDING = response.result;
                                                }else if (options.state == 'recent') {
                                                    ENTITES.DISCOVER_RECENT = response.result;
                                                }else if (options.state == 'upcoming') {
                                                    ENTITES.DISCOVER_UPCOMING = response.result;
                                                }
                                                return;
                                            }
                                        }else if (page == 'profile'){
                                            var entities = ENTITES.PROFILE;
                                            var match = true;
                                            if (entities.length) {
                                                if (entities.length == response.result.length) {
                                                    for (var j = 0; j < entities.length; j += 1) {
                                                        if (entities[j][1].length == response.result[j][1].length) {
                                                            for (var i = 0; i < entities[j][1].length; i += 1) {
                                                                if (entities[j][1][i].id != response.result[j][1][i].id) {
                                                                    match = false;
                                                                    break;
                                                                }
                                                            }
                                                        }else{
                                                            match = false;
                                                        }
                                                    }
                                                } else {
                                                    match = false;
                                                }
                                            }else{
                                                match = false;
                                            }
                                            if (match){
                                                ENTITES.PROFILE = response.result;
                                                return;
                                            }
                                        }

                                        if (page == 'discover') {
                                            if (options.state == 'trending') {
                                                ENTITES.DISCOVER_TRENDING = response.result;
                                                if (window.localStorage){
                                                    window.localStorage.setItem('entities_discover_trending', JSON.stringify(response.result));
                                                }
                                            }else if (options.state == 'recent') {
                                                ENTITES.DISCOVER_RECENT = response.result;
                                                if (window.localStorage){
                                                    window.localStorage.setItem('entities_discover_recent', JSON.stringify(response.result));
                                                }
                                            }else if (options.state == 'upcoming') {
                                                ENTITES.DISCOVER_UPCOMING = response.result;
                                                if (window.localStorage){
                                                    window.localStorage.setItem('entities_discover_upcoming', JSON.stringify(response.result));
                                                }
                                            }
                                        }

                                    }
                                    if (initial_load){
                                        load_entities(page, options, response.result, start, size);
                                    }else {
                                        var TIMEOUT_LIST = setTimeout(function () {
                                            load_entities(page, options, response.result, start, size);
                                        }, 0);
                                    }
                                }
                            }else{
                                show_load_more();
                            }
                        }else{
                            show_load_more();
                        }
                    }else{
                        show_load_more();
                        if (check_connection()){
                            //show_msg();
                        }else{
                            show_msg('No internet connection ...');
                        }
                    }
                });

            }


            function show_load_more(){
                var nav = getNav();
                var page_obj = $(nav.getCurrentPage().element);
                var parent = page_obj.find('.timeline');
                if (parent.length) {
                    var load_more = parent.find('.timeline-load');
                    if (load_more.length){
                        load_more.show();
                    }
                }
            }
            function load_entities(page, options, result, start, size){
                //console.log(page, options, result, start, size);
                //clearTimeout(TIMEOUT_LIST);
                if ((page == 'nearby') && (result.length) && (NEARBY_STATE == 'MAP')){
                    if ((typeof google != 'undefined') && (MAP)) {
                        if (MARKERS.length) {
                            for (var i = 0; i < MARKERS.length; i++) {
                                MARKERS[i].setMap(null);
                            }
                            MARKERS = [];
                        }
                        var nav = getNav();
                        var page_obj = $(nav.getCurrentPage().element);
                        var page_type = page_obj.attr('data-type');
                        for (var i = 0; i < result.length; i += 1) {
                            var entity = result[i];
                            if (entity.geo) {
                                var geo_split = entity.geo.split(',');
                                var profile_image = 'images/placeholder-pattern.png';
                                if (entity.profile_image) {
                                    if ((entity.profile_image.links) && (entity.profile_image.links.s)) {
                                        profile_image = entity.profile_image.links.s;
                                    }
                                }
                                var icon = {
                                    url: profile_image, // url
                                    scaledSize: new google.maps.Size(50, 50), // scaled size
                                    origin: new google.maps.Point(0, 0), // origin
                                    anchor: new google.maps.Point(0, 0) // anchor
                                };
                                //var marker_old = new google.maps.Marker({
                                //    map: MAP,
                                //    //animation: google.maps.Animation.DROP,
                                //    icon: icon,
                                //    position: new google.maps.LatLng(parseFloat(geo_split[0]), parseFloat(geo_split[1]))
                                //});
                                var curMarker = new RichMarker({
                                    position: new google.maps.LatLng(parseFloat(geo_split[0]), parseFloat(geo_split[1])),
                                    map: MAP,
                                    content: '<div class="marker-image"><img src="'+profile_image+'"></div>'
                                });
                                google.maps.event.addListener(curMarker, 'click', (function(marker, i) {
                                    return function() {
                                      nav.pushPage('detail.html', {animation: 'none', entity: result[i], page: page_type});
                                    }
                                  })(curMarker, i));

                                MARKERS.push(curMarker);
                            }
                        }
                        return;
                    }
                }
                var parent = '';
                
				/*
				var nav = getNav();
                var page_obj = $(nav.getCurrentPage().element);
                if (page_obj.attr('data-type') != page){
                    return;

                
                
				
				if ((result.length) && (!start)) {
                    if (page == 'discover') {
                        if (can_alert('DISCOVER'))
                            setTimeout(function(){show_alert('DISCOVER'); }, 0);
                    } else if (page == 'profile') {
                        if (can_alert('PROFILE'))
                            setTimeout(function(){show_alert('PROFILE'); }, 0);
                    }
                    if (page == 'search') {
                        if (can_alert('SEARCH'))
                            setTimeout(function(){show_alert('SEARCH'); }, 0);
                    }
                }

				*/

            }



            $(document).on('click', '.discover-type-container .tab-bar__item', function(){
				var DISCOVER_OPTIONS ={};
				var TIMEOUT;
                var value = $(this).attr('data-value');
                DISCOVER_OPTIONS.state = value;

				clearTimeout(TIMEOUT);
				
				TIMEOUT = setTimeout(function(){ fetch_entities('discover', DISCOVER_OPTIONS, 0, 15); }, 0);

			});

	function test_funct(){
				myNavigator.pushPage('serverposts.html', {data: {title: 'Product'}});
	}

	function back_onepage(){
			myNavigator.popPage()
	}
	
	function QB(item) {
		$("#qb_btn").attr('disabled','disabled');

	  // check if the ox has landed on price
		  setTimeout( cek_posisi_ox, 500 );

		$('.run_ox').show().animate({

		  left: parseInt($('.run_ox').css('left'),10) == 0 ?
			-$('.run_ox').outerWidth() :
			-55	
		}, 1900, function() {

			  $('.run_ox').css('left','99%');
			  //console.log ('aa' + $('.run_ox').css('left'));

			  setTimeout(function (){
				$("#qb_btn").removeAttr('disabled');
			  }, 400);
		 });
	}

	function cek_posisi_ox (){
		var ox_pos = $('.run_ox').css('left')
		console.log('oy ' + ox_pos);
		
		if (ox_pos.indexOf ('px') > -1 )
			ox_pos = ox_pos.replace ('px','') ;

		console.log( parseInt (ox_pos) )
		
		if ( parseInt (ox_pos) > 50)
		{
			setTimeout( cek_posisi_ox, 20 );
		}
		else
		{
			change_the_price() 
		}

	}
			
	function change_the_price (){
		$('.explosion_smoke').show()
		
		var curr_bid = $("#highest_bid").html();
		if (curr_bid.indexOf ('Rp') > -1 )
			curr_bid = curr_bid.replace("Rp", "");
		console.log (curr_bid)
		if (curr_bid.indexOf ('.') > -1 )
			curr_bid = curr_bid.replace(".", "");
		
		console.log('current: ' + curr_bid)
		var new_bid = parseInt(curr_bid)+5000;

		setTimeout(function() {
			$('.explosion_smoke').fadeOut(100);		
			$("#highest_bid").html( new_bid);
		}, 500);
	}

	function toggleWatch(item) {
		if ($("#watchTxt").html()=='Watch')
			add_watch(item)
		else
			remove_watch(item)
	}

	function add_watch(id) {
		$("#jejak_icon").animate( {
			width: 30
		}, 150, function() {
			$("#jejak_num").html( parseInt($("#jejak_num").html())+1 )
			$("#watchBtn").css('background','#8c8636')
			$("#watchTxt").html('Unwatch')
			$("#jejak_icon").attr('src', 'img/paw3-blue.png').css('opacity','0.72').animate ({
				width: 22
			}, 140);
		});
	}

	function remove_watch(id) {
		$("#jejak_icon").animate( {
			width: 30
		}, 150, function() {
			$("#jejak_num").html( parseInt($("#jejak_num").html())-1 )
			$("#watchBtn").css('background','#1f6975')
			$("#watchTxt").html('Watch');
			$("#jejak_icon").attr('src', 'img/paw3.png').css('opacity','0.34').animate ({
				width: 22
			}, 140);
		});
	}

	
	function pop_info () {
			// ax5 modal
			mask = new ax5.ui.mask();
			ax5modal = new ax5.ui.modal();
			modal_config = {
					width: 350,
					height: 485,
					animateTime: 350
				};
			ax5modal.setConfig({
				onStateChanged: function () {
					// mask
					if (this.state === "open") {
						mask.open();
					}
					else if (this.state === "close") {
						mask.close();
					}
				}
			});
				ax5modal.open( modal_config, function () {
				console.log('axmodel open');


 
				var header = jQuery(
					'<a href="#close-modal" onclick="ax5modal.close()" class="close-modal fixed">Close</a>  <center><h4 style="border-radius: 18px;background: black;border: 1px white solid;width: 136px;color: #b15215;text-shadow: 1px 2px 2px black;font-size: 22px;padding-bottom: 4px;padding-left: 2px;padding-top: 1px;box-shadow: 0px -1px 7px;font-size:21px;margin:9px;margin-bottom:20px;color:#eee">Item Detail</h4></center>')
					.click(function () {

					});
 
				var table_desc = jQuery(
					'<table class=desc_table style=width:100%><tr><td>Posted On:</td><td>Senin, 7 Mei 2017</td></tr><tr><td>Ends On:</td><td><b>Selasa, 8 Mei 2017, <span style=color:red>22:00 WIB</span></b></td></tr><tr><td>Kondisi:</td><td> (MIB) Mint in Box</td></tr><tr><td>BIN Price:</td><td> Rp 200.000<br><a href=#>Request BIN</a></td></tr><tr><td>Rules:</td><td><div style=margin-top:-10px><i> <ul style= padding-left:22px;><li>No Extended Time</li> <li>BIN paling lambat 6 Jam sebelum end</li> </ul> </i> </div></td></tr><tr><td> </td><td> </td></tr></table> <br>  <ons-button style=display:inline-block;margin-top:0px;margin-bottom:7px;width:66%;height:43px;font-size:18px;padding-top:5px;border-radius:0px onclick="ax5modal.close();setTimeout(\'open_chat()\',400)" class="button--large ng-isolate-scope button effeckt-button slide-left"><span class="label ons-button-inner"><span class="ng-scope">Ask Questions </span><i class="fa fa-question more-icon ng-scope"></i></span><span class="spinner button__spinner "></span></ons-button>')
					.click(function () {

					});
 
				var modal_action = jQuery(
					'<!-- <button style=position:absolute;left:25%;bottom:9% class="btn btn-default" type="button">' +
					'Got it</button>  <hr style=margin-top:15px>  <hr><ons-button class="ng-isolate-scope button effeckt-button button--outline " modifier="outline" style="position:absolute;right:8.5%;bottom:2.8%">Got it</ons-button> -->')
					.click(function () {
						ax5modal.close();
					});
				
				
				//resize the width, responsive, then centered
				ax5modal.css({width:'85%', maxWidth:'520px', height: '70%', maxHeight:'500px'}).align();
				
				//rgba(244, 248, 210, 0.28) - rgba(126, 134, 65, 0.28) - rgba(102, 107, 60, 0.27)
				this.$["body-frame"]
					.css({padding: '13px 22px 10px 22px', background: 'rgba(80, 86, 30, 0.12)', overflowY: 'scroll'})
					.append(header)
					//.append('<hr/>')
					.append(table_desc)
					.append(modal_action);
 
				});
	}



	function pop_filter () {
			// ax5 modal
			mask = new ax5.ui.mask();
			ax5modal = new ax5.ui.modal();
			modal_config = {
					width: 350,
					height: 485,
					animateTime: 350
				};
			ax5modal.setConfig({
				onStateChanged: function () {
					// mask
					if (this.state === "open") {
						mask.open();
					}
					else if (this.state === "close") {
						mask.close();
					}
				}
			});
				ax5modal.open( modal_config, function () {
				console.log('axmodal open');


 
				var header = jQuery(
					'<h4>Filter</h4><hr style=margin-top:-15px>')
					.click(function () {

					});
 
				var html_inputs = '  <ul class="list list-top">'
				html_inputs+='<li class="list__item" ng-repeat="setting in settings.options">'
				html_inputs+='Ends:'
				html_inputs+='<label class="switch " style="float:right;margin-right:20%">'
				html_inputs+='<select id="end_select">'
				html_inputs+='	<option value="tonight" selected="">Any</option>'
				html_inputs+='	<option value="tonight" >Tonight</option>'
				html_inputs+='	<option value="tomorrow">Tomorrow</option>'
				html_inputs+='	<option value="2day">2 days</option>'
				html_inputs+='</select>'
				html_inputs+='</label> '
				html_inputs+='</li>'		

				html_inputs+='<li class="list__item" ng-repeat="setting in settings.options">Price:'
				html_inputs+='<label class="switch ">Max </label>'
				html_inputs+='<input type="text" class="text-input" placeholder="" id="subject" style="display: inline-block;width: 54%;margin: 7px 0px 0px 0px;float: right;">'
				html_inputs+='</li>'

				html_inputs+='<li class="list__item"><span style="visibility: hidden;">Price</span>'
				html_inputs+='  <label class="switch ">Min</label>'
				html_inputs+='	<input type="text" class="text-input" placeholder="" id="subject2" style="/* display: inline-block; */width: 54%;margin: 7px 0px;float: right;">'
				html_inputs+='</li>'
				html_inputs+='</ul'

				var filter_inputs = jQuery(html_inputs)
					.click(function () {

					});
 

				var sort_header = jQuery(
					'<h4>Sort</h4><hr style=margin-top:-15px>')
					.click(function () {

					});
 
				var html_sortir = '  <ul class="list list-top">'
				html_sortir+='<li class="list__item" ng-repeat="setting in settings.options">'
				html_sortir+='By:'
				html_sortir+='<label class="switch " style="float:right;margin-right:110px">'
				html_sortir+='<select id="sort_select">'
				html_sortir+='	<option value="lotohi" selected="">Price lowest to highest</option>'
				html_sortir+='	<option value="hitolo">Price highest to lowest</option>'
				html_sortir+='	<option value="soonest">Ending Soonest</option>'
				html_sortir+='	<option value="latest">Freshly Listed</option>'
				html_sortir+='</select>'
				html_sortir+='</label> '
				html_sortir+='</li>'		
				html_sortir+='</ul>'		
				
				var modal_action = jQuery(
					'<ons-button style=display:inline-block;margin-top:37px;margin-bottom:7px;width:66%;height:43px;font-size:18px;padding-top:5px;border-radius:0px  class="button--large ng-isolate-scope button effeckt-button slide-left"><span class="label ons-button-inner"><span class="ng-scope">UPDATE </span> </span><span class="spinner button__spinner "></span></ons-button>')
					.click(function () {
						ax5modal.close();
						setTimeout('apply_filter()',300)
					});
				
				
				//resize the width, responsive, then centered
				ax5modal.css({width:'85%', maxWidth: '318px', height: '410px'}).align();
				
				//rgba(244, 248, 210, 0.28) - rgba(126, 134, 65, 0.28)
				this.$["body-frame"]
					.css({padding: '7px 24px 10px 24px', background: 'white', overflowY: 'scroll'})
					.append(header)
					//.append('<hr/>')
					.append(filter_inputs)
					.append(sort_header)
					.append(html_sortir)
					.append(modal_action);
 
				});
	}

	function pop_profile(){
			//alert("Item info lol..");
			//modals.open();
			myNavigator.pushPage('profiles.html', {animation: "lift" });
	}
	
	function toggle_search(){
		if(!$("#search_pad").is(':visible')) {
			$("#search_pad").show().css({width:'100%', display:'inline-block'}).focus();
		}
		else {
			$("#search_pad").css('width','130px').hide();
		}
	}

	function open_chat(item_id){
			myNavigator.pushPage('chat_frame.html', {animation: "lift" });
	}

	function showBidBoards() {

		modal.show();

		var kelipatan = $("#rotata").first().children().next().next().next().next().next().first().data('up') 
		var new_bid = $("#highest_bid").data("bid") + kelipatan;

		$("#your_bid").data("bid", new_bid);
		$("#your_bid").html( format_harga(new_bid));

		// sundul FX
		$("#rotata").fadeIn({queue: false}, 650);
		$("#rotata").animate({
			marginTop: '68%'
		}, 400);
	
	}

	function send_bid() {
		//$("#rotata").fadeOut({queue:false},500);

		$("#rotata").animate({marginTop:"72%"}, 100).animate({marginTop:"68%"},100).animate({marginTop:"72%"},100).animate({marginTop:"68%"},100).animate({marginTop:"70%"},110).animate({marginTop:"93%"},700);

		setTimeout('modal.hide()', 1250);

	}
	function format_harga(curr){
//800.000.000 2 mod 2
//80.000.000 2 mod 1
//8.000.000 2
//80.000 1+1
		curr = String(curr);

		len = curr.length;
		dot_count = Math.floor ((len - 1) / 3)

		var elem = new Array();


		// 1st part!
		if (len % 3 > 0)
			elem.push( curr.substr ( 0, len % 3 ) );
		else
			elem.push( curr.substr ( 0, 3 ) );

		// 2nd, 3rd, and so on..
		for (i=dot_count; i>0; i--)
		{
			elem.push( curr.substr ( (len-(i*3)), 3 ));
		}

		res = elem.join(".");
		res = "Rp " + res;

		return res;
	}


	function change_tab(what) {

		if(what=='hunt')
			tab.setActiveTab(1, {
				animation: 'fade'
			});
		else if(what=='search') {
			tab.setActiveTab(1, {
				animation: 'fade'
			});
			toggle_search();
		}
		else if (what=='watched')
			tab.setActiveTab(2, {
				animation: 'fade'
			});
	}


    function eventFire(el, etype){
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }
    