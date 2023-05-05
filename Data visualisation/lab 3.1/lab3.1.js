console.log("You have activated me master");
var w = 400;
var h = 300;
var padding = 30;

var dataset = [
    [5,20],
    [500,90],
    [250,50],
    [100,33],
    [330,95],
    [410,12],
    [475,44],
    [25,67],
    [85,21],
    [220,88],
    [650,30],
    [1000,40]
];

//Creating scale function
var xScale = d3.scaleLinear()
    /*.domain([100,500]) //input range
    .range([10,350]); //range available for visualisation on screen
    */ //hard coded way to scale
    
    .domain([d3.min(dataset, function(d){
        return d[0];
    }),
    d3.max(dataset, function(d){
        return d[0];
    })])
    .range([padding,w-(padding*2)]); // circle wont be cut off with padding

var yScale = d3.scaleLinear()
    /*.domain([100,500]) //input range
    .range([10,350]); //range available for visualisation on screen
    */ //hard coded way to scale
    
    .domain([d3.min(dataset, function(d){
        return d[1];
    }),
    d3.max(dataset, function(d){
        return d[1];
    })])
    .range([h-padding,padding]); //reverse so that smaller y value will be lower the higher y val
var rScale = d3.scaleLinear()
    .domain([0,d3.max(dataset,function(d){
        return d[1]; //scale the size of circle with y value
    })])
    .range([2,5]);
var svg = d3.select("body")
            .append("svg")
            .attr ("width", w) //variable w and h will be the value for such attributes
            .attr ("height", h);

svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx",function(d){   //first element of the child array
        return xScale(d[0]);
    })
    .attr("cy",function(d){
        return yScale(d[1]);           //second element of the child array
    })
    .attr("r", function(d){
        return rScale(d[1]);
    })
    .attr("fill","teal");

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
        return d[0]+", "+d[1]
    })
    .attr("x",function(d){
        return xScale(d[0]+7); //spacing to move to the right
    })
    .attr("y",function(d){
        return yScale(d[1]);
    })
    .style("fill","red")
    .attr("font-size","13px");
    


    