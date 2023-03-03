var documenterSearchIndex = {"docs":
[{"location":"concepts/#Basics-of-nighttime-lights-data","page":"Basic concepts","title":"Basics of nighttime lights data","text":"","category":"section"},{"location":"concepts/#Data-structure","page":"Basic concepts","title":"Data structure","text":"","category":"section"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"NOAA provides tif files of the nightlights images. These are represented as 2D arrays with floating-point values. Tif files can be read using the Rasters.jl package. While nighttime lights images are 2D arrays, reading them as Raster files creates an extra dimension for bands, which is irrelevant for nightlights images. We will ignore the extra dimension and refer to the image as 2D arrays instead of 3D. ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"Images of different months are stacked together to form 3D arrays. Such 3D arrays are called datacubes. Once again, there is an extra dimension for bands, which will be ignore and treat the 4D arrays as 3D. ","category":"page"},{"location":"concepts/#Data-IO","page":"Basic concepts","title":"Data IO","text":"","category":"section"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"While the Rasters.jl has a comprehensive documentation. This page shows some concepts needed to be known to study nighttime lights. ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"The package can be used to load 2D matrices, saved as .tif files, and 3D matrices. saved as .nc files using the Raster functions. ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"For example: ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"using Rasters\nimage = Raster(\"file.tif\")\ndatacube = Raster(\"file.nc\")","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"NOAA provides images of different months in separate .tif files. It is often required to combined these into a single datacube.  A list of .tif files can be joined together to make a datacube using Rasters.combine.  ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"For example: ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"using Rasters\nfilelist = readdir(\"path\")\nradiances = [Raster(i, lazy = true) for i in filelist]\ntimestamps = collect(1:length(radiances))\nseries = RasterSeries(radiances, Ti(timestamps))\ndatacube = Rasters.combine(series, Ti)","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"write function from Rasters can be used to write images into .tif files and datacubes into .nc files. ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"For example: ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"write(\"datacube.nc\", datacube)\nwrite(\"image.tif\", image)","category":"page"},{"location":"concepts/#Indexing","page":"Basic concepts","title":"Indexing","text":"","category":"section"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"The dimension regarding bands can be hidden using view as nighttime lights are single band images and then images can be indexed like 2D arrays and datacubes can be indexed like 3D arrays. ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"For example:","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"image = view(image, Band(1))\nimage[1, 2] # value of the image at location [1, 2]. 1st row and 2nd column \ndatacube = view(datacube, Band(1))\ndatacube[:, :, 3] # Image of the 3rd month.\ndatacube[1, 2, :] # Time series values of the pixel at location 1, 2\ndatacube[1, 2, 3] # Value of the image at location [1, 2] of the 3rd month","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"Longitude and latitude can also be used for indexing.  For example:","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"image[X(Near(77.1025)), Y(Near(28.7041))] # value of image near longitude = 77.1025 and latitude = 28.7041\ndatacube[X(Near(77.1025)), Y(Near(28.7041))] # timeseries of near longitude = 77.1025 and latitude = 28.7041\ndatacube[X(Near(72.8284)), Y(Near(19.05)), Ti(At(201204))] # value of image near longitude = 77.1025 and latitude = 28.7041 at Time = 201204 ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"In some cases, one may need to convert row and column numbers to latitude and longitude. One can use map. ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"For example:","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"row = 10 \ncolumn = 10 \nlongitude, latitude = map(getindex, dims(raster), [column, row]) ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"In some cases, one may need to convert (longtitude, latitude) to row and column numbers. One can use dims2indices function from DimensionalData.jl. ","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"For example:","category":"page"},{"location":"concepts/","page":"Basic concepts","title":"Basic concepts","text":"using Rasters\nusing DimensionalData\nDimensionalData.dims2indices(dims(raster)[1], X(Near(72.7625))) # column number corresponding to longitude\nDimensionalData.dims2indices(dims(raster)[2], Y(Near(19.4583))) # row number corresponding to latitude","category":"page"},{"location":"data_cleaning/","page":"Data Cleaning","title":"Data Cleaning","text":"Using nighttime lights for economic inference needs cleaning of the data.   ","category":"page"},{"location":"data_cleaning/","page":"Data Cleaning","title":"Data Cleaning","text":"na_recode(radiance, clouds; replacement)\nna_interp_linear(timeseries)\noutlier_variance(datacube, mask)\noutlier_hampel(timeseries, window_size = 5, n_sigmas = 3)\nbgnoise_PSTT2021(radiance_datacube, clouds_datacube, th = 0.4)\nbias_PSTT2021(radiance, clouds, smoothing_parameter=10.0) \nbias_PSTT2021(radiance_datacube, clouds_datacube, mask)\nPSTT2021_conventional(radiance_datacube, clouds_datacube)\nPSTT2021(radiance_datacube, clouds_datacube)\nclean_complete(radiance_datacube, clouds_datacube)","category":"page"},{"location":"data_cleaning/#NighttimeLights.na_recode-Tuple{Any, Any}","page":"Data Cleaning","title":"NighttimeLights.na_recode","text":"The na_recode function also works on datacubes.  \n\nradiance = rand(1:10.0, 10, 10, 10)\ncloud = rand(0:5, 10, 10, 10)\nna_recode(radiance, cloud)\n\nWherever the number of cloud-free observations is 0, radiance will be marked as missing. \n\n\n\n\n\n","category":"method"},{"location":"data_cleaning/#NighttimeLights.na_interp_linear-Tuple{Any}","page":"Data Cleaning","title":"NighttimeLights.na_interp_linear","text":"Uses linear interpolation to fill for missing values. \n\nExample:\n\nx = rand(1:10.0, 10)\nx[5] = missing\nna_interp_linear(x)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning/#NighttimeLights.outlier_variance-Tuple{Any, Any}","page":"Data Cleaning","title":"NighttimeLights.outlier_variance","text":"There are extremely high values in the data due to fires, gas flare etc. You may find some values even greater than the aggregate radiance of large cities. Such pixels also have high standard deviation. These pixels may not be of importantance from the point of view of measureming prosperity. The outlier_variance function generates a mask of pixels with standard deviation less that the 99.9th percentile. Essentially, this function can be used to removed top 1 percent of pixels by standard deviation. A mask can be provided to the function, so that it calculates the percentile based on the lit pixel of the mask. For example, if the datacube is a box around India and the mask is the polygon mask of India, the outlier_variance function will calculate the 99th percentile of the standard deviation of the pixels inside India's boundary. \n\noutlier_variance(datacube, mask)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning/#NighttimeLights.outlier_hampel","page":"Data Cleaning","title":"NighttimeLights.outlier_hampel","text":"The time series of a pixel may show a few outliers, but as a whole the pixel may be of importantance in measuring economic activity. The outlier_hampel function uses replaces the outlier observations with interpolated values. This is done using the tsclean function the forecast package of R.\n\nsample_timeseries = datacube[1, 2, :] # The time series of pixel [1, 2]\noutlier_hampel(sample_timeseries)\n\n\n\n\n\n","category":"function"},{"location":"data_cleaning/#NighttimeLights.bgnoise_PSTT2021","page":"Data Cleaning","title":"NighttimeLights.bgnoise_PSTT2021","text":"Pixels with no economic activity may show some light due to background noise. These pixels could be in forests, oceans, deserts etc. The bgnoise_PSTT2021 function generates a background moise mask such that those pixels which are considered dark are marked as 0 and those considered lit are marked as 1. The function uses the datacubes of radiance and clouds to generate annual image of the last year the data. The function considers all the pixels below a provided threshold as dark and remaining to be lit. \n\nbgnoise_PSTT2021(radiance_datacube, clouds_datacube)\n\n\n\n\n\n","category":"function"},{"location":"data_cleaning/#NighttimeLights.bias_PSTT2021","page":"Data Cleaning","title":"NighttimeLights.bias_PSTT2021","text":"The bias correction function can use the datacubes of radiance and the number of cloud-free observations to correct for attenuation in radiance due to low number of cloud-free observations. \n\nbias_PSTT2021(radiance, clouds)\n\n\n\n\n\n","category":"function"},{"location":"data_cleaning/#NighttimeLights.bias_PSTT2021-Tuple{Any, Any, Any}","page":"Data Cleaning","title":"NighttimeLights.bias_PSTT2021","text":"The bias correction function can use the datacubes of radiance and the number of cloud-free observations to correct for attenuation in radiance due to low number of cloud-free observations. \n\nbias_PSTT2021(radiance, clouds)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning/#NighttimeLights.PSTT2021_conventional-Tuple{Any, Any}","page":"Data Cleaning","title":"NighttimeLights.PSTT2021_conventional","text":"All steps of data cleaning that most researchers do can be performed using the conventional cleaning funciton.\n\nExample\n\nradiance_datacube = rand(1:1000, 10, 10, 10)\nclouds_datacube = rand(1:1000, 10, 10, 10)\nPSTT2021_conventional(radiance_datacube, clouds_datacube)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning/#NighttimeLights.PSTT2021-Tuple{Any, Any}","page":"Data Cleaning","title":"NighttimeLights.PSTT2021","text":"The PSTT2021 function performs all the steps of the new cleaning procedure described in But clouds got in my way: Bias and bias correction of VIIRS nighttime lights data in the presence of clouds, Ayush Patnaik, Ajay Shah, Anshul Tayal, Susan Thomas as conventional cleaning.\n\nExample\n\nradiance_datacube = rand(1:1000, 10, 10, 10)\nclouds_datacube = rand(1:1000, 10, 10, 10)\nPSTT2021(radiance_datacube, clouds_datacube)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning/#NighttimeLights.clean_complete-Tuple{Any, Any}","page":"Data Cleaning","title":"NighttimeLights.clean_complete","text":"The function clean_complete() represents our views on an optimal set of steps for pre- processing in the future (for the period for which this package is actively maintained). As of today, it is identical to PSTT2021()`\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = NighttimeLights","category":"page"},{"location":"#NighttimeLights.jl","page":"Home","title":"NighttimeLights.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Documentation for NighttimeLights.","category":"page"},{"location":"","page":"Home","title":"Home","text":"National Oceanic and Atmospheric Administration (NOAA) releases nighttime lights images produced using the Visible Infrared Imaging Radiometer Suite (VIIRS) since April 2012. Nighttime lights data had emerged as a useful tool to measure economic activity. Many researchers have established a correlation between prosperity and the brightness of a region. In many situations, nighttime lights generates measures with accuracy, latency and geographical resolution that are superior to conventional methods of measurement, such as GDP.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Using nighttime lights for economic analysis require cleaning of data and aggregating measurements of pixels over regions of interest. This is the first open source implementation of these procedures for nighttime lights.","category":"page"},{"location":"","page":"Home","title":"Home","text":"While there are packages to do image processing in Julia, the assumptions about the sensor producing the data, such as in Images.jl, make it incompatible with nighttime lights data. We built the package from scratch without making any assumptions about the sensor. Functions in the package take regular float 3D arrays as input, which makes it possible to extend the package to data from any sensor and not just VIIRS nighttime lights. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: india lights)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package was a foundation for a research paper, \"But clouds got in my way: bias and bias correction of VIIRS nighttime lights data in the presence of clouds\" by Ayush Patnaik, Ajay Shah, Anshul Tayal, Susan Thomas. The paper diagnoses a source of bias in the data and responds to this problem with a bias correction scheme. Along with other mainstream methods of data cleaning, this method is also implemented in the package.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The package is built on top of Rasters.jl, which provides cutting edge features to study raster data and perform routine tasks such as zonal statistics and plotting. ","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"pkg> add NighttimeLights","category":"page"},{"location":"#Getting-help","page":"Home","title":"Getting help","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To get inquire about the Julia package, you can join the Julia community on slack and post questions on the nighttime-lights channel. You can also email one of the authors of the package, Ayush Patnaik. ","category":"page"},{"location":"","page":"Home","title":"Home","text":"For questions regarding nighttime lights data, you can email Kim Baugh","category":"page"},{"location":"tutorial/#Tutorial","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"This tutorial shows how to: ","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Download monthly nighttime light data\nLoad the data cubes of radiance and the number of cloud-free observations. \nClean the data\nGenerate zonal statistics","category":"page"},{"location":"tutorial/#.-Downloading-the-data","page":"Tutorial","title":"1. Downloading the data","text":"","category":"section"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Create a folder called radiance and a folder called cfobs. We will use these folders to the radiance and the cloud-free observations images respectively. \nGo to the VIIRS Nighttime Lights download page at Earth Observation Group\nClick on 2017, the on 201704. This means April 2017. \nClick on vcmcfg (we will use this version of the dataset)\nClick on SVDNB_npp_20170401-20170430_75N060E_vcmcfg_v10_c201705011300.tgz. Note that the filename has 75N060E in it. This means TILE3, where Mumbai is. \nExtract the tar files. Put SVDNB_npp_20170401-20170430_75N060E_vcmcfg_v10_c201705011300.avg_rade9h.tif in the radiance folder. Put SVDNB_npp_20170401-20170430_75N060E_vcmcfg_v10_c201705011300.cf_cvg.tif in the cfobs folder. \nRepeat the process for all the months. If you are interested only in a certain set of months. Download only those. ","category":"page"},{"location":"tutorial/#.-Loading-the-data","page":"Tutorial","title":"2. Loading the data","text":"","category":"section"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Create data cubes for radiance and cloud-free observations.","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"using NighttimeLights\nusing Rasters\nusing Dates","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"dates = collect(Date(2012,4):Month(1):Date(2022, 06))\ntimestamps = NighttimeLights.yearmon.(dates)","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"filelist = readdir(\"~/Downloads/radiance\")\nradiances = [Raster(i, lazy = true) for i in filelist]\ntimestamps = collect(1:length(radiances))\nseries = RasterSeries(radiances, Ti(timestamps))\nradiance_datacube = Rasters.combine(series, Ti)","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"filelist = readdir(\"~/Downloads/cfobs\")\nradiances = [Raster(i, lazy = true) for i in filelist]\ntimestamps = collect(1:length(radiances))\nseries = RasterSeries(radiances, Ti(timestamps))\nclouds_datacube = Rasters.combine(series, Ti)","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"If you haven't downloaded the data, and you want to run the remaining code, you can use load_example() to load the datacubes of radiance and the number of cloud-free observations around Mumbai ","category":"page"},{"location":"tutorial/#.-Cleaning-Data","page":"Tutorial","title":"3. Cleaning Data","text":"","category":"section"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"A single function, clean_complete, can be used on radiance_datacube and clouds_datacube to generate a cleaned datacube of radiance. ","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"cleaned_datacube = clean_complete(radiance_datacube, clouds_datacube) ","category":"page"}]
}
