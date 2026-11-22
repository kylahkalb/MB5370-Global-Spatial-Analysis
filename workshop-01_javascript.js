// MB5370 - Module 05: Global Scale Analysis
// Workshop 1 - JavaScript Basics

// --------------------------------------------------
// JavaScript Basics - Variables
// --------------------------------------------------

// Print a message to the Console.
print('Hello, World!');

// Create a variable to store a number.
var the_answer = 42;

// Store a city name as a text variable.
var city = 'San Francisco';

// Print the city name.
print(city);

// Store the population as a numerical variable.
var population = 873965;
// Print the population.
print(population);

// Print the population with a description.
print('The value for the population variable is:', population);

// Create a list containing four city names.
var cities = ['San Francisco', 'Los Angeles', 'New York',
              'Atlanta'];
// Print the list to the Console.
print(cities);

// Create an object with information about San Francisco.
var cityData = {
    'city': 'San Francisco',
    'coordinates': [-122.4194, 37.7749],
    'population': 873965};
// Print the object to the Console.
print(cityData);

// Create a function that returns a greeting.
var my_hello_function = function(string) {
  return 'Hello ' + string + '!';
};

// Test the greeting function.
print(my_hello_function('world'));

// Create another function to greet someone by name.
var greet = function(name) {
    return 'Hello ' + name;
};
// Run the function using two different names.
print(greet('World'));
print(greet('Readers'));

// --------------------------------------------------
// Earth Engine Basics - Computing with Earth Engine
// --------------------------------------------------

// Create two numerical variables.
var a = 1;
var b = 2;

// Add the numbers using JavaScript.
print(a);
var result = a + b;
print(result, 'javascript way');

// Add the same numbers using Earth Engine.
var result = ee.Number(a).add(b);
print(result, 'Earth Engine way');

// Create a sequence of years from 1980 to 2020 in five-year intervals.
var yearList = ee.List.sequence(1980, 2020, 5);
// Print the list of years to the Console.
print(yearList);


