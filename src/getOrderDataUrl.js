import { BACKEND_ROOT } from './views/bar-chart/constants';

/**
 * Fetch order data
 *
 * @param {T} order_id
 * @param {V} order_by
 * @param {'ASC' | 'DESC'} sort_by
 * @param {number} limit
 *
 * @template {import('./types').OrderDimension} V
 * @template {number} T
 *
 * @returns {string}
 */
const getOrderDataUrl = (order_id, order_by, sort_by, limit = 10) =>
  `${BACKEND_ROOT}/order?order_id=${order_id}&order_by=${order_by}&sort_by=${sort_by}&limit=${limit}`;

export default getOrderDataUrl;
