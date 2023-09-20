import React, { useState, useEffect } from 'react';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your API
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        // Update the state with the fetched products
        setProducts(data.products);
      });
  }, []);

  const productMapper = products.map((product) => (
    <li key={product.id}>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '300px', height: '200px' }} 
      />
      <p>Price: ${product.price}</p>
      <button className="btn btn-primary">Add to Cart</button>
    </li>
  ))

  return (
    <div>
      <h1>Choose from our exclusive collection</h1>
      <ul>
        {productMapper}
      </ul>
    </div>
  );
}

export default Home;
