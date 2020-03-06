var w = 1000, h = 450;
    
var radius = 4;
var color = {0:"#fb9a99", 1: "#404040"}
var centerScale = d3v4.scalePoint().padding(1).range([0, w]);
var centerScaleHeight = d3v4.scalePoint().padding(1).range([h/2, h/2]);
var forceStrength = 0.3;

var svg = d3v4.select("#bubbles").append("svg")
    .attr("width", w)
    .attr("height", h)

var simulation = d3v4.forceSimulation()
    .force("collide",d3v4.forceCollide( function(d){
        return d.r + 5}).iterations(16) 
    )
    .force("charge", d3v4.forceManyBody())
    .force("y", d3v4.forceY().y(h / 2))
    .force("x", d3v4.forceX().x(w / 2))

d3v4.csv("https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/data/gender-age-class-survived.csv", function(data) {

    data.forEach(function(d){
        d.r = radius;
        d.x = w / 2;
        d.y = h / 2;
    })

    var circles = svg.selectAll("circle").data(data, function(d){ return d.ID ;});
    
    var circlesEnter = circles.enter().append("circle")
        .attr("r", function(d, i){ return d.r; })
        .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
            .attr("cy", function(d, i){ return 250; })
        .style("fill", function(d, i){ return color[d.Survived]; })
        .style("stroke", function(d, i){ return color[d.Survived]; })
        .style("stroke-width", 3)
        .style("pointer-events", "all")

    circles = circles.merge(circlesEnter)
    
    function ticked() {
        circles
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; });
    }   

    simulation
        .nodes(data)
        .on("tick", ticked);

    splitBubbles('all')
    
    function splitBubbles(byVar) {
        centerScale.domain(data.map(function(d){ return d[byVar]; }));
        centerScaleHeight.domain(data.map(function(d){ return d[byVar]; }));
        
        if(byVar == "all"){
            showTitles('All', centerScale)
        } else {
            showTitles(byVar, centerScale);
        }
        
        // @v4 Reset the 'x' force to draw the bubbles to their year centers
        simulation.force('x', d3v4.forceX().strength(forceStrength).x(function(d){ 
            return centerScale(d[byVar]);
        }));
        simulation.force('y', d3v4.forceY().strength(forceStrength).y(function(d){ 
            return centerScaleHeight(d[byVar]);
        }));

        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(2).restart();
    }

    function changeTragedyDescription(byVar) {
        if(byVar == 'all' || byVar == 'Survived') {
            document.getElementById("tragedy-description").innerHTML = "Overall, 38.76% of the titanic's passengers survived";
        } else if (byVar == 'Gender') {
            document.getElementById("tragedy-description").innerHTML = "67.13% of women survived while only 23.67% of men survived the incident";
        } else if (byVar == 'Class') {
            document.getElementById("tragedy-description").innerHTML = "Based on our data, more than half (57.42%) of 1st class passengers survived while 40.27% of the 2nd class passengers survived. \
                                                                        The survival rate for 3rd class passengers and crew members were heartbreakingly low, with 25.53% and 18.84% respectively.";
        } else if (byVar == 'Age') {
            document.getElementById("tragedy-description").innerHTML = "Around 40.61% of children aged 0-15 survived, 28.76% of younger adults aged 16-30 survived, and 25.69% of older adults aged 31-45 survived. \
                                                                        People aged 46-60 has 25.69% chance of surviving and the survival rate went really low for people aged 61-75 with only 17.07%.";
        }
    }

    function showTitles(byVar, scale) {
        // Another way to do this would be to create
        // the year texts once and then just hide them.
        var titles = svg.selectAll('.title')
            .data(scale.domain());
        
        titles.enter().append('text')
            .attr('class', 'title')
                .merge(titles)
            .attr('x', function (d) { return scale(d); })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function (d) { 
                if (byVar == 'All') {
                    return byVar;
                } else if (byVar == 'Gender' || byVar == 'Age') {
                    return d;
                } else if (byVar == 'Class') {
                    if (d == 1) return '1st Class';
                    if (d == 2) return '2nd Class';
                    if (d == 3) return '3rd Class';
                    if (d == 4) return 'Crew Class';
                } else if(byVar == 'Survived') {
                    if (d == 0) return 'Perished'
                    if (d == 1) return 'Survived'
                }
            });
        titles.exit().remove() 
    }
    
    function setupButtons() {
        d3v4.selectAll('.button')
            .on('click', function () {
            
            // Remove active class from all buttons
            d3v4.selectAll('.button').classed('active', false);
            // Find the button just clicked
            var button = d3v4.select(this);

            // Set it as the active button
            button.classed('active', true);

            // Get the id of the button
            var buttonId = button.attr('id');

            // Toggle the bubble chart based on
            // the currently clicked button.
            splitBubbles(buttonId);
            changeTragedyDescription(buttonId);
            });
    }
    setupButtons()
})