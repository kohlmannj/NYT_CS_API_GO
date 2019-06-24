/**
 * Add title to existing bar chart SVG
 *
 * @param {ReturnType<typeof import('./createSvg').default>} barChart
 * @param {string} barChartTitle
 *
 * @returns {void}
 */
export default function addTitle(barChart, barChartTitle) {
  barChart
    .append('g')
    .attr('transform', 'translate( 30, 20)')
    .attr('font-size', '30px')
    .append('text')
    .text(barChartTitle);
}
