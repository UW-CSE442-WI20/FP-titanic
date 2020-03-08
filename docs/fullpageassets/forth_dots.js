
function drawDonut() {

    // total passengers
    var data = {
        "total": [
            { "title": "Survived", "count": "712", "total": "2477", "color": "#353238" },
            { "title": "Perlished", "count": "1765", "total": "2477", "color": "#fb9a99" }
        ],
        "1stClass": [
            { "title": "Survived", "count": "201", "total": "350", "color": "#353238" },
            { "title": "Perlished", "count": "149", "total": "350", "color": "#fb9a99" }
        ],
        "2ndClass": [
            { "title": "Survived", "count": "118", "total": "293", "color": "#353238" },
            { "title": "Perlished", "count": "175", "total": "293", "color": "#fb9a99" }
        ],
        "3rdClass": [
            { "title": "Survived", "count": "181", "total": "709", "color": "#353238" },
            { "title": "Perlished", "count": "528", "total": "709", "color": "#fb9a99" }
        ],
        "crew": [
            { "title": "Survived", "count": "212", "total": "1125", "color": "#353238" },
            { "title": "Perlished", "count": "913", "total": "1125", "color": "#fb9a99" }
        ]
    };

    var radius = 200;
    const width = 540;
    const height = 540;

    const svg4 = d3.select("#forth-area")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pieForth = d3.pie()
        .value(d => d.count)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(radius * 0.7)
        .outerRadius(radius);

    const arcOver = d3.arc()
        .innerRadius(radius * 0.7)
        .outerRadius(radius * 1.08);

    function type(d) {
        d.total = Number(d.total);
        d.passenger = Number(d.passenger);
        d.crew = Number(d.crew);
        return d;
    }

    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return (t) => arc(i(t));
    }

    d3.selectAll("input")
        .on("change", update);

    function update(val = this.value) {
        // Join new data
        const donuts = svg4.selectAll("path")
            .data(pieForth(data[val]));

        // Update existing arcs
        donuts.transition().duration(200).attrTween("d", arcTween);

        // Enter new arcs
        donuts.enter().append("path")
            .attr("d", arc)
            .attr("stroke", "white")
            .attr("stroke-width", "6px")
            .each(function (d) { this._current = d; })
            .attr("fill", function (d) { return d.data.color; })
            .on("mouseover", function (d) {
                var curr_title = d.data.title;
                var curr_val = d.data.count;
                console.log(d.data.title + "  " + d.data.count)

                d3.select(this).transition()
                    .duration(300)
                    .attr("d", arcOver);

                donuts.select(".value")
                    .text(function (d) {
                        console.log("INSIDE" + d.data.title + "  " + d.data.count)
                        return curr_val + " passengers";
                    });

                donuts.select(".percentage")
                    .text(function (d) {
                        console.log("INSIDE" + d.data.title + "  " + d.data.count)

                        return (curr_val / d.data.total * 100).toFixed(2) + '%';
                    });
            })
            .on("mouseout", function (d) {
                d3.select(this).transition()
                    .duration(300)
                    .ease('bounce')
                    .attr("d", arc);

                donuts.select(".value")
                    .text(function (d) {
                        return d.data.total + " passengers";
                    });

                donuts.select(".percentage")
                    .text(function (d) {
                        return "";
                    });
            });

        // center
        donuts.append("svg:circle")
            .attr("r", radius * 0.6)
            .style("fill", "#E7E7E7");

        // center text
        donuts.append('text')
            .attr('class', 'center-txt type')
            .attr('y', radius * -0.12)
            .attr('text-anchor', 'middle')
            .style('font-weight', 'bold')
            .text(function (d) {
                return "Total Passenger";
            });

        donuts.append('text')
            .attr('class', 'center-txt value')
            .attr('y', radius * 0.02)
            .attr('text-anchor', 'middle')
            .text(function (d) {
                return d.data.total + " passengers";
            });

        donuts.append('text')
            .attr('class', 'center-txt percentage')
            .attr('y', radius * 0.3)
            .attr('font-size', '40px')
            .attr('text-anchor', 'middle');

        // again rebind for legend
        var legendG = svg4.selectAll(".legend") // note appending it to mySvg and not svg to make positioning easier
            .data(pieForth(data[val]))
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + (width - 200) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
            })
            .attr("class", "legend");

        legendG.append("rect") // make a matching color rect
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", function (d, i) {
                return d.data.color;
            });

        legendG.append("text") // add the text
            .text(function (d) {
                return d.data.title;
            })
            .style("font-size", 12)
            .attr("y", 10)
            .attr("x", 15);
    }
    update("total");
}

drawDonut();