
var w = 1000;
var h = 500;
var padding = 50;

var svg = d3.select("#chart") //chart created in html
            .append("svg")
            .attr("width",w)
            .attr("height",h);

d3.csv("Unemployment_78-95.csv", function(d){  //read in csv file
    return{
        date: new Date(+d.year, (+d.month-1)), //date format -1 cause month starts from 1
        number: +d.number //value for number column
        };
    }).then (function(data){
        var dataset = data; //read in valye from csv to dataset
        
        lineChart(dataset);
        console.table(dataset,["date","number"]);//show to console for data checkking
    });
    
function lineChart(dataset){ //linechart function used to draw line chart that is utulized above
    xScale = d3.scaleTime()//function creates linear scale with time domain
            .domain([
                d3.min(dataset,function(d){return d.date;}),//time domain we created above
                d3.max(dataset,function(d){return d.date;})
            ])
            .range([padding,w-padding]);//add padding for xaxis to showcase number on far left

    yScale = d3.scaleLinear()//normal scale linear
            .domain([0, d3.max(dataset, function(d){return d.number;})
            ])
            .range([h-padding,padding]);//add padding for yaxis
    
    var line=d3.line()
            .x(function(d){return xScale(d.date); })
            .y(function(d){return yScale(d.number);});
     //this is for line chart

    var area = d3.area()
            .x(function(d){return xScale(d.date);})

            //base line for area shape
            .y0(function(){return yScale.range()[0];}) // not value 0 index 0 = bottom chart
            .y1(function(d){return yScale(d.number);});
    svg.append("path")
            .datum(dataset) // data used to bind each single data value to a different html element. datum bind data to a single path element
            .attr("class","area")
            .attr("d",area); //draw area
    svg.append("line") //half mil line 
            .attr("class","line halfMilMark")
            //start of line
            .attr("x1",padding)
            .attr("y1",yScale(500000)) //at value 500 000 
            //end of line
            .attr("x2",w)
            .attr("y2",yScale(500000));
    svg.append("text")
            .attr("class","halfMilLabel")
            .attr("x",padding + 10)
            .attr("y",yScale(500000)-7)
            .text("Half a milion unemployed"); //description for half mil

        var xAxis = d3.axisBottom() //axis bottom and left similar to previous lab
            .ticks(8)
            .scale(xScale);
        
        var yAxis = d3.axisLeft()
            .ticks(8)
            .scale(yScale);
        
        svg.append("g")
            .attr("transform", "translate(0, "+(h - padding) +")")
            .call(xAxis);
        
        svg.append("g")
            .attr("transform", "translate(" + padding+ ", 0)")
            .call(yAxis);

}


