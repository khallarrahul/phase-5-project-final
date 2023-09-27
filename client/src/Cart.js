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
    </div>
  );
}

export default Cart;
