var w = 1000, h = 500;
    
var radius = 4;
var color = {0:"#eb7775", 1: "#404040"}
var centerScale = d3.scalePoint().padding(1).range([0, w]);
var centerScaleHeight = d3.scalePoint().padding(1).range([h/2, h/2]);
var forceStrength = 0.3;

var svg = d3.select("#bubbles").append("svg")
    .attr("width", w)
    .attr("height", h)

var simulation = d3.forceSimulation()
    .force("collide",d3.forceCollide( function(d){
        return d.r + 5}).iterations(16) 
    )
    .force("charge", d3.forceManyBody())
    .force("y", d3.forceY().y(h / 2))
    .force("x", d3.forceX().x(w / 2))

d3.csv("https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/data/gender-age-class-survived.csv", function(data) {

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
        .style("pointer-events", "Overall")
        // .call(d3.drag()
        //         .on("start", dragstarted)
        //         .on("drag", dragged)
        //         .on("end", dragended));

    circles = circles.merge(circlesEnter)
    
    function ticked() {
        circles
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; });
    }   

    simulation
        .nodes(data)
        .on("tick", ticked);

    splitBubbles('Overall')
    
    // function dragstarted(d,i) {
    //     console.log("draggedstart")
    //     if (!d3.event.active) simulation.alpha(1).restart();
    //     d.fx = d.x;
    //     d.fy = d.y;
    // }

    // function dragged(d,i) {
    //     console.log("dragged")
    //     d.fx = d3.event.x;
    //     d.fy = d3.event.y;
    // }

    // function dragended(d,i) {
    //     console.log("draggedend")
    //     if (!d3.event.active) simulation.alphaTarget(0);
    //     d.fx = null;
    //     d.fy = null;
    //     var me = d3.select(this)
    //     console.log(me.classed("selected"))
    //     me.classed("selected", !me.classed("selected"))
        
    //     d3.selectAll("circle")
    //         .style("fill", function(d, i){ return color[d.Survived]; })
        
    //     d3.selectAll("circle.selected")
    //         .style("fill", "none")
    // } 
    
    function splitBubbles(byVar) {
        centerScale.domain(data.map(function(d){ return d[byVar]; }));
        centerScaleHeight.domain(data.map(function(d){ return d[byVar]; }));
        
        if(byVar == "Overall"){
            showTitles('Overall', centerScale)
        } else {
            showTitles(byVar, centerScale);
        }
        
        // @v4 Reset the 'x' force to draw the bubbles to their year centers
        simulation.force('x', d3.forceX().strength(forceStrength).x(function(d){ 
            return centerScale(d[byVar]);
        }));
        simulation.force('y', d3.forceY().strength(forceStrength).y(function(d){ 
            return centerScaleHeight(d[byVar]);
        }));

        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(2).restart();
    }

    function changeTragedyDescription(byVar) {
        if(byVar == 'Overall' || byVar == 'Survived') {
            document.getElementById("tragedy_description").innerHTML = "Based on our data, overall 40% of the passengers survived";
        } else if (byVar == 'Gender') {
            document.getElementById("tragedy_description").innerHTML = "Based on our data, 90% of women survived while only 30% of men survived";
        } else if (byVar == 'Class') {
            document.getElementById("tragedy_description").innerHTML = "Based on our data, class";
        } else if (byVar == 'Age') {
            document.getElementById("tragedy_description").innerHTML = "Based on our data, overall 40% of the passengers survived";
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
                if (byVar == 'Overall') {
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
        d3.selectAll('.button')
            .on('click', function () {
            
            // Remove active class from Overall buttons
            d3.selectAll('.button').classed('active', false);
            // Find the button just clicked
            var button = d3.select(this);

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