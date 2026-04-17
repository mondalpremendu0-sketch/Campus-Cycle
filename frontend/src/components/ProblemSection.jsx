import React, { useEffect, useRef } from 'react';
import '../styles/components/shared.css';
import '../styles/components/ProblemSection.css';

const ProblemSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current.querySelectorAll('.problem-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="problem" className="section bg-light">
      <div className="container">
        <div className="section-header">
          <h2>The Invisible <span className="accent-text">Waste Cycle</span></h2>
          <p className="subtitle">A closer look at what happens every semester on thousands of campuses.</p>
        </div>
        <div className="problem-grid" ref={sectionRef}>
          <div className="problem-card fade-in">
            <div className="icon-container">
              <i className="fa-solid fa-trash-can"></i>
            </div>
            <h3>Overflowing Dustbins</h3>
            <p>Graduating students throw away or abandon textbooks, lab coats, bicycles, calculators, and hostel supplies. Dustbins overflow at end-of-semester.</p>
          </div>
          <div className="problem-card fade-in delay-1">
            <div className="icon-container">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <h3>Unnecessary Purchases</h3>
            <p>While seniors discard perfectly good items, incoming juniors buy the exact same items brand new, wasting money and resources.</p>
          </div>
          <div className="problem-card fade-in delay-2">
            <div className="icon-container">
              <i className="fa-solid fa-money-bill-trend-up"></i>
            </div>
            <h3>Lost Value</h3>
            <p>Local kabaadiwalas buy valuable items for pennies and resell them at huge markups. The campus community loses out on the inherent economic value.</p>
          </div>
          <div className="problem-card fade-in delay-3">
            <div className="icon-container">
              <i className="fa-solid fa-barrier-block"></i>
            </div>
            <h3>The Barriers</h3>
            <p>Trust issues, logistics, pricing, condition verification, and coordination across batches all stand in the way of a natural exchange.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;