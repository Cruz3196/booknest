import React from 'react';
import Hero from './HomeComponents/Hero';
import FeaturedGenres from './HomeComponents/FeaturedGenres.jsx';
import Bestsellers from './HomeComponents/Bestsellers';
import CallToAction from './HomeComponents/CallToAction';

const Home = () => {
  return (
    <>
      <Hero />


      <section id="featured-genres" className="py-5">
        <FeaturedGenres />
      </section>


      <section id="bestsellers" className="py-5 bg-light">
        <Bestsellers />
      </section>

      <section id="cta" className="py-5 text-center">
        <CallToAction />
      </section>
    </>
  );
};

export default Home;
