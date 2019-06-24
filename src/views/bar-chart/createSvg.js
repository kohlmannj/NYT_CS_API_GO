import * as d3 from 'd3';
import { /* xScale, */ margin /* , height, yScale */ } from './chartConstants';
import addLegend from './addLegend';
import addTitle from './addTitle';
import addOrderOverAll from './addOrderOverAll';

/**
 * Function For Create Bar Chart SVG
 *
 * @param {HTMLDivElement} divElement HTML div element ID
 * @param {import('../../types').OrderData<Exclude<import('../../types').OrderDimension, 'order_overall'>>} dimensionLevelJSONPath JSON Path for the barchart data
 * @param {string} barChartTitle Title for the bar chart
 * @param {import('../../types').OrderData<'order_overall'>} orderOverAllJSONPath JSON Path for the order_over_All data
 * @param {string} lineID line ID for the standerd order_over_all data
 * @param {number} [rawWidth]
 * @param {number} [rawHeight]
 */
export default function createSvg(
  divElement,
  dimensionLevelJSONPath,
  barChartTitle,
  orderOverAllJSONPath,
  lineID,
  rawWidth,
  rawHeight
) {
  var data = dimensionLevelJSONPath;
  var countDataLength = 0;

  // the most important is the data is a json object !!!!!!!!!!!!!
  data.forEach(d => {
    countDataLength = countDataLength + 1;

    d.Dimension_CTR = +d.Dimension_CTR;
    if (d.Industry_CTR != null) {
      // if (d.hasOwnProperty('Industry_CTR')) {
      d.Industry_CTR = +d.Industry_CTR;
    } else {
      d.Industry_CTR = 0;
      // d["Industry_CTR"] = "0";
    }
  });

  // console.log(data, "after process")

  const width = (rawWidth || divElement.clientWidth) - margin.left - margin.right;
  const height = (rawHeight || divElement.clientHeight) - margin.top - margin.bottom;

  // var width = data.length * 250;
  const xScale = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, 1]);

  var svg = d3
    .select(divElement)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  var svgSection = svg
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // set x Domain
  xScale.domain(data.map(d => d.dimension_details));

  // set X and Y Axis
  var xAxis = d3.axisBottom(xScale).tickSize(0);
  var yAxis = d3.axisLeft(yScale);

  var barWidth = 50;
  var barGap = 5;

  var bar = svgSection.append('g').attr('transform', 'translate(0,10)');

  // x-axis
  bar
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    // .attr("display", "none")
    .attr('font-size', '17px')
    .style('text-anchor', 'end');

  // y-axis labels
  // bar
  //   .append('g')
  //   .attr('class', 'y axis')
  //   .style('opacity', '1')
  //   .call(yAxis)
  //   .append('text')
  //   .attr('transform', 'rotate(-90)')
    // .attr("y", 50)
    // .attr("x", 10)
    // .attr("dy", ".99em")
  //   .style('text-anchor', 'end')
  //   .style('font-weight', 'bold');

  var groupBarChart = bar
    .selectAll('.groups')
    .data(data)
    .enter()
    .append('g');

  // rect for dimension_ctr
  groupBarChart
    .append('rect')
    .attr('fill', 'steelblue')
    .attr('y', d => yScale(d.Dimension_CTR * 100))
    .attr('x', d => xScale(d.dimension_details))
    .attr('height', d => height - yScale(d.Dimension_CTR * 100))
    .attr('width', barWidth)
    .attr('transform', 'translate(30,0)');

  // text label for first bar
  groupBarChart
    .append('text')
    .attr('y', d => yScale(d.Dimension_CTR * 100) - 10)
    .attr('x', d => xScale(d.dimension_details) + 55)
    .attr('text-anchor', 'middle')
    // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
    .text(d => (d.Dimension_CTR * 100).toFixed(2) + '%')
    .attr('font-family', 'sans-serif')
    .attr('font-size', '17px');

  // rect for dimension_ctr
  groupBarChart
    .append('rect')
    .attr('fill', 'orange')
    .attr('y', d => yScale(d.Industry_CTR * 100))
    .attr('x', d => xScale(d.dimension_details) + barWidth + barGap)
    .attr('height', d => height - yScale(d.Industry_CTR * 100))
    .attr('width', barWidth)
    .attr('transform', 'translate(30,0)');

  // text label for first bar
  groupBarChart
    .append('text')
    .attr('y', d => yScale(d.Industry_CTR * 100) - 10)
    .attr('x', d => xScale(d.dimension_details) + xScale.bandwidth() / 2)
    .attr('text-anchor', 'middle')
    // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
    .text(d => {
      if (d.Industry_CTR != 0) {
        // console.log(d.Industry_CTR)
        return (d.Industry_CTR * 100).toFixed(2) + '%';
      }
    })
    .attr('font-family', 'sans-serif')
    .attr('font-size', '17px');

  addLegend(svg, width);
  addTitle(svg, barChartTitle);

  // add order over all line
  addOrderOverAll(orderOverAllJSONPath, svg, lineID, width);

  return svg;
}
