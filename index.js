const mapBoxToken =
  "pk.eyJ1IjoidG9tdG9tYXRvIiwiYSI6ImNrZ2U4MHBqMTA4emoycXBpbnRkbjQ2cTQifQ.2_ccRECbLRUhha7njCoHsA";
const IPifyToken = "at_e91MN1DFZkTfwQ2wPJv8EggmtHNYQ";

const getUserIPAddress = function () {
  return fetch("https://api.ipify.org?format=json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const userIPAddress = data["ip"];
      // {"ip":"70.80.159.92"}
      return userIPAddress;
    })
    .catch((error) => {
      console.warn("Something went wrong with IPIFY req", error);
    });
};

const getIPifyData = function (queryParams) {
  // queryParams = { ip: '', domain: ''}
  const IPAddress = queryParams["ipAddress"] ? queryParams["ipAddress"] : "";
  const domainName = queryParams["domainName"] ? queryParams["domainName"] : "";

  const requestURL = `https://geo.ipify.org/api/v1?apiKey=${IPifyToken}&ipAddress=${IPAddress}&domain=${domainName}`;

  return fetch(requestURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const IPAddressData = data;
      return IPAddressData;
    })
    .catch((error) => {
      console.warn("Something went wrong with IPIFY req", error);
    });
};

const repositionMap = function (IPAddressData) {
  const latitude = IPAddressData.location.lat;
  const longitude = IPAddressData.location.lng;

  const map = L.map("mapID", {
    center: [latitude, longitude],
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
};

const formatDataForUI = function (IPAddressData) {
  const ip = IPAddressData.ip;
  const location = `${IPAddressData.location.city}, ${IPAddressData.location.country} ${IPAddressData.location.postalCode}`;
  const timezone = `UTC ${IPAddressData.location.timezone}`;
  const isp = IPAddressData.isp;

  const IPAddressDataObj = { ip, location, timezone, isp };

  const IPAddressDataArr = Object.keys(IPAddressDataObj).map(
    (key) => IPAddressDataObj[key]
  );

  return IPAddressDataArr;
};

const updateIPInfoUI = function () {};

const handleSearch = function () {};

const initialize = function () {
  getUserIPAddress()
    .then((userIPAddress) => {
      return getIPifyData({ ipAddress: userIPAddress });
    })
    .then((IPAddressData) => {
      repositionMap(IPAddressData);
      formatDataForUI(IPAddressData);
    });
};

initialize();

const ipInfoCells = document.querySelectorAll(".ip-info-cell");
console.log(ipInfoCells);

ipInfoCells[0].childNodes[3].innerHTML = "test";
