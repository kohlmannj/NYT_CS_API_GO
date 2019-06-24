import * as d3 from 'd3';
import { margin, yScale } from './chartConstants';

/**
 * Function For Add Order_Over_All data line
 *
 * @param {import('../../types').OrderData<'order_overall'>} orderOverAllJSONPath JSON path for order_over_all data
 * @param {ReturnType<typeof import('./createSvg').default>} svgSection Dimension level bar chart svg
 * @param {string} lineID JSON Path for the order_over_All data
 * @param {number} width the width of the line
 */
export default function addOrderOverAll(orderOverAllJSONPath, svgSection, lineID, width) {
  // await d3.json(orderOverAllJSONPath).then(data => {

  var data = orderOverAllJSONPath[0];

  // console.log("test for data order over all", data)

  data.Dimension_CTR = +data.Dimension_CTR;
  data.Industry_CTR = `${data.Industry_CTR || ''}`;

  var lineOrderOverAll = svgSection.append('g').attr('id', lineID);

  lineOrderOverAll
    .append('line')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('x1', margin.left + 20)
    .attr('y1', yScale(data.Dimension_CTR * 100))
    .attr('x2', width)
    .attr('y2', yScale(data.Dimension_CTR * 100));

  lineOrderOverAll
    .append('text')
    .attr('x', margin.left + 15)
    .attr('y', yScale(data.Dimension_CTR * 100) - 10)
    .text((data.Dimension_CTR * 100).toFixed(2) + '%')
    .attr('font-size', '17px')
    .attr('fill', 'black');

  d3.select('#' + lineID).lower();
}
