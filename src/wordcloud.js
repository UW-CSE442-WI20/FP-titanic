{/* <script src="./d3cloud.js"></script>   */}

var margin = {top: 20, right: 20, bottom: 40, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


d3.csv("https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/src/testdata.csv", function(error, data) {

  var categories = d3.keys(d3.nest().key(function(d) { return d.Count; }).map(data));
  // var color = d3.scale.ordinal().range(["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"]);
  var color = d3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            // .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
            .range(["#222", "#333", "#444","#555", "#666", "#777", "#888","#999" , "#aaa", "#bbb","#ccc", "#ddd"]);
  var fontSize = d3.scale.pow().exponent(8).domain([0,100]).range([10,100]);

  var layout = d3.layout.cloud()
      .timeInterval(10)
      .size([width, height])
      .words(data)
      .rotate(function(d) { return 0; })
      .font('monospace')
      .fontSize(function(d,i) { return fontSize(d.Count); })
      .text(function(d) { return d.password; })
      .spiral("archimedean")
      .on("end", draw)
      .start();

  var svg = d3.select('#wordcloud').append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var wordcloud = svg.append("g")
      .attr('class','wordcloud')
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

  svg.append("g")
    //   .attr("class", "x axis")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxis)
    .selectAll('text')
      .style('font-size','20px')
      .style('fill',function(d, i) { return color(i); })
      .style('font','sans-serif');
    
   console.log("svg append")

  function draw(words) {
    wordcloud.selectAll("text")
        .data(words)
      .enter().append("text")
        .attr('class','word')
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", function(d) { return d.font; })
        .style("fill", function(d, i) { return color(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) { return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"; })
        .text(function(d) { return d.text; });
  };

  console.log("svg draw")

});
