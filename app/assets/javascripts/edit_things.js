//https://developers.google.com/maps/documentation/javascript/geocoding?hl=FR


var things = (function () {
    var map,
        geocoder;

    function init() {
        var mapOptions = {
              center: new google.maps.LatLng(56.563955,-4.721375),
              zoom: 8,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            },
            mapContainer = $("#locationSelection");

        if (mapContainer.length > 0) {
            geocoder = new google.maps.Geocoder();
            map = new google.maps.Map(mapContainer[0], mapOptions);
            google.maps.event.addListener(map, "click", function (e) {
                storeCoordinates(e.latLng);
            });
            if (mapContainer.data('latitude') &&  mapContainer.data('longitude')) {
                var pos = new google.maps.LatLng(mapContainer.data('latitude'), mapContainer.data('longitude'));
                setMapPos(pos);
            }
        }
        setEventHandlers();
    }

    function geocode(elem) {
        geocoder.geocode(
            { 'address': elem.value },
            function (results, status) {
                var pos = results[0].geometry.location;           
                setMapPos(pos);
                storeCoordinates(pos);
            }
        );
    }

    function storeCoordinates(mapPos) {
        $('#thing_position_attributes_latitude').val(mapPos.lat());
        $('#thing_position_attributes_longitude').val(mapPos.lng());
    }

    function setEventHandlers() {
        $('#geocode').click(function() {
            geocode($('#thing_address').get(0));        
        });        
    }

    function setMapPos(pos) {
        new google.maps.Marker({
             map: map,
             position: pos,
             visible: true
            });
        map.panTo(pos);
        map.setZoom(17);
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
    