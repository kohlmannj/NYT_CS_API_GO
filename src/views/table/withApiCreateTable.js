import createTable from './createTable';

/**
 * Function For Call API to Create Table
 *
 * @param {string} divElementID HTML div element ID
 * @param {Promise<import('../../types').OrderData<Exclude<import('../../types').OrderDimension, 'order_overall'>>>} dimensionLevelDataPromise JSON Path for the barchart data
 * @param {Promise<import('../../types').OrderData<'order_overall'>>} orderOverAllDataPromise JSON Path for the order_over_All dataƒ
 */
const withAPICreateTable = async (
  divElementID,
  dimensionLevelDataPromise,
  orderOverAllDataPromise
) => createTable(divElementID, await dimensionLevelDataPromise, await orderOverAllDataPromise);

export default withAPICreateTable;
