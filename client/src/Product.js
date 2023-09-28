import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/products/${productId}`) 
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Product not found');
        }
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title} />
        <p>{product.description}</p>
        <p>Brand: {product.brand}</p>
        <p>Category: {product.category}</p>
        <p>${product.price}</p>
        {/* You can display other product details here */}
      </div>
    </div>
  );
}

export default Product;
