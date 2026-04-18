import { Search, ShieldCheck, Handshake, Recycle } from 'lucide-react';
import './HowItWorks.css';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search size={28} />,
      title: "Discover & Connect",
      desc: "Incoming students browse available resources listed by graduating seniors right on campus."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Verify Securely",
      desc: "Items conditions are verified. Internal college IDs ensure a safe, high-trust environment."
    },
    {
      icon: <Handshake size={28} />,
      title: "Meet & Exchange",
      desc: "Coordinate drop-offs at standard campus spots like the canteen or library. No shipping required."
    },
    {
      icon: <Recycle size={28} />,
      title: "Save & Sustain",
      desc: "Students save money, seniors make cash, and the campus avoids massive dumpsters of waste."
    }
  ];

  return (
    <section id="how-it-works" className="how-section section-padding">
      <div className="container">
        <div className="section-header text-center">
          <div className="badge">Closing the Loop</div>
          <h2>How the Circular Economy Works</h2>
          <p className="max-w-2xl mx-auto">
            A frictionless platform built for thousands of campuses simultaneously. Let's redirect value back to students.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div className="step-card" key={index}>
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
