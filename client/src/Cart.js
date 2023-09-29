import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from your API
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

  const handleCheckout = () => {
    // Send a POST request to initiate the checkout process
    fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          // Checkout successful, you can navigate to a checkout page
          // or handle the success scenario as needed
        } else {
          console.error('Failed to initiate checkout');
        }
      })
      .catch((error) => {
        console.error('Error initiating checkout', error);
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
              <button className='btn btn-primary' onClick={handleCheckout}>
                Checkout
              </button>
            </NavLink>
      </div>
    </div>
  );
}

export default Cart;
