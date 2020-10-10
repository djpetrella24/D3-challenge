var svgWidth = 1000;
var svgHeight = 600;
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
};
var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3
.select('#scatter')
.append('svg')
.attr('width', svgWidth)
.attr('height', svgHeight); 

// Append an SVG group
var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .attr('class', 'chart');


// set axes 
var xAxis = 'poverty';
var yAxis = 'healthcare';

// Create link to csv
d3.csv("./assets/data/data.csv").then(function(stateData, err) {
    if (err) throw err;
    
    // parse data
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    })


});
