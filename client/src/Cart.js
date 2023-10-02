import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('/cart/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data.cart_items);
      });
  }, []);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

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
        } else {
          console.error('Failed to delete item from cart');
        }
      })
      .catch((error) => {
        console.error('Error deleting item from cart', error);
      });
  };

  return (
    <div className='row justify-content-center'>
      <div className='row row-cols-1 row-cols-ml-3 g-4 py-5'>
        <h1 className='col-12'>Your Cart</h1>

        {cartItems.map((item) => (
          <div key={item.id} className='col-md-4 mb-4'>
                    <img
                      src={item.product.image}
                      className='card-img-top'
                      alt={item.product.title}
                      style={ {'width': '500px'}} // Add margin-right to create space
                    />
            <div className='card'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-md-4'>
                  </div>
                  <div className='col-md-8'>
                    <h5 className='card-title'>{item.product.title}</h5>
                    <p className='card-text'>Quantity: {item.quantity}</p>
                    <p className='card-text'>Price: ${item.product.price}</p>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          <NavLink to='/checkout'>
            <button className='btn btn-primary'>Checkout</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Cart;
