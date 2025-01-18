import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section text-center text-white" style={{ background: 'blue', height: '60vh' }}>
      <div className="hero-content d-flex flex-column justify-content-center align-items-center h-100">
        <h1>Welcome to Your E-Books Collection</h1>
        <p>Discover thousands of books across every genre.</p>
        <Link to="/books">
          <button className="btn btn-primary mt-3">Browse Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
