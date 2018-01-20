var absenJobApp = angular.module('absenJobApp');

// Home Data: Home page configuration
absenJobApp.factory('Data', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'News',
            icon: 'calendar',
            page: 'news.html'
        },
        { 
            title: 'Products',
            icon: 'shopping-cart',
            page: 'products.html'
        },
        { 
            title: 'Gallery',
            icon: 'camera',
            page: 'gallery.html'
        },
        { 
            title: 'Map',
            icon: 'map-marker',
            page: 'map.html'
        },
        { 
            title: 'About Us',
            icon: 'user',
            page: 'about.html'
        },
        { 
            title: 'Contact',
            icon: 'envelope-o',
            page: 'contact.html'
        },
        { 
            title: 'WP JSON',
            icon: 'code-fork',
            page: 'posts.html'
        },
        { 
            title: 'Pagination',
            icon: 'sort-numeric-asc',
            page: 'serverposts.html'
        },
        { 
            title: 'Categories',
            icon: 'tags',
            page: 'categories.html'
        },
        { 
            title: 'Search News',
            icon: 'search',
            page: 'news-search.html'
        },
        { 
            title: 'Chart',
            icon: 'bar-chart-o',
            page: 'discretebar-chart.html'
        },
        { 
            title: 'RSS',
            icon: 'rss',
            page: 'feeds.html'
        },
        { 
            title: 'Tab-Bar',
            icon: 'columns',
            page: 'tab-bar.html'
        },
        { 
            title: 'Elements',
            icon: 'code',
            page: 'elements.html'
        },
        { 
            title: 'Feed API',
            icon: 'rss-square',
            page: 'feed-categories.html'
        }

    ]; 
    
    return data;
});

// Menu Data: Menu configuration
absenJobApp.factory('MenuData', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Home',
            icon: 'home',
            page: 'home.html'
        },
        { 
            title: 'Modal View',
            icon: 'square-o',
            page: 'modal.html'
        },
        { 
            title: 'Grid',
            icon: 'th',
            page: 'grid.html'
        },
        { 
            title: 'Login',
            icon: 'sign-in',
            page: 'login.html'
        }

    ]; 
    
    return data;
});

// Map Data: Map configuration
absenJobApp.factory('MapData', function(){
    var data = {};
    
    data.map = {
        zoom: 12,
        center: {
            latitude: 40.74,
            longitude: -74.18
        },
        markers: [
        {
            id: 1,
            icon: 'img/blue_marker.png',
            latitude: 40.71,
            longitude: -74.21,
            title: 'This is our main store'
        }, 
        {
            id: 2,
            latitude: 40.72,
            longitude: -74.20,
            title: 'This is our second store'
        },
        {
            id: 3,
            latitude: 40.73,
            longitude: -74.19,
            title: 'This is our third store'
        },
        {
            id: 4,
            latitude: 40.74,
            longitude: -74.18,
            title: 'This is our fourth store'
        },
        {
            id: 5,
            latitude: 40.75,
            longitude: -74.17,
            title: 'This is our fifth store'
        },
        {
            id: 6,
            latitude: 40.76,
            longitude: -74.16,
            title: 'This is our sixth store'
        },
        {
            id: 7,
            icon: 'img/plane.png',
            latitude: 40.77,
            longitude: -74.15,
            title: 'Airport'
        }]
    };

    return data;
});

// Gallery Data: Gallery configuration
absenJobApp.factory('GalleryData', function(){
    var data = {};
    
    data.items = [
        { 
            label: 'SEGA Kancole 1/7 Figure.',
            src: 'img/Futaba1472053909r1472072326.jpeg',
            time: '3 hours left'
        },
        { 
            label: 'Nendoroid Haikyuu Hinata Shoyo',
            src: 'img/haikyuu nendos.jpg',
            time: '55 minutes left'
        },
        { 
            label: 'NECA 1/4 Jungle Hunter Predator ',
            src: 'img/s-l1605.jpg',
            time: '7 hours left'
        }
    ]; 
    
    return data;
});


// Profile Data
absenJobApp.factory('ProfileData', function() {
    //var data = { url: 'http://dev-journal.lelang.today/json/joblist.json', letterLimit: 100 };
	
	var data = { url: 'http://sinergiadhikarya.co.id/public/api/joblist/', letterLimit: 100 };    
    return data;
});

// Job List Data
absenJobApp.factory('JobListData', function() {
    //var data = { url: 'http://dev-journal.lelang.today/json/joblist.json', letterLimit: 100 };
	
	var data = { url: 'http://sinergiadhikarya.co.id/public/api/joblist/', 
				//url: 'http://localhost:8001/sas/json/joblist.json', 
				 update_url: 'http://sinergiadhikarya.co.id/public/api/joblist/start/',
	letterLimit: 100 };    
    return data;
});

// Job ReportList Data
absenJobApp.factory('JobReportListData', function() {
    //var data = { url: 'http://dev-journal.lelang.today/json/jobreportlist.json', letterLimit: 100 };
	//var data = { url: 'http://localhost:8001/sas/json/jobreportlist.json', letterLimit: 100 };
    var data = { url: 'http://sinergiadhikarya.co.id/public/api/jobreportlist/', letterLimit: 100 };
    return data;
});


// Inbox Data
absenJobApp.factory('InboxData', function() {
	//var data = { url: 'http://localhost:8001/sas/json/msglist.json', letterLimit: 100 };
    var data = { url: 'http://sinergiadhikarya.co.id/public/api/inbox/', 
				 item_url: 	'http://sinergiadhikarya.co.id/public/api/inbox/item/',
				 item: [],
				 conversation: []
				};
    return data;
});



absenJobApp.factory('LoginData', function() {
    var data = { url: 'http://sinergiadhikarya.co.id/public/api/login/'};
   
    return data;
});

absenJobApp.factory('JobReportData', function() {
    var data = { url: 'http://sinergiadhikarya.co.id/public/api/jobreportlist/report/'};
    
    return data;
});


absenJobApp.factory('AbsenData', function() {
    var data = { url: 'http://sinergiadhikarya.co.id/public/api/absen/',
		 		 start_url: 'http://sinergiadhikarya.co.id/public/api/absen/start/',
				 end_url: 'http://sinergiadhikarya.co.id/public/api/absen/stop/'};
    
    return data;
});


absenJobApp.factory('CheckPushRegistrationLink', function() {
    var data = { url: 'http://sinergiadhikarya.co.id/public/push/check/'};
    return data;
});

absenJobApp.factory('RegisterPush', function() {
    var data = { url: 'http://sinergiadhikarya.co.id/public/push/register/'};
    return data;
});



// Ending Soon Data
absenJobApp.factory('EndingSoonData', function() {
    var data = { url: 'json/endingsoon.json', letterLimit: 100 };
    
    return data;
});

// Losing Data
absenJobApp.factory('LosingData', function() {
    var data = { url: 'json/losing.json'};
    
    return data;
});

// Newest Data
absenJobApp.factory('NewestData', function() {
    var data = { url: 'json/newest.json'};
    
    return data;
});


// Invoices Data
absenJobApp.factory('InvoicesData', function() {
    var data = { 
		open_invoice: 'json/open_invoices.json', 
		closed_invoice: 'json/closed_invoices.json',
		letterLimit: 100 };
    
    return data;
});


// Products Data: JSON Products configuration
absenJobApp.factory('ProductsData', function(){
    
    var data = { url: 'json/products.json', letterLimit: 100 };
    
    return data;
});

// News Data: JSON News configuration
absenJobApp.factory('NewsData', function(){
    
    var data = { url: 'json/news.json', letterLimit: 100 };
    
    return data;
});

// Posts Data: JSON Wordpress Posts configuration
absenJobApp.factory('PostsData', function(){
    
    /* (For DEMO purposes) Local JSON data */
    var data = { url: 'json/wordpress.json' };
    
    /* Set your URL as you can see in the following example */
    // var data = { url: 'YourWordpressURL/?json=get_recent_posts' };
    
    /* With user-friendly permalinks configured */
    // var data = { url: 'YourWordpressURL/api/get_recent_posts' };
    
    return data;
});

// Server Posts Data (Server side pagination with AngularJS)
absenJobApp.factory('ServerPostsData', function(){
    
    /* (For DEMO purposes) Local JSON data */
    var data = { url: 'json/serverposts&' };
    
    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    // var data = { url: 'YourWordpressURL/?json=get_recent_posts&' };
    
    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
    // var data = { url: 'YourWordpressURL/api/get_recent_posts?' };
    
    return data;
});

absenJobApp.factory('UpdatesData', function(){
    
    var data = { url: 'json/updates.json',
                 category_url: 'json/category' };
    return data;
});

// Categories Data: JSON Categories configuration
absenJobApp.factory('CategoriesData', function(){
    
    /* (For DEMO purposes) Local JSON data */
    var data = { url: 'json/categories.json',
                 category_url: 'json/category' };
    
    /* Set your URL as you can see in the following example */
    // var data = { url: 'YourWordpressURL/?json=get_category_index',
    //             category_url: 'YourWordpressURL/?json=get_category_posts&' };
    
    /* With user-friendly permalinks configured */
    // var data = { url: 'YourWordpressURL/api/get_category_index',
    //             category_url: 'YourWordpressURL/api/get_category_posts?' };
    
    return data;
});

// About Data: JSON News configuration
absenJobApp.factory('AboutData', function(){
    
    var data = { url: 'json/about.json' };
    
    return data;
});

// NVD3Data Data: JNVD3Data configuration
absenJobApp.factory('NVD3Data', function(){
    
    var data = {};
    
    data.options = {
            chart: {
                type: 'discreteBarChart',
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 65
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };

    data.data = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "A" ,
                        "value" : -29.765957771107
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 196.45946739256
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label" : "F" ,
                        "value" : -98.079782601442
                    } ,
                    {
                        "label" : "G" ,
                        "value" : -13.925743130903
                    } ,
                    {
                        "label" : "H" ,
                        "value" : -5.1387322875705
                    }
                ]
            }
        ];
    
    return data;
});

// Plugins Data: Mobile Plugins configuration
absenJobApp.factory('PluginsData', function(){
    var data = {};
    
    data.items = [
        { 
            title: 'Device Plugin',
            icon: 'mobile',
            page: 'device.html'
        },
        { 
            title: 'Notifications Plugin',
            icon: 'exclamation',
            page: 'notifications.html'
        },
        { 
            title: 'Geolocation Plugin',
            icon: 'location-arrow',
            page: 'geolocation.html'
        },
        { 
            title: 'Barcode Scanner',
            icon: 'barcode',
            page: 'barcodescanner.html'
        }
    ]; 
    
    return data;
});

// Settings Data: Settings configuration
absenJobApp.factory('SettingsData', function(){
    var data = {};
    
    data.items = {
        options: [
        {
           name: 'First Setting',
           value: true
        }, 
        {
           name: 'Second Setting',
           value: false
        }, 
        {
           name: 'Third Setting',
           value: false
        }, 
        {
           name: 'Fourth Setting',
           value: false
        }, 
        {
           name: 'Fifth Setting',
           value: false
        }],
        range:30
    };

    return data;
});

// RSS Data: Feeds configuration
absenJobApp.factory('FeedData', function(){
    
    var data = { url: 'https://developer.apple.com/news/rss/news.rss' };
    
    return data;
});

// FEED Data Structure: JSON FEED Data Structure configuration
absenJobApp.factory('FeedPluginData', function(){
    
    var data = { url: 'json/structure.json' };
    
    return data;
});