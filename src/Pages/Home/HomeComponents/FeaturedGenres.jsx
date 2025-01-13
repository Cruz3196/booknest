import React from 'react';

const genres = ['Fiction', 'Nonfiction', 'Mystery', 'Fantasy', 'Science'];

const FeaturedGenres = () => {
  return (
    <div className="container">
      <h2 className="text-center mb-4">Featured Genres</h2>
      <div className="row">
        {genres.map((genre, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{genre}</h5>
                <button className="btn btn-outline-primary">Explore {genre}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedGenres;
