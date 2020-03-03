/* <script src="./d3v3cloud.js"></script>   */

var mg = {top: 20, right: 20, bottom: 20, left: 500},
    width = 600 - mg.left - mg.right,
    height = 300 - mg.top - mg.bottom;

var cloudlayout = d3v3.layout.cloud()

function drawCloud() {
  d3v3.csv("https://raw.githubusercontent.com/UW-CSE442-WI20/FP-titanic/master/docs/assets/wordclouddata.csv", function(error, data) {

  var categories = d3v3.keys(d3v3.nest().key(function(d) { return d.Count; }).map(data));
  // var color = d3v3.scale.ordinal().range(["#66c2a5","#fc8d62","#8da0cb","#e78ac3","#a6d854"]);
  var color = d3v3.scale.linear()
            .domain([0,1,2,3,4,5,6,10,15,20,100])
            // .range(["#ddd", "#ccc", "#bbb", "#aaa", "#999", "#888", "#777", "#666", "#555", "#444", "#333", "#222"]);
            .range(["#222", "#333", "#444","#555", "#666", "#777", "#888","#999" , "#aaa", "#bbb","#ccc", "#ddd"]);
  var fontSize = d3v3.scale.pow().exponent(8).domain([0,100]).range([10,100]);

  // var cloudlayout = d3v3.layout.cloud()
      cloudlayout.timeInterval(10)
      .size([width, height])
      .words(data)
      .rotate(function(d) { return 0; })
      .font('monospace')
      .fontSize(function(d,i) { return fontSize(d.Count); })
      .text(function(d) { return d.password; })
      .spiral("archimedean")
      .on("end", draw)
      .start();

  var wsvg = d3v3.select('#wordcloud').append("svg")
  
      .attr("width", width + mg.left + mg.right)
      .attr("height", height + mg.top + mg.bottom)
      .append("g")
      .attr("transform", "translate(" + mg.left + "," + mg.top + ")");

  var wordcloud = wsvg.append("g")
      .attr('class','wordcloud')
      .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

  wsvg.append("g")
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
}


