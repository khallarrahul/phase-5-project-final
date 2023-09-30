import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';



function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [reviewBody, setReviewBody] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
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

  useEffect(() => {
    // Fetch reviews for the current product
    fetch(`/reviews/${productId}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Failed to fetch reviews');
        }
      })
      .then((data) => {
        setReviews(data.reviews);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [productId]);

  const handleAddReviewClick = () => {
    if (loggedIn) {
      // Show the review form
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
          // Review posted successfully, fetch and update reviews
          fetch(`/reviews/${productId}`)
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              } else {
                throw new Error('Failed to fetch reviews');
              }
            })
            .then((data) => {
              setReviews(data.reviews);
            })
            .catch((error) => {
              console.error('Error fetching reviews:', error);
            });
          alert('Review posted successfully');
          // Clear the review form fields
          setReviewBody('');
          setRating(0);
        } else if (res.status === 401) {
          // User is not logged in, handle this case as needed
          alert('You are not logged in. Please log in to post a review.');
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
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="col-12 col-md-7 col-sm-6">
          {product.title}
            <br></br>
            <br></br>
            <img src={product.image} alt={product.title} style={{ maxWidth: '100%', height: 'auto' }} />
        </h1>
    
        <div className="col-12 col-md-5 col-sm-6">
          <br></br>
          <h1>{product.description}</h1>
          <h3>Brand: {product.brand}</h3>
          <h5>Category: {product.category}</h5>
          <h1>${product.price}</h1>
          <button onClick={handleAddReviewClick} className='btn btn-secondary'>Add a Review</button>
        </div>

        {loggedIn && (
          <div >
            <br></br>
            <br></br>
            <h3>Add a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div>
                <label htmlFor="reviewBody" className="form-label">Review:</label>
                <textarea
                  id="reviewBody"
                  className="form-control"
                  name="reviewBody"
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="rating"  className="form-label">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  className="form-control"
                  name="rating"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <br></br>
                <button type="submit" className="btn btn-secondary">Submit Review</button>
              </div>
            </form>
          </div>
        )}

        {reviews.length > 0 && (
        <div className='row justify-content-center'>
        <div className='row row-cols-1 row-cols-ml-3 g-4 py-5'>
          <h3 className='col-12'>Reviews</h3>
          <br></br>
          {reviews.map((review) => (
            <div className='col' key={review.id}>
              <div className='card'>
                <div className='card-body'>
                  <br></br>
                  <h5 className='card-title text-center'>Rating: {review.rating}</h5>
                  <p className='card-text text-center'>Comment: {review.review_body}</p>
                  <p className='text-center'>{review.user.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
        
        )}
      </div>
    </div>
  );
}

export default Product;
