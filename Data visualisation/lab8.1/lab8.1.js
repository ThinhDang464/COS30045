//width and height
var w = 500;
var h = 300;

var projection = d3.geoMercator()
                    .center([145,-36.5]) //do this to set the default view from the whole world to VIctoria
                    .translate([w/2,h/2])
                    .scale(2450);

var path = d3.geoPath()
             .projection(projection);
var svg = d3.select("body")
            .append("svg")
            .attr("width",w)
            .attr("height",h)
            .attr("fill","grey");
d3.json("LGA_VIC.json").then(function(json){ //read in GeoJSON file
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d",path);
})