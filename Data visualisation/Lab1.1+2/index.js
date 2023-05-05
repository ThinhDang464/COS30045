//these functions are declared within the html file. so we can alter its behavior within js file
function click2019(){
    document.getElementById('chart').src="img/2019.png"; //return the element with id chart
    document.getElementById('cap').innerHTML="Figure 1.2: Percent of most popular pets owned by Australian in 2019";
}

function click2021(){
    document.getElementById('chart').src="img/2021.png";
    document.getElementById('cap').innerHTML="Figure 1.2: Percent of most popular pets owned by Australian in 2021";
}

function clickboth(){
    document.getElementById('chart').src="img/20192021.png";
    document.getElementById('cap').innerHTML="Figure 1.2: Percent of most popular pets owned by Australian in 2019 and 2021";
}