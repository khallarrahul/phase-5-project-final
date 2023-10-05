import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch('/cart/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.cart_items)
        setCartItems(data.cart_items);
        calculateTotalPrice(data.cart_items);
      });
  }, []);

  function wordCountLimiter(title, limit) {
    const words = title.split(' ');
    if (words.length <= limit) {
      return title;
    } else {
      return words.slice(0, limit).join(' ') + '...';
    }
  }
  

  const calculateTotalPrice = (items) => {
    const total = items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleDeleteItem = (cartItemId) => {
    fetch(`/cart/items/${cartItemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item.id !== cartItemId)
          );
          calculateTotalPrice(
            cartItems.filter((item) => item.id !== cartItemId)
          );
        } else {
          console.error('Failed to delete item from cart');
        }
      })
      .catch((error) => {
        console.error('Error deleting item from cart', error);
      });
  };

  return (
    <section className="container mt-5">
      <div className="row row-cols-1 row-cols-ml-3 g-4 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <h1 className="col-12 col-md-7 col-sm-6">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="col-12 text-center">
                <p>Your shopping cart is empty. Tap to start shopping now.</p>
                <NavLink to="/" className="btn btn-primary">
                  Start Shopping
                </NavLink>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="card mb-4">
                  <div className="card-body p-4">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                      <NavLink to={`/product/${item.product.id}`}>
                        <img
                          src={item.product.image}
                          className="img-fluid"
                          alt={item.product.title}
                          style={{ width: '150px', height: '100px' }}
                        />
                      </NavLink>
                      </div>
                      <div className="col-md-2 d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Name</p>
                          <p className="lead fw-normal mb-0">
                            {wordCountLimiter(item.product.title, 2)}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2 d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Quantity</p>
                          <p className="lead fw-normal mb-0">{item.quantity}</p>
                        </div>
                      </div>
                      <div className="col-md-2 d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Price</p>
                          <p className="lead fw-normal mb-0">
                            ${item.product.price}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2 d-flex justify-content-center">
                        <div>
                          <p className="small text-muted mb-4 pb-2">Total</p>
                          <p className="lead fw-normal mb-0">
                            ${(item.quantity) * (item.product.price)}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2 d-flex justify-content-center">
                        <div>
                          <p
                            className="lead fw-normal mb-0"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <button type="button" className="btn btn-danger">
                              <i className="fas fa-trash fa-lg"></i>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className="card mb-5">
                <div className="card-body p-4">
                  <div className="float-end">
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">Order total:</span>{' '}
                      <span className="lead fw-normal">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="d-flex justify-content-end">
                <NavLink to="/">
                  <button type="button" className="btn btn-light btn-lg me-2">
                    Continue shopping
                  </button>
                </NavLink>
                <NavLink to="/checkout">
                  <button className="btn btn-primary btn-lg">Checkout</button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
