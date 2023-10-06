import React, { useState, useEffect} from 'react';
import './Home.css';
import { NavLink, useHistory } from 'react-router-dom';
import Carousel from './Carousel';

function Home({ searchQuery }) {
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        if (searchQuery) {
          const filteredProducts = data.products.map((product) => ({
            ...product,
            quantity: 1, 
          })).filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProducts(filteredProducts);
        } else {
          const productsWithQuantity = data.products.map((product) => ({
            ...product,
            quantity: 1,
          }));
          setProducts(productsWithQuantity);
        }
      });
  }, [searchQuery]);

  const addToCart = (productId, quantity) => {
    fetch('/check_session')
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          history.push('/login');
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
          .then(() => {
            setAddedToCart({ ...addedToCart, [productId]: true });
            setProducts((prevProducts) => {
              const updatedProducts = prevProducts.map((product) => {
                if (product.id === productId) {
                  return { ...product, quantity };
                }
                return product;
              });
              return updatedProducts;
            });
          });
      })
      .catch((error) => {
        console.error('Error checking session:', error);
      });
  };

  return (
    <div>
      <div className='container py-5'>
        <Carousel />
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
                    <div className='col-3'>
                      <input
                        type='number'
                        min='1'
                        max='10'
                        className='form-control'
                        defaultValue='1'
                        value={product.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value <= 0) {
                            return;
                          } else if (value > 10) {
                            return;
                          }
                          setProducts((prevProducts) => {
                            const updatedProducts = prevProducts.map((p) => {
                              if (p.id === product.id) {
                                return { ...p, quantity: value };
                              }
                              return p;
                            });
                            return updatedProducts;
                          });
                        }}
                      />
                    </div>
                    <button
                      className='btn btn-primary'
                      onClick={() => addToCart(product.id, product.quantity)}
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
