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

// Create link to csv
d3.csv("./assets/data/data.csv").then(function (censusData, err) {
    if (err) throw err;

    // Create an SVG wrapper
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Parse Data & Cast as numbers
    censusData.forEach(function (data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    // Create scale functions
    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(censusData, d => d.poverty))
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(censusData, d => d.healthcare)])
        .range([height, 0]);

    // Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // Create circles
    var circlesGroup = chartGroup.selectAll("Circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", "0.5");

    var circleLabels = chartGroup.selectAll(null).data(censusData).enter().append("text");

    circleLabels
        .attr("x", function (d) {
            return xLinearScale(d.poverty);
        })
        .attr("y", function (d) {
            return yLinearScale(d.healthcare);
        })
        .text(function (d) {
            return d.abbr;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("text-anchor", "middle")
        .attr("fill", "white");

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 1)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .style("text-anchor", "middle")
        .text("In Poverty (%)");
    })