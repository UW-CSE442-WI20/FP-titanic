var scrollVis = function (rawData) {
    // define constants (proportions copied from JV)
    var width = 600;
    var left_right_margin = 30;
    var top_bottom_margin = 60;
    var height = 600;
    var format = d3v4.format(".0%");
  
    // define scroll index tracking vars - JV
    // var lastIndex = -1;
    // var activeIndex = 0;
  
    // define scales - one set of scales for all charts.
    var x0_scale = d3v4.scaleBand().padding(0.1).range([0, width-(left_right_margin*2)]);
    var x1_scale = d3v4.scaleLinear();
    var y_scale = d3v4.scaleLinear().range([height - (top_bottom_margin*2),0]);
  
    // define colours
    //all_colours - used during 1st section when survival rates not needed variable == "both".
    var all_colours = { Men: '#1f78b4', Women: '#a6cee3',all:"grey", passenger:"green", crew: "blue",
    "0 - 15":"#addd8e","15 - 30":"#78c679","30 - 45":"#41ab5d","45 - 70":"#238443",">= 70":"#005a32",
    "1st Class": "#9e9ac8", "2nd Class":"#756bb1","3rd Class":"#54278f"};
  
    //survival colours - used during 2nd section when looking at survival rates.
    var crew_colours = { Men: '#054a78', Women: '#558dab', all: "3#e4142",
    "0 - 15":"#5e8c41","15 - 30":"#3b943d","30 - 45":"#1f8239","45 - 70":"#0b5e27",">= 70":"#01331d", "Crew Class":"#2a0c52"};
    
    var survival_colours = {0:"#fb9a99", 1: "#404040"}
  
    // define functions for the current scroll setting - inherited from JV
    var activateFunctions = [];
    //define data object and svg.
    var vis_data = {};
    // var svg = ""
    
  
    // vis_data = convert_data(rawData);
    // console.log("visdata")
    console.log("svg")
    var chart = function() {
      vis_data = convert_data(rawData);
      console.log("visdata")

      // graph 1
      var svg1 = d3v4.select("#vis").append("svg")
              .attr('width', width)
              .attr('height', height);
      draw_dots(svg1, "all","both",500);

      // graph 2
      var svg2 = d3v4.select("#secondvis").append("svg")
              .attr('width', width)
              .attr('height', height);
      draw_dots(svg2, "sex","both",500);

      // graph 2
      var svg3 = d3v4.select("#thirdvis").append("svg")
              .attr('width', width)
              .attr('height', height);
      draw_dots(svg3, "age","both",500);

      // graph 2
      var svg4 = d3v4.select("#forthvis").append("svg")
              .attr('width', width)
              .attr('height', height);
      draw_dots(svg4, "p_class","both",2000);
    }
    

    //initialise chart - function inherited from JV, content not.
    // var chart = function (selection) {
  
    //   selection.each(function (rawData) {
    //     //define svg.
    //     svg = d3v4.select("#vis").append("svg")
    //                          .attr('width', width)
    //                          .attr('height', height);
    //     // perform preprocessing on raw data - comments on logic below
    //     vis_data = convert_data(rawData);
    //     // single_elements(vis_data); //draw elements that are not data dependent.
    //     // set_up_sections(vis_data);
    //     draw_dots("all","both",500);
    //   });
  
    // };
    // chart.update = function() {
    //   console.log("chart update")
    //   draw_dots("all","both",500);
    // }

    var draw_dots = function (svg, data_class, fill_type, transition){
      console.log("entering draw dots")
      //define data - empty if none (ie first scroll index).
      if(data_class == "none"){
          var my_data = [];
      } else {
          var my_data = vis_data[data_class];
      }
      //reset scale domains and x1_scale range.
      x0_scale.domain(d3v4.set(my_data,function(d){return d[data_class]}).values());
      x1_scale.domain([0,d3v4.max(my_data,function(d){return d.column})+1]).range([0, x0_scale.bandwidth()]);
      y_scale.domain([0,115]);
      //set radius
      var my_radius = 2;
      //data,exit,enter and merge for bar labels
      var bar_group = svg.selectAll(".labels_group")
                          .data(x0_scale.domain(),function(d){return d});

      console.log("draw dots")
      bar_group.exit().remove();
      //enter new groups
      var enter = bar_group.enter()
                          .append("g")
                          .attr("class","labels_group")
      //append rectangles to new group
      enter.append("text").attr("class","bar_text")
      //merge and remove
      bar_group = bar_group.merge(enter);
      //set for bar text attributes
      bar_group.select(".bar_text")
              .attr("visibility","hidden") //hidden initially
              .attr("x",function(d){ return x0_scale(d) + (x0_scale.bandwidth()*0.45)})
              .attr("y",function(d){return y_scale(d3v4.max(my_data,function(m){if(m[data_class]==d){return m.row}})) - 15})
              .attr("fill",function(d){ //fill dependent on whether survival is being shown.
                  if(fill_type == "both"){
                  return all_colours[d]
                  } else {
                  return survival_colours[1] //if survival, show 'Survived' colour as text = survived %
              }})
              .text(function(d){
                  //number of passengers in this group.
                  var group_count = my_data.filter(function(m){if(m[data_class]==d){return m}}).length;
                  if(fill_type == "both"){
                  return group_count //if no survival, show no of passengers.
                  } else {
                  //otherwise, calculate the passengers who survived and show survival rate - format defined on line 9
                  var survival_count =  my_data.filter(function(m){if(m[data_class]==d && m.survived == 1){return m}}).length;
                  return format(survival_count/group_count)
                  }
                  })
              .attr("transform","translate(" + left_right_margin + "," + top_bottom_margin + ")")
              .transition()
              .delay(transition*1.2)
              .attr("visibility","visible") //now that the dots and text have moved, make text visible.

      //repeat data,exit,enter and merge for dots
      var dot_group = svg.selectAll(".dots_group")
                          .data(my_data);

      dot_group.exit().remove();
      //enter new groups
      var enter = dot_group.enter()
                          .append("g")
                          .attr("class","dots_group")
      //append rectangles to new group
      enter.append("circle").attr("class","circle_dot")
      //merge and remove
      dot_group = dot_group.merge(enter);
      //define circle dot attributes
      dot_group.select(".circle_dot")
              // .transition()
              // .duration(transition)
              .attr("cx",function(d){return (x0_scale(d[data_class])) + x1_scale(d.column)})
              .attr("cy",function(d){return y_scale(d.row)})
              .attr("fill",function(d){ //different fill depending on whether survived is shown (see above)
              //   if(fill_type == "both"){
              //     return all_colours[d[data_class]]
              //   } else {
              //     return survival_colours[d.survived]
              // }
              if(d.passenger == 1) {
                  return all_colours[d[data_class]]
              } else {
                  return crew_colours[d[data_class]]
              }})
              .attr("r",my_radius)
              .attr("transform","translate(" + left_right_margin + "," + top_bottom_margin + ")");
              

      // Case when passenger is chosen
      d3v4.selectAll("#passenger").on("click", function() {
          dot_group.select(".circle_dot")
              // .transition()
              // .duration(transition)            
              .attr("fill",function(d){ //different fill depending on whether survived is shown (see above)
              if(d.passenger == 1) {
                  return "orange"
              } else {
                  return "grey"
              }})

          bar_group.select(".bar_text")
                  .transition()
                  .delay(transition*0.1)
                  .attr("fill",function(d){ //fill dependent on whether survival is being shown.
                  if(fill_type == "both"){
                      return "orange"
                  } else {
                      return survival_colours[1] //if survival, show 'Survived' colour as text = survived %
                  }})
                  .text(function(d){
                  //number of passengers in this group.
                  var group_count = my_data.filter(function(m){if(m[data_class]==d && m["passenger"] == 1){return m}}).length;
                  if(fill_type == "both"){
                      return group_count //if no survival, show no of passengers.
                  } else {
                      //otherwise, calculate the passengers who survived and show survival rate - format defined on line 9
                      var survival_count =  my_data.filter(function(m){if(m[data_class]==d && m.survived == 1){return m}}).length;
                      return format(survival_count/group_count)
                  }
                  })
              
      });

      // Case when crew is chosen
      d3v4.selectAll("#crew").on("click", function() {
          dot_group.select(".circle_dot")
              // .transition()
              // .duration(transition)
              .attr("cx",function(d){return (x0_scale(d[data_class])) + x1_scale(d.column)})
              .attr("cy",function(d){return y_scale(d.row)})
              .attr("fill",function(d){ //different fill depending on whether survived is shown (see above)
              if(d.passenger == 1) {
                  return "grey"
              } else {
                  return "orange"
              }})
              .attr("r",my_radius)
              .attr("transform","translate(" + left_right_margin + "," + top_bottom_margin + ")");

          bar_group.select(".bar_text")
                  .transition()
                  .delay(transition*0.1)
                  .attr("fill",function(d){ //fill dependent on whether survival is being shown.
                      if(fill_type == "both"){
                      return "orange"
                      } else {
                      return survival_colours[1] //if survival, show 'Survived' colour as text = survived %
                  }})
                  .text(function(d){
                      //number of passengers in this group.
                      var group_count = my_data.filter(function(m){if(m[data_class]==d && m["passenger"] == 0){return m}}).length;
                      if(fill_type == "both"){
                      return group_count //if no survival, show no of passengers.
                      } else {
                      //otherwise, calculate the passengers who survived and show survival rate - format defined on line 9
                      var survival_count =  my_data.filter(function(m){if(m[data_class]==d && m.survived == 1){return m}}).length;
                      return format(survival_count/group_count)
                      }
                      })
      });

      // Case when all are chosen
      d3v4.select("#all").on("click", function() {
          dot_group.select(".circle_dot")
              // .transition()
              // .duration(transition)
              .attr("cx",function(d){return (x0_scale(d[data_class])) + x1_scale(d.column)})
              .attr("cy",function(d){return y_scale(d.row)})
              .attr("fill",function(d){ //different fill depending on whether survived is shown (see above)
                  if(d.passenger == 1) {
                  return all_colours[d[data_class]]
                  } else {
                  return crew_colours[d[data_class]]
                  }})
              .attr("r",my_radius)
              .attr("transform","translate(" + left_right_margin + "," + top_bottom_margin + ")");
      });

      //reset x_axis
      d3v4.select(".x_axis")
          .attr("transform", "translate(" + left_right_margin + "," + ((top_bottom_margin *1.2)+ y_scale.range()[0]) + ")")
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


// load data and display
//d3v4.csv('https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/data/titanic_data.csv', display);
d3v4.csv('https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/data/clean2.csv', display);

//data functions.  returns 6 different datasets, all with 891 entries (passenger count)
//data is split into sections - ie ["male","female"], given a per_row count - ie two_per_row
//and for each sections, a dot position (row, column) is generated for each entry
//with a maximum of per_row_count in each row.

//all has only one section
//sex, age and p_class are linked to the data variables
//ch_1_2 and w_ch_1_2 are custom sections linked to my conclusions (ie children under 15 in 1st and 2nd Class v remaining passengers)


function convert_data(my_data){

  var all_per_row = 45;
  var two_per_row = 20;
  var four_per_row = 14;
  var five_per_row = 10;
  // var all_per_row = 100;
  // var two_per_row = 70;
  // var four_per_row = 30;
  // var five_per_row = 25;

  var all = get_positions(my_data,all_per_row,[]);
  var sex = get_positions(my_data,two_per_row,["Male","Female"],"Sex");
  var age = get_positions(my_data,five_per_row,[0,15,30,45,70],"Age");
  var p_class = get_positions(my_data,four_per_row,[1,2,3,4],"Pclass");
  var ch_1_2 = age_class(my_data,two_per_row);
  var w_ch_1_2 = women_children_class(my_data,two_per_row);

  return {all: all, sex: sex,age: age,p_class:p_class,ch_1_2:ch_1_2,w_ch_1_2:w_ch_1_2};

  function women_children_class(my_data,col_per_row){

    var positions = [];
    var filtered_data = my_data.filter(function(d){
      return (d.Age < 15 && d.Pclass < 4) || (d.Sex == "Female" && d.Age >= 15 && d.Pclass < 4)
    })

    positions = positions.concat(populate(filtered_data,"1st or 2nd Class women and children","",col_per_row));
    var filtered_data = my_data.filter(function(d){
      return (d.Age < 15 && d.Pclass == 4) || (d.Sex == "Female" && d.Age >= 15 && d.Pclass == 4) || (d.Sex == "Male" && d.Age >= 15)
    })
    positions = positions.concat(populate(filtered_data,"Remaining Passengers","",col_per_row))
    return positions;
  }

  function age_class(my_data,col_per_row){
    var positions = [];
    var filtered_data = my_data.filter(function(d){
      return (d.Age < 15 && d.Pclass < 4)
    })
    positions = positions.concat(populate(filtered_data,"1st or 2nd Class children","",col_per_row));
    var filtered_data = my_data.filter(function(d){
      return (d.Age < 15 && d.Pclass == 4) || (d.Age >= 15)
    })
    positions = positions.concat(populate(filtered_data,"Remaining Passengers","",col_per_row))
    return positions;
  }

  function get_positions(my_data,col_per_row,variables,field){
    console.log("Field : " + field)
    var p_class_labels = {1:"1st Class",2: "2nd Class",3:"3rd Class", 4:"Crew Class"};
    var positions = [], band = "",p_class="";
    if (variables.length == 0){
      positions = populate(my_data,"","",col_per_row);
    } else {
      for(v in variables){
        var filtered_data = my_data.filter(function(d){
          if(field !== "Age"){
             if(field == "Pclass"){
               p_class = p_class_labels[variables[v]]
             }
             return d[field] == variables[v];
          } else {
            if(+v == (variables.length-1)){
              band = ">= " + variables[v];
              return d[field] >= variables[v];
            } else {
              band = variables[v] + " - " + variables[+v+1];
              return (d[field] >= variables[v] && d[field] < variables[+v+1]);
            };
          }
          });
        positions = positions.concat(populate(filtered_data,band,p_class,col_per_row))
      }
    }
    return positions;

  }

  function populate(my_data,band,p_class,col_per_row){

    my_data = my_data.sort(function(a,b){return d3v4.descending(a.Survived, b.Survived)});
    my_data = my_data.sort(function(a,b){return d3v4.descending(b.Passenger, a.Passenger)});

    var my_row = 0, my_column = 0;
    var sex_labels = {"Male": "Men","Female": "Women"}
    var current_positions = [];
    for(d in my_data){
      if(isNaN(d) == false){
        if(my_column == col_per_row){
          my_column = 0;
          my_row += 1;
        }
        current_positions.push ({
          id: my_data[d].PassengerId,
          name: my_data[d].Name,
          row: my_row,
          column: my_column,
          survived: my_data[d].Survived,
          passenger: my_data[d].Passenger,
          age: band,
          sex: sex_labels[my_data[d].Sex],
          all: "all",
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