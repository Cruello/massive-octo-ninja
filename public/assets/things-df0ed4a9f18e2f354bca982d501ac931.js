//https://developers.google.com/maps/documentation/javascript/geocoding?hl=FR
            var map,
                geocoder;

        function initialize() {
            var mapOptions = {
              center: new google.maps.LatLng(56.563955,-4.721375),
              zoom: 8,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            geocoder = new google.maps.Geocoder();
            map = new google.maps.Map(document.getElementById("locationSelection"),
                mapOptions);


            google.maps.event.addListener(map, "click", function (e) { 
                $('#latitude').val(e.latLng.lat());
                $('#longitude').val(e.latLng.lng());
            }); 
        }

        function geocode(elem) {

            geocoder.geocode(
                { 'address': elem.value },
                function (results, status) {
                    var pos = results[0].geometry.location;
                    console.log(pos);
                    var mark = new google.maps.Marker({
                         map: map,
                         position: pos,
                         visible: true
                        });
                    console.log(mark);
                    map.panTo(pos);
                    map.setZoom(17);
                }
            );
        }
          
        google.maps.event.addDomListener(window, 'load', initialize);
// This is a manifest file that'll be compiled into things.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//

;
