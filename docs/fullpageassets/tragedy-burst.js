"use strict";
(function () {
    // Generic global fields
    var datasets = {
        "total": null,
        "age": null,
        "education": null,
        "intent": null,
        "race": null,
        "place": null,
        "gender": null
    }

    // Canvas object and dimensions
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
    var RED_COLOR = "#710606";
    var BLACK_COLOR = "#353238";
    var ORANGE_COLOR = "#FF715B";
    var PINK_COLOR = "#DD7A92";
    var LABEL_SIZE = "1.45em";

    window.onload = function () {
        loadInitialData();
    };

    var loadInitialData = function () {
        d3v4.csv("https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/data/per10.csv", function(error, data) {
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
    
    // Initial visualization, WIP
    var generateInitialViz = function() {
        svg = d3v4.select("#canvas")
                    .append("svg")
                    .attr("width", CANVAS_WIDTH)
                    .attr("height", CANVAS_HEIGHT)
                    .attr("class", "svg-canvas");
        svg.selectAll("text").remove();

        var format = d3v4.format(",d");
        d3v4.select("#counter-label")
          .transition()
          .duration(COUNTER_DURATION)
          .tween("text", function () {
            var that = d3v4.select(this),
                i = d3v4.interpolateNumber(that.text().replace(/,/g, ""), totalCount);
            return function (t) { that.text(format(i(t))); };
          });

        var nodes = [];
        var counter = 0;

        var simulation = d3v4.forceSimulation(nodes)
                            .force("charge", d3v4.forceManyBody().strength([CHARGE_BETWEEN_CIRCLES]))
                            .force("x", d3v4.forceX())
                            .force("y", d3v4.forceY())
                            .on("tick", ticked);
        
        function ticked() {
            counter++;
            svg.selectAll("circle")
                .attr("cx", function(d) {  return CANVAS_WIDTH / 2 + d.x; })
                .attr("cy", function(d) {  return CANVAS_HEIGHT / 2 + d.y; })
                .attr("fill", BLACK_COLOR);
            
            if (counter > datasets["total"].length - 100) {
                $('#blob-explanation h5').fadeTo(250, 1);
            }
            if (counter > datasets["total"].length) { 
                // view is done loading
                // show the navigation buttons
                simulation.stop();
                

                svg.selectAll("circle")
                   .transition()
                   .attr("fill", function(d, i) {
                        if (i >= 98 ) {
                            return "#EF3B2C";
                        } else {
                            return BLACK_COLOR;
                        }
                   })

                // get circles' coordinates
                svg.selectAll("circle")
                    .attr("cx", function(d, i) { 
                        xInitCircle[i] = CANVAS_WIDTH / 2 + d.x; 
                        return CANVAS_WIDTH / 2 + d.x; 
                    })
                    .attr("cy", function(d, i) { 
                        yInitCircle[i] = CANVAS_HEIGHT / 2 + d.y; 
                        return CANVAS_HEIGHT / 2 + d.y; });

            }
        }
        
        var interval = setInterval(function () {
            console.log("inteval")
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
                
            if (nodes.push(d) >= 200) {
                clearInterval(interval);
            };

            // Rebind nodes and reset speed
            simulation.nodes(nodes);
            simulation.alpha(1);
        }, 10);
    };

    var resetInitialViz = function() {
        svg.selectAll("circle")
            .data(datasets["total"])
            .transition()
            .duration(FILTER_DURATION)
            .style("fill", "black")
            .attr("cx", function (d, i) { return xInitCircle[i]; })
            .attr("cy", function(d, i) { return yInitCircle[i]; });

        svg.selectAll("text").remove();
    }

    // Brings up the filter view
    var toggleFilterView = function() {
        $("#reset-button").prop("disabled", false);
        $("#counter-header").fadeOut();
    }
}());