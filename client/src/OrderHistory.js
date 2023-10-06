import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function OrderHistory({wordCountLimiter}) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/order_history')
      .then((res) => res.json())
      .then((orders) => {
        orders.sort((a, b) => {
          const dateA = new Date(a.order_date);
          const dateB = new Date(b.order_date);
          return dateB - dateA;
        });

        setOrders(orders);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function formatDate(datetimeString) {
    const dateObject = new Date(datetimeString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-ml-3 g-4 py-5">
        <h1 className="col-12 col-md-7 col-sm-6">Your Orders</h1>
        <div className="row justify-content-center">
          {orders.length === 0 ? (
            <div className="col-12 text-center">
              <p>Your order history is empty. Tap to start shopping now.</p>
              <NavLink to="/" className="btn btn-primary">
                Start Shopping
              </NavLink>
            </div>
          ) : (
            orders.map((order) => (
              <div className="card w-75 mb-4" key={order.product.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <img
                      src={order.product.image}
                      alt={order.product.brand}
                      style={{ height: '100px', width: '100px' }}
                    />
                    <h1 style={{ fontSize: '24px', width: '650px'}}>
                      {wordCountLimiter(order.product.description)}
                    </h1>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">
                      Units:{' '}
                      <h1 style={{ fontSize: '18px' }}>{order.quantity}</h1>
                    </p>
                    <p className="card-text">
                      Price:{' '}
                      <h1 style={{ fontSize: '18px' }}>
                        ${(order.quantity) * (order.product.price)}
                      </h1>
                    </p>
                    <p className="card-text">
                      Order Placed:{' '}
                      <h1 style={{ fontSize: '18px' }}>
                        {formatDate(order.order_date)}
                      </h1>
                    </p>
                  </div>
                  <NavLink to={`/product/${order.product.id}`} className="btn btn-primary">
                    Buy Again
                  </NavLink>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;