import { /* json, */ select } from 'd3';
import { height, margin } from '../bar-chart/chartConstants';

/**
 * Function For Create Table
 *
 * @param {string} divElementID HTML div element ID
 * @param {import('../../types').OrderData<Exclude<import('../../types').OrderDimension, 'order_overall'>>} dimensionLevelPath JSON Path for the dimension level data
 * @param {*} orderOverAllPath JSON Path for the order_over_All data
 */
export default function createTable(divElementID, dimensionLevelPath, orderOverAllPath) {
  var dimensionLevelTable = select(divElementID)
    .append('table')
    .attr('width', 1200)
    .attr('height', height + margin.top + margin.bottom);

  var dimensionData = dimensionLevelPath;
  var orderOverAll = orderOverAllPath[0];

  // console.log('dimensionData', dimensionData);

  // for orderOverallCTR is the dimension level? or Industry Level?
  orderOverAll.Dimension_CTR = +orderOverAll.Dimension_CTR;

  var orderOverAllPercent = orderOverAll.Dimension_CTR * 100;

  var res = [];
  dimensionData.forEach(d => {
    // console.log(d, 'before');

    var versIndustryCTR = '0';

    if (d.Industry_CTR == null) {
      d.Industry_CTR = 0;
    } else {
      d.Industry_CTR = (+d.Industry_CTR * 100).toFixed(2);
      versIndustryCTR = ((d.Dimension_CTR - d.Industry_CTR) / d.Industry_CTR).toFixed(2);
    }
    d.Dimension_CTR = (+d.Dimension_CTR * 100).toFixed(2);

    var versOrderOverAll = ((d.Dimension_CTR - orderOverAllPercent) / orderOverAllPercent).toFixed(
      2
    );

    // console.log(d, 'after');

    res.push([
      d.dimension_details,
      d.Dimension_CTR + '%',
      orderOverAllPercent.toFixed(2) + '%',
      versOrderOverAll + '%',
      d.Industry_CTR + '%',
      versIndustryCTR + '%',
    ]);
  });

  // Table
  var table = dimensionLevelTable.append('g');

  // Table Header
  var theader = table.append('thead').append('tr');

  theader
    .selectAll('th')
    .data([
      'Section',
      'Section Order CTR',
      'Order Overall CTR',
      '% Versus Order Overall CTR',
      'Industry CTR',
      '% Versus Industry CTR',
    ])
    .enter()
    .append('th')
    .text(d => d)
    .attr('font-size', '20px');

  // Table Body
  var tbody = table.append('tbody');

  // Rows and Cells in Table Body
  var rows = tbody
    .selectAll('tr')
    .data(res)
    .enter()
    .append('tr');

  var cells = rows
    .selectAll('td')
    .data(d => d)
    .enter()
    .append('td')
    .text(d => (d != '0%' ? d : '-'))
    .style('font-size', '18px')
    .style('color', (d, i) => {
      if ((i == 3 || i == 5) && d != '0%') {
        return d[0] == '-' ? 'red' : 'green';
      }
    })
    .each((d, i, nodes) => {
      if ((i == 3 || i == 5) && d != '0%') {
        var svg = select(nodes[i])
          .append('svg')
          .attr('width', 10)
          .attr('height', 10);
        svg
          .append('path')
          .attr('d', d =>
            d[0] == '-' ? 'M 0 0 L 10 0 L 5 10 L 0 0' : 'M 0 10 L 10 10 L 5 0 L 0 10'
          )
          .attr('stroke', d => (d[0] == '-' ? 'red' : 'green'))
          .attr('fill', d => (d[0] == '-' ? 'red' : 'green'));
      }
    });

  return dimensionLevelTable;
}
