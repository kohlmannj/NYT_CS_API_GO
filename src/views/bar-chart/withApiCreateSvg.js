import createSvg from './createSvg';

/**
 * Function For Call API to Create Bar Chart SVG
 *
 * @param {string} divElementID HTML div element ID
 * @param {Promise<import('../../types').OrderData<Exclude<import('../../types').OrderDimension, 'order_overall'>>>} dimensionLevelDataPromise JSON Path for the barchart data
 * @param {string} barChartTitle Title for the bar chart
 * @param {Promise<import('../../types').OrderData<'order_overall'>>} orderOverAllDataPromise JSON Path for the order_over_All data
 * @param {string} lineID line ID for the standerd order_over_all data
 */
const withAPICreateSvg = async (
  divElementID,
  dimensionLevelDataPromise,
  barChartTitle,
  orderOverAllDataPromise,
  lineID
) =>
  createSvg(
    divElementID,
    await dimensionLevelDataPromise,
    barChartTitle,
    await orderOverAllDataPromise,
    lineID
  );

export default withAPICreateSvg;
