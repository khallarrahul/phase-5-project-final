import React from 'react';
import { NavLink } from 'react-router-dom';

function Carousel() {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="https://images.macrumors.com/t/oklWCcyyKTyqhWo3jQJuU_XQd2M=/1600x0/article-new/2022/11/iPhone-14-Pro-Purple-Side-Perspective-Feature-Purple.jpg"
            alt="First slide"
            style={{ height: '450px' }}
          />
           <div class="carousel-caption d-none d-md-block">
                <h2>COMING SOON!</h2>
                <p>Presenting Iphone 15 Pro Max</p>
            </div>
        </div>
        <div className="carousel-item">
            <NavLink to='/product/13'>
          <img
            className="d-block w-100"
            src="https://pbs.twimg.com/media/EFAnXGnWwAchHC1.jpg"
            alt="Second slide"
            style={{ height: '450px' }} 
          />
          </NavLink>
            <div class="carousel-caption d-none d-md-block">
                <h2>FOGG PERFUMES</h2>
                <p>Grab the deal now!</p>
            </div>
        </div>
        <div className="carousel-item">
            <NavLink to='/product/6'>
          <img
            className="d-block w-100"
            src="https://www.apple.com/v/macbook-pro-13/p/images/meta/macbook-pro-13_overview__bcsyunk73i2a_og.jpg?202305120451"
            alt="Third slide"
            style={{ height: '450px' }}
          />
          </NavLink>
            <div class="carousel-caption d-none d-md-block">
                <h2>MACBOOK PRO!</h2>
                <p>Its here! Shop now and make it yours.</p>
            </div>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carousel;
