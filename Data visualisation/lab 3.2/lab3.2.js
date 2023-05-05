console.log("You have activated me master");
var w = 500;
var h = 300;
var padding = 30;

/*var dataset = [
    [5,20],
    [490,90],
    [250,50],
    [100,33],
    [330,95],
    [410,12],
    [475,44],
    [25,67],
    [85,21],
    [220,88],
    [600,150]
];
*/

var dataset=[];
var numDataPoints = 50;
var xRange = Math.random()*1000;
var yRange = Math.random()*1000;
for (var i =0; i < numDataPoints; i++){
    var newNumber1 = Math.floor(Math.random()*xRange);
    var newNumber2 = Math.floor(Math.random()*yRange);
    dataset.push([newNumber1,newNumber2])
}
          
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
    .range([padding,w-(padding*2)]);

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
        return d[1];
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
        return xScale(d[0]); //spacing to move to the right
    })
    .attr("y",function(d){
        return yScale(d[1]);
    })
    .style("fill","red")
    .attr("font-size","13px");
var xAxis = d3.axisBottom(xScale) //need to be at bottom because we need all other elements to be crated first, js is linear
           .ticks(5);
svg.append("g")
    .attr("class","axis") //Assign "axis" class
    .attr("transform","translate(0,"+(h-padding+5)+")") //move the x axis down bottom, the 2 + are syntax in js to connect the variable
    .call(xAxis); //call() gets the selection (g) and gives it xAxis, we use g to group axis and label

var yAxis = d3.axisLeft(yScale)
            .ticks(5);
svg.append("g")
    .attr("class","axis")
    .attr("transform","translate("+padding+",0)")
    .call(yAxis);