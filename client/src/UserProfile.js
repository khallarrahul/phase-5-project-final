import React, {useEffect, useState} from 'react';
import './UserProfile.css';
import { useHistory } from 'react-router-dom';

function UserProfile({handleLogout}) {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState('');
  const [paymentCard, setPaymentCard] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const history = useHistory()

  useEffect(() => {
    fetch('/api/user', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Not logged in');
        }
      })
      .then((data) => {
        console.log(data)
        setUser(data);
        setAddress(data.address || '');
        setPaymentCard(data.payment_card || '');
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteProfile = () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
  
    if (confirmed) {
      fetch('/api/user', {
        method: 'DELETE',
        credentials: 'include',
      })
        .then((response) => {
          if (response.status === 200) {
            handleLogout()
            history.push('/');
          } else {
            console.error('Failed to delete user profile');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  const handleSaveChanges = () => {
    fetch('/api/user', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        payment_card: paymentCard,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setUser({ ...user, address, payment_card: paymentCard });
          setIsEditMode(false);
        } else {

          console.error('Failed to update user profile');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
 

  return (
    <div>
    {user && (
      <div className="container-xl px-4 mt-4">
        <nav className="nav nav-borders">
          <a className="nav-link active ms-0" href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details" target="__blank">
            Profile
          </a>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img className="img-account-profile rounded-circle mb-2" src="https://ethglobal.s3.amazonaws.com/reczsLzwOpU19idpk/logo.png" alt="" />
                <div className="small font-italic text-muted mb-4">Feature coming soon</div>
                <button className="btn btn-primary" type="button" disabled>
                  Upload new image
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">
                Account Details
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      value={user.username}
                      disabled
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        value={user.first_name}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        value={user.last_name}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      value={user.email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="address">
                      Home address
                    </label>
                    <input
                      className="form-control"
                      type="address"
                      placeholder="Enter your home address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        Phone number
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="tel"
                        value={user.phone_number}
                        disabled
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="payment_card">
                        Payment Card
                      </label>
                      <input
                        className="form-control"
                        id="inputOrgName"
                        type="text"
                        placeholder="Enter your card number"
                        value={paymentCard}
                        onChange={(e) => setPaymentCard(e.target.value)}
                        disabled={!isEditMode}
                      />
                    </div>
                  </div>
                  {!isEditMode ? (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => setIsEditMode(true)}
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button 
                        className="btn btn-danger me-2"
                        type="button"
                        onClick={handleDeleteProfile}
                        >       
                        DELETE PROFILE
                      </button>
                      <button
                        className="btn btn-primary me-2"
                        type="button"
                        onClick={handleSaveChanges}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => setIsEditMode(false)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default UserProfile;