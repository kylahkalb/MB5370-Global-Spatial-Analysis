// MB5370 - Module 05: Global Scale Analysis
// Workshop 1 - Visualising Data in Earth Engine

// --------------------------------------------------
// EXPLORING HOW TO DISPLAY & CUSTOMISE SPATIAL DATA
// --------------------------------------------------

// Change the background map to satellite imagery.
Map.setOptions('SATELLITE')

// Load Snazzy Maps to customise the map appearance.
var snazzy = require("users/aazuspan/snazzy:styles");
// Add the blank map style.
snazzy.addStyle("https://snazzymaps.com/style/48750/blank-map",
"Blank");

// Centre the map on Mount Taranaki, New Zealand.
Map.setCenter(174.0638, -39.298, 11);

// Import the SRTM elevation dataset.
var dataset = ee.Image("CGIAR/SRTM90_V4");
// Print the dataset to view its properties.
print(dataset);

// Add the elevation dataset to the map.
//Map.addLayer(dataset);

// Display elevation values between 0 and 2500 metres.
//Map.addLayer(dataset, {min: 0, max: 2500}, 'custom visualization');

// Display elevation using a blue, green and red colour palette.
//Map.addLayer(dataset, {min: 0, max: 2500, palette: ['blue', 'green','red']}, 'custom palette');

// Set up visualisation parameters for the elevation data.
var elevationVis = {
  min: 0,
  max: 2500,
  palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff']
};
// Display the elevation layer with 60% opacity.
//Map.addLayer(dataset, elevationVis, 'Elevation', true, 0.6);

// Import the global protected areas dataset.
var protected_areas = ee.FeatureCollection("WCMC/WDPA/current/polygons");

// Display the protected areas on the map.
//Map.addLayer(protected_areas);

// Display protected areas in dark green.
//Map.addLayer(protected_areas, {color: 'darkgreen'}, 'Protected Areas');

// Count the number of protected areas in the dataset.
print('No of protected areas:', protected_areas.size());

// View a small sample of the protected areas collection.
print(protected_areas.limit(5));
// View the properties of the first protected area.
print(protected_areas.first());

// Filter the protected areas to show only IUCN Category II national parks.
var iucn_pa = protected_areas.filter(ee.Filter.eq('IUCN_CAT', 'II'));
// Display national parks in yellow.
//Map.addLayer(iucn_pa, {color: 'yellow'}, 'National Parks');

// Filter protected areas established in or before 1980.
var iucn_pre1980 = protected_areas.filter(ee.Filter.lte('STATUS_YR',
1980));
// Display protected areas from 1980 in white.
//Map.addLayer(iucn_pre1980, {color: 'white'}, 'PAs in 1980');

// Import a dataset containing country boundaries.
var countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");

// Print the countries dataset to explore its properties.
print(countries);
// Display the country boundaries on the map.
//Map.addLayer(countries);

// Filter the countries dataset to include only New Zealand.
var nz = countries.filter(ee.Filter.equals('country_na', 'New Zealand'));
// Print the filtered dataset.
print(nz);
// Display New Zealand on the map.

// Filter protected areas to those located in New Zealand.
var nz_pas = protected_areas.filter(ee.Filter.bounds(nz));
// Print the number of protected areas in New Zealand.
print('Number of PAs in NZ:', nz_pas.size());

// Display protected areas in New Zealand in yellow.
//Map.addLayer(nz_pas, {color:'yellow'}, 'NZ PAs only');

// Combine the category and location filters to find national parks in New Zealand.
var nz_national_parks = protected_areas
    .filter(ee.Filter.eq('IUCN_CAT', 'II')) // Select Category II national parks.
    .filter(ee.Filter.bounds(nz)); // Only include parks in New Zealand.

// Print the total number of national parks in New Zealand.
print('Number of National Parks in NZ:', nz_national_parks.size());

// --------------------------------------------------
// COMPUTATION IN EARTH ENGINE
// --------------------------------------------------

// Display the SRTM elevation data with 60% opacity.
Map.addLayer(dataset, elevationVis, 'Elevation', true, 0.6);

// Print the SRTM dataset to inspect its properties.
print(dataset);

// Add 100 metres to the elevation values.
var srtm_fixed = dataset.add(100);
// Display the adjusted elevation data.
//Map.addLayer(srtm_fixed, elevationVis, 'fixed srtm');

// --------------------------------------------------
// THRESHOLDING IMAGES
// --------------------------------------------------

// Identify pixels with elevations greater than 1500 metres.
var elevGt1500 = dataset.gt(1500);
// Display the binary elevation image.
//Map.addLayer(elevGt1500);

// Display areas above 1500 metres in fuchsia.
Map.addLayer(elevGt1500.selfMask(), {palette:'fuchsia'}, 'gt 1500m',
true, 0.7);

// --------------------------------------------------
// COMPLEX IMAGE FUNCTIONS
// --------------------------------------------------

// Calculate terrain properties using the SRTM elevation data.
var terrain = ee.Terrain.products(dataset);

// Print the terrain data to see its properties.
print('terrain', terrain);

// Select the slope and hillshade bands.
var slope = terrain.select(['slope']);
var hillshade = terrain.select(['hillshade']);

// Display the hillshade layer.
Map.addLayer(hillshade);

// Display slope using a colour gradient.
Map.addLayer(slope, {palette: ['white', 'darkred', 'black'], min:0,
max:45}, 'slope');

// --------------------------------------------------
// REGION REDUCERS
// --------------------------------------------------

// Filter the protected areas dataset to find Egmont National Park.
var taranaki = protected_areas.filter(ee.Filter.eq('NAME', 'Egmont National Park'));
// Display Mount Taranaki National Park in orange.
Map.addLayer(taranaki, {color: 'orange'}, 'Mt Taranaki');

// Calculate the mean slope within Mount Taranaki National Park.
var slopeOutput = slope.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: taranaki,
  scale: 90
});
// Print the average slope to the Console.
print('slopeOutput', slopeOutput);

// Clip the slope raster to Mount Taranaki National Park.
var taranakiSlope = slope.clip(taranaki)
// Display the clipped slope raster.
Map.addLayer(taranakiSlope, {palette: ['white', 'darkred', 'black'],
min:0, max:45}, 'taranaki slope')

// Calculate the mean slope using the clipped raster.
var slopeOutput2 = taranakiSlope.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: taranaki,
  scale:90
});
// Print the result to compare with the original calculation.
print('slopeOutput2', slopeOutput2);

// Calculate the maximum elevation within Mount Taranaki National Park.
var elevOutput_Max = dataset.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: taranaki,
  scale:90
});

// Print the maximum elevation.
print('elevOutput_Max', elevOutput_Max);

// Calculate the minimum elevation within Mount Taranaki National Park.
var elevOutput_Min = dataset.reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: taranaki,
  scale:90
});

// Print the minimum elevation.
print('elevOutput_Min', elevOutput_Min);

// Calculate the minimum and maximum elevations together.
var elevOutput_MinMax = dataset.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: taranaki,
  scale:90
});

// Print the minimum and maximum elevations.
print('elevOutput_MinMax', elevOutput_MinMax);

// Calculate the area of the national park above 1500 metres.
var areaGt1500m = elevGt1500
  .multiply(ee.Image.pixelArea())
  .reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: taranaki,
    scale:90
  });

// Print the area in square metres.
print('The area of Taranaki above 1500m (m2)', areaGt1500m);

// Convert the area to square kilometres.
print('The area of Taranaki above 1500m (km2)',
ee.Number(areaGt1500m.get('elevation')).divide(1000 * 1000));
