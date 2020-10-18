const mapBoxToken =
  "pk.eyJ1IjoidG9tdG9tYXRvIiwiYSI6ImNrZ2U4MHBqMTA4emoycXBpbnRkbjQ2cTQifQ.2_ccRECbLRUhha7njCoHsA";

let userIp;

fetch("https://api.ipify.org?format=json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    userIp = data["ip"];
  })
  .catch((error) => {
    console.warn("Something went wrong with IPIFY req", error);
  });

const map = L.map("mapID", {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
});

L.tileLayer(
  `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxToken}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapBoxToken,
  }
).addTo(map);
