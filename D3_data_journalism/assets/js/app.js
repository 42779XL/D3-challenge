// This assignment is using data to analyze the current trends shaping people's lives. 
// The analysis used U.S. Census Bureau and the Behavioral Risk Factor Surveillance System data.
// The analysis below showing the corolation of age and smoke percentage of each state.  

// Assign a SVG area for our scarter plot
var svgWidth = 900;
var svgHeight = 600;

// Set margin
var margin = {
  top: 30,
  right: 30,
  bottom: 100,
  left: 100
};

// Calculate chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group that will hold our chart, and shift the latter by left and top margins
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data 
d3.csv("assets/data/data.csv").then(function(healthData) {

    // Parse data and cast as numbers
    healthData.forEach(function(data) {
    //   data.healthcare = +data.healthcare;
    //   data.poverty = +data.poverty;
      data.smokes = +data.smokes;
      data.age = +data.age;
    });

    console.log(healthData);

    // Create scales for x and y
    // Check min age value for origin of x-axis
    console.log(d3.extent(healthData, d=> d.age))
    var xLinearScale = d3.scaleLinear()
      .domain([30, d3.max(healthData, d => d.age)])
      .range([0, chartWidth]);
      
    // Check min smokes value for origin of y-axis 
    console.log(d3.extent(healthData, d=> d.smokes))
    var yLinearScale = d3.scaleLinear()
      .domain([8, d3.max(healthData, d => d.smokes)])
      .range([chartHeight, 0]);
      
    // Create x-axis and y-axis 
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Add axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
    chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("opacity", ".5")
    
    // Add State abbreviation to the circle
    chartGroup.select("g")
    .selectAll("circle")
    .data(healthData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d.age))
    .attr("y", d => yLinearScale(d.smokes+2.8))
    .attr("dy",-395)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .attr("fill", "black");
    
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (chartHeight/1.3))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokes Population (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${chartWidth/2.5}, ${chartHeight + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Age of Smokes (Median)");
    
    }).catch(function(error) {
    console.log(error);
  });
  