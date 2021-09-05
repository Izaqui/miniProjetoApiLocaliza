let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -6.8855, lng: -39.5373 },
    zoom: 6,
  });
  
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Latitude: " + position.coords.latitude + 
          "<br>Longitude: " + position.coords.longitude);
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    alert(pos)
  });
  const informe = new google.maps.InfoWindow();
  informe.setContent("Marcado");
  map.addListener('click', evt =>{
    let marker = new google.maps.Marker({
      position: evt.latLng,
      map: map
    });
    informe.open(map, marker);
  });
  
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();
  document.getElementById("submit").addEventListener("click", () => {
    geocodeLatLng(geocoder, map, infowindow);
  });
  
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
function geocodeLatLng(geocoder, map, infowindow) {
  const input = document.getElementById("latlng").value;
  const latlngStr = input.split(",", 2);
  const latlng = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };
  geocoder
    .geocode({ location: latlng })
    .then((response) => {
      if (response.results[0]) {
        map.setZoom(11);
        const marker = new google.maps.Marker({
          position: latlng,
          map: map,
        });
        infowindow.setContent(response.results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}