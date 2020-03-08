var scrollVis = function (rawData) {
    // define constants (proportions copied from JV)
    var width = 600;
    var left_right_margin = -10;
    var top_bottom_margin = 30;
    var height = 600;
    var format = d3v4.format(".0%");

    // define scales - one set of scales for all charts.
    var x0_scale = d3v4.scaleBand().padding(0.1).range([0, width - (left_right_margin * 2)]);
    var x1_scale = d3v4.scaleLinear();
    var y_scale = d3v4.scaleLinear().range([height - (top_bottom_margin * 2), 0]);

    //all_colours - used during 1st section when survival rates not needed variable == "both".
    var all_colours = {
        Men: '#1f78b4', Women: '#a6cee3', all: "grey", passenger: "green", crew: "blue",
        "0 - 15": "#addd8e", "15 - 30": "#78c679", "30 - 45": "#41ab5d", "45 - 70": "#238443", ">= 70": "#005a32",
        "1st Class": "#9e9ac8", "2nd Class": "#756bb1", "3rd Class": "#54278f"
    };

    //survival colours - used during 2nd section when looking at survival rates.
    var crew_colours = {
        Men: '#054a78', Women: '#558dab', all: "3#e4142",
        "0 - 15": "#5e8c41", "15 - 30": "#3b943d", "30 - 45": "#1f8239", "45 - 70": "#0b5e27", ">= 70": "#01331d", "Crew": "#2a0c52"
    };

    var survival_colours = { 0: "#eb7775", 1: "#404040" };

    //define data object and svg.
    var vis_data = {};
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var chart = function () {
        // vis_data = convert_data(rawData);
        // // console.log("visdata")

        // // graph 1
        // var svg = d3v4.select("#vis").append("svg")
        //     .attr('width', width + 50)
        //     .attr('height', height + 400);
        // svg.append("g").attr("class", "x_axis");
        // draw_dots(svg, "all", "both", 700, 0);

        // // graph 2
        // var svg2 = d3v4.select("#secondvis").append("svg")
        //     .attr('width', width)
        //     .attr('height', height)
        // svg2.append("g").attr("class", "x_axis");
        // draw_dots(svg2, "sex", "both", 500, 0);

        // // graph 3
        // var svg3 = d3v4.select("#thirdvis").append("svg")
        //     .attr('width', width)
        //     .attr('height', height)
        // svg3.append("g").attr("class", "x_axis");
        // draw_dots(svg3, "age", "both", 500, 0);

        // // graph 4
        // var svg4 = d3v4.select("#forthvis").append("svg")
        //     .attr('width', width)
        //     .attr('height', height)
        // svg4.append("g").attr("class", "x_axis");
        // draw_dots(svg4, "p_class", "both", 2000, 0);

        // d3v4.select("#passenger1").on("click", function () {
        //     draw_dots(svg, "all", "both", 500, 1);
        // });

        // d3v4.select("#crew1").on("click", function () {
        //     draw_dots(svg, "all", "both", 500, 2);
        // });

        // d3v4.select("#survivability1").on("click", function () {
        //     draw_dots(svg, "all", "survive", 500, 3);
        // });

        // d3v4.select("#all1").on("click", function () {
        //     draw_dots(svg, "all", "both", 500, 0);
        // });

        // d3v4.select("#passenger2").on("click", function () {
        //     draw_dots(svg2, "sex", "both", 500, 1);
        // });

        // d3v4.select("#crew2").on("click", function () {
        //     draw_dots(svg2, "sex", "both", 500, 2);
        // });

        // d3v4.select("#survivability2").on("click", function () {
        //     draw_dots(svg2, "sex", "survive", 500, 3);
        // });

        // d3v4.select("#all2").on("click", function () {
        //     draw_dots(svg2, "sex", "both", 500, 0);
        // });

        // d3v4.select("#passenger3").on("click", function () {
        //     draw_dots(svg3, "age", "both", 500, 1);
        // });

        // d3v4.select("#crew3").on("click", function () {
        //     draw_dots(svg3, "age", "both", 500, 2);
        // });

        // d3v4.select("#survivability3").on("click", function () {
        //     draw_dots(svg3, "age", "survive", 500, 3);
        // });

        // d3v4.select("#all3").on("click", function () {
        //     draw_dots(svg3, "age", "both", 500, 0);
        // });

        // d3v4.select("#survivability4").on("click", function () {
        //     draw_dots(svg4, "p_class", "survive", 500, 3);
        // });

        // d3v4.select("#all4").on("click", function () {
        //     draw_dots(svg4, "p_class", "both", 2000, 0);
        // });


        // ------------------------------ donut ---------------------------------------
        var donutData = genData();

        // var donut1 = new DonutCharts("#first-area");
        // donut1.create(donutData, 0);

        var donut4 = new DonutCharts("#forth-area2");
        donut4.create(donutData, 0);

        d3v4.select("#form4").on("change", () => {
            var buttons = d3v4.selectAll(".radio4")._groups[0]
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].checked == true) {
                    d3v4.select("#forth-area2").selectAll("svg").remove()
                    donut4 = new DonutCharts("#forth-area2");
                    if (i == 0) {
                        donut4.create(donutData, 0)
                    } else {
                        donut4.create(donutData, i + 2)
                    }
                    break;
                }
            }
        });

        // var donut2 = new DonutCharts("#second-area");
        // donut2.create(donutData, 0);

        // d3v4.select("#form2").on("change", () => {
        //     var buttons = d3v4.selectAll(".radio2")._groups[0]
        //     for (var i = 0; i < buttons.length; i++) {
        //         if (buttons[i].checked == true) {
        //             d3v4.select("second-area").selectAll("svg").remove()
        //             donut2 = new DonutCharts("#second-area");
        //             if (i == 0) {
        //                 donut2.create(donutData, 0)
        //             } else {
        //                 donut2.create(donutData, i)
        //             }
        //             break;
        //         }
        //     }
        // });

        // var donut3 = new DonutCharts("#third-area");
        // donut3.create(donutData, 0);

        // d3v4.select("#form3").on("change", () => {
        //     var buttons = d3v4.selectAll(".radio3")._groups[0]
        //     for (var i = 0; i < buttons.length; i++) {
        //         if (buttons[i].checked == true) {
        //             d3v4.select("third-area").selectAll("svg").remove()
        //             donut3 = new DonutCharts("#third-area");
        //             if (i == 0) {
        //                 donut3.create(donutData, 0)
        //             } else {
        //                 donut3.create(donutData, i + 6)
        //             }
        //             break;
        //         }
        //     }
        // });
    }

    /*
    * Returns a json-like object.
    */
    // 0: Overall
    // 1: Female
    // 2: Male
    // 3: 1st class
    // 4: 2nd class
    // 5: 3rd class
    // 6: crew class
    // 7: 0-15
    // 8: 15-30
    // 9: 31-45
    // 10: 46-60
    // 11: 61-75
    function genData() {
        var allCategories = new Array();
        var vals = [38.76, 67.13, 23.67, 57.42, 40.27, 23.53, 18.84, 40.61, 28.76, 25.69, 25.69, 17.07]
        var type = ["Overall", "Female", "Male", "1st Class", "2nd Class", "3rd Class", "Crew Class", "0-15", "15-30", "31-45", "46-60", "61-75"]

        for (var i = 0; i < vals.length; i++) {
            var category = new Array();
            var data = new Array();
            data.push({
                "cat": "Survived",
                "val": vals[i]
            });
            data.push({
                "cat": "Perished",
                "val": 100 - vals[i]
            });
            category.push({
                "type": type[i],
                "data": data,
                "total": 100
            })
            allCategories.push(category);
        }
        return allCategories;
    }

    function DonutCharts(id) {
        var charts = d3v3.select(id);

        var chart_m,
            chart_r,
            color = ['#353238', '#eb7775'];

        var getCatNames = function (dataset) {
            var catNames = new Array();

            for (var i = 0; i < dataset[0].data.length; i++) {
                catNames.push(dataset[0].data[i].cat);
            }

            return catNames;
        }

        var createLegend = function (catNames) {
            var legends = charts.select('.legend')
                .selectAll('g')
                .data(catNames)
                .enter().append('g')
                .attr('transform', function (d, i) {
                    return 'translate(' + (i * 150 + 50) + ', 10)';
                });

            legends.append('circle')
                .attr('class', 'legend-icon')
                .attr('r', 6)
                .style('fill', function (d, i) {
                    return color[i];
                });

            legends.append('text')
                .attr('dx', '1em')
                .attr('dy', '.3em')
                .text(function (d) {
                    return d;
                });
        }

        var createCenter = function () {

            var eventObj = {
                'mouseover': function (d, i) {
                    d3v3.select(this)
                        .transition()
                        .attr("r", chart_r * 0.65);
                },

                'mouseout': function (d, i) {
                    d3v3.select(this)
                        .transition()
                        .duration(500)
                        .ease('bounce')
                        .attr("r", chart_r * 0.6);
                },

                'click': function (d, i) {
                    var paths = charts.selectAll('.clicked');
                    pathAnim(paths, 0);
                    paths.classed('clicked', false);
                    resetAllCenterText();
                }
            }

            var donuts = d3v3.selectAll('.donut');

            // The circle displaying total data.
            donuts.append("svg:circle")
                .attr("r", chart_r * 0.6)
                .style("fill", "#E7E7E7")
                .on(eventObj);

            donuts.append('text')
                .attr('class', 'center-txt type')
                .attr('y', chart_r * -0.16)
                .attr('text-anchor', 'middle')
                .style('font-weight', 'bold')
                .text(function (d, i) {
                    return d.type;
                });

            donuts.append('text')
                .attr('class', 'center-txt value')
                .attr('text-anchor', 'middle');

            donuts.append('text')
                .attr('class', 'center-txt percentage')
                .attr('y', chart_r * 0.16)
                .attr('text-anchor', 'middle')
                .style('fill', '#A2A2A2');
        }

        var setCenterText = function (thisDonut) {
            var sum = d3v3.sum(thisDonut.selectAll('.clicked').data(), function (d) {
                return d.data.val;
            });

            thisDonut.select('.percentage')
                .text(function (d) {
                    return (sum) ? (sum / d.total * 100).toFixed(2) + '%'
                        : '';
                });
        }

        var resetAllCenterText = function () {
            charts.selectAll('.percentage')
                .text('');
        }

        var pathAnim = function (path, dir) {
            switch (dir) {
                case 0:
                    path.transition()
                        .duration(500)
                        .ease('bounce')
                        .attr('d', d3v3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(chart_r)
                        );
                    break;

                case 1:
                    path.transition()
                        .attr('d', d3v3.svg.arc()
                            .innerRadius(chart_r * 0.7)
                            .outerRadius(chart_r * 1.08)
                        );
                    break;
            }
        }

        var updateDonut = function () {

            var eventObj = {
                'mouseover': function (d, i, j) {
                    pathAnim(d3v3.select(this), 1);

                    var thisDonut = charts.select('.type' + j);

                    thisDonut.select('.percentage').text(function (donut_d) {
                        return (d.data.val / donut_d.total * 100).toFixed(2) + '%';
                    });
                },

                'mouseout': function (d, i, j) {
                    var thisPath = d3v3.select(this);
                    var clicked = thisPath.classed('clicked');

                    if (!clicked) {
                        pathAnim(thisPath, 0);
                    }
                    var thisDonut = charts.select('.type' + j);
                    setCenterText(thisDonut);

                    var clicked = thisPath.classed('clicked');
                },

                'click': function (d, i, j) {

                    draw_dots(svg, "all", "survive", 500, 3);

                    var thisDonut = charts.select('.type' + j);

                    if (0 === thisDonut.selectAll('.clicked')[0].length) {
                        thisDonut.select('circle').on('click')();
                    }

                    var thisPath = d3v3.select(this);
                    var clicked = thisPath.classed('clicked');
                    pathAnim(thisPath, ~~(!clicked));
                    thisPath.classed('clicked', !clicked);
                    setCenterText(thisDonut);
                }
            };

            var pie = d3v3.layout.pie()
                .sort(null)
                .value(function (d) {
                    return d.val;
                });

            var arc = d3v3.svg.arc()
                .innerRadius(chart_r * 0.7)
                .outerRadius(function () {
                    return (d3.select(this).classed('clicked')) ? chart_r * 1.08
                        : chart_r;
                });

            // Start joining data with paths
            var paths = charts.selectAll('.donut')
                .selectAll('path')
                .data(function (d, i) {
                    return pie(d.data);
                });

            paths
                .transition()
                .duration(1000)
                .attr('d', arc);

            paths.enter()
                .append('svg:path')
                .attr('d', arc)
                .style('fill', function (d, i) {
                    return color[i];
                })
                .style('stroke', '#FFFFFF')
                .on(eventObj)

            paths.exit().remove();

            resetAllCenterText();
        }

        this.create = function (dataset, i) {
            console.log(dataset[i])
            var $charts = $(id);
            // chart_m = $charts.innerWidth() / dataset[i].length / 2 * 0.04;
            // chart_r = $charts.innerWidth() / dataset[i].length / 2 * 0.5;

            chart_m = 13;
            chart_r = 162;

            // console.log("m " + chart_m)
            // console.log("r " + chart_r)

            charts.append('svg')
                .attr('class', 'legend')
                .attr('width', '100%')
                .attr('height', 50)
                .attr('transform', 'translate(0, 0)');

            var donut = charts.selectAll('.donut')
                .data(dataset[i])
                .enter().append('svg:svg')
                .attr('width', (chart_r + chart_m) * 2)
                .attr('height', (chart_r + chart_m) * 2)
                .append('svg:g')
                .attr('class', function (d, i) {
                    return 'donut type' + i;
                })
                .attr('transform', 'translate(' + (chart_r + chart_m) + ',' + (chart_r + chart_m) + ')');

            createLegend(getCatNames(dataset[i]));
            createCenter();
            updateDonut();
        }
    }

    var draw_dots = function (svg, data_class, fill_type, transition, status) {

        console.log("draw dots")

        svg.select("x_axis").attr("x_axis", x0_scale.domain())

        //define data - empty if none (ie first scroll index).
        if (data_class == "none") {
            var my_data = [];
        } else {
            var my_data = vis_data[data_class];
        }
        //reset scale domains and x1_scale range.
        x0_scale.domain(d3v4.set(my_data, function (d) { return d[data_class] }).values());
        x1_scale.domain([0, d3v4.max(my_data, function (d) { return d.column }) + 1]).range([0, x0_scale.bandwidth()]);
        y_scale.domain([0, 115]);

        //set radius
        var my_radius = 2;
        //data,exit,enter and merge for bar labels
        var bar_group = svg.selectAll(".labels_group")
            .data(x0_scale.domain(), function (d) { return d });

        bar_group.exit().remove();
        //enter new groups
        var enter = bar_group.enter()
            .append("g")
            .attr("class", "labels_group")
        //append rectangles to new group
        enter.append("text").attr("class", "bar_text").attr("visibility", "hidden")
        //merge and remove
        bar_group = bar_group.merge(enter);
        //set for bar text attributes
        bar_group.select(".bar_text")
            .attr("visibility", "hidden") //hidden initially
            .attr("x", function (d) { return x0_scale(d) + (x0_scale.bandwidth() * 0.45) })
            .attr("y", function (d) { return y_scale(d3v4.max(my_data, function (m) { if (m[data_class] == d) { return m.row } })) - 15 })
            .attr("fill", function (d) { //fill dependent on whether survival is being shown.
                if (status == 0) {
                    if (fill_type == "both") {
                        return all_colours[d]
                    } else {
                        return survival_colours[1]
                    }
                } else if (status == 1) {
                    if (fill_type == "both") {
                        return "orange"
                    } else {
                        return survival_colours[1]
                    }
                } else if (status == 2) {
                    if (fill_type == "both") {
                        return "orange"
                    } else {
                        return survival_colours[1]
                    }
                } else if (status == 3) {
                    return survival_colours[1]
                }
            })
            .text(function (d) {
                //number of passengers in this group.
                if (status == 0) {
                    var group_count = my_data.filter(function (m) { if (m[data_class] == d) { return m } }).length;
                } else if (status == 1) {
                    var group_count = my_data.filter(function (m) { if (m[data_class] == d & m["passenger"] == 1) { return m } }).length;
                } else if (status == 2) {
                    var group_count = my_data.filter(function (m) { if (m[data_class] == d & m["passenger"] == 0) { return m } }).length;
                } else if (status == 3) {
                    var group_count = my_data.filter(function (m) { if (m[data_class] == d) { return m } }).length;
                }
                if (fill_type == "both") {
                    return group_count //if no survival, show no of passengers.
                } else {
                    //otherwise, calculate the passengers who survived and show survival rate - format defined on line 9
                    var survival_count = my_data.filter(function (m) { if (m[data_class] == d && m.survived == 1) { return m } }).length;
                    return format(survival_count / group_count)
                }
            })
            .attr("transform", "translate(" + left_right_margin + "," + top_bottom_margin + ")")
            .transition()
            .attr("visibility", "visible") //now that the dots and text have moved, make text visible.

        //repeat data,exit,enter and merge for dots
        var dot_group = svg.selectAll(".dots_group")
            .data(my_data);

        dot_group.exit().remove();
        //enter new groups
        var enter = dot_group.enter()
            .append("g")
            .attr("class", "dots_group")
        //append rectangles to new group
        enter.append("circle").attr("class", "circle_dot")
        //merge and remove
        dot_group = dot_group.merge(enter);
        //define circle dot attributes
        dot_group.select(".circle_dot")
            .attr("cx", function (d) { return (x0_scale(d[data_class])) + x1_scale(d.column) })
            .attr("cy", function (d) { return y_scale(d.row) })
            .attr("fill", function (d) {
                if (status == 0) {
                    if (d.passenger == 1) {
                        return all_colours[d[data_class]]
                    } else {
                        return crew_colours[d[data_class]]
                    }
                } else if (status == 1) {
                    if (d.passenger == 1) {
                        return "orange"
                    } else {
                        return "grey"
                    }
                } else if (status == 2) {
                    if (d.passenger == 1) {
                        return "grey"
                    } else {
                        return "orange"
                    }
                } else if (status == 3) {
                    return survival_colours[d.survived]
                }
            })
            .attr("r", my_radius)
            .attr("transform", "translate(" + left_right_margin + "," + top_bottom_margin + ")")
            .on("mouseover", function (d) {
                // console.log("mouseover + " + d.name)
                d3.select(this)
                    .style("stroke-width", "1px")
                    .style("stroke", "#000");
                tooltip.style("display", "inline")
                    .transition()
                    .duration(200)
                    .style("opacity", 0.9);
                tooltip.html(d.name)
                    .style("left", (d3v4.event.pageX) + "px")
                    .style("top", (d3v4.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .style("stroke-width", "0px");
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        ;

        svg.select(".x_axis")
            .attr("transform", "translate(" + left_right_margin + "," + ((top_bottom_margin * 1.2) + y_scale.range()[0]) + ")")
            .call(d3v4.axisBottom(x0_scale));
    };

    return chart;
}

function display(data) {
    // create a new plot and
    // display it
    var plot = scrollVis(data);
    d3v4.select('#vis')
        .datum(data)
        .call(plot);
}

// // load data and display
d3v4.csv('https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/data/clean2.csv', display);

//data functions.  returns 6 different datasets, all with 891 entries (passenger count)
//data is split into sections - ie ["male","female"], given a per_row count - ie two_per_row
//and for each sections, a dot position (row, column) is generated for each entry
//with a maximum of per_row_count in each row.

//all has only one section
//sex, age and p_class are linked to the data variables
//ch_1_2 and w_ch_1_2 are custom sections linked to my conclusions (ie children under 15 in 1st and 2nd Class v remaining passengers)


function convert_data(my_data) {

    var all_per_row = 45;
    var two_per_row = 20;
    var four_per_row = 14;
    var five_per_row = 10;

    var all = get_positions(my_data, all_per_row, []);
    var sex = get_positions(my_data, two_per_row, ["Male", "Female"], "Sex");
    var age = get_positions(my_data, five_per_row, [0, 15, 30, 45, 70], "Age");
    var p_class = get_positions(my_data, four_per_row, [1, 2, 3, 4], "Pclass");
    var ch_1_2 = age_class(my_data, two_per_row);
    var w_ch_1_2 = women_children_class(my_data, two_per_row);

    return { all: all, sex: sex, age: age, p_class: p_class, ch_1_2: ch_1_2, w_ch_1_2: w_ch_1_2 };

    function women_children_class(my_data, col_per_row) {

        var positions = [];
        var filtered_data = my_data.filter(function (d) {
            return (d.Age < 15 && d.Pclass < 4) || (d.Sex == "Female" && d.Age >= 15 && d.Pclass < 4)
        })

        positions = positions.concat(populate(filtered_data, "1st or 2nd Class women and children", "", col_per_row));
        var filtered_data = my_data.filter(function (d) {
            return (d.Age < 15 && d.Pclass == 4) || (d.Sex == "Female" && d.Age >= 15 && d.Pclass == 4) || (d.Sex == "Male" && d.Age >= 15)
        })
        positions = positions.concat(populate(filtered_data, "Remaining Passengers", "", col_per_row))
        return positions;
    }

    function age_class(my_data, col_per_row) {
        var positions = [];
        var filtered_data = my_data.filter(function (d) {
            return (d.Age < 15 && d.Pclass < 4)
        })
        positions = positions.concat(populate(filtered_data, "1st or 2nd Class children", "", col_per_row));
        var filtered_data = my_data.filter(function (d) {
            return (d.Age < 15 && d.Pclass == 4) || (d.Age >= 15)
        })
        positions = positions.concat(populate(filtered_data, "Remaining Passengers", "", col_per_row))
        return positions;
    }

    function get_positions(my_data, col_per_row, variables, field) {
        // console.log("Field : " + field)
        var p_class_labels = { 1: "1st Class", 2: "2nd Class", 3: "3rd Class", 4: "Crew" };
        var positions = [], band = "", p_class = "";
        if (variables.length == 0) {
            positions = populate(my_data, "", "", col_per_row);
        } else {
            for (v in variables) {
                var filtered_data = my_data.filter(function (d) {
                    if (field !== "Age") {
                        if (field == "Pclass") {
                            p_class = p_class_labels[variables[v]]
                        }
                        return d[field] == variables[v];
                    } else {
                        if (+v == (variables.length - 1)) {
                            band = ">= " + variables[v];
                            return d[field] >= variables[v];
                        } else {
                            band = variables[v] + " - " + variables[+v + 1];
                            return (d[field] >= variables[v] && d[field] < variables[+v + 1]);
                        };
                    }
                });
                positions = positions.concat(populate(filtered_data, band, p_class, col_per_row))
            }
        }
        return positions;

    }

    function populate(my_data, band, p_class, col_per_row) {

        my_data = my_data.sort(function (a, b) { return d3v4.descending(a.Survived, b.Survived) });
        my_data = my_data.sort(function (a, b) { return d3v4.descending(b.Passenger, a.Passenger) });

        var my_row = 0, my_column = 0;
        var sex_labels = { "Male": "Men", "Female": "Women" }
        var current_positions = [];
        for (d in my_data) {
            if (isNaN(d) == false) {
                if (my_column == col_per_row) {
                    my_column = 0;
                    my_row += 1;
                }
                current_positions.push({
                    id: my_data[d].PassengerId,
                    name: my_data[d].Name,
                    row: my_row,
                    column: my_column,
                    survived: my_data[d].Survived,
                    passenger: my_data[d].Passenger,
                    age: band,
                    sex: sex_labels[my_data[d].Sex],
                    all: "number of people",
                    p_class: p_class,
                    total: my_data.length,
                    ch_1_2: band,
                    w_ch_1_2: band
                });
                my_column += 1
            }
        }
        return current_positions;

    }

}