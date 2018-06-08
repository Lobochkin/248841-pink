function initMap() {
  var uluru = {lat: 59.9360182, lng: 30.3209053};
  var map = new google.maps.Map(document.getElementById("map-canvas"), {
    zoom: 16,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
