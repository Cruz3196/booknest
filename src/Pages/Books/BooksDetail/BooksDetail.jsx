import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from "axios"; 

const BooksDetail = () => {
  const { id } = useParams();
  const [ bookDetails, setBookDetails ] = useState(null);
  const [ reviews, setReviews ] = useState(false);
  

  const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API;

  
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
        );
        setBookDetails(response.data.volumeInfo);
      }catch (error){
        console.error("Error fetvching book details:", error);
      }
    };

    const fetchReviews = async() => {
      const mockReviews = [
        { id: 1, reviewer: "John Doe", content: "Amazing book!" },
        { id: 2, reviewer: "Jane Smith", content: "Very informative and well-written." },
      ];
      setReviews(mockReviews);
    };

    fetchBookDetails();
    fetchReviews();
  }, [id, API_KEY]);

  if (!bookDetails) {
    return <p>Loading Books Details..</p>;
  }

  return (
  <Container>
    <Row className="my-4">
      <Col md={4}>
        <img
          src={bookDetails.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
          alt={bookDetails.title}
          className="img-fluid"
        />
      </Col>
      <Col md={8}>
        <h1>{bookDetails.title}</h1>
        <p>
          <strong>Author:</strong>{" "}
          {bookDetails.authors ? bookDetails.authors.join(", ") : "Unknown Author"}
        </p>
        <p>
          <strong>Description:</strong> {bookDetails.description || "No description available."}
        </p>
        <p>
          <strong>Average Rating:</strong> {bookDetails.averageRating || "Not rated"} / 5
        </p>
        <Button variant="primary" className="me-2">Add to Cart</Button>
        <Button variant="secondary">Add to Wishlist</Button>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col>
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="mb-3">
              <strong>{review.reviewer}</strong>
              <p>{review.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </Col>
    </Row>
  </Container>
  )
}

export default BooksDetail