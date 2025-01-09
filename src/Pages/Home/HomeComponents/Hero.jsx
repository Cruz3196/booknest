import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <Container fluid>
        <Row 
        style={{
          height: '100vh'
      }}>
        <Col 
          style={{
            border: '1px solid blue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
          <div className='left-sideHero' 
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              textAlign: 'left',
              border: '1px solid red',
          }}>
            <div className='Header-Hero' 
              style={{
                textTransform: 'uppercase'                
              }}>
              <h1>Your year in books 2024</h1>
            </div>
            <div className='paragraph-Hero'
              style={{
                textTransform: 'capitalize',                
              }}
            >
              <p>
                Check out your year in reading! <br/> explore fun state like pages read, longest book, and more. 
              </p>
            </div>
            <Button variant="primary">
              Your Reads 2024
            </Button>
          </div>
        </Col>

{/* RIGHT SIDE OF THE HERO SECTION  */}

        <Col 
          style={{
            border: '1px solid blue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div 
              className='right-sideHero' 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
            }}>
                photo
            </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Hero