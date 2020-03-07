var datasets = {
    "total": null,
    "age": null,
    "education": null,
    "intent": null,
    "race": null,
    "place": null,
    "gender": null
}
  
var svg;
var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 600;
var CATEGORY_LABEL_OFFSET = 5;

// Total data fields
var totalCount = 0;
var attributeCounts = {};

// Fields for circle svg
var CIRCLE_RADIUS = 6;
var CIRCLE_SIZE = CIRCLE_RADIUS * 2;
var SPACE_BETWEEN_CIRCLE_INITIAL = 10;
var BOTTOM_PADDING = 30;

// more negative is more force -> bigger space between circle
var CHARGE_BETWEEN_CIRCLES = -10;

// animation delays, duration, timings:
var DELAY_BETWEEN_FILTERS = 2000;
var COUNTER_DURATION = 4300;
var FILTER_DURATION = 1500;
var BUTTON_FADE_DURATION = 500;

var xInitCircle = [];
var yInitCircle = [];

// Styles
var NEUTRAL_COLOR = "#ccc";
var RED_COLOR = "#6b1111";
var BLACK_COLOR = "#353238";
var ORANGE_COLOR = "#FF715B";
var PINK_COLOR = "#DD7A92";
var LABEL_SIZE = "1.45em";
  
// window.onload = function () {
//     // hide all buttons by default, done in CSS
//     // $("#bottom-panel").css('opacity', 0);
//     loo
//     setInterval(loop, 15000);
// }

loadInitialData()
setInterval(loop, 9000);

function loop() {
    resetInitialViz()
    loadInitialData()
}

function resetInitialViz() {
    d3.select("#canvas").select("svg").remove()
    // svg.selectAll("text").remove();
    //d3.select("#counter-label")
}
  
function loadInitialData() {
    d3.csv("https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/data/per10.csv", function(error, data) {
        if (error) {
            console.log(errors);
        } 
        datasets["total"] = data;
        for(var i = 0; i < data.length; i++){
            totalCount += parseInt(data[i]["count"]);
        }
        generateInitialViz();     
    });
};
  
var generateInitialViz = function() {
    svg = d3.select("#canvas")
                .append("svg")
                .attr("width", CANVAS_WIDTH)
                .attr("height", CANVAS_HEIGHT)
                .attr("class", "svg-canvas");
    svg.selectAll("text").remove();
  
    var format = d3.format(",d");
    d3.select("#counter-label")
      .transition()
      .duration(COUNTER_DURATION)
      .tween("text", function () {
        var that = d3.select(this),
            i = d3.interpolateNumber(that.text().replace(/,/g, ""), totalCount);
        return function (t) { that.text(format(i(t))); };
      });
  
    var nodes = [];
    var counter = 0;
  
    
    var simulation = d3.forceSimulation(nodes)
                        .force("charge", d3.forceManyBody().strength([CHARGE_BETWEEN_CIRCLES]))
                        .force("x", d3.forceX())
                        .force("y", d3.forceY())
                        .on("tick", ticked);
    
    function ticked() {
        counter++;
        svg.selectAll("circle")
            .attr("cx", function(d) {  return CANVAS_WIDTH / 2 + d.x; })
            .attr("cy", function(d) {  return CANVAS_HEIGHT / 2 + d.y; })
            .attr("fill", BLACK_COLOR);
  
        if (counter > datasets["total"].length) { 
            // view is done loading
            // show the navigation buttons
            // $("#bottom-panel").fadeTo(BUTTON_FADE_DURATION, 1);
            // toggleInitialView();
            simulation.stop();
  
            // get circles' coordinates
            svg.selectAll("circle")
                .attr("cx", function(d, i) { 
                    xInitCircle[i] = CANVAS_WIDTH / 2 + d.x; 
                    return CANVAS_WIDTH / 2 + d.x; 
                })
                .attr("cy", function(d, i) { 
                    yInitCircle[i] = CANVAS_HEIGHT / 2 + d.y; 
                    return CANVAS_HEIGHT / 2 + d.y; });
  
            svg.selectAll("circle")
                .transition()
                .attr("fill", function(d, i) {
                        if (i >= 240 ) {
                            return "#EF3B2C";
                        } else {
                            return BLACK_COLOR;
                        }
                })
        }
    }
    
    var interval = setInterval(function () {
        var d = {
            x: 2 * Math.random() - 1,
            y: 2 * Math.random() - 1
        }; 
  
        svg.append("circle")
            .data([d])
            .attr("r", 1e-6)
            .transition()
            .ease(Math.sqrt)
            .attr("r", CIRCLE_RADIUS)
            .attr("fill", RED_COLOR);
            
        if (nodes.push(d) >= datasets["total"].length) {
            clearInterval(interval);
        };
  
        // Rebind nodes and reset speed
        simulation.nodes(nodes);
        simulation.alpha(1);
    }, 10);
};
  