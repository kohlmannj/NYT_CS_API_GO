
var margin = { top: 20, right: 20, bottom: 30, left: 20 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Scale 

// X scale
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

// Y Scale
var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 1]);

/**
 * 
 *          Function For Creat Bar Chart SVG
 * 
    *          Parameters:
    *              divElementID : HTML div element ID
    *              dimensionLevelJSONPath : JSON Path for the barchart data
    *              barChartTitle : Title for the bar chart
    *              orderOverAllJSONPath: JSON Path for the order_over_All data
    *              lineID : line ID for the standerd order_over_all data
 *                  
 * 
 */

async function createSvg(divElementID, dimensionLevelJSONPath, barChartTitle, orderOverAllJSONPath, lineID) {
    var data = await dimensionLevelJSONPath;
    var countDataLength = 0

    // the most important is the data is a json object !!!!!!!!!!!!!
    data.forEach(d => {
        // d.clicks = +d.clicks;
        // d.impressions = +d.impressions;
        // d.industry_clicks = +d.industry_clicks;
        // d.industry_impressions = +d.industry_impressions;
        // var processDimensionCTR = d.Dimension_CTR.slice(-3)
        // console.log(processDimensionCTR)

        // if (processDimensionCTR[0] == "E") {
        //     d.Dimension_CTR = 
        // }
        countDataLength = countDataLength + 1


        d.Dimension_CTR = +d.Dimension_CTR;
        if(d.Industry_CTR != null){
        // if (d.hasOwnProperty('Industry_CTR')) {
            d.Industry_CTR = +d.Industry_CTR;
        }
        else {
            d.Industry_CTR = 0
            // d["Industry_CTR"] = "0";
        }
    });

    // console.log(data, "after process")

    var width = data.length * 250;
    x.range([0, width])

    var svgSection = d3.select(divElementID).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // set x Domain
    x.domain(data.map(d => d.dimension_details));

    // set X and Y Axis 
    var xAxis = d3.axisBottom(x).tickSize(0)
    var yAxis = d3.axisLeft(y)

    var barWidth = 50
    var barGap = 5

    var bar = svgSection.append("g")
        .attr("transform", "translate(50,10)")

    // x-axis
    bar.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        // .attr("display", "none")
        .attr("font-size", "17px")
        .style("text-anchor", "end");


    // y-axis labels
    bar.append("g")
        .attr("class", "y axis")
        .style('opacity', "1")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        // .attr("y", 50)
        // .attr("x", 10)
        // .attr("dy", ".99em")
        .style("text-anchor", "end")
        .style('font-weight', 'bold')

    var groupBarChart = bar.selectAll(".groups")
        .data(data)
        .enter()
        .append("g")

    // rect for dimension_ctr
    groupBarChart.append("rect")
        .attr("fill", "steelblue")
        .attr("y", d => y((d.Dimension_CTR) * 100))
        .attr("x", d => x(d.dimension_details))
        .attr("height", d => (height - y((d.Dimension_CTR) * 100)))
        .attr("width", barWidth)
        .attr("transform", "translate(30,0)")

    // text label for first bar
    groupBarChart.append("text")
        .attr("y", d => y((d.Dimension_CTR) * 100) - 10)
        .attr("x", d => x(d.dimension_details) + 55)
        .attr("text-anchor", "middle")
        // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
        .text(d => ((d.Dimension_CTR) * 100).toFixed(2) + "%")
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")

    // rect for dimension_ctr
    groupBarChart.append("rect")
        .attr("fill", "orange")
        .attr("y", d => y((d.Industry_CTR) * 100))
        .attr("x", d => x(d.dimension_details) + barWidth + barGap)
        .attr("height", d => (height - y((d.Industry_CTR) * 100)))
        .attr("width", barWidth)
        .attr("transform", "translate(30,0)")

    // text label for first bar
    groupBarChart.append("text")
        .attr("y", d => y((d.Industry_CTR) * 100) - 10)
        .attr("x", d => x(d.dimension_details) + x.bandwidth() / 2)
        .attr("text-anchor", "middle")
        // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
        .text(d => {
            if (d.Industry_CTR != 0) {
                // console.log(d.Industry_CTR)
                return ((d.Industry_CTR) * 100).toFixed(2) + "%"
            }
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "17px")

    addLegend(svgSection, width);
    addTitle(bar, barChartTitle)

    // add order over all line
    addOrderOverAll(orderOverAllJSONPath, svgSection, lineID, width)
    return svgSection;
}


// Add Legend 
function addLegend(svgObject, width) {

    // //Legend
    var legend = svgObject.append("g")
        .attr("transform", "translate(" + (width - 100) + ",-10)")
        .attr("font-size", "17px")

    legend.append("rect")
        .attr("x", 48)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", "steelblue")

    legend.append("text")
        .attr("x", 40)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text("Dimension CTR");

    legend.append("rect")
        .attr("x", 48)
        .attr("y", 30)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", "orange")

    legend.append("text")
        .attr("x", 40)
        .attr("y", 40)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text("Industry CTR");

    legend.append("path")
        .attr("d", "M 48 70 L 68 70")
        .attr("stroke", "black")
        .attr("stroke-width", 2)

    legend.append("text")
        .attr("x", 40)
        .attr("y", 70)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text("Order CTR");

}

// Add Title
function addTitle(barChart, barChartTitle) {

    barChart.append("g")
        .attr("transform", "translate( 30, 20)")
        .attr("font-size", "30px")
        .append("text")
        .text(barChartTitle)
}


/**
 * 
 *          Function For Add Order_Over_All data line
 * 
    *          Parameters:
    *              orderOverAllJSONPath : JSON path for order_over_all data
    *              svgSection: Dimension level bar chart svg
    *              lineID: JSON Path for the order_over_All data
 *                  
 * 
 */

async function addOrderOverAll(orderOverAllJSONPath, svgSection, lineID, width) {

    // await d3.json(orderOverAllJSONPath).then(data => {

    var data = await orderOverAllJSONPath[0]

    // console.log("test for data order over all", data)

    data.Dimension_CTR = +data.Dimension_CTR;
    data.Industry_CTR = +data.Industry_CTR;

    var lineOrderOverAll = svgSection.append("g")
        .attr("id", lineID)

    lineOrderOverAll.append("line")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("x1", margin.left + 20)
        .attr("y1", y((data.Dimension_CTR) * 100))
        .attr("x2", width)
        .attr("y2", y((data.Dimension_CTR) * 100))

    lineOrderOverAll.append("text")
        .attr("x", margin.left + 15)
        .attr("y", y((data.Dimension_CTR) * 100) - 10)
        .text((data.Dimension_CTR * 100).toFixed(2) + "%")
        .attr("font-size", "17px")
        .attr("fill", "black")

    d3.select("#" + lineID).lower()

    // }).catch(error => console.log(error))

}

/**
 * 
 *          Function For Creat Table 
 * 
    *          Parameters:
    *              divElementID : HTML div element ID
    *              dimensionLevelPath: JSON Path for the dimension level data
    *              orderOverAllPath: JSON Path for the order_over_All data
 *                  
 * 
 */


async function createTable(divElementID, dimensionLevelPath, orderOverAllPath) {

    var dimensionLevelTable = d3.select(divElementID).append("table")
        .attr("width", 1200)
        .attr("height", height + margin.top + margin.bottom)
    // .attr("width", width - margin.left)
    // .attr("height", height)
    // .style("margin","auto")
    // .append("g")    
    // .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");

    // await Promise.all([
        
    //     d3.json(dimensionLevelPath),
    //     d3.json(orderOverAllPath)
    // ]).then(files => {

        var dimensionData = await dimensionLevelPath
        var orderOverAll = await orderOverAllPath[0]

        console.log("dimensionData", dimensionData)


        // console.log(files[0])
        // for orderOverallCTR is the dimension level? or Industry Level?
        orderOverAll.Dimension_CTR = +orderOverAll.Dimension_CTR

        var orderOverAll = orderOverAll.Dimension_CTR * 100

        var res = []
        dimensionData.forEach(d => {

            console.log(d, "before")

            var versIndustryCTR = 0

            if (d.Industry_CTR == null) {
                d.Industry_CTR = 0;
            }
            else {
                d.Industry_CTR = (+d.Industry_CTR * 100).toFixed(2);
                versIndustryCTR = ((d.Dimension_CTR - d.Industry_CTR) / d.Industry_CTR).toFixed(2)
            }
            d.Dimension_CTR = (+d.Dimension_CTR * 100).toFixed(2);

            var versOrderOverAll = ((d.Dimension_CTR - orderOverAll) / orderOverAll).toFixed(2)

            console.log(d, "after")

            res.push([d.dimension_details, d.Dimension_CTR + "%", orderOverAll.toFixed(2) + "%", versOrderOverAll + "%", d.Industry_CTR + "%", versIndustryCTR + "%"])
        })

        // Table 
        var table = dimensionLevelTable.append("g")

        // Table Header                     
        var theader = table.append("thead").append("tr")

        theader.selectAll("th")
            .data(["Section", "Section Order CTR", "Order Overall CTR", "% Versus Order Overall CTR", "Industry CTR", "% Versus Industry CTR"])
            .enter()
            .append("th")
            .text(d => d)
            .attr("font-size", "20px")

        // Table Body
        var tbody = table.append("tbody");

        // Rows and Cells in Table Body
        rows = tbody.selectAll("tr")
            .data(res)
            .enter()
            .append("tr");

        cells = rows.selectAll("td")
            .data(d => d)
            .enter()
            .append("td")
            .text(d => d != "0%" ? d : "-")
            .style("font-size", "18px")
            .style("color", (d, i) => {
                if ((i == 3 || i == 5) && (d != "0%")) {
                    return d[0] == "-" ? "red" : "green";
                }
            })
            .each((d, i, nodes) => {
                if ((i == 3 || i == 5) && (d != "0%")) {
                    var svg = d3.select(nodes[i]).append("svg").attr("width", 10).attr("height", 10)
                    svg.append("path")
                        .attr("d", d => d[0] == "-" ? "M 0 0 L 10 0 L 5 10 L 0 0" : "M 0 10 L 10 10 L 5 0 L 0 10")
                        .attr("stroke", d => d[0] == "-" ? "red" : "green")
                        .attr("fill", d => d[0] == "-" ? "red" : "green")
                }
            })
    // })

    return dimensionLevelTable
}



/**
 * 
 *          Function For Call API to Creat Bar Chart SVG
 * 
    *          Parameters:
    *              divElementID : HTML div element ID
    *              dimensionLevelJSONPath : JSON Path for the barchart data
    *              barChartTitle : Title for the bar chart
    *              orderOverAllJSONPath: JSON Path for the order_over_All data
    *              lineID : line ID for the standerd order_over_all data
 *                  
 * 
 */


async function withAPICreateSvg(divElementID, dimensionLevelJSONPath, barChartTitle, orderOverAllJSONPath, lineID){

    await Promise.all([
        fetch(dimensionLevelJSONPath).then(response => response.json()),
        fetch(orderOverAllJSONPath).then(response => response.json())
    ])
        .then((values) => createSvg(divElementID, values[0], barChartTitle, values[1], lineID))
        .catch((err) => {
            console.log(err);
        });
}



/**
 * 
 *          Function For Call API to Create Table
 * 
    *          Parameters:
    *              divElementID : HTML div element ID
    *              dimensionLevelPath: JSON Path for the dimension level data
    *              orderOverAllPath: JSON Path for the order_over_All data
 *                  
 * 
 */


async function withAPICreateTable(divElementID, dimensionLevelPath, orderOverAllPath){

    await Promise.all([
        fetch(dimensionLevelPath).then(response => response.json()),
        fetch(orderOverAllPath).then(response => response.json())
    ])
        .then((values) => createTable(divElementID, values[0], values[1]))
        .catch((err) => {
            console.log(err);
        });
}


var topSectionID = "#top_section"
var bottomSectionID = "#bottom_section"
var pageSectionID = '#page_type_data'
var tableAllSectionID = "#all_section_data"

var topSectionTitle = "Top Section"
var bottomSectionTitle = "Bottom Section"
var pageSectionTitle = "Page Type Data"

var topSectionJSONPath = "https://campaignscope-data-api-dot-nyt-adtech-dev.appspot.com/cs/order?order_id=2521420541&order_by=section&sort_by=DESC&limit=3"
var bottomSectionJSONPath = "https://campaignscope-data-api-dot-nyt-adtech-dev.appspot.com/cs/order?order_id=2521420541&order_by=section&sort_by=ASC&limit=3"
var pageSectionJSONPath = "https://campaignscope-data-api-dot-nyt-adtech-dev.appspot.com/cs/order?order_id=2480100899&order_by=cat_type&sort_by=DESC&limit=10"
var allSectionJSONPath = "https://campaignscope-data-api-dot-nyt-adtech-dev.appspot.com/cs/order?order_id=2521420541&order_by=section&sort_by=DESC&limit=10"

var orderOverAllPath = "https://campaignscope-data-api-dot-nyt-adtech-dev.appspot.com/cs/order?order_id=2521420541&order_by=order_overall&sort_by=DESC&limit=10"
var pageOrderOverAll = "https://campaignscope-data-api-dot-nyt-adtech-dev.appspot.com/cs/order?order_id=2480100899&order_by=order_overall&sort_by=DESC&limit=10"

var topLineID = "overAllTop"
var bottomLineID = "overAllBottom"
var pageLineID = "pageOverAll"

var svgTopSection = withAPICreateSvg(topSectionID, topSectionJSONPath, topSectionTitle, orderOverAllPath, topLineID)
var svgBottomSection = withAPICreateSvg(bottomSectionID, bottomSectionJSONPath, bottomSectionTitle, orderOverAllPath, bottomLineID)
var svgPageType = withAPICreateSvg(pageSectionID, pageSectionJSONPath, pageSectionTitle, orderOverAllPath, pageLineID)
var tableAllSection = withAPICreateTable(tableAllSectionID, allSectionJSONPath, orderOverAllPath)
