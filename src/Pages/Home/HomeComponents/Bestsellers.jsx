import React from 'react';

const books = [
  { title: 'Book One', author: 'Author A', image: 'https://via.placeholder.com/150' },
  { title: 'Book Two', author: 'Author B', image: 'https://via.placeholder.com/150' },
  { title: 'Book Three', author: 'Author C', image: 'https://via.placeholder.com/150' },
];

const Bestsellers = () => {
  return (
    <div className="container">
      <h2 className="text-center mb-4">Bestselling Books</h2>
      <div className="row">
        {books.map((book, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card shadow-sm">
              <img src={book.image} alt={book.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestsellers;
