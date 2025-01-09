import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

const Books = () => {
  const [booksByGenre, setBooksByGenre] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyAYXtyHt6qPuYR2VcP89QbgYUjJ5ebenTQ"; //API KEY 
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

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1 className="text-center">Listopia</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form onSubmit={handleSearch} className="align-items-center">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search for books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      {loading ? (
        <Row className="mt-4">
          <Col>
            <p>Loading...</p>
          </Col>
        </Row>
      ) : searchResults.length > 0 ? (
        <Row className="mt-4">
          <Col>
            <h2 className="text-center">Search Results</h2>
          </Col>
          {searchResults.map((book) => (
            <Col md={3} key={book.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={book.image} alt={book.title} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
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
                      <Card.Img variant="top" src={book.image} alt={book.title} />
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
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
