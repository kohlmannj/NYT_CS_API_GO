import * as React from 'react';
import useComponentSize from '@rehooks/component-size';
import createSvg from '../views/bar-chart/createSvg';
import getOrderDataUrl from '../getOrderDataUrl';
import useFetchData from '../hooks/useFetchData';
import { height, margin } from '../views/bar-chart/chartConstants';

export default function OrderChart({
  orderId,
  orderBy = 'section',
  sortBy = 'DESC',
  limit = 10,
  lineId,
  title,
}) {
  /** @type {import('react').RefObject<HTMLDivElement>} */
  const root = React.useRef(null);
  const { width } = useComponentSize(root);

  const [dimensionLevelData, dimensionLevelDataLoading] = useFetchData(
    getOrderDataUrl(orderId, orderBy, sortBy, limit)
  );

  const [orderOverAllData, orderOverAllDataLoading] = useFetchData(
    getOrderDataUrl(orderId, 'order_overall', 'DESC', 10)
  );

  // Re-render D3 chart in response to data changes
  React.useEffect(() => {
    if (root.current !== null && dimensionLevelData !== null && orderOverAllData !== null) {
      const svg = createSvg(root.current, dimensionLevelData, title, orderOverAllData, lineId);
      return () => svg.remove();
    }
    return () => {};
  }, [dimensionLevelData, lineId, orderOverAllData, root, title, width]);

  return (
    <div
      className="flexRowItem"
      style={{
        height: height + margin.top + margin.bottom,
        opacity: dimensionLevelDataLoading || orderOverAllDataLoading ? 0.2 : 1,
      }}
      ref={root}
    />
  );
}
