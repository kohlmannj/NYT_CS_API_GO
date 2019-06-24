import * as React from 'react';
import OrderChart from './OrderChart';

const orders = [2480100899, 2521420541];

export default function App() {
  const [orderId, setOrderId] = React.useState(orders[0]);
  const [limit, setLimit] = React.useState(3);

  const onChangeOrderId = e => {
    const nextOrderId = parseInt(e.target.value, 10);
    if (!isNaN(nextOrderId)) {
      setOrderId(nextOrderId);
    }
  };

  const onChangeLimit = e => {
    setLimit(parseInt(e.target.value, 10));
  };

  return (
    <>
      <label htmlFor="orderId">Order ID</label>
      <select name="orderId" onChange={onChangeOrderId} value={orderId}>
        {orders.map(orderId => (
          <option key={orderId} value={orderId}>
            {orderId}
          </option>
        ))}
      </select>

      <label htmlFor="limit">Limit</label>
      <input
        name="limit"
        type="number"
        value={limit}
        step="1"
        min="1"
        max="12"
        onChange={onChangeLimit}
      />
      <div className="flexRow">
        <OrderChart
          title="Top Section"
          orderId={orderId}
          orderBy="section"
          sortBy="DESC"
          lineId="overAllTop"
          limit={limit}
        />
        <OrderChart
          title="Bottom Section"
          orderId={orderId}
          orderBy="section"
          sortBy="ASC"
          lineId="overAllBottom"
          limit={limit}
        />
      </div>
    </>
  );
}
