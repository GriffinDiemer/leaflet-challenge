var map = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  }).addTo(map);

  var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  function chooseColor(value) {
    switch (value) {
    case 0:
      return "#00FF00";
    case 1:
      return "#00FF00";
    case 2:
      return "#99ff00";
    case 3:
      return "#FFFF00";
    case 4:
      return "#FFCC00";
    case 5:
      return "#ff6600";
    default:
      return "#FF0000";
    }
  }



  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function createCircleMarker( feature, latlng ){
    let style = {
      radius: (feature.properties.mag*5),
      fillColor: chooseColor(Math.ceil(feature.properties.mag)),
      color: "grey",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }
    return L.circleMarker( latlng, style );
  }
  var geojson;
  var color = 'blue'
  d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJSON(data, {
        pointToLayer:createCircleMarker
    }).addTo(map);
});



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        range = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < range.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColor(range[i] + 1) + '"></i> ' +
            range[i] + (range[i + 1] ? '&ndash;' + range[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);