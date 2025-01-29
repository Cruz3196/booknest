import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Books, BooksDetail } from './Pages';
import { Header, Footer } from './Components';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BooksDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;