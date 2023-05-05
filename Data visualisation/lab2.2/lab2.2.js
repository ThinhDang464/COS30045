var w = 500;
var h = 100;
var barpadding = 10;

var dataset = [14,5,26,23,9,10,14];

var svg = d3.select("body")
            .append("svg")
            .attr ("width", w) //variable w and h will be the value for such attributes
            .attr ("height", h);

svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x",function(d,i){   //each bar is 20 px wide so for it to be space in between we put a num > 20 as x position of each bar and i is index from 0 to dataset.length
        return i*(w/dataset.length);
    })
    .attr("y",function(d){ //y coordinate is from the top left of the rec, h of svg - h of rect = y coordinate
        return h-(d*4); //*4 to make the scale better
    }) 
    .attr("width",(w/dataset.length)-barpadding) //- bar padding so that they are not next to each other
    .attr("height", function(d){
        return d*4;
    })
    .attr("fill","teal");

svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d){
        return d;
    })
    .attr ("x",function(d,i){
        return i *(w/dataset.length) + (w/dataset.length-barpadding)/2; //we have full width position from this and /2 to get middle possition
    })
    .attr("y",function(d){
        return h-(d*4)+15;
    })
    .attr("font-family","sans-serif")
    .attr("font-family","11px")
    .attr("fill","white")
    .attr("text-anchor","middle")

    