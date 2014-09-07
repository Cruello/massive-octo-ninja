//https://developers.google.com/maps/documentation/javascript/geocoding?hl=FR


var things = (function () {
    var map,
        marker,
        geocoder;

    function addMarker(pos, options) {
        var o = options || {},
            zoom = o.zoom || 17;

        if (marker) {
            delete marker; // delete the marker because the mpa might have been reloaded between two pages
        }
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
        map.setZoom(zoom);
    }

    function init() {
        var mapOptions = {
              center: new google.maps.LatLng(46.422713,2.263184), // France, loose zoom
              zoom: 5,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            mapContainer = $("#locationSelection"),
            isGeolocEnabled = $('#closeToDevice').length > 0,
            coords = mapContainer.data('coordinates');

        if (mapContainer.length > 0) {
            geocoder = new google.maps.Geocoder();
            map = new google.maps.Map(mapContainer[0], mapOptions);
            
            if (coords && coords.length > 0) {
                var pos = new google.maps.LatLng(coords[1], coords[0]);
                addMarker(pos);
            } else {
                addMarker(new google.maps.LatLng(46.422713,2.263184), { zoom: 5 });
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
        // var searchClient = new AlgoliaSearch('7PB0RRUBLE', '5136eab4d7e384363b35ae7cd31ca25f'),
        //     searchIndex = searchClient.initIndex('Thing_development');

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
        // $('#name').keypress(function (event) {
        //     console.log(this.value);
        //     searchIndex.search(this.value, function (success, content) {
        //         console.log(content.hits[0].name);
        //     });
        // });
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
    