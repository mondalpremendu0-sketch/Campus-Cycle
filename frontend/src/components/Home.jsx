import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ProblemSection from './ProblemSection';
import ChallengeSection from './ChallengeSection';
import CTASection from './CTASection';
import Footer from './Footer';
import '../styles/components/shared.css';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProblemSection />
      <ChallengeSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;