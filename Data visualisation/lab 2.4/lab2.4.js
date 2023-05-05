function init(){
    var w = 500;
    var h = 100;
    var barpadding = 4;

    d3.csv("Task_2.4_data.csv").then(function(data){
        console.log(data);
        wombatSightings = data;
        barChart(wombatSightings);
    })


    function barChart(){
        svg.selectAll("rect")
        .data(wombatSightings)
        .enter()
        .append("rect")
        .attr("x",function(d,i){   //each bar is 20 px wide so for it to be space in between we put a num > 20 as x position of each bar and i is index from 0 to dataset.length
            return i*(w/wombatSightings.length);
        })
        .attr("y",function(d){ //y coordinate is from the top left of the rec, h of svg - h of rect = y coordinate
            return h - (d.wombats*4); //*4 to make the scale better and add column name so d3 knows which column to colect data
        }) 
        .attr("width",(w/wombatSightings.length)-barpadding) //- bar padding so that they are not next to each other
        .attr("height", function(d){
            return d.wombats*4;
        })
        .style("fill", function(d){
            if(d.wombats >19){
                return d3.color("blue");
            }else{
                return "rgb(20,240,233)";
            }
        });

    }
    var svg = d3.select("p") //we set id for chart in p in hrml file so we select p here to manipulate it
                .append("svg")
                .attr ("width", w) //variable w and h will be the value for such attributes
                .attr ("height", h);
}
window.onload = init;
