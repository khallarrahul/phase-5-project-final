import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [reviewBody, setReviewBody] = useState('');
  const [rating, setRating] = useState(0);
  const history = useHistory();

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

  useEffect(() => {
    // Check if the user is logged in by making a request to the CheckSession endpoint
    fetch('/check_session')
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Not logged in');
        }
      })
      .then((data) => {
        setLoggedIn(true); // User is logged in
      })
      .catch((error) => {
        setLoggedIn(false); // User is not logged in
      });
  }, []);

  const handleAddReviewClick = () => {
    if (loggedIn) {
      // Allow the user to add a review (you need to implement this)
      // For example, you can show a review form
      // In this example, we use a simple alert
      alert('Showing review form');
    } else {
      // Redirect the user to the login page
      history.push('/login');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Handle the review submission
    const reviewData = {
      review_body: reviewBody,
      rating,
    };
    // Send the review data to the server
    fetch(`/reviews/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => {
        if (res.status === 201) {
          // Review was posted successfully, you can redirect or show a confirmation message
          alert('Review posted successfully');
          // For example, you can redirect to the product page
          // history.push(`/product/${productId}`);
        } else if (res.status === 401) {
          // User is not logged in, you can handle this case
          alert('You are not logged in. Please log in to post a review.');
          // For example, you can redirect to the login page
          // history.push('/login');
        } else {
          // Handle other error cases
          alert('Error posting review. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error posting review:', error);
      });
  };

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
        <button onClick={handleAddReviewClick}>
          Add a Review
        </button>

        {loggedIn && (
          <div>
            <h3>Add a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div>
                <label htmlFor="reviewBody">Review:</label>
                <textarea
                  id="reviewBody"
                  name="reviewBody"
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="rating">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <button type="submit">Submit Review</button>
              </div>
            </form>
          </div>
        )}
        {/* You can display other product details here */}
      </div>
    </div>
  );
}

export default Product;

