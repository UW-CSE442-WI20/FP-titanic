///////////////////////////////////////////////////////////////////////////
//////////////////// Set up and initiate svg containers ///////////////////
////////////////////////////////////////////////////////////////////////////	
            
var margin = {
    top: 100,
    right: 0,
    bottom: 0,
    left: 0
};
var width = 960 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

//SVG container
var svg = d3.select('#titanic_map')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

///////////////////////////////////////////////////////////////////////////
///////////////////////////// Create filter ///////////////////////////////
///////////////////////////////////////////////////////////////////////////	

//SVG filter for the gooey effect
//Code taken from http://tympanus.net/codrops/2015/03/10/creative-gooey-effects/
var defs = svg.append("defs");
var filter = defs.append("filter").attr("id", "gooeyCodeFilter");
filter.append("feGaussianBlur")
    .attr("in", "SourceGraphic")
    .attr("stdDeviation", "10")
    //to fix safari: http://stackoverflow.com/questions/24295043/svg-gaussian-blur-in-safari-unexpectedly-lightens-image
    .attr("color-interpolation-filters", "sRGB")
    .attr("result", "blur");
filter.append("feColorMatrix")
    .attr("class", "blurValues")
    .attr("in", "blur")
    .attr("mode", "matrix")
    .attr("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -5")
    .attr("result", "gooey");
filter.append("feBlend")
    .attr("in", "SourceGraphic")
    .attr("in2", "gooey")
    .attr("operator", "atop");

///////////////////////////////////////////////////////////////////////////
//////////////////////////// Set-up Map /////////////////////////////////
/////////////////////////////////////////////////////////////////////////// 

//Variables for the map
var projection = d3.geoMercator()
    .scale(170)
    .translate([480, 230]);

var path = d3.geoPath()
    .projection(projection);

var map = svg.append("g")
    .attr("class", "map");

//Initiate the world map
map.selectAll(".geo-path")
    .data(countriesMap[0].features)
    .enter().append("path")
    .attr("class", function (d) { return "geo-path" + " " + d.id; })
    .attr("id", function (d) { return d.properties.name; })
    .attr("d", path)
    .style("stroke-opacity", 1)
    .style("fill-opacity", 0.5);





// load data : world countries map
// d3.json('https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/data/world_countries.json', display);

// function display(geo_data) {
//     var margin = 75,
//         width = 1400 - margin,
//         height = 600 - margin;

//     var svg = d3.select("#map")
//         .append("svg")
//         .attr("width", width + margin)
//         .attr("height", height + margin)
//         .append('g')
//         .attr('class', 'map');

//     var projection = d3.geo.mercator()
//         .scale(150)
//         .translate([width / 2, height / 1.5]);

//     var path = d3.geo.path().projection(projection);

//     var map = svg.selectAll('path')
//         .data(geo_data.features)
//         .enter()
//         .append('path')
//         .attr('d', path)
//         .style('fill', 'lightBlue')
//         .style('stroke', 'black')
//         .style('stroke-width', 0.5);
// }