import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar } from '@fortawesome/free-solid-svg-icons';

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [reviewBody, setReviewBody] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
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
    fetch('/check_session')
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Not logged in');
        }
      })
      .then((data) => {
        setLoggedIn(true);
      })
      .catch((error) => {
        setLoggedIn(false); 
      });
  }, []);

  useEffect(() => {
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
      alert('Showing review form');
    } else {
      history.push('/login');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      review_body: reviewBody,
      rating,
    };
 
    fetch(`/reviews/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => {
        if (res.status === 201) {
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
          
          setReviewBody('');
          setRating(0);
        } else if (res.status === 401) {
 
          alert('You are not logged in. Please log in to post a review.');
        } else {
 
          alert('Error posting review. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error posting review:', error);
      });
  };

  const addToCart = () => {
    if (loggedIn) {

      fetch(`/cart/items/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }), 
      })
        .then((res) => {
          if (res.status === 201) {
            setAddedToCart(true);
            alert('Product added to cart successfully');
          } else if (res.status === 401) {
            alert('You are not logged in. Please log in to add to cart.');
          } else {
            alert('Error adding product to cart. Please try again later.');
          }
        })
        .catch((error) => {
          console.error('Error adding product to cart:', error);
        });
    } else {
      history.push('/login');
    }
  };

  if (!product) {
    return <h1 className="container mt-5">Loading...</h1>;
  }

  function calculateAverageRating(reviews){
    if (reviews.length === 0){
      return 0;
    }
    const totalRating = reviews.reduce((accumulator, review) => accumulator + review.rating, 0)
    return totalRating/ reviews.length
  }

  const averageRating = calculateAverageRating(reviews)

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
          <div> <FontAwesomeIcon icon={faStar} /> {averageRating.toFixed(2)} / 5</div>
          <h1>${product.price}</h1>
          <div className='col-3'>
          <input
            type="number"
            min="1"
            max="10"
            className="form-control form-control-sm"
            defaultValue="1"
            value={quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (value <= 0) {
                return;
              } else if(value > 10){
                return
              }
              setQuantity(value);
            }}
          />
          </div>
          <div className="btn-group mt-2"> 
  <button
    onClick={addToCart}
    className={`btn btn-secondary ${addedToCart ? 'disabled' : ''}`}
  >
    {addedToCart ? 'Added to Cart' : 'Add to Cart'}
  </button>

  <button onClick={handleAddReviewClick} className='btn btn-secondary'>
    Add a Review
  </button>
</div>
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
                  onChange={(e) => {
                    const value = e.target.value;
                    if(value <= 0){
                      return;
                    }
                    setRating(Number(value))}}
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
          <h3 className='col-12'>Reviews </h3>    
          {reviews.map((review) => (
            <div className='col' key={review.id}>
              <div className='card'>
                <div className='card-body'>
                  <h5 className="d-flex justify-content-between"> 
                    <div>
                      <FontAwesomeIcon icon={faStar} />
                      <span className='card-title text-left'>{review.rating}</span>
                    </div>
                  </h5>
                  <h1 className='card-text text-center'>{review.review_body}</h1>
                  <h5 className='text-right'>
                    <FontAwesomeIcon icon={faUser} /> {review.user.username}
                  </h5>

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
