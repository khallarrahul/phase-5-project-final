import React, { useState, useEffect } from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const addToCart = (productId) => {
    fetch(`/cart/items/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        setAddedToCart({ ...addedToCart, [productId]: true });
      });
  };

  return (
    <div>
      <h1>Choose from our exclusive collection</h1>
      <div className='container py-5'>
        <h1 className='text-center'>Products</h1>
        <div className='row row-cols-1 row-cols-md-3 g-4 py-5'>
          {products.map((product) => (
            <div className='col' key={product.id}>
              <div className='card'>
                <NavLink to={`/product/${product.id}`} className='card-link'>
                  <img src={product.image} className='card-img-top' alt={product.title} />
                  <div className='card-body'>
                    <h5 className='card-title'>{product.title}</h5>
                  </div>
                </NavLink>
                <div className='card-body'>
                  <div className='d-flex justify-content-around mb-5'>
                    <h3 className='price'>${product.price}</h3>
                    <button
                      className='btn btn-primary'
                      onClick={() => addToCart(product.id)}
                      disabled={addedToCart[product.id]}
                    >
                      {addedToCart[product.id] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h1>FOOTER....................................................................................................</h1>
    </div>
  );
}

export default Home;
