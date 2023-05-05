var w = 300;
var h = 300;
var padding = 15;
var dataset = [ 
    { apples: 5, oranges: 10, grapes: 22 }, 
    { apples: 4, oranges: 12, grapes: 28 }, 
    { apples: 2, oranges: 19, grapes: 32 }, 
    { apples: 7, oranges: 23, grapes: 35 }, 
    { apples: 23, oranges: 17, grapes: 43 } 
    ]; 
var yScale = d3.scaleLinear()
    .domain([0,d3.max(dataset,function(d){
     return d.apples + d.oranges + d.grapes;
    })
 ])
     .range([h,0]);

var xScale = d3.scaleBand()
 .domain(d3.range(dataset.length))
 .rangeRound([padding,w])
 .paddingInner(0.05);

var color = d3.scaleOrdinal(d3.schemeCategory10);
//to generate stacked chart, we need organise them by categories
var stack = d3.stack()
              .keys(["apples","oranges","grapes",]);
var series = stack(dataset); //generate series that holds the array in a format that adds each category to the next
var svg = d3.select("body")
            .append("svg")
            .attr("width",w)
            .attr("height",h);
var groups = svg.selectAll("g") //bind the data to a group set we use series not dataset
                .data(series)
                .enter()
                .append("g")
                .style("fill",function(d,i){
                    return color (i);
                })
//draw rect
var rects = groups.selectAll("rect")
                  .data(function(d){return d;})
                  .enter()
                  .append("rect")
                  .attr("x",function(d,i){
                    return xScale(i);
                  })
                  .attr("y",function(d,i){
                    return yScale(d[1]);
                  })
                  .attr("height", function(d){
                    return yScale(d[0])-yScale(d[1]);
                  })
                  .attr("width",xScale.bandwidth());
