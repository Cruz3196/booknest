import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Bestsellers = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API;
  const BESTSELLERS_QUERY = 'bestsellers';

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${BESTSELLERS_QUERY}&key=${API_KEY}`
        );

        const formattedBooks = response.data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || 'No title available',
          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
          image: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150',
        }));

        setBooks(formattedBooks);
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, [API_KEY]);

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div className="container">
      <h2 className="text-center mb-4">Bestselling Books</h2>
      <div className="row d-flex justify-content-center">
        {books.slice(0,4).map((book) => (
          <div className="col-md-3 mb-4 " key={book.id}>
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
