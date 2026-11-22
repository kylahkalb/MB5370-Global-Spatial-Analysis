// --------------------------------------------------
// WORKSHOP 4 - ALLEN CORAL ATLAS
// --------------------------------------------------

// MB5370 - Module 05
// Workshop 4 - Allen Coral Atlas
// Compare coral cover near different research stations

// --------------------------------------------------
// IMPORTS - RESEARCH STATIONS AND ALLEN CORAL ATLAS
// --------------------------------------------------

// Heron Island
var HeronIsland = ee.Feature(
  ee.Geometry.Point([151.91272863292696, -23.44092125287782]),
  {
    "Station": "Heron Island",
    "system:index": "0"
  }
);

// Hamilton Island
var HamiltonIsland = ee.Feature(
  ee.Geometry.Point([148.95668338218906, -20.346282616127116]),
  {
    "Station": "Hamilton Island",
    "system:index": "0"
  }
);

// Lizard Island
var LizardIsland = ee.Feature(
  ee.Geometry.Point([145.44664170695893, -14.668015083054783]),
  {
    "Station": "Lizard Island",
    "system:index": "0"
  }
);

// Daydream Island
var DaydreamIsland = ee.Feature(
  ee.Geometry.Point([148.8155189190738, -20.252140730120846]),
  {
    "Station": "Daydream Island",
    "system:index": "0"
  }
);

// Orpheus Island
var OrpheusIsland = ee.Feature(
  ee.Geometry.Point([146.5002219529916, -18.63421782409418]),
  {
    "Station": "Orpheus Island",
    "system:index": "0"
  }
);

// One Tree Island
var OneTreeIsland = ee.Feature(
  ee.Geometry.Point([152.09183629695895, -23.506706659753352]),
  {
    "Station": "One Tree Island",
    "system:index": "0"
  }
);

// Moorea Research Station
var Moorea = ee.Feature(
  ee.Geometry.Point([-149.8499767459415, -17.51875446584686]),
  {
    "Station": "Moorea Research Station",
    "system:index": "0"
  }
);

// Carrie Bow Cay
var CarrieBowCay = ee.Feature(
  ee.Geometry.Point([-88.08185953372957, 16.8025308123634]),
  {
    "Station": "Carrie Bow Cay",
    "system:index": "0"
  }
);

// Coconut Island
var CoconutIsland = ee.Feature(
  ee.Geometry.Point([-157.7880538941568, 21.43252026910704]),
  {
    "Station": "Coconut Island",
    "system:index": "0"
  }
);

// Bocas del Toro
var BocasDelToro = ee.Feature(
  ee.Geometry.Point([-82.25660617923737, 9.351481274085108]),
  {
    "Station": "Bocas del Toro",
    "system:index": "0"
  }
);

// Allen Coral Atlas reef habitat dataset
var aca = ee.Image("ACA/reef_habitat/v2_0");

// --------------------------------------------------
// GLOBAL VARIABLES
// --------------------------------------------------

// Maximum distance we can snorkel from each station
var distance = 800; // metres


// --------------------------------------------------
// RESEARCH STATION LOCATIONS
// --------------------------------------------------

// Show satellite imagery
//Map.setOptions('SATELLITE');
// Zoom to Heron Island
//Map.setCenter(151.914, -23.441, 17);
// Zoom to Hamilton Island
//Map.setCenter(148.95757924, -20.34639327, 17);
// Zoom to Lizard Island
//Map.setCenter(145.44647541, -14.66767257, 17);
// Zoom to Daydream Island
//Map.setCenter(148.81555647, -20.25161732, 17);
// Zoom to Orpheus Island
//Map.setCenter(146.49992691, -18.63411616, 17);
// Zoom to One Tree Island
//Map.setCenter(152.09167, -23.50833, 17);
// Zoom to Moorea Research Station
//Map.setCenter(-149.849815, -17.518936, 17);
// Zoom to Carrie Bow Cay
//Map.setCenter(-88.08194, 16.80250, 17);
// Zoom to Coconut Island, Hawaii
//Map.setCenter(-157.78833, 21.43361, 17);
// Zoom to Bocas del Toro Research Station
//Map.setCenter(-82.256, 9.352, 17);

// --------------------------------------------------
// RESEARCH STATION FEATURE COLLECTION
// --------------------------------------------------

// Combine all research stations into one collection
var field_stations = ee.FeatureCollection([
  HeronIsland,
  HamiltonIsland,
  LizardIsland,
  DaydreamIsland,
  OrpheusIsland,
  OneTreeIsland,
  Moorea,
  CarrieBowCay,
  CoconutIsland,
  BocasDelToro
]);

// Check the collection
print('Research stations:', field_stations);

// --------------------------------------------------
// ALLEN CORAL ATLAS
// --------------------------------------------------

// Check the Allen Coral Atlas data
print('Allen Coral Atlas:', aca);

// Display the Allen Coral Atlas data
Map.addLayer(aca, {}, 'Allen Coral Atlas');

// Select the benthic habitat band
var benthic = aca.select('benthic');

// Check the selected band
print('Benthic habitat:', benthic);

// Create a binary image of coral/algae
var coral_binary = benthic.eq(15);

// Check the binary image
print('Coral binary image:', coral_binary);

// Mask out non-coral pixels
var coral_masked = coral_binary.selfMask();

// Display coral/algae areas
Map.addLayer(coral_masked, {palette: ['red']}, 'Coral/Algae');

// Calculate the area of each coral pixel
var coral_pixel_area = coral_masked.multiply(ee.Image.pixelArea());

// Check the coral area image
print('Coral pixel area:', coral_pixel_area);

// --------------------------------------------------
// VECTOR OPERATIONS
// --------------------------------------------------

// Select the first research station
var station = ee.Feature(field_stations.first());

// Create an 800 m buffer around the station
var buffered = station.buffer(distance);

// Display the buffer
Map.addLayer(buffered, {color: 'blue'}, 'Station Buffer');

// Check the result
print('Buffered station:', buffered);

// Function to buffer each station
var bufferer = function(feature) {
  var buffered = feature.buffer(distance);
  return buffered;};

// Apply the buffer to all stations
var bufferedStations = field_stations.map(bufferer);

// Check the buffered stations
print('Buffered stations:', bufferedStations);

// Display the buffers
Map.addLayer(bufferedStations, {color: 'blue'}, 'All Station Buffers');

// Calculate total coral area within each station buffer
var coral_area = coral_pixel_area.reduceRegions({
  collection: bufferedStations,
  reducer: ee.Reducer.sum(),
  scale: 5
});

// Check the results
print('Coral area:', coral_area);

// --------------------------------------------------
// SORT CORAL AREA RESULTS
// --------------------------------------------------

// Sort stations from highest to lowest coral area
var coral_sorted = coral_area.sort('sum', false);

// Display the sorted results
print('Stations sorted by coral area:', coral_sorted);

// Show the station with the most coral
print('Highest coral area:', coral_sorted.first());

// --------------------------------------------------
// EXPORTS AND RESULTS
// --------------------------------------------------

// Export coral area results to Google Drive
Export.table.toDrive({
  collection: coral_area,
  description: 'exportToDrive',
  fileNamePrefix: 'research_stations',
  fileFormat: 'CSV'
});
