//https://developers.google.com/maps/documentation/javascript/geocoding?hl=FR


var things = (function () {
    var map,
        marker,
        geocoder;

    function addMarker(pos) {
        if (marker) {
            setMarkerPosition(pos);
        } else {
            marker = new google.maps.Marker({
                map: map,
                position: pos,
                visible: true,
                draggable: true
            });
            google.maps.event.addListener(marker, "mouseup", function (e) {
                storeCoordinates(e.latLng);
                setCustomSearchLocation();
            });
            map.panTo(pos);
            map.setZoom(17);
        }        
    }

    function init() {
        var mapOptions = {
              center: new google.maps.LatLng(46.422713,2.263184), // France, loose zoom
              zoom: 5,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            mapContainer = $("#locationSelection"),
            isGeolocEnabled = $('#closeToDevice').length > 0;

        if (mapContainer.length > 0) {
            geocoder = new google.maps.Geocoder();
            map = new google.maps.Map(mapContainer[0], mapOptions);
            
            if (mapContainer.data('coordinates')) {
                var coords = mapContainer.data('coordinates'),
                    pos = new google.maps.LatLng(coords[1], coords[0]);
                addMarker(pos);
            }
        }

        setEventHandlers();
        
        if (isGeolocEnabled) {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setCurrentPos, disableGeolocation);
            } else {
                disableGeolocation();
            }
        }
    }

    function disableGeolocation() {
        $('#closeToDevice').hide();
    }

    function geocode(elem) {
        geocoder.geocode(
            { 'address': elem.value },
            function (results, status) {
                var pos;

                if (results.length > 0) {
                    pos = results[0].geometry.location;           
                    addMarker(pos);
                    storeCoordinates(pos);
                    map.panTo(pos);
                    map.setZoom(17);
                }
            }
        );
    }

    function storeCoordinates(mapPos) {
        $('#thing_position_attributes_coordinates, #customLocation').val(JSON.stringify([ mapPos.lng(), mapPos.lat() ]));
    }

    function setEventHandlers() {
        $('#geocode').click(function() {
            geocode($('#thing_address').get(0));        
        });

        $('#thing_address').keypress(function (event) {
            if (event.keyCode === 13) {
                $('#geocode').click();
                return false;                
            }
        });

        if (map) {
            google.maps.event.addListener(map, "click", function (e) {
                storeCoordinates(e.latLng);
                setMarkerPosition(e.latLng);
                setCustomSearchLocation();
            });
        }
        
        $('#closeToDevice').click(setMarkerAtDevicePosition);
    }

    function setCurrentPos(position) {
        var coords = [ position.coords.longitude, position.coords.latitude ],
            pos = new google.maps.LatLng(coords[1], coords[0]);
        
        $('#deviceLocation').val(JSON.stringify(coords));
        addMarker(pos);
    }

    function setMarkerAtDevicePosition() {
        var coords = JSON.parse($('#deviceLocation').val()),
            pos = new google.maps.LatLng(coords[1], coords[0]);

        setMarkerPosition(pos);
    }

    function setMarkerPosition(position) {
        marker.setPosition(position);
    }

    function setCustomSearchLocation() {
        $('#closeToSelection').click();        
    }

    return {
        "init": init
    }
}());
          
var ready;
ready = function() {    
    google.maps.event.addDomListener(window, 'load', things.init);
    google.maps.event.addDomListener(window, 'page:load', things.init);
};

$(document).ready(ready);
document.addEventListener("page:load", ready);
    
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
