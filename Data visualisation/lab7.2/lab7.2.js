var w = 300;
var h = 300;
var padding = 15;

var dataset = [];//empty set

for(var i = 0; i < 10;i++){ //random dataset 1-24
    var min = 1;
    var max = 25;
    var newNumber = Math.floor(Math.random() * (max - min) + min);//from max to min inclusive
    dataset.push(newNumber);    
}

var outerRadius = w/2; //
var innerRadius = 0; //if set value will be donut shape

var arc = d3.arc() //customize size of pie chart
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
var pie = d3.pie(); //generate path for pie chart

var svg = d3.select("body")
            .append("svg")
            .attr("width",w)
            .attr("height",h);
var arcs = svg.selectAll("g.arc") //used to create g elements, path and text are inside these "g"
//each g is a slice of pie
              .data(pie(dataset))
              .enter()
              .append("g")
              .attr("class","arc")
              .attr("transform","translate(" + outerRadius +"," + outerRadius+")"); //default position is with the centre of the chart at 0,0 need to transform it to center svg
var color = d3.scaleOrdinal(d3.schemeCategory10); //color scale
arcs.append("path")
    .attr("fill",function(d,i){
        return color(i);
    })
    .attr("d",function(d,i){
        return arc(d,i);
    })

arcs.append("text")
.text(function(d){
    return d.value;
})
.attr("transform", function(d){
    return "translate(" + arc.centroid(d) + ")";
})