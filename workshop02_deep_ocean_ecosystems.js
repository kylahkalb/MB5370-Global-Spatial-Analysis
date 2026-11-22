// MB5370 - Module 05
// Mapping the World's Deep Ocean Ecosystems

// --------------------------------------------------
// IMPORT BATHYMETRY DATA
// --------------------------------------------------

// Load the ETOPO1 dataset
var dataset = ee.Image('NOAA/NGDC/ETOPO1');

// Use the bedrock band for seafloor elevation
var bathymetry = dataset.select('bedrock');

// Check the data
print(dataset);

// --------------------------------------------------
// HADAL TRENCHES AND TROUGHS
// --------------------------------------------------

// Select areas deeper than 6000m
var hadal = bathymetry.lt(-6000).selfMask();

// Add hadal areas to the map
Map.addLayer(hadal, {palette: ['#172554']}, 'Hadal Trenches');

// Show the whole world
Map.setCenter(0, 0, 2);

// --------------------------------------------------
// ABYSSAL PLAINS
// --------------------------------------------------

// Select areas between 3000m and 6000m deep
var abyssal = bathymetry.lt(-3000)
  .and(bathymetry.gt(-6000))
  .selfMask();

// Add abyssal areas to the map
Map.addLayer(abyssal, {palette: ['#2563EB']}, 'Abyssal Plains');

// --------------------------------------------------
// CONTINENTAL AND ISLAND SLOPES
// --------------------------------------------------

// Select areas between 250m and 3000m deep
var continental = bathymetry.lt(-250)
  .and(bathymetry.gt(-3000))
  .selfMask();

// Add continental and island slopes to the map
Map.addLayer(continental, {palette: ['#38BDB8']}, 'Continental and Island Slopes');

// --------------------------------------------------
// SUBMARINE CANYONS
// --------------------------------------------------

// Calculate slope from the bathymetry data
var terrain = ee.Terrain.products(bathymetry);
var slope = terrain.select('slope');

// Select areas deeper than 200m with slopes greater than 6 degrees
var canyons = bathymetry.lt(-200)
  .and(slope.gt(6))
  .selfMask();

// Add submarine canyons to the map
Map.addLayer(canyons, {palette: ['#A855F7']}, 'Submarine Canyons');

// --------------------------------------------------
// EXCLUSIVE ECONOMIC ZONES
// --------------------------------------------------

// Load the EEZ boundaries
var eez = ee.FeatureCollection('projects/mb5370-globalspatialanalysis/assets/eez_v12_lowres');

// Show the EEZ outlines without filling the polygons
var eezStyle = {
  color: 'white',
  fillColor: '00000000',
  width: 1};

Map.addLayer(eez.style(eezStyle), {}, 'EEZ Boundaries');

// --------------------------------------------------
// MAP TITLE AND LEGEND
// --------------------------------------------------

// Create a panel for the title and legend
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '10px'}});

// Add the map title
var title = ui.Label({
  value: 'Global Deep Ocean Ecosystems',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 10px 0'}});

legend.add(title);

// Add a heading for the ecosystem types
legend.add(ui.Label('Ecosystem Types', {
  fontWeight: 'bold',
  margin: '0 0 8px 0'}));

// Function to add each colour to the legend
var addLegendRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 8px 4px 0'}});

  var label = ui.Label(name);

  var row = ui.Panel({
    widgets: [colorBox, label],
    layout: ui.Panel.Layout.Flow('horizontal')});

  legend.add(row);};

// Add the ecosystem colours
addLegendRow('#172554', 'Hadal Trenches');
addLegendRow('#2563EB', 'Abyssal Plains');
addLegendRow('#38BDB8', 'Continental and Island Slopes');
addLegendRow('#A855F7', 'Submarine Canyons');

// Add the EEZ boundaries
addLegendRow('#B0B0B0', 'EEZ Boundaries (white on map)');

// Display the legend on the map
Map.add(legend);
