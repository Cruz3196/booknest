import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles

const Books = () => {
  const [booksByGenre, setBooksByGenre] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API; // API KEY
  const genres = ["fiction", "nonfiction", "fantasy", "mystery", "science"]; // GENRE

  const fetchBooksByGenre = async () => {
    setLoading(true);
    const genreData = {};
    try {
      for (const genre of genres) {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${genre}&key=${API_KEY}`
        );

        const formattedBooks = response.data.items.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || "No title available",
          author: item.volumeInfo.authors
            ? item.volumeInfo.authors.join(", ")
            : "Unknown Author",
          image: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
          rating: item.volumeInfo.averageRating || "Not rated",
        }));

        genreData[genre] = formattedBooks;
      }
      setBooksByGenre(genreData);
    } catch (error) {
      console.error("Error fetching books by genre:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; // Don't proceed if search term is empty

    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}`
      );

      const formattedBooks = response.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title || "No title available",
        author: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(", ")
          : "Unknown Author",
        image: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150",
        rating: item.volumeInfo.averageRating || "Not rated",
      }));

      setSearchResults(formattedBooks);
    } catch (error) {
      console.error("Error searching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksByGenre(); // Fetch books for all genres on component mount
  }, []);

  const renderSkeletonCards = () => {
    return Array(12)
      .fill()
      .map((_, index) => (
        <Col sm={3} key={index} className="mb-4">
          <Card>
            <Skeleton height={200} />
            <Card.Body>
              <Skeleton height={20} width="80%" />
              <Skeleton height={15} width="60%" className="mt-2" />
              <Skeleton height={15} width="40%" className="mt-2" />
            </Card.Body>
          </Card>
        </Col>
      ));
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1 className="d-flex justify-content-center">Listopia</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSearch} className="d-flex align-items-center">
            <Form.Group className="w-100 me-2">
              <Form.Control
                type="text"
                placeholder="Search for books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      {loading ? (
        <Row className="mt-4">{renderSkeletonCards()}</Row>
      ) : searchResults.length > 0 ? (
        <Row className="mt-4">
          <Row>
            <Col>
              <h2 className="text-center">Search Results</h2>
            </Col>
          </Row>
          {searchResults.map((book) => (
            <Col md={3} key={book.id} className="mb-4">
            <Card>
              <Link to={`/book/${book.id}`}>
                <Card.Img variant="top" src={book.image} alt={book.title} />
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link to={`/book/${book.id}`}>{book.title}</Link>
                </Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {book.author}
                  <br />
                  <strong>Rating:</strong> {book.rating} / 5
                </Card.Text>
              </Card.Body>
            </Card>
            </Col>
          ))}
        </Row>
      ) : (
        Object.entries(booksByGenre).map(([genre, books]) => (
          <div key={genre}>
            <Row className="mt-5">
              <Col>
                <h2 className="text-center text-capitalize">{genre}</h2>
              </Col>
            </Row>
            <Row className="mt-4">
              {books.length > 0 ? (
                books.map((book) => (
                  <Col md={3} key={book.id} className="mb-4">
                  <Card>
                    <Link to={`/book/${book.id}`}>
                      <Card.Img variant="top" src={book.image} alt={book.title} />
                    </Link>
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/book/${book.id}`}>{book.title}</Link>
                      </Card.Title>
                      <Card.Text>
                        <strong>Author:</strong> {book.author}
                        <br />
                        <strong>Rating:</strong> {book.rating} / 5
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <p>No books found for this genre.</p>
                </Col>
              )}
            </Row>
          </div>
        ))
      )}
    </Container>
  );
};

export default Books;
