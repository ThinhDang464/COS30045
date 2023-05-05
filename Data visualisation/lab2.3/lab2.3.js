var w = 700;
var h = 100;
var barpadding = 10;

var dataset = [
    [5,20],
    [480,90],
    [250,50],
    [100,33],
    [330,95],
    [410,12],
    [475,44],
    [25,67],
    [85,21],
    [220,88],
];

var svg = d3.select("body")
            .append("svg")
            .attr ("width", w) //variable w and h will be the value for such attributes
            .attr ("height", h);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx",function(d){   //first element of the child array
        return d[0];
    })
    .attr("cy",function(d){
        return d[1];           //second element of the child array
    })
    .attr("r",5)
    .attr("fill","teal");

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
        return d[0]+", "+d[1]
    })
    .attr("x",function(d){
        return d[0]+7; //spacing to move to the right
    })
    .attr("y",function(d){
        return d[1];
    })
    .style("fill","red");
    


    