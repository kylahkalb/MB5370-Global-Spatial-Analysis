
# MB5370 - Global Spatial Analysis

This repository contains my Google Earth Engine scripts from Module 5 of MB5370 at James Cook University. The workshops introduced JavaScript programming, spatial data visualisation, image processing, and global-scale environmental analyses.

## Workshop 1 - JavaScript and Data Visualisation

**JavaScript Basics:** Introduction to JavaScript variables, lists, objects, functions, and basic calculations using the Earth Engine API.

**Data Visualisation:** Exploring raster and vector data using SRTM elevation and global protected area datasets, with examples of spatial filtering, terrain analysis, and regional statistics.

## Workshop 2 - Image Reducers and Deep Ocean Ecosystems

**Image Reducers:** Using WorldClim temperature data and Landsat imagery to explore image collections and calculate mean and median composites.

**Deep Ocean Ecosystem Mapping:** Mapping hadal trenches, abyssal plains, continental and island slopes, and potential submarine canyons using ETOPO1 bathymetry. The analysis also includes EEZ boundaries and a custom map legend.

## Workshop 3 - Nightlights in Global Coastlines

Comparing population change from 2000 to 2015 and nighttime lights change from 2000 to 2013 across coastal grid cells.

The global exports encountered memory limitations, so I also used the precomputed 5-degree grid dataset provided in the workbook to explore, sort, and visualise nighttime lights change.

## Workshop 4 - Allen Coral Atlas

Using Allen Coral Atlas benthic habitat data to estimate coral/algae habitat area within 800 m of ten research stations worldwide.

The analysis uses station buffers, pixel area calculations, and spatial reducers to compare and rank research stations based on the amount of mapped coral/algae habitat nearby.

## Tools and Data

- Google Earth Engine (JavaScript)
- SRTM elevation data
- World Database on Protected Areas
- WorldClim climate data
- Landsat imagery
- GPW population data
- DMSP nighttime lights
- ETOPO1 bathymetry
- Allen Coral Atlas

## ePortfolio

[View my MB5370 ePortfolio](https://sites.google.com/view/kylah-kalbfleisch-techniques/home)

## Note

Some scripts use Earth Engine datasets or assets that may require access permissions. The scripts document the methods and analyses completed during the module.
