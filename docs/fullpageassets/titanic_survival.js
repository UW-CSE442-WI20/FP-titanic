var titanic_final = [{
    "id": 0,
    "disp": "Hint",
    "desc_hover": "3 clicks are enough for 100% survival rate",
    "color_hover": "#FFFF82",
    "color_click": "#FFFF58",
    "clicked": 0,
    "on_click_remove": [],
    "range": [0]
}, {
    "id": 1,
    "disp": "Female",
    "query_string": "person.sex === 'female'",
    "desc_hover": "Female Passengers",
    "color_hover": "#3282b8",
    "color_click": "#3282b8",
    "clicked": 0,
    "on_click_remove": [2],
    "range": [1, 2]
}, {
    "id": 2,
    "disp": "Male",
    "query_string": "person.sex === 'male'",
    "desc_hover": "Male Passengers",
    "color_hover": "#0f4c75",
    "color_click": "#0f4c75",
    "clicked": 0,
    "on_click_remove": [1],
    "range": [1, 2]
}, {
    "id": 3,
    "disp": "Class 1",
    "query_string": "person.pclass === '1'",
    "desc_hover": "1st Class Passengers",
        "color_hover": "#c4bbf0",
        "color_click": "#c4bbf0",
    "clicked": 0,
    "on_click_remove": [4, 5],
    "range": [3, 4, 5]
}, {
    "id": 4,
    "disp": "Class 2",
    "query_string": "person.pclass === '2'",
    "desc_hover": "2nd Class Passengers",
        "color_hover": "#927fbf",
        "color_click": "#927fbf",
    "clicked": 0,
    "on_click_remove": [3, 5],
    "range": [3, 4, 5]
}, {
    "id": 5,
    "disp": "Class 3",
    "query_string": "person.pclass === '3'",
    "desc_hover": "3rd Class Passengers",
        "color_hover": "#4f3b78",
        "color_click": "#4f3b78",
    "clicked": 0,
    "on_click_remove": [3, 4],
    "range": [3, 4, 5]
}, {
    "id": 6,
    "disp": "0-21",
    "query_string": "person.age >= '0' && person.age <= '21'",
    "desc_hover": "Passengers below 21 years old",
        "color_hover": "#bad8b6",
        "color_click": "#bad8b6",
    "clicked": 0,
    "on_click_remove": [7, 8, 9],
    "range": [6, 7, 8, 9]
}, {
    "id": 7,
    "disp": "22-45",
    "query_string": "person.age >= '22' && person.age <= '45'",
    "desc_hover": "Passengers between 22-45 years old",
        "color_hover": "#92b88e",
        "color_click": "#92b88e",
    "clicked": 0,
    "on_click_remove": [6, 8, 9],
    "range": [6, 7, 8, 9]
}, {
    "id": 8,
    "disp": "46-60",
    "query_string": "person.age >= '46' && person.age <= '60'",
    "desc_hover": "Passengers between 46-60 years old",
    "desc_click": "",
        "color_hover": "#82a47e",
        "color_click": "#82a47e",
    "clicked": 0,
    "on_click_remove": [6, 7, 9],
    "range": [6, 7, 8, 9]
}, {
    "id": 9,
    "disp": "61-80",
    "query_string": "person.age >= '61' && person.age <= '80'",
    "desc_hover": "Passengers between 61-80 years old",
        "color_hover": "#728f6e",
        "color_click": "#728f6e",
    "clicked": 0,
    "on_click_remove": [6, 7, 8],
    "range": [6, 7, 8, 9]
}, {
    "id": 10,
    "disp": "No SibSpo",
    "query_string": "person.sibsp === '0'",
    "desc_hover": "No siblings or spouse aboard",
    "color_hover": "#FF9A9A",
    "color_click": "#F04949",
    "clicked": 0,
    "on_click_remove": [11, 12],
    "range": [10, 11, 12]
}, {
    "id": 11,
    "disp": "1 SibSpo",
    "query_string": "person.sibsp === '1'",
    "desc_hover": "Sibling or spouse aboard",
    "color_hover": "#FF9A9A",
    "color_click": "#F04949",
    "clicked": 0,
    "on_click_remove": [10, 12],
    "range": [10, 11, 12]
}, {
    "id": 12,
    "disp": ">= 2 SibSpo",
    "query_string": "person.sibsp >= '2'",
    "desc_hover": "Both sibling(s) and spouse aboard",
    "color_hover": "#FF9A9A",
    "color_click": "#F04949",
    "clicked": 0,
    "on_click_remove": [10, 11],
    "range": [10, 11, 12]
}, {
    "id": 13,
    "disp": "No ParChild",
    "query_string": "person.parch === '0'",
    "desc_hover": "No parent or children aboard",
        "color_hover": "#F1DBF5",
        "color_click": "#D8AADF",
    "clicked": 0,
    "on_click_remove": [14, 15],
    "range": [13, 14, 15]
}, {
    "id": 14,
    "disp": "1 ParChild",
    "query_string": "person.parch === '1'",
    "desc_hover": "1 parent or children aboard",
        "color_hover": "#F1DBF5",
        "color_click": "#D8AADF",
    "clicked": 0,
    "on_click_remove": [13, 15],
    "range": [13, 14, 15]
}, {
    "id": 15,
    "disp": "2+ ParChild",
    "query_string": "person.parch >= '2'",
    "desc_hover": "2 or more parent(s) or children(s) aboard",
        "color_hover": "#F1DBF5",
        "color_click": "#D8AADF",
    "clicked": 0,
    "on_click_remove": [13, 14],
    "range": [13, 14, 15]
}];

d3.csv("https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/data/titanic_survival.csv", visualizer)

function visualizer(titanic_data) {
    // This function gets the 'titanic.csv' data

    function get_titanic_data(olimbo) {
        //This function gets the 'titanic.json' data

        // ### D3 chart setup ###     
        var screenWidth = window.innerWidth;

        var margin = {
            left: 20,
            top: - 20,
            right: 20,
            bottom: 20
        },
            width = Math.min(screenWidth, 700) - margin.left - margin.right,
            height = Math.min(screenWidth, 700) - margin.top - margin.bottom;

        var svg = d3.select("#survival_chart").append("svg")
            .attr("width", (width + margin.left + margin.right))
            .attr("height", (height + margin.top + margin.bottom))
            .append("g").attr("class", "wrapper")
            .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

        var arc = d3.svg.arc()
            .innerRadius(width * 0.9 / 2)
            .outerRadius(width * 0.9 / 2 + 30);

        var pie = d3.layout.pie()
            .value(function (d) {
                return 40;
            })
            .padAngle(.01)
            .sort(null);

        // control variable, tracks whether user finds 100% survival rate
        var hundred = 0;

        function inner_donut(results) {
            //This function displays another donut chart inside the outer one

            //Append the survival rate to the page
            var result = 0;

            results.forEach(function (d) {
                if (d.disp === "Survived")
                    result = d.percent;
            });

            function fill_color(result) {
                if (result <= 55) return "#92D288";
                else if (result <= 80) return "#47A447";
                else return "#116F31";
            }

            svg.append("text")
                .attr("class", "mid-percent")
                .attr("text-anchor", "middle")
                .attr("dy", -45)
                .style("fill", fill_color(result))
                .text(result + " %");

            svg.append("text")
                .attr("class", "mid-text")
                .attr("text-anchor", "middle")
                .attr("dy", 0)
                .style("fill", fill_color(result))
                .text("of the selected passengers survived");

            // Help user find the max survival ratio by giving some hints according to their rate
            var hint = ["", "Have you tried adding 'Female' and 'Class 1' ?", "Try more features, you will find the 100% soon", "Great job! So close to 100%. Have you tried adding '1 ParChild'?", "Well Done!"];

            svg.append("text")
                .attr("class", "mid-hint")
                .attr("text-anchor", "middle")
                .attr("dy", 30)
                .text(function () {
                    if (hundred === 0) {
                        if (result <= 55) return hint[1];
                        else if (result <= 80) return hint[2];
                        else if (result <= 99) return hint[3];
                        else return hint[4];
                    } else
                        return hint[0];
                });

            // If user finds the 100% survival ratio, don'show hints anymore
            if (result === "100.00") hundred = 1;
            debugger;

            // Add a visual representation of the percent number. 
            //In this case add another donut chart that actually shows the percents in graph
            var inner_arc = d3.svg.arc()
                .innerRadius(width * 0.9 / 2.5)
                .outerRadius(width * 0.9 / 2.5 + 30);

            var inner_pie = d3.layout.pie()
                .sort(null)
                .value(function (d) {
                    return d.freq;
                });

            svg.selectAll(".inner-arc")
                .data(inner_pie(results))
                .enter().append("path")
                .attr("class", "inner-arc")
                .attr("id", function (d, i) {
                    return "innerArc_" + i;
                })
                .attr("d", inner_arc)
                .style("fill", function (d) {
                    if (d.data.disp === "Survived") return fill_color(result);
                    else return "#bd6666";
                });

            svg.selectAll(".inner-text")
                .data(results)
                .enter().append("text")
                .attr("class", "inner-text")
                .attr("x", 150) //Move the text from the start angle of the arc
                .attr("dy", 25) //Move the text down
                .append("textPath")
                .attr("xlink:href", function (d, i) {
                    return "#innerArc_" + i;
                })
                .text(function (d) {
                    return d.disp;
                });
        }

        function calculate_percent(titanic_data, titanic) {
            // This function calculates the survival rate and appends the percent to the page

            var query_string_survived = "person.survived === '1'",
                query_string_total = "";

            // Find all clicked items and calculate the survival rate
            for (var i = 0; i < titanic.length; i++) {
                if (titanic[i].clicked === 1) {
                    query_string_survived += " && " + titanic[i].query_string;
                    query_string_total += " && " + titanic[i].query_string;
                }
            }
            query_string_total = query_string_total.slice(4, query_string_total.length);

            var survived = 0,
                total = 0;

            titanic_data.forEach(function (person) {
                // eval() is only used in "Read–eval–print" loop as Google style guide stated
                if (eval(query_string_survived))
                    survived += 1;
                if (eval(query_string_total))
                    total += 1;
            });
            console.log(total)
            if (total !== 0) {

                var percent = (survived / total) * 100;
                percent = percent.toFixed(2);

                inner_donut([{ "disp": "Survived", "freq": survived, "percent": percent },
                { "disp": "Died", "freq": total - survived, "percent": 1 - percent }]);
            } else {
                inner_donut([{ "disp": "Survived", "freq": survived, "percent": 0 },
                { "disp": "Died", "freq": total - survived, "percent": 0 }]);
            }
        }

        function id_finder(titanic, i) {
            // This function finds the id of the given object in 'titanic'

            for (var j = 0; j < titanic.length; j += 1) {
                if (titanic[j]["id"] === i)
                    return j;
            }
        }

        function update_elements(d, titanic, type) {
            // If user clicks on an item, this function handles feature additions and deletions by 

            // If user clicks on a focused item, remove focus and update the chart
            if (type === "add") {
                d.clicked = 0;
                d3.select(".mid-percent").remove();
                d3.select(".mid-text").remove();
                d3.select(".mid-hint").remove();

                d3.selectAll(".inner-arc").remove();
                d3.selectAll(".inner-text").remove();

                var ix = id_finder(titanic, d["id"]);
                var features = [];

                d.range.forEach(function (i) {
                    features.push(olimbo[i]);
                });
                titanic.splice(ix, 1);
                for (var j = features.length - 1; j >= 0; j--) {
                    titanic.splice(ix, 0, features[j]);
                }

                // If user clicks on an item, focus on it and delete the necessary things
            } else {

                // If user wants some hint, show the necessary things for a while and then remove its focus
                if (d["id"] === 0) {
                    svg.append("text")
                        .attr("class", "best-text")
                        .attr("text-anchor", "middle")
                        .attr("dy", -130)
                        .text("Try Women, Children And Upper-class")
                        .transition()
                        .duration(4000)
                        .style("opacity", 0)
                        .remove();
                    d.clicked = 0;
                }
                d3.select(".text-hover").remove();
                d3.select(".mid-percent").remove();
                d3.select(".mid-text").remove();
                d3.select(".mid-hint").remove();

                d3.selectAll(".inner-arc").remove();
                d3.selectAll(".inner-text").remove();

                d.on_click_remove.forEach(function (i) {
                    titanic.splice(id_finder(titanic, i), 1);
                });
            }
            d3.selectAll(".listArc").remove();
            d3.selectAll(".listText").remove();
            update_donut(titanic);
            calculate_percent(titanic_data, titanic);
        }

        function update_donut(titanic) {
            // This function draws and updates the chart

            // First append some arcs and paths
            svg.selectAll(".listArc")
                .data(pie(titanic))
                .enter().append("path")
                .attr("class", "listArc")
                .attr("id", function (d) {
                    return "listArc_" + d.data.id;
                })
                .attr("d", arc)
                .style("fill", function (d) {
                    if (d.data.clicked === 1)
                        return d.data.color_click
                })
                // If user hovers on an arc, show its explanation
                .on("mouseover", function (d) {
                    if (d.data.clicked === 0) {
                        d3.select(this).style("fill", d.data.color_hover);
                        svg.append("text")
                            .attr("class", "text-hover")
                            .attr("text-anchor", "middle")
                            .attr("dy", 95)
                            .text(d.data.desc_hover);
                    }
                })
                .on("mouseout", function (d) {
                    if (d.data.clicked === 0) {
                        d3.select(this).style("fill", "white");
                        d3.select(".text-hover").remove();
                    }
                })
                .on("click", function (d) {
                    if (d.data.clicked === 0) {
                        d.data.clicked = 1;
                        d3.select(this)
                            .style("fill", d.data.color_click);
                        update_elements(d.data, titanic, "remove");
                    } else {
                        update_elements(d.data, titanic, "add");
                    }
                });

            // Append some text insede arcs and bound these texts to paths
            svg.selectAll(".listText")
                .data(titanic)
                .enter().append("text")
                .attr("class", "listText")
                .attr("x", 11) //Move the text from the start angle of the arc
                .attr("dy", 24) //Move the text down
                .append("textPath")
                .attr("xlink:href", function (d) {
                    return "#listArc_" + d.id;
                })
                .text(function (d) {
                    return d.disp;
                })
                // If user hovers on a text, show its explanation
                .on("mouseover", function (d) {
                    if (d.clicked === 0) {
                        d3.select(d3.select(this).attr("href")).style("fill", d.color_hover);
                        svg.append("text")
                            .attr("class", "text-hover")
                            .attr("text-anchor", "middle")
                            .attr("dy", 95)
                            .text(d.desc_hover);
                    }
                })
                .on("mouseout", function (d) {
                    if (d.clicked === 0) {
                        d3.select(d3.select(this).attr("href")).style("fill", "white");
                        d3.select(".text-hover").remove();
                    }
                })
                .on("click", function (d) {
                    if (d.clicked === 0) {
                        d.clicked = 1;
                        d3.select(d3.select(this).attr("href"))
                            .style("fill", d.color_click);
                        update_elements(d, titanic, "remove");
                    } else {
                        update_elements(d, titanic, "add");
                    }
                });
        }

        // Make a deep copy of olimbo so that these 2 will refer to different objects
        var titanic = JSON.parse(JSON.stringify(olimbo));

        update_donut(titanic);
    }

    // Get the chart data
    get_titanic_data(titanic_final);
}