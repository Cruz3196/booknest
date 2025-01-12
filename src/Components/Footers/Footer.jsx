import React from 'react';
import { Col, Container, Nav, Row, Stack } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
        <Container fluid>
            <Row  className='text-black p-4' style={{
                backgroundColor: "#F4F1EA",
            }}>
                <Col className='mx-5'>
                    <Stack>
                        <h2>BookNest</h2>
                        <p>Company Tagline</p>
                    </Stack>
                </Col>
                <Col>
                    <Nav className='flex-column fs-5'>
                        Useful Links 
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/About'>About</Nav.Link>
                        <Nav.Link href='/Books'>Books</Nav.Link>
                    </Nav>
                </Col>
                <Col>
                    <h4>Contact Us</h4>
                    <p>email@fakeemail.com</p>
                    <p>phone: 888-888-888</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer