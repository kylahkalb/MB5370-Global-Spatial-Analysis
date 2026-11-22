// MB5370 - Module 05
// Workshop 3 - Nightlights in Global Coastlines

// --------------------------------------------------
// POPULATION DATA
// --------------------------------------------------

// Load the global population dataset
var population = ee.ImageCollection("CIESIN/GPWv411/GPW_Population_Count");
// Check the population data
print(population);

// --------------------------------------------------
// POPULATION DATA FOR 2000 AND 2015
// --------------------------------------------------

// Load the population data for 2000
var population_2000 = ee.Image('CIESIN/GPWv411/GPW_Population_Count/gpw_v4_population_count_rev11_2000_30_sec');
// Load the population data for 2015
var population_2015 = ee.Image('CIESIN/GPWv411/GPW_Population_Count/gpw_v4_population_count_rev11_2015_30_sec');
// Check the population data
print(population_2000);

// --------------------------------------------------
// POPULATION VISUALISATION
// --------------------------------------------------

// Set the colours for the population data
var population_vis = {
  'max': 1000.0,
  'palette': [
    'ffffe7',
    '86a192',
    '509791',
    '307296',
    '2c4484',
    '000066'
  ],
  'min': 0.0
};

// Add the population data for both years
//Map.addLayer(population_2000, population_vis, 'population_count_2000');
//Map.addLayer(population_2015, population_vis, 'population_count_2015');

// --------------------------------------------------
// NIGHTTIME LIGHTS DATA
// --------------------------------------------------

// Load the nighttime lights dataset
var nl = ee.ImageCollection("NOAA/DMSP-OLS/NIGHTTIME_LIGHTS");
// Check the data
print(nl);

// --------------------------------------------------
// NIGHTTIME LIGHTS FOR 2000 AND 2013
// --------------------------------------------------

// Select the average visible light band and rename it
var nl_2000 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F142000')
  .select(['avg_vis'], ['nightlight']);

var nl_2013 = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/F182013')
  .select(['avg_vis'], ['nightlight']);
// Check the processed data
print('nightlight 2000 processed', nl_2000);
// Set the colours for nighttime lights
var nighttimeLightsVis = {
  min: 0,
  max: 63,
  palette: ['black', 'purple', 'yellow', 'white']
};

// Display both years
//Map.addLayer(nl_2000, nighttimeLightsVis, 'Nighttime Lights 2000');
//Map.addLayer(nl_2013, nighttimeLightsVis, 'Nighttime Lights 2013');

// --------------------------------------------------
// GLOBAL GRID DATA
// --------------------------------------------------

// Load the 2-degree grid
var grid = ee.FeatureCollection('users/murrnick/mb5370/worldgrid_2deg');

// --------------------------------------------------
// COASTLINE DATA
// --------------------------------------------------

// Load the coastline
var coast = ee.FeatureCollection('projects/UQ_intertidal/dataMasks/naturalEarthCoastline_v1');

// --------------------------------------------------
// GLOBAL COASTAL GRID
// --------------------------------------------------

// Select all grid cells along the world's coastlines
var coast_grid = grid
  .filter(ee.Filter.bounds(coast));
// Check the number of cells
//print('Coastal grid cells:', coast_grid.size());

// Show the coastal grid
//Map.addLayer(coast_grid, {color: 'firebrick'}, 'Coastal Grid Test');

// --------------------------------------------------
// POPULATION CHANGE
// --------------------------------------------------

// Calculate population change between 2000 and 2015
var pop_change = population_2015
  .subtract(population_2000);

// Show population change
//Map.addLayer(pop_change, {palette: ['red', 'black', 'lime'],
//  min: -500, max: 500}, 'pop_change', false, 0.9);

// --------------------------------------------------
// NIGHTTIME LIGHTS CHANGE
// --------------------------------------------------

// Calculate nighttime lights change between 2000 and 2013
var nl_change = nl_2013
  .subtract(nl_2000);
// Show nighttime lights change
//Map.addLayer(nl_change, {palette: ['red', 'black', 'lime'],
//  min: -50, max: 50}, 'nl_change', true, 0.9);
  
// --------------------------------------------------
// AVERAGE NIGHTTIME LIGHTS CHANGE
// --------------------------------------------------

// Calculate average nightlight change for each coastal grid cell
var nl_changePerGrid = nl_change.reduceRegions({
  collection: coast_grid,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  tileScale: 4
});
// Check the first grid cell
print(nl_changePerGrid.first());
  
// --------------------------------------------------
// AVERAGE POPULATION CHANGE
// --------------------------------------------------

// Calculate average population change for each coastal grid cell
var pop_changePerGrid = pop_change.reduceRegions({
  collection: coast_grid,
  reducer: ee.Reducer.mean(),
  scale: 1000,
  tileScale: 4
});
// Check the first grid cell
print(pop_changePerGrid.first());  

// --------------------------------------------------
// EXPORT GLOBAL RESULTS
// --------------------------------------------------

// Export population change to Earth Engine Assets
Export.table.toAsset({
  collection: pop_changePerGrid,
  description: 'export_pop_toAsset',
  assetId: 'projects/mb5370-globalspatialanalysis/assets/pop_changePerGrid'
});
// Export nighttime lights change to Earth Engine Assets
Export.table.toAsset({
  collection: nl_changePerGrid,
  description: 'export_nl_toAsset',
  assetId: 'projects/mb5370-globalspatialanalysis/assets/nl_changePerGrid'
});







