import React, { useEffect, useRef } from 'react';
import '../styles/components/shared.css';
import '../styles/components/ChallengeSection.css';

const ChallengeSection = () => {
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

    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="challenge" className="section" ref={sectionRef}>
      <div className="container challenge-container">
        <div className="challenge-image fade-in">
          <div className="circle-illustration">
            <div className="circle c1"></div>
            <div className="circle c2"></div>
            <div className="circle c3">
              <i className="fa-solid fa-leaf"></i>
            </div>
          </div>
        </div>
        <div className="challenge-content fade-in">
          <h2>The Challenge: <br /><span className="accent-text">Reimagine Resource Flow</span></h2>
          <p>We are calling on innovators, students, and campus administrators to rethink how physical resources flow through a college campus across generations of students.</p>

          <ul className="challenge-goals">
            <li>
              <i className="fa-solid fa-check-circle"></i>
              <div>
                <strong>Reduce Waste</strong>
                <span>Prevent perfectly usable items from ending up in landfills.</span>
              </div>
            </li>
            <li>
              <i className="fa-solid fa-check-circle"></i>
              <div>
                <strong>Save Students Money</strong>
                <span>Provide affordable access to essential campus supplies.</span>
              </div>
            </li>
            <li>
              <i className="fa-solid fa-check-circle"></i>
              <div>
                <strong>Build a Circular Mindset</strong>
                <span>Align campus life with the principles of Mission LiFE (Lifestyle for Environment).</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;