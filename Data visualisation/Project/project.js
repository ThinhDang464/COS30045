//GRAPH 1: MULTI LINE CHART
var w = 1000;
var h = 500;
var padding = 55;

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

d3.csv("SyrianAsylum.csv").then(function(data) {
    data.forEach(function(d) {
        d.Year = +d.Year; //convert year and number to num
        d.number = +d.number;
    });

    var nestedData = Array.from(d3.group(data, d => d.Country));//create Map object where the keys are the country names and values are arrays containing data related tot hat country
/* how the data would look like for nestedData
[
  ["Germany", [{Year: 2016, Country: "Germany", number: 375122}, {Year: 2017, Country: "Germany", number: 496674}, ...]],
  ["Jordan", [{Year: 2016, Country: "Jordan", number: 648836}, {Year: 2017, Country: "Jordan", number: 653031}, ...]],
  ["Lebanon", [{Year: 2016, Country: "Lebanon", number: 1005503}, {Year: 2017, Country: "Lebanon", number: 992127}, ...]],
  ["Turkey", [{Year: 2016, Country: "Turkey", number: 2823987}, {Year: 2017, Country: "Turkey", number: 3424237}, ...]]
]

*/
    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.Year; }))//extent return array if minimum and maximum value
        .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.number; })])
        .range([h - padding, padding]);

    var line = d3.line()
        .x(function(d) { return xScale(d.Year); })
        .y(function(d) { return yScale(d.number); });

    var countries = svg.selectAll(".country")//class country which is currently empty
        .data(nestedData)
        .enter()
        .append("g")
        .attr("class", "country");

    countries.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d[1]); }) //d[1] is the data points of each country when passed to line()
        .style("stroke", function(d) { return d3.schemeCategory10[nestedData.indexOf(d)]; })//using the Catrgory 10 color scheme
        .style("fill", "none"); // make sure its a line, fill will become area

    var xAxis = d3.axisBottom().scale(xScale).ticks(6).tickFormat(d3.format("d"));
    var yAxis = d3.axisLeft().scale(yScale);

    svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    svg.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

    var legend = svg.selectAll(".legend")
        .data(nestedData)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + (i * 20+80) + ")"; });

    legend.append("rect")
        .attr("x", w - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d) { return d3.schemeCategory10[nestedData.indexOf(d)]; });

    legend.append("text")
        .attr("x", w - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d[0]; });
    var circles = countries.selectAll(".dot")
    /*
 The code creates a new <g> element for each year in each country, and the <circle> and
  <text> elements are appended to these <g> elements. So there will be one <g> element 
  for each year in each country, and inside each <g> element, there will be a <circle> and a 
  <text> element.
    */
        .data(function(d) { return d[1]; })
        .enter()
        .append("g")
        .attr("class", "dot")
        .attr("transform", function(d) {
            return "translate(" + xScale(d.Year) + "," + yScale(d.number) + ")";
        });
    
    circles.append("circle") //append circle for each g
        .attr("r", 5)
       //.style("fill", function(d) { return d3.schemeCategory10[nestedData.indexOf(d3.select(this.parentNode).datum())]; })
        .on("mouseover", function() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 8);
            d3.select(this.parentNode).select("text").style("display", "block");
        })
        .on("mouseout", function() {
            d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 5);
            d3.select(this.parentNode).select("text").style("display", "none");
        });
    
    circles.append("text") //append text for each g
        .text(function(d) { return d.number; })
        .attr("y", -12)
        .style("text-anchor", "middle")
        .style("display", "none"); //wont display if mouse not over circle
    var caption = d3.select("#chart")
        .append("p")
        .attr("class", "caption")
        .text("Figure 1: Syrian asylum seekers by country and year");
    
});

// GRAPH 2: BAR CHART 

// set the dimensions and margins of the graph
var width = 1000;
var height = 500;
var barpad=55;

var originalData;// used this to save the original state of data so we can have reset button later

// set the ranges
var x = d3.scaleBand().rangeRound([barpad, width - barpad]).padding(0.1);
var y = d3.scaleLinear().range([height - barpad, barpad]);

// append the svg object to the body of the page
var svg2 = d3.select("#chart2").append("svg") // assuming a new div "chart2" for this new chart
    .attr("width", width )
    .attr("height", height)
  .append("g");
   

// load the data
d3.csv("idp.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
    d.Year = +d.Year;
    d.IDPs = +d.IDPs;
  });
  originalData = JSON.parse(JSON.stringify(data)); // Deep copy

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d.IDPs; })]);

  // append the rectangles for the bar chart
  svg2.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Year); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.IDPs); })
      .attr("height", function(d) { return height - barpad- y(d.IDPs); })
      .attr("fill", "#1f77b4")
      .on("mouseover",function(event,d){ //this function takes 2 arg, event = current event,d is current dataset
        var xPosition = parseFloat(d3.select(this).attr("x")) //convert x to floating point num
        var yPosition = parseFloat(d3.select(this).attr("y"))
        svg2.append("text") //we append text to tag svg no need enter because there is no dataset to bind the text to
            .attr("id","tooltip")
            .attr("x",xPosition+(x.bandwidth()/2)-27)
            .attr("y",yPosition-2)
            .text(d.IDPs);
        d3.select(this)
            .transition()
            .attr("fill","orange");
    })
    .on("mouseout",function(event,d){
        d3.select(this)
            .transition()
            .attr("fill","#1f77b4");
        d3.select("#tooltip").remove();
    })

  // add the x Axis
  svg2.append("g")
      .attr("class","x-axis") //add class to update with sort bar later
      .attr("transform", "translate(0," + (height-55) + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg2.append("g")
      .attr("transform", "translate("+barpad+",0)")
      .call(d3.axisLeft(y));
  
  var caption = d3.select("#chart2")
        .append("p")
        .attr("class", "caption")
        .text("Figure 2: Syrian internally displaced persons (IDPs) by year");
//button 3
var sortOrder = false; // default value of sort order to ascending for first time click

d3.select("#button1")
    .on("click",function(){
        sortBars();
    });

    var sortBars = function() {
        sortOrder = !sortOrder; // toggle the sort order
    
        // sort the data
        data.sort(function(a, b) {
            if (sortOrder) {
                return d3.ascending(a.IDPs, b.IDPs);
            } else {
                return d3.descending(a.IDPs, b.IDPs);
            }
        });
    
        // update the x scale's domain
        x.domain(data.map(function(d) { return d.Year; }));
    
        // update the x axis labels
        svg2.select(".x-axis").selectAll("text")
            .data(data)
            .text(function(d) {
                return d.Year;
            });
    
        // transition the bars
        svg2.selectAll("rect")
            .transition()
            .duration(1000)
            .attr("x", function(d) {
                return x(d.Year);
            })
            .attr("y", function(d) {
                return y(d.IDPs);
            })
            .attr("height", function(d) {
                return height - barpad- y(d.IDPs);
            });
    
        // update the x axis
        svg2.select(".x-axis")
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x));
    };
d3.select("#button2")
.on("click", function() {
    data = JSON.parse(JSON.stringify(originalData)); // Deep copy
    // Now redraw the bars, exactly the same way as in sortBars()
    x.domain(data.map(function(d) { return d.Year; })); //uopdate x scale domains
    svg2.selectAll("rect")
    .transition()
    .duration(1000)
    .attr("x", function(d) {
        return x(d.Year);
    })
    .attr("y", function(d) {
        return y(d.IDPs);
    })
    .attr("height", function(d) {
        return height - barpad- y(d.IDPs);
    });
    //update x-axis
    svg2.select(".x-axis")
    .transition()
    .duration(1000)
    .call(d3.axisBottom(x));
});
});

