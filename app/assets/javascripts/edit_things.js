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
            mapContainer = document.getElementById("locationSelection");

        if (mapContainer) {
            geocoder = new google.maps.Geocoder();
            map = new google.maps.Map(mapContainer, mapOptions);
            google.maps.event.addListener(map, "click", function (e) {
                storeCoordinates(e.latLng);
            });         
        }
        setEventHandlers();
    }

    function geocode(elem) {
        geocoder.geocode(
            { 'address': elem.value },
            function (results, status) {
                var pos = results[0].geometry.location;           
                var mark = new google.maps.Marker({
                     map: map,
                     position: pos,
                     visible: true
                    });
                map.panTo(pos);
                map.setZoom(17);
                storeCoordinates(pos);
            }
        );
    }

    function storeCoordinates(mapPos) {
        var pos  = {};

        pos.lat = mapPos.lat();
        pos.lng = mapPos.lng();
        $('#coordinates').val(JSON.stringify(pos));
    }

    function setEventHandlers() {
        var thingPos;

        $('#geocode').click(function() {
            geocode($('#thing_address').get(0));        
        });
        if ($('#recorded_thing').length > 0) {
            setMapPos(thingPos);
        }
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
    