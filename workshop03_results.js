// --------------------------------------------------
// NIGHTTIME LIGHTS RESULTS
// --------------------------------------------------

// Load the precomputed nighttime lights results
var nl_result = ee.FeatureCollection(
  'users/murrnick/mb5370/nl_change_per_5deg_grid'
);

// Display the results
Map.addLayer(nl_result, {}, 'Nighttime Lights Change');

// Check the first grid cell
print(nl_result.first());

// --------------------------------------------------
// SORT NIGHTTIME LIGHTS RESULTS
// --------------------------------------------------

// Sort grid cells by nighttime lights change
var nl_sorted = nl_result.sort('mean', false);

// Show the grid cell with the greatest increase
print('Greatest nighttime lights increase:', nl_sorted.first());

// --------------------------------------------------
// VISUALISE NIGHTTIME LIGHTS CHANGE
// --------------------------------------------------

// Create an empty image
var empty = ee.Image().float();

// Set colours for the changes
var palette = ['green', 'yellow', 'orange', 'red'];

// Colour grid cells using their mean change
var nlChangeResult = empty.paint({
  featureCollection: nl_result,
  color: 'mean'
});

// Add the coloured results to the map
Map.addLayer(nlChangeResult, {
  min: 0,
  max: 30,
  palette: palette
}, 'Nighttime Lights Change Results');





