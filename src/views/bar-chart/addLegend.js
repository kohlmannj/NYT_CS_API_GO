import { width as defaultWidth } from './chartConstants';

/**
 * Add a legend to an existing SVG chart
 *
 * @param {ReturnType<typeof import('./createSvg').default>} barChart
 * @param {number} [width]
 *
 * @returns {void}
 */
export default function addLegend(barChart, width = defaultWidth) {
  // Legend
  var legend = barChart
    .append('g')
    .attr('transform', 'translate(' + (width - 100) + ',-10)')
    .attr('font-size', '17px');

  legend
    .append('rect')
    .attr('x', 48)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', 'steelblue');

  legend
    .append('text')
    .attr('x', 40)
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text('Dimension CTR');

  legend
    .append('rect')
    .attr('x', 48)
    .attr('y', 30)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', 'orange');

  legend
    .append('text')
    .attr('x', 40)
    .attr('y', 40)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text('Industry CTR');

  legend
    .append('path')
    .attr('d', 'M 48 70 L 68 70')
    .attr('stroke', 'black')
    .attr('stroke-width', 2);

  legend
    .append('text')
    .attr('x', 40)
    .attr('y', 70)
    .attr('dy', '.35em')
    .style('text-anchor', 'end')
    .text('Order CTR');
}
