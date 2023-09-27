import React, { useState, useEffect } from 'react';

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
        // Update the state with the fetched cart items
        setCartItems(data.cart_items);
      });
  }, []);

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <div>{item.product.title}</div>
            <img src={item.product.image} alt={item.product.title}/>
            <div>Quantity: {item.quantity}</div>
            <div>Price: ${item.product.price}</div>
          </li>
        ))}
      </ul>
      <div>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default Cart;
