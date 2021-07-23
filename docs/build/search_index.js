var documenterSearchIndex = {"docs":
[{"location":"concepts.html#Basics-of-nighttime-lights-data","page":"Basic concepts","title":"Basics of nighttime lights data","text":"","category":"section"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"NOAA provides tif files of the nightlights images. Images in the package are represented as 2D arrays with floating-point values. Images of different months are stacked together to form 3D arrays. In this package, such 3D arrays are called datacubes. The following examples demonstrate how array indices work in Julia in the context of this package. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"image[1, 2]","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Returns the value of the image at location [1, 2]. 1st row and 2nd column. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"datacube[:, :, 3]","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Returns the image of the 3rd month.","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"datacube[1, 2, :]","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Returns the time series values of the pixel at location [1, 2]. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"datacube[1, 2, 3]","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Returns the value of the image at location [1, 2] of the 3rd month. ","category":"page"},{"location":"concepts.html#Loading-and-saving-files","page":"Basic concepts","title":"Loading and saving files","text":"","category":"section"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Images and datacubes can be be loaded and saved using the following functions. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"load_img(filepath)\nsave_img(filepath, image)\nload_datacube(filepath)\nmake_datacube(folder_path)\nsave_datacube(filepath, datacube)","category":"page"},{"location":"concepts.html#NighttimeLights.load_img-Tuple{Any}","page":"Basic concepts","title":"NighttimeLights.load_img","text":"NOAA provides nighttime lights images as tif files. They can be opened as 2D arrays using the load_img function. \n\nload_img(\"example.tif\")\n\n\n\n\n\n","category":"method"},{"location":"concepts.html#NighttimeLights.save_img-Tuple{Any,Any}","page":"Basic concepts","title":"NighttimeLights.save_img","text":"Images in the form of 2D arrays can be saved as tif files. \n\nsave_img(\"example.tif\", img)\n\n\n\n\n\n","category":"method"},{"location":"concepts.html#NighttimeLights.load_datacube-Tuple{Any}","page":"Basic concepts","title":"NighttimeLights.load_datacube","text":"NOAA provides images for each month since April 2012. Images of the same place taken at different times can be stacked together to make a 3D array representating a panel data. In this package, we refer to such arrays as datacubes. JLD files containing 3D arrays can be loaded using the load_datacube function.  \n\nload_datacube(\"example.jld\")\n\n\n\n\n\n","category":"method"},{"location":"concepts.html#NighttimeLights.make_datacube-Tuple{Any}","page":"Basic concepts","title":"NighttimeLights.make_datacube","text":"Loads all images (tif files) in a folder and generates a datacube. The function prints the file names to you the order in which they are loaded. \n\nmake_datacube(\"~/Downloads/ntl_images\")\n\n\n\n\n\n","category":"method"},{"location":"concepts.html#NighttimeLights.save_datacube-Tuple{Any,Any}","page":"Basic concepts","title":"NighttimeLights.save_datacube","text":"3D arrays can be saved as JLD files. \n\nsave_datacube(\"example.jld\", datacube)\n\n\n\n\n\n","category":"method"},{"location":"concepts.html#Mapping-between-earth-and-arrays","page":"Basic concepts","title":"Mapping between earth and arrays","text":"","category":"section"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Suppose you want to find which location has the maximum value of light in an image. You can use the findmax function in julia.","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"findmax(my_image)","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Suppose, the answer is [2000, 3000]. If you want to find the coordinates of this location, you'll need a mapping between the earth's coordinates and the image's indices. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Similarly, if you were given a pair of latitude and longitude, for example, (19.05, 73.01), and you need to find the radiance of that coordinate (approximately), you'll need to convert these number to your image's indices. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"CoordinateSystem\nlat_to_row(geometry::CoordinateSystem, x)\nlong_to_column(geometry::CoordinateSystem, x)\nrow_to_lat(geometry::CoordinateSystem, x)\ncolumn_to_long(geometry::CoordinateSystem, x)","category":"page"},{"location":"concepts.html#NighttimeLights.CoordinateSystem","page":"Basic concepts","title":"NighttimeLights.CoordinateSystem","text":"The mapping between the coordinates of earth and indices of the image is needed to convert from one to another. In this package such mapping is referred to as a coordinate system. To define a coordinate system, you need to provide coordinates of the top-left and bottom-right pixels, and the height and the width of the image. \n\nSuppose the image we plan to load had 8000 rows and 7100 columns. The top-left coordinate (37.5, 67.91666) is and bottom-right (4.166, 97.5). We can use these to create a the mapping. \n\ntop_left     = Coordinate(37.5, 67.91666)\nbottom_right = Coordinate(4.166, 97.5)\nheight = 8000\nwidth  = 7100\nmy_coordinate_system = CoordinateSystem(top_left, bottom_right, height, width)\n\nNow functions can use this mapping to go from one to another. \n\n\n\n\n\n","category":"type"},{"location":"concepts.html#NighttimeLights.lat_to_row-Tuple{CoordinateSystem,Any}","page":"Basic concepts","title":"NighttimeLights.lat_to_row","text":"To convert from latitude to row number of an image, use the lat_to_row function. \n\nExample:\n\nlat_to_row(my_coordinate_system, 19.6) \n\n\n\n\n\n","category":"method"},{"location":"concepts.html#NighttimeLights.long_to_column-Tuple{CoordinateSystem,Any}","page":"Basic concepts","title":"NighttimeLights.long_to_column","text":"To convert from longitude to column number of an image use the long_to_column function. \n\nExample:\n\nlong_to_column(my_coordinate_system, 73.33) \n\n\n\n\n\n","category":"method"},{"location":"concepts.html#NighttimeLights.row_to_lat-Tuple{CoordinateSystem,Any}","page":"Basic concepts","title":"NighttimeLights.row_to_lat","text":"To convert from row number of an image to latitude use the row_to_lat function. \n\nExample:\n\nrow_to_lat(my_coordinate_system, 100) \n\n\n\n\n\n","category":"method"},{"location":"concepts.html#NighttimeLights.column_to_long-Tuple{CoordinateSystem,Any}","page":"Basic concepts","title":"NighttimeLights.column_to_long","text":"To convert from column number of an image to longitude use the column_to_long function.\n\nExample:\n\ncolumn_to_long(my_coordinate_system, 100) \n\n\n\n\n\n","category":"method"},{"location":"concepts.html#Masks","page":"Basic concepts","title":"Masks","text":"","category":"section"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Masks are 2D arrays consisting of 0s and 1s. The 1s determine the region of interest. The pixels with the value of 1 are referred to as lit and the ones with the value of 0 are referred to as dark. Masks are useful because they can be easily combined with one another.  ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"To demonstrate the concept of mask, here are 3 examples:","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"If the region of interest is India, the points inside the boundary of India will be 1, while the remaining will be 0.  \nIf all pixels in an image below a threshold are considered background noise, such pixels can be marked as zero and the remaining can be marked as 1 to produce a background noise mask. For following code demonstrates this example. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"image = rand(0:10.0, 10, 10)\nnoise_threshold = function(x, threshold)\n    if x < threshold\n        return 0\n    else \n        return 1\n    end\nend\nthreshold = 0.3\nmask_mask = noise_threshold.(x, threshold) ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"The standard deviation of each pixel in a datacube can be computed. Suppose those pixels with standard deviation greater than a threshold are considered outliers. In a 2D array, these pixels can be marked as 0 and the remaining can be marked as 1 to generate an outlier mask. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"datacube = rand(0:10.0, 10, 10, 10)\nmask = zeros(10, 10)\nstd_threshold = 1\nfor i in 1:10\n    for j in 1:10\n        if std(datacube[i, j, :]) > std_threshold\n            mask[i, j] = 1\n        end\n    end\nend","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"If you multiply (elementwise) the 3 masks, you get a mask that represents the pixels above the threshold, which are inside India and which are not outliers. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"To find the number of pixels in a mask, one simply needs to do: ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"sum(mask)","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"To find the area of the mask, the mask_area function of the package can be used. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"mask_area(geometry::CoordinateSystem, mask)","category":"page"},{"location":"concepts.html#NighttimeLights.mask_area-Tuple{CoordinateSystem,Any}","page":"Basic concepts","title":"NighttimeLights.mask_area","text":"The area of each pixel is added to determine the total area of a mask. \n\nmask = rand(0:1,8000,7100) \nmask_area(INDIA_COORDINATE_SYSTEM, mask) \n\n\n\n\n\n","category":"method"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"An image can be multiplied with a mask (elementwise) so that only the pixels lit in the mask are lit in the images. For example: ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"image .* noise_mask","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"Returns as image with 0s wherever there is background noise and the remaining values are the same as the original image. ","category":"page"},{"location":"concepts.html#Aggregating-over-masks","page":"Basic concepts","title":"Aggregating over masks","text":"","category":"section"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"While using nighttime lights, you may need to find the total lit of an image over a mask.  ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"For example, if you have a background noise mask (where pixels considered noise are marked as 0 and the remaining at marked as 1), you may need to find the the total of an image over the lit pixels of the mask. ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"aggregate(image, mask)","category":"page"},{"location":"concepts.html#NighttimeLights.aggregate-Tuple{Any,Any}","page":"Basic concepts","title":"NighttimeLights.aggregate","text":"The aggregate value of an image over a mask can be computed by the aggregate function. The function multiplies the image and the mask (elementwise) and then performs the summation. \n\nrand_image = rand(10, 10)\nrand_mask = rand(0:1, 10, 10)\naggregate(rand_image, rand_mask)\n\n\n\n\n\n","category":"method"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"The aggregate function is equivalent to ","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"sum(image .* mask)","category":"page"},{"location":"concepts.html","page":"Basic concepts","title":"Basic concepts","text":"aggregate_timeseries(datacube, mask)","category":"page"},{"location":"concepts.html#NighttimeLights.aggregate_timeseries-Tuple{Any,Any}","page":"Basic concepts","title":"NighttimeLights.aggregate_timeseries","text":"To find the time series of aggregate values of a datacube over a mask, using the aggregate_timeseries function\n\nrand_datacube = rand(10, 10, 10)\nrand_mask = rand(0:1, 10, 10)\naggregate_timeseries(rand_datacube, rand_mask)\n\n\n\n\n\n","category":"method"},{"location":"polygons.html","page":"Polygons and shapefiles","title":"Polygons and shapefiles","text":"load_shapefile(filepath)","category":"page"},{"location":"polygons.html#NighttimeLights.load_shapefile-Tuple{Any}","page":"Polygons and shapefiles","title":"NighttimeLights.load_shapefile","text":"Polygon boundaries are usually stored in a format called shapfile. For example, the shapefile of the world will consist of country names and each country will have coordinates of the boundaries.   \n\nload_shapefile(\"assets/mumbai_map/mumbai_districts.shp\")\n\n\n\n\n\n","category":"method"},{"location":"polygons.html","page":"Polygons and shapefiles","title":"Polygons and shapefiles","text":"|   |       geometry      |     DISTRICT    |    ST_NM    | ST_CEN_CD | DT_CEN_CD | censuscode |\n|:-:|:-------------------:|:---------------:|:-----------:|:---------:|:---------:|:----------:|\n| 1 | Polygon(78 Points)  | Mumbai          | Maharashtra | 27        | 23        | 519        |\n| 2 | Polygon(139 Points) | Mumbai Suburban | Maharashtra | 27        | 22        | 518        |","category":"page"},{"location":"polygons.html","page":"Polygons and shapefiles","title":"Polygons and shapefiles","text":"Each row of a shapefile dataframe contains a polygon and other information about it. ","category":"page"},{"location":"polygons.html","page":"Polygons and shapefiles","title":"Polygons and shapefiles","text":"polygon_mask(geometry::CoordinateSystem, shapefile_row)","category":"page"},{"location":"polygons.html#NighttimeLights.polygon_mask-Tuple{CoordinateSystem,Any}","page":"Polygons and shapefiles","title":"NighttimeLights.polygon_mask","text":"The polygon of a shapefile row can be make into a mask. This means all the points inside the polygon will be marked as 1, while the points outside will be marked as 0.\n\nmumbai_districts = load_shapefile(\"assets/mumbai_map/mumbai_districts.shp\")\ndistrict1 = mumbai_dists[1,:] # Select the first district\ndistrict1_mask = polygon_mask(my_coordinate_system, district1)\n\n\n\n\n\n","category":"method"},{"location":"polygons.html","page":"Polygons and shapefiles","title":"Polygons and shapefiles","text":"Once a mask is obtained from a polygon, the mask can be used as just as any other mask. ","category":"page"},{"location":"data_cleaning.html","page":"Data Cleaning","title":"Data Cleaning","text":"Using nighttime lights for economic inference needs cleaning of the data.   ","category":"page"},{"location":"data_cleaning.html","page":"Data Cleaning","title":"Data Cleaning","text":"There are negative observations in the data as a consequence of NOAA's cleaning procedures. Many researchers replace them with 0. It can be done using the following:","category":"page"},{"location":"data_cleaning.html","page":"Data Cleaning","title":"Data Cleaning","text":"datacube = replace!(x -> x < 0 ? 0 : x, datacube) # replace all values below 0 with 0","category":"page"},{"location":"data_cleaning.html","page":"Data Cleaning","title":"Data Cleaning","text":"These values can be replaced with NaN and interpolated. ","category":"page"},{"location":"data_cleaning.html","page":"Data Cleaning","title":"Data Cleaning","text":"datacube = replace!(x -> x < 0 ? NaN : x, datacube) # replace all values below 0 with NaN","category":"page"},{"location":"data_cleaning.html","page":"Data Cleaning","title":"Data Cleaning","text":"mark_nan(radiance::Array{T, 2}, clouds) where T <: Real\nmark_nan(radiance_datacube::Array{T, 3}, clouds_datacube) where T <: Real\nlinear_interpolation(timeseries)\noutlier_mask(datacube, mask)\noutlier_ts(timeseries)\nbackground_noise_mask(datacube=radiance_datacube, clouds=clouds_datacube, th=0.4)\nbias_correction(radiance::Array{T, 1}, clouds) where T <:Real\nbias_correction(radiance_datacube::Array{T, 3}, clouds_datacube, mask=ones(Int8, (size(radiance_datacube)[1],size(radiance_datacube)[2]))) where T <:Real","category":"page"},{"location":"data_cleaning.html#NighttimeLights.mark_nan-Union{Tuple{T}, Tuple{Array{T,2},Any}} where T<:Real","page":"Data Cleaning","title":"NighttimeLights.mark_nan","text":"For each pixe, NOAA produces monthly estimates of radiance using the mean of radiance measured on days considered free of clouds. Radiance on months with no cloud-free observations are marked as zero, these should be marked as missing or or not available. The mark_nan function uses the radiance and the cloud-free observations image to marks NaN (missing and NaN are used interchangeably in this package) wherever there no 0 cloud-free observations. \n\nradiance = rand(1:10.0, 10, 10)\ncloud = rand(0:5, 10, 10)\nmark_nan(radiance, cloud)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning.html#NighttimeLights.mark_nan-Union{Tuple{T}, Tuple{Array{T,3},Any}} where T<:Real","page":"Data Cleaning","title":"NighttimeLights.mark_nan","text":"The mark_nan function also works on datacubes.  \n\nradiance = rand(1:10.0, 10, 10, 10)\ncloud = rand(0:5, 10, 10, 10)\nmark_nan(radiance, cloud)\n\nWherever the number of cloud-free observations is 0, radiance will be marked as NaN. \n\n\n\n\n\n","category":"method"},{"location":"data_cleaning.html#NighttimeLights.linear_interpolation-Tuple{Any}","page":"Data Cleaning","title":"NighttimeLights.linear_interpolation","text":"Uses linear interpolation to fill for missing values. Missing and NaN are used interchangeably.  \n\nExample:\n\nx = rand(1:10.0, 10)\nx[5] = NaN\nlinear_interpolation(x)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning.html#NighttimeLights.outlier_mask-Tuple{Any,Any}","page":"Data Cleaning","title":"NighttimeLights.outlier_mask","text":"There are extremely high values in the data due to fires, gas flare etc. You may find some values even greater than the aggregate radiance of large cities. Such pixels also have high standard deviation. These pixels may not be of importantance from the point of view of measureming prosperity. The outlier_mask function generates a mask of pixels with standard deviation less that the 99.9th percentile. Essentially, this function can be used to removed top 1 percent of pixels by standard deviation. A mask can be provided to the function, so that it calculates the percentile based on the lit pixel of the mask. For example, if the datacube is a box around India and the mask is the polygon mask of India, the outlier_mask function will calculate the 99th percentile of the standard deviation of the pixels inside India's boundary. \n\noutlier_mask(datacube, mask)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning.html#NighttimeLights.outlier_ts-Tuple{Any}","page":"Data Cleaning","title":"NighttimeLights.outlier_ts","text":"The time series of a pixel may show a few outliers, but as a whole the pixel may be of importantance in measuring economic activity. The outlier_ts function uses replaces the outlier observations with interpolated values. This is done using the tsclean function the forecast package of R.\n\nsample_timeseries = datacube[1, 2, :] # The time series of pixel [1, 2]\noutlier_ts(sample_timeseries)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning.html#NighttimeLights.background_noise_mask","page":"Data Cleaning","title":"NighttimeLights.background_noise_mask","text":"Pixels with no economic activity may show some light due to background noise. These pixels could be in forests, oceans, deserts etc. The background_noise_mask function generates a background moise mask such that those pixels which are considered dark are marked as 0 and those considered lit are marked as 1. The function uses the datacubes of radiance and clouds to generate annual image of the last year the data. The function considers all the pixels below a provided threshold as dark and remaining to be lit. \n\nbackground_noise_mask(radiance_datacube, clouds_datacube)\n\n\n\n\n\n","category":"function"},{"location":"data_cleaning.html#NighttimeLights.bias_correction-Union{Tuple{T}, Tuple{Array{T,1},Any}} where T<:Real","page":"Data Cleaning","title":"NighttimeLights.bias_correction","text":"Clouds months tends to have lower radiance due to attenuation. The bias_correction function uses the number of cloud-free observations to adjust the radiance accordingly. \n\nbias_correction(radiance, clouds)\n\n\n\n\n\n","category":"method"},{"location":"data_cleaning.html#NighttimeLights.bias_correction-Union{Tuple{T}, Tuple{Array{T,3},Any}, Tuple{Array{T,3},Any,Any}} where T<:Real","page":"Data Cleaning","title":"NighttimeLights.bias_correction","text":"The bias correction function can use the datacubes of radiance and the number of cloud-free observations to correct for attenuation in radiance due to low number of cloud-free observations. \n\nbias_correction(radiance, clouds)\n\n\n\n\n\n","category":"method"},{"location":"index.html","page":"Home","title":"Home","text":"CurrentModule = NighttimeLights","category":"page"},{"location":"index.html#NighttimeLights","page":"Home","title":"NighttimeLights","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Documentation for NighttimeLights.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"National Oceanic and Atmospheric Administration (NOAA) releases nighttime lights images produced using the Visible Infrared Imaging Radiometer Suite (VIIRS) since April 2012. Nighttime lights data had emerged as a useful tool to measure economic activity. Many researchers have established a correlation between prosperity and the brightness of a region. In many situations, nighttime lights generates measures with accuracy, latency and geographical resolution that are superior to conventional methods of measurement, such as GDP.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Using nighttime lights for economic analysis require cleaning of data and aggregating measurements of pixels over regions of interest. This is the first open source implementation of these procedures for nighttime lights.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"(Image: india lights)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The package, NighttimeLights.jl, was a foundation for a research paper, \"But clouds got in my way: bias and bias correction of VIIRS nighttime lights data in the presence of clouds\" by Ayush Patnaik, Ajay Shah, Anshul Tayal, Susan Thomas. This paper diagnoses a source of bias in the data and responds to this problem with a bias correction scheme. Along with other mainstream methods of data cleaning, this method is also implemented in the package.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"While there are packages to do image processing in Julia, the assumptions about the sensor producing the data, such as in Images.jl, make it incompatible with nighttime lights data. We built the package from scratch without making any assumptions about the sensor. Functions in the package take regular float 3D arrays as input, which makes it possible to extend the package to data from any sensor and not just VIIRS nighttime lights. ","category":"page"},{"location":"index.html#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"This Julia package uses R functions. To use it, you need a working RCall. You also need to install the forecast package in R.  ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Once this is done, you can install the Julia package. ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"pkg> add https://github.com/JuliaPlanet/NighttimeLights.jl","category":"page"},{"location":"index.html#Downloading-data","page":"Home","title":"Downloading data","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"NOAA nighttime lights data is hosted by Payne Institute at the Earth Observation Group. ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The data is stored in tif files. These are opened as 2D matrices and for each pixel, there is a floating-point value representing the amount of light. Monthly composites are produced by taking the average of measurements produced on days free of clouds. The number of cloud-free obersation used to generate those are also in stored in tif files. ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"There two types of annual images, those produced using daily images and those produced using monthly composites. ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The tif files covering the entire planet are large. NOAA also provides tiled data. The planet is divided into 6 tiles in the following manner: ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"(Image: tile map)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"If your region of interest is covered in one tile, then you may not need to download the full image of the planet. ","category":"page"},{"location":"index.html#Getting-help","page":"Home","title":"Getting help","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"To get enquire about the Julia package, you can join the Julia community on slack and post questions on the nighttime-lights channel. You can also email one of the authors of the package, Ayush Patnaik","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"For questions regarding nighttime lights data, you can email Kim Baugh","category":"page"},{"location":"tutorial.html#Tutorial","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"The following example demonstrates how to use nighttime lights data for research. First the dataset is cleaned and then aggregate of polygons are produced. The following tutorial shows the cleaning procedure for nighttime lights of a box around Mumbai and then the time series of aggregate radiance for each district of Mumbai is generated. The radiance and cloud-free observations datacubes for Mumbai and the district level shapefiles for Mumbai can be downloaded from assets provided with the package","category":"page"},{"location":"tutorial.html#Cleaning-Data","page":"Tutorial","title":"Cleaning Data","text":"","category":"section"},{"location":"tutorial.html#.-Load-datasets","page":"Tutorial","title":"1. Load datasets","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"load_example()","category":"page"},{"location":"tutorial.html#NighttimeLights.load_example-Tuple{}","page":"Tutorial","title":"NighttimeLights.load_example","text":"The datacubes and the district level shapefile for Mumbai city are provided with the package as examples. These can be loaded using the function. The radiance datacube, cloud-free observations datacube and the shapefile of Mumbai districts are loaded as global variables. \n\n\n\n\n\n\n\n","category":"method"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"i) Distict level shapefile of Mumbai is loaded as mumbai_map. \nii) Radiance datacube of Mumbai is loaded as radiance_datacube. \niii) Cloud-free observations data is loaded as clouds_datacube. \niv) MUMBAI_COORDINATE_SYSTEM should be used as the coordinate system. ","category":"page"},{"location":"tutorial.html#.-Replace-observations-with-0-cloud-free-observations-with-NaN.","page":"Tutorial","title":"2. Replace observations with 0 cloud-free observations with NaN.","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"Monthly averages with 0 measurements are marked as 0 in the radiance datacube, they should be NaN. ","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"radiance_datacube = mark_nan(radiance_datacube, clouds_datacube) ","category":"page"},{"location":"tutorial.html#.-Replace-all-values-below-0-with-NaN","page":"Tutorial","title":"3. Replace all values below 0 with NaN","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"There are negative values in the data due to cleaning procedure by NOAA. They should be replaced by NaN. ","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"radiance_datacube = replace!(x -> x < 0 ? NaN : x, radiance_datacube) ","category":"page"},{"location":"tutorial.html#.-Generate-a-background-noise-mask.","page":"Tutorial","title":"4. Generate a background noise mask.","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"All the pixels below 0.4 in the annual image of the 12 months of the data will be considered background noise. A different threshold can be chosen. ","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"noise = background_noise_mask(datacube, clouds_datacube, 0.4)\nradiance_datacube = apply_mask(datacube, noise)","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"All the pixels considered dark in the noise mask have all observations marked as 0 in the datacube.","category":"page"},{"location":"tutorial.html#.-Generate-an-outlier-mask.","page":"Tutorial","title":"5. Generate an outlier mask.","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"The noise_mask is used as a parameter, so only the pixels considered lit are used to estimating the outliers pixels. ","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"stable_pixels = outlier_mask(radiance_datacube, noise)\nradiance_datacube = apply_mask(datacube, stable_pixels)","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"All the pixels considered outliers have all observations marked as 0 in the datacube.","category":"page"},{"location":"tutorial.html#.-Remove-outlier-observations-from-the-remaining-pixels.","page":"Tutorial","title":"6. Remove outlier observations from the remaining pixels.","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"radiance_datacube = long_apply(outlier_ts, datacube)","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"The long_apply function applies the outlier_ts function on each pixel. This removal outlier observations from pixels which are useful. ","category":"page"},{"location":"tutorial.html#.-Correct-of-attenuation-due-to-clouds","page":"Tutorial","title":"7. Correct of attenuation due to clouds","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"mask = noise .* stable_pixels # Mask of pixels with are lit and aren't outliers. \nradiance_datacube = bias_correction(radiance_datacube, clouds_datacube, mask)","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"Attenuation correction is only done on pixels which are considered lit in both the outlier mask and the noise mask. ","category":"page"},{"location":"tutorial.html#.-Use-linear-interpolation-to-fill-the-NaNs.","page":"Tutorial","title":"8. Use linear interpolation to fill the NaNs.","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"radiance_datacube = long_apply(linear_interpolation, radiance_datacube)","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"Even though this is done for all pixels, the ones considered dark in the mask will be zero. ","category":"page"},{"location":"tutorial.html#Generating-Aggregates","page":"Tutorial","title":"Generating Aggregates","text":"","category":"section"},{"location":"tutorial.html#.-Make-a-coordinate-system-of-Mumbai.","page":"Tutorial","title":"1. Make a coordinate system of Mumbai.","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"The top left pixel of the box around Mumbai datacube, which we have used so far, have coordinates (19.49907,72.721252). The bottom right pixel's coordinates are (18.849475, 73.074187). There are 156 rows and 85 columns in the datacube. The number of months of data doesn't matter in calculating the coordinate system.  ","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"MUMBAI_COORDINATE_SYSTEM = CoordinateSystem(Coordinate(19.49907,72.721252), (18.849475, 73.074187), 156, 85)","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"This coordinate system is predefined, you can just use the global variable MUMBAI_COORDINATE_SYSTEM. ","category":"page"},{"location":"tutorial.html#.-Load-the-shape-file-for-the-districts-of-Mumbai.","page":"Tutorial","title":"2. Load the shape file for the districts of Mumbai.","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"The district level shapefile of Mumbai  These have been downloaded from datameet. ","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"mumbai_map = load_shapefile(\"assets/mumbai_map/mumbai_districts.shp\")","category":"page"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"The shapefile has a column called DISTRICT. For each district, the name of the district is shown in this column. Will be used this column as column names of the dataset that we'll generate in the next step. We could have also used census code or any other column with unique names. ","category":"page"},{"location":"tutorial.html#.-Generate-the-time-series-of-aggregate-radiance-for-each-district-of-Mumbai.","page":"Tutorial","title":"3. Generate the time series of aggregate radiance for each district of Mumbai.","text":"","category":"section"},{"location":"tutorial.html","page":"Tutorial","title":"Tutorial","text":"mumbai_district_ntl = aggregate_dataframe(MUMABI_COORDINATE_SYSTEM, radiance_datacube, mumbai_map, \"DISTRICT\")","category":"page"}]
}
