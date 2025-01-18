import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <div className="container">
        <h2>Ready to Start Your Reading Journey?</h2>
        <p>Sign up now and access our exclusive collection of e-books!</p>
        <Link to="/books">
            <button className="btn btn-success mt-3">Get Started</button>
        </Link>
    </div>
  );
};

export default CallToAction;
