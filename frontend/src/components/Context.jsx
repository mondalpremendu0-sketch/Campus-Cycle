import { AlertTriangle, TrendingDown, BookOpen, Leaf } from 'lucide-react';
import './Context.css';

export default function Context() {
  return (
    <section id="problem" className="context-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge">The Problem</div>
          <h2>The Invisible Waste Cycle</h2>
          <p className="max-w-2xl mx-auto">
            Every semester, Indian college campuses witness an enormous waste of value. 
            Hostel dustbins overflow at end-of-semester. Local scrap buyers purchase items for pennies and resell them at huge markups.
          </p>
        </div>

        <div className="context-grid">
          <div className="context-card problem-card">
            <div className="icon-wrapper problem-icon">
              <AlertTriangle size={32} />
            </div>
            <h3>Graduating Students</h3>
            <p>Abandon or throw away textbooks, lab coats, bicycles, and hostel supplies because there's no structured way to sell them before leaving campus.</p>
          </div>

          <div className="context-card versus">
            <span>VS</span>
          </div>

          <div className="context-card problem-card">
            <div className="icon-wrapper problem-icon">
              <TrendingDown size={32} />
            </div>
            <h3>Incoming Juniors</h3>
            <p>Buy the exact same items brand new at maximum retail prices. They struggle to find affordable used alternatives from seniors they don't know.</p>
          </div>
        </div>

        <div className="solution-banner">
          <div className="solution-content">
            <Leaf size={40} className="solution-icon" />
            <div className="solution-text">
              <h3>The Mission LiFE Solution</h3>
              <p>Reimagining physical resource flow to save money and build a circular mindset inside campus gates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
