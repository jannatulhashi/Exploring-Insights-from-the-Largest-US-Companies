function createMap(topCompanies) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

      // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };

    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
        "Top Companies": topCompanies
      };
  // Create the map object with options.
  let map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, topCompanies]
  });


      // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

    // Pull the "stations" property from properties.company.
    let companies = properties.company;
  
    // Initialize an array to hold bike markers.
    let companyMarkers = [];
  
    // Loop through the stations array.
    for (let index = 0; index < company.length; index++) {
      let company = companies[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
      let companyMarker = L.marker([company.lat, company.lon])
        .bindPopup("<h3>" + properties.Company + "<h3><h3>Revenue in 2021: " + properties.Revenue_2021 + "<h3><h3>Revenue in 2022: " + properties.Revenue_2022 + "</h3>");
  
      // Add the marker to the bikeMarkers array.
      companyMarkers.push(companyMarker);
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(companyMarkers));
  }

  // Perform an API call to the geojson API to get the station information. Call createMarkers when it completes.
d3.json("http://127.0.0.1:5000/api/geojson").then(createMarkers);