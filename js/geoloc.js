var citymap = {
        vancouver: {
          center: {lat: 49.25, lng: -123.1},
          population: 6035020
        }
      };

function initAndCheckMap(callback) {

        // init Map-bubble
        definePopupClass()

        // Create the map.
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 5,
          center: {lat: 49.25, lng: -123.1},
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
          center: citymap['vancouver'].center,
          radius: Math.sqrt(citymap['vancouver'].population) * 161
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

        var markerLoc = {lat: 37.090, lng: -95.712}
        var markerLoc2 = {lat: 52.25, lng: -120.1} // vancouver, for testing cirlce

        var marker = new google.maps.Marker({
          position: markerLoc,
          map: map,
          title: 'newpos'
        });

        var marker2 = new google.maps.Marker({
            position: markerLoc2,
            map: map,
            title: 'newpos'
          });

        var popup = new Popup(
            new google.maps.LatLng(50.25, -123.1),
            document.getElementById('map-bubble'));
        popup.setMap(map);

        // TO CHECK IF INSIDE POLYGON..
        //alert (google.maps.geometry.poly.containsLocation(marker.getPosition(), cityCircle))

        // Custom `contains` function to detect inside Circle
        google.maps.Circle.prototype.contains = function(latLng) {
          return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
        }

        //alert(cityCircle.contains(marker2.getPosition()))
        
        callback (cityCircle.contains(marker2.getPosition()))

}