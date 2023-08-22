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
        "Top Companies 2021": topCompanies,
    };
  // Create the map object with options.
  let map = L.map("map-id", {
    center: [40.73, -94.0059],
    zoom: 5,
    layers: [streetmap, topCompanies]
  });


      // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
  // Pull the "stations" property from properties.company.
  let companies = response.features;
<<<<<<< HEAD

  // Initialize an array to hold company markers.
  let companyMarkers = [];

  // Loop through the stations array.
  for (let index = 0; index < companies.length; index++) {
    let company = companies[index];

    // For each company, create a marker and bind a popup with the company's name.
    let companyMarker = L.marker([company.geometry.coordinates[1], company.geometry.coordinates[0]])
      .bindPopup("<h3>" + company.properties.Company + "</h3><h3>Revenue in 2021: " + company.properties.Revenue_2021 + "</h3><h3>Revenue in 2022: " + company.properties.Revenue_2022 + "</h3>");

=======
  
  // Initialize an array to hold company markers.
  let companyMarkers = [];

  // Sort the companies by Revenue in 2021 in descending order.
  companies.sort((a, b) => parseInt(b.properties.Revenue_2021) - parseInt(a.properties.Revenue_2021));

  let top20Companies =companies. slice(0,20);

  // Loop through the top 20 companies.
  for (let company of top20Companies) {
    
    // Create a marker for each company and bind a popup with the company's name and revenue.
    let companyMarker = L.marker([company.geometry.coordinates[1], company.geometry.coordinates[0]])
    .bindPopup("<h3>" + company.properties.Company + "</h3> City:" + company.properties.City + "</h3></br> State:" + company.properties.State + "</h3></br>Revenue(Millions) in 2021: " + company.properties.Revenue_2021 + "</h3></br>Profits(Millions) in 2021: " + company.properties.Profits_in_millions_2021 + "</h3>");
  
  
>>>>>>> f43b9394e3d9bd1715cb31d749c401ab97363a07
    // Add the marker to the companyMarkers array.
    companyMarkers.push(companyMarker);
  }

  // Create a layer group made from the company markers array and pass it to the createMap function.
  createMap(L.layerGroup(companyMarkers));
}

<<<<<<< HEAD
=======

>>>>>>> f43b9394e3d9bd1715cb31d749c401ab97363a07
// Perform an API call to the geojson API to get the station information. Call createMarkers when it completes.
d3.json("http://127.0.0.1:5000/api/geojson").then(createMarkers);