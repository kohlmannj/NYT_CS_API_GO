import * as d3 from 'd3';
import { BACKEND_ROOT } from './views/bar-chart/constants';

/**
 * Fetch order data
 *
 * @param {T} order_id
 * @param {V} order_by
 * @param {'ASC' | 'DESC'} sort_by
 * @param {number} limit
 * @param {RequestInit} [initOptions]
 *
 * @template {import('./types').OrderDimension} V
 * @template {number} T
 *
 * @returns {Promise<import('./types').OrderData<V, T>>}
 */
const fetchOrderData = (order_id, order_by, sort_by, limit = 10, initOptions) =>
  d3.json(
    `${BACKEND_ROOT}/order?order_id=${order_id}&order_by=${order_by}&sort_by=${sort_by}&limit=${limit}`,
    initOptions
  );

export default fetchOrderData;
