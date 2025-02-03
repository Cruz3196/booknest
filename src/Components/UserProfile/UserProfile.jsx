import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";


function Profile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]); // Favorite books state
  const [cart, setCart] = useState([]); // Shopping cart state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        fetchUserData(currentUser.uid); // Fetch user-specific data
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Simulated fetch function (replace with database retrieval)
  const fetchUserData = (userId) => {
    // Example data - replace with Firebase or backend calls
    setFavorites([
      { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "https://via.placeholder.com/100" },
      { id: "2", title: "1984", author: "George Orwell", image: "https://via.placeholder.com/100" },
    ]);

    setCart([
      { id: "3", title: "Dune", author: "Frank Herbert", image: "https://via.placeholder.com/100" },
    ]);
  };

  return (
    <Container className="py-5">
      {user ? (
        <div className="text-center">
          {/* Profile Info Card */}
          <Card className="shadow-lg mb-4 p-4" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-circle mb-3"
              width="120"
            />
            <h2>{user.displayName || "User"}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <Button
              variant="danger"
              onClick={() => auth.signOut().then(() => navigate("/"))}
              className="mt-3"
            >
              Logout
            </Button>
          </Card>

          {/* Favorite Books Section */}
          <section className="my-4">
            <h3>Your Favorite Books</h3>
            <Row className="justify-content-center">
              {favorites.length > 0 ? (
                favorites.map((book) => (
                  <Col md={4} key={book.id} className="mb-3">
                    <Card>
                      <Card.Img variant="top" src={book.image} />
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>{book.author}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Alert variant="info">No favorite books yet.</Alert>
              )}
            </Row>
          </section>

          {/* Shopping Cart Section */}
          <section className="my-4">
            <h3>Your Shopping Cart</h3>
            <Row className="justify-content-center">
              {cart.length > 0 ? (
                cart.map((book) => (
                  <Col md={4} key={book.id} className="mb-3">
                    <Card>
                      <Card.Img variant="top" src={book.image} />
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>{book.author}</Card.Text>
                        <Button variant="danger">Remove</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Alert variant="info">Your cart is empty.</Alert>
              )}
            </Row>
          </section>

          {/* Browse Books Button */}
          <Button variant="primary" onClick={() => navigate("/books")} className="mt-4">
            Browse Books
          </Button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </Container>
  );
}

export default Profile;
