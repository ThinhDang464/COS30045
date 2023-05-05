var dataset = [14,5,26,23,9];
    
d3.select("body").selectAll("p") //Selects all p
    .data(dataset) //counts and prepares data values
    .enter() //creates new place holder element foreach bit of data
    .append ("p") //appends a p element to match each placeholder
    .text (function(d){
        message1 = "Warning: Vu watched "+ d +" cat videos today!";
        message2 = "Vu watched " + d + " cat videos today.";
        if (d>10){
            console.log("more than 10"); //keep track at console data that is > 10
            return message1;
        } else{
            return message2;
        }
        }) //accepts d from the data set as an input and loops through each value 

    .style("color",function(d){ //it takes what type of style and what color in this case as parameter
        if (d>10){
            console.log("change to red if >10");
            return d3.color("red");
        } else{
            return d3.color("black");
        }
       })
                    
       console.log(d3.selectAll("p")); 

    