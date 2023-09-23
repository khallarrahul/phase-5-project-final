import React, { useState, useEffect } from 'react';
import './Home.css'

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

  return (
    <div>
      <h1>Choose from our exclusive collection</h1>
      <div className='container py-5'>
        <h1 className='text-center'>Products</h1>
        <div className='row row-cols-1 row-cols-md-3 g-4 py-5'>
          {products.map((product) => (
            <div className='col' key={product.id}>
              <div className='card' >
                <img src={product.image} className='card-img-top' alt={product.title} />
                <div className='card-body'>
                  <h5 className='card-title'>{product.title}</h5>
                  {/* <p className='card-text'>{product.description}</p> */}
                  <div className='d-flex justify-content-around mb-5'>
                    <h3 className='price'>${product.price}</h3> 
                    <button className='btn btn-primary'>Add to Cart</button> 
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
