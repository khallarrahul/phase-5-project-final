import React, { useState, useEffect } from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);


  const addToCart = (productId, quantity) => {
 
  fetch('/check_session')
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        window.location.href = '/login';
        throw new Error('Not logged in');
      }
    })
    .then(() => {

      alert('Product added to cart successfully');
      fetch(`/cart/items/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAddedToCart({ ...addedToCart, [productId]: true });
        });
    })
    .catch((error) => {
      console.error('Error checking session:', error);
    });
};
  return (
    <div>
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
                    <div className="col-3">
                      <input
                        type="number"
                        min="1"
                        max="10"
                        className="form-control form-control-sm"
                        defaultValue="1"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <button
                      className='btn btn-primary'
                      onClick={() => addToCart(product.id, quantity)}
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
    </div>
  );
}

export default Home;
