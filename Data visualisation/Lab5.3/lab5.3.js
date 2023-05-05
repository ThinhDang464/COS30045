
var w = 500; 
var h = 300;

var barpadding = 20;

var dataset = [14,5,26,23,9,10,14,24,25];
var xScale = d3.scaleBand() //used for ordinal data where the data is categorical
               .domain(d3.range(dataset.length)) // returns an array 0 to length -1
               .rangeRound([0,w])//Round add crisp to rec -> round x value
               .paddingInner(0.05) //set padding within funciton
var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset)])
               .range([h,0]);
var svg = d3.select("body")
            .append("svg")
            .attr ("width", w) //variable w and h will be the value for such attributes
            .attr ("height", h) // add some margin for axis
            .attr ("id","chart");
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x",function(d,i){   //each bar is 20 px wide so for it to be space in between we put a num > 20 as x position of each bar and i is index from 0 to dataset.length
        return xScale(i) ;
    })
    .attr("y",function(d){ //y coordinate is from the top left of the rec
        return yScale(d); //
    }) 
    .attr("width",xScale.bandwidth()) //- bar padding so that they are not next to each other
    .attr("height", function(d){
        return h-yScale(d) ; //y is top left position of bar, height calculate how much the bar needs to go down
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
        return xScale(i) + (xScale.bandwidth()/2);
    })
    .attr("y",function(d){
        return yScale(d)+10;
    })
    .attr("text-anchor", "middle") // center the label text horizontally
    .attr("font-size", "12px") // set the font size of the label text
    .attr("fill", "#fff"); // set the font color of the label text
    
    
//button 1
d3.select("#button1")
    .on("click",function(){
        
        var maxValue = 25;
        
        var newNumber = Math.floor(Math.random()*maxValue); //missing bar = 0
            dataset.push(newNumber);
        xScale.domain(d3.range(dataset.length))
        var bars = svg.selectAll("rect")
            .data(dataset);
        bars.enter()
            .append("rect")
            .merge(bars)
            .attr("x",function(d,i){
                return xScale(i)
            })
            .attr("y",function(d){
                return yScale(d)
            })
            .attr("width",xScale.bandwidth())
            .attr("height",function(d){
                return h-yScale(d);
            })
            .attr("fill","teal");

        //similar to bar we need var for label to add new labels
        var labels = svg.selectAll("text")
            .data(dataset);
        labels.enter()
            .append("text")
            .merge(labels)
            .transition()
            .duration(1000)
            .text(function(d){
                return d;
            })
            .attr ("x",function(d,i){
                return xScale(i) + (xScale.bandwidth()/2);
            })
            .attr("y",function(d){
                return yScale(d)+10;
            })
            .attr("text-anchor", "middle") // center the label text horizontally
            .attr("font-size", "12px") // set the font size of the label text
            .attr("fill", "#fff"); // set the font color of the label text

        });

//button 2
d3.select("#button2")
    .on("click",function(){
    dataset.pop();
    console.log(dataset);
    xScale.domain(d3.range(dataset.length)); //debug after
    var bars= svg.selectAll("rect")
        .data(dataset);
    bars.exit()
        .transition()
        .duration(500)
        .attr("x",w) //make it goes to end of svg
        .remove();
    var labels = svg.selectAll("text")
        .data(dataset);
    labels.exit()
        .transition()
        .duration(500)
        .attr("x",w) //make it goes to end of svg
        .remove(); //need to delte label 0r else it will be there and messed up format
});


