citymap = {
        vancouver: {
          center: {lat: -6.208, lng: -106.845},
          population: 603
        }
      };

function startGeoWatch(officeLat,officeLng,callback) {
      return navigator.geolocation.getCurrentPosition(function(position){
          detectNewPos(position, officeLat, officeLng, function(answer){
              callback(answer)
          })
        }, function(err){
              console.log(err)
          }, { enableHighAccuracy: true });

      console.log('geoWatching nao..')
      
      // looping = setInterval(function(){detectNewPos({
      //   coords: {
      //     latitude: latitude++,
      //     longitude: longitude--
      //   }
      // })}, 2000)
}

function detectNewPos(pos, officeLat, officeLng, callback) {
    var self_lat = pos.coords.latitude;
    var self_lng = pos.coords.longitude;

    console.log('new pos! ==> ' + self_lat + ',' + self_lng)
    initAndCheckMap(self_lat,self_lng, parseFloat(officeLat), parseFloat(officeLng), function(answer){
        console.log('inside bubble? ' + answer);
        //return it to top
        callback(answer);
    })
}

function initAndCheckMap(lat,lng,officeLat,officeLng,callback) {

        // init Map-bubble
        //definePopupClass()

        // Create the map.
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: {lat: lat, lng: lng},
          mapTypeId: 'roadmap',
          disableDefaultUI: true,
          gestureHandling: 'none',
          zoomControl: false
        });

        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2.5,
          fillColor: '#FF0000',
          fillOpacity: 0.45,
          map: map,
          center: {lat: officeLat, lng: officeLng},
          radius: Math.sqrt(citymap['vancouver'].population) * 61
        });

        var cityCircleYellow = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.75,
          strokeWeight: 1.5,
          fillColor: '#FFFF00',
          fillOpacity: 0.35,
          map: map,
          center: citymap['vancouver'].center,
          radius: Math.sqrt(citymap['vancouver'].population) * 181
        });

        var markerLoc = {lat: lat, lng: lng} // vancouver, for testing cirlce

        var marker = new google.maps.Marker({
            position: markerLoc,
            map: map,
            title: 'newpos',
            visible: false
          });


        // var popup = new Popup(
        //     new google.maps.LatLng(50.25, -123.1),
        //     document.getElementById('map-bubble'));
        // popup.setMap(map);


        $("#map_pin").css('display', 'block');

        // TO CHECK IF INSIDE POLYGON..
        //alert (google.maps.geometry.poly.containsLocation(marker.getPosition(), cityCircle))

        // Custom `contains` function to detect inside Circle
        google.maps.Circle.prototype.contains = function(latLng) {
          return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
        }

        callback (cityCircle.contains(marker.getPosition()))

}