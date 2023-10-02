import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';

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
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>{item.product.title}</div>
            <img src={item.product.image} alt={item.product.title} />
            <div>Quantity: {item.quantity}</div>
            <div>Price: ${item.product.price}</div>
            <button
              className='btn btn-primary'
              onClick={() => handleDeleteItem(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <NavLink to='/checkout'>
              <button className='btn btn-primary'>
                Checkout
              </button>
            </NavLink>
      </div>
    </div>
  );
}

export default Cart;
