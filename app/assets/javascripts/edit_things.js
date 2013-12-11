//https://developers.google.com/maps/documentation/javascript/geocoding?hl=FR
var map,
    geocoder;

function initialize() {
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
            $('#latitude').val(e.latLng.lat());
            $('#longitude').val(e.latLng.lng());
        });         
    }
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
          
// $(document).ready(function () {
//     $('#geocode').click(function() {
//         geocode($('#thing_address').get(0));        
//     });
//     google.maps.event.addDomListener(window, 'load', initialize);
// })

var ready;
ready = function() {
    $('#geocode').click(function() {
        geocode($('#thing_address').get(0));        
    });
    google.maps.event.addDomListener(window, 'load', initialize);
    google.maps.event.addDomListener(window, 'page:load', initialize);
};

$(document).ready(ready);
document.addEventListener("page:load", ready);
    