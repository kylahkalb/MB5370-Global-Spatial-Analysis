// MB5370 - Module 05: Global Scale Analysis
// Workshop 2 - Image Reducers

// --------------------------------------------------
// IMAGE REDUCERS
// --------------------------------------------------

// Import the WorldClim monthly climate dataset.
var dataset = ee.ImageCollection('WORLDCLIM/V1/MONTHLY');

// Print the collection to explore the monthly images.
print(dataset);

// Import the January and July climate images.
var jan_climate = ee.Image("WORLDCLIM/V1/MONTHLY/01");
var july_climate = ee.Image("WORLDCLIM/V1/MONTHLY/07");

// Select the average temperature bands and convert to degrees Celsius.
var jan_climate_avg = jan_climate.select('tavg').multiply(0.1);
var july_climate_avg = july_climate.select('tavg').multiply(0.1);

// Set the colour scale for displaying temperature.
var meanTemperatureVis = {
  min: -40,
  max: 30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};

// Display January and July temperatures.
//Map.addLayer(jan_climate_avg, meanTemperatureVis, 'janClimate');
//Map.addLayer(july_climate_avg, meanTemperatureVis, 'julyClimate');

// Calculate the mean annual temperature using all 12 monthly images.
var annualMeanTemperature = dataset
  .select('tavg')
  .mean()
  .multiply(0.1);

// Centre the map and display the annual mean temperature.
Map.setCenter(71.7, 52.4, 3);
//Map.addLayer(annualMeanTemperature, meanTemperatureVis, 'Mean Annual Temperature');

// --------------------------------------------------
// LANDSAT IMAGE REDUCERS
// --------------------------------------------------

// Import Landsat images collected during 2017.
var dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
  .filterDate('2017-01-01', '2017-12-31');

// Select the red, green and blue bands.
var trueColour = dataset.select(['B4', 'B3', 'B2']);

// Set the visualisation parameters.
var trueColourVis = {
  min: 0.0,
  max: 0.4,
};

// Centre the map on Townsville.
Map.setCenter(146.746, -19.529, 9);

// Display the Landsat imagery.
Map.addLayer(trueColour, trueColourVis, 'True Colour Landsat');

// Print the number of Landsat images in the collection.
print('Number of Landsat images:', dataset.size());

// Combine the Landsat images by calculating the median pixel values.
var LandsatMedian = trueColour.median();

// Display the median Landsat image.
Map.addLayer(LandsatMedian, trueColourVis, 'True Color Median');



