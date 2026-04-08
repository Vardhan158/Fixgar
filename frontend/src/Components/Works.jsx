import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Choose Service",
    description:
      "Select from a wide range of home services like plumbing, electrical, carpentry, and more.",
    accent: "#3a85d4",
    accentLight: "#edf4fc",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <rect width="40" height="40" rx="12" fill="#edf4fc"/>
        <path d="M12 28C12 28 14 20 20 18C24.5 16.2 30 17 30 11C30 7 26 5 22 5C19.5 5 17.5 6.2 17.5 6.2L21 10C21 10 24.5 9.2 25 12C25.5 14.8 22 16 19 17C14.5 18.5 11.5 23.5 11 27L12 28Z" fill="#3a85d4"/>
        <line x1="11" y1="28" x2="7" y2="33" stroke="#3a85d4" strokeWidth="2.8" strokeLinecap="round"/>
        <circle cx="28" cy="30" r="5" fill="#b8882a" opacity="0.2"/>
        <path d="M26 30h4M28 28v4" stroke="#b8882a" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Book a Slot",
    description:
      "Pick your preferred date and time that suits your schedule — we work around you.",
    accent: "#b8882a",
    accentLight: "#fdf6e8",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <rect width="40" height="40" rx="12" fill="#fdf6e8"/>
        <rect x="8" y="11" width="24" height="22" rx="4" fill="none" stroke="#b8882a" strokeWidth="1.8"/>
        <path d="M8 17h24" stroke="#b8882a" strokeWidth="1.8"/>
        <circle cx="14" cy="8" r="1.8" fill="#b8882a"/>
        <circle cx="26" cy="8" r="1.8" fill="#b8882a"/>
        <line x1="14" y1="8" x2="14" y2="13" stroke="#b8882a" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="26" y1="8" x2="26" y2="13" stroke="#b8882a" strokeWidth="1.8" strokeLinecap="round"/>
        <rect x="13" y="22" width="5" height="5" rx="1.5" fill="#b8882a" opacity="0.35"/>
        <rect x="22" y="22" width="5" height="5" rx="1.5" fill="#b8882a" opacity="0.75"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Get It Fixed",
    description:
      "Our verified professionals arrive on time and get the job done efficiently — guaranteed.",
    accent: "#4caf7d",
    accentLight: "#edf8f2",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <rect width="40" height="40" rx="12" fill="#edf8f2"/>
        <circle cx="20" cy="14" r="6" fill="#4caf7d" opacity="0.2" stroke="#4caf7d" strokeWidth="1.6"/>
        <path d="M17 14a3 3 0 1 1 3 3" stroke="#4caf7d" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M10 34c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#4caf7d" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M15 27l3.5 3.5L25 24" stroke="#4caf7d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

const Works = () => {
  const [sectionRef, sectionInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=DM+Serif+Display&display=swap');

        .hiw * { box-sizing: border-box; }

        .hiw {
          font-family: 'Sora', sans-serif;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        /* Top / bottom border accent */
        .hiw::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e4dcd0 30%, #e4dcd0 70%, transparent);
        }
        .hiw::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e4dcd0 30%, #e4dcd0 70%, transparent);
        }

        /* Faint dot grid */
        .hiw-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #d4c9b8 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.3;
          pointer-events: none;
        }

        .hiw-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }

        /* Header */
        .hiw-header {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .hiw-header.show { opacity: 1; transform: translateY(0); }

        .hiw-eyebrow {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b8882a;
          background: #fdf6e8;
          border: 1px solid #f0ddb0;
          border-radius: 100px;
          padding: 4px 14px;
          margin-bottom: 1.1rem;
        }

        .hiw-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 2.9rem);
          color: #1a1714;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 0.75rem;
        }
        .hiw-title-accent { color: #3a85d4; }

        .hiw-subtitle {
          font-size: 1rem;
          color: #8a7e72;
          max-width: 420px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* Grid */
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          position: relative;
        }

        /* Connector line between cards */
        .hiw-connector {
          position: absolute;
          top: 48px;
          left: calc(33.33% - 10px);
          right: calc(33.33% - 10px);
          height: 1.5px;
          background: linear-gradient(90deg, #e0d8cc 0%, #b8882a 50%, #e0d8cc 100%);
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.6s ease 0.5s;
        }
        .hiw-connector.show { opacity: 1; }

        /* Card */
        .hiw-card {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border: 1px solid #ece5da;
          border-radius: 20px;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: default;
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.5s ease,
            transform 0.5s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }
        .hiw-card.show {
          opacity: 1;
          transform: translateY(0);
        }
        .hiw-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(30, 20, 10, 0.1);
          border-color: #d4c9b8;
        }

        /* Step number badge */
        .hiw-step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 0.7rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #c8bfb4;
          margin-bottom: 1rem;
        }

        /* Icon wrapper */
        .hiw-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.4rem;
          transition: transform 0.25s ease;
        }
        .hiw-card:hover .hiw-icon-wrap {
          transform: scale(1.08) rotate(-3deg);
        }

        .hiw-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          color: #1a1714;
          margin: 0 0 0.6rem;
          letter-spacing: -0.01em;
        }

        .hiw-card-desc {
          font-size: 0.875rem;
          color: #8a7e72;
          line-height: 1.7;
          margin: 0;
        }

        /* Bottom accent line on card (colored per step) */
        .hiw-card-bar {
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 3px;
          border-radius: 0 0 20px 20px;
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .hiw-card:hover .hiw-card-bar { opacity: 1; }

        /* Bottom CTA */
        .hiw-cta {
          text-align: center;
          margin-top: 3.5rem;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s ease 0.7s, transform 0.5s ease 0.7s;
        }
        .hiw-cta.show { opacity: 1; transform: translateY(0); }

        .hiw-cta-btn {
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 12px 32px;
          border-radius: 100px;
          background: #1a1714;
          color: #fff;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .hiw-cta-btn:hover { background: #b8882a; transform: translateY(-2px); }
        .hiw-cta-btn svg { width: 14px; height: 14px; }

        .hiw-cta-note {
          font-size: 0.75rem;
          color: #b0a496;
          margin-top: 0.75rem;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hiw-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .hiw-connector { display: none; }
          .hiw-inner { padding: 4rem 1.5rem; }
        }
      `}</style>

      <section className="hiw" ref={sectionRef}>
        <div className="hiw-bg" />
        <div className="hiw-inner">

          {/* Header */}
          <div className={`hiw-header${sectionInView ? " show" : ""}`}>
            <div className="hiw-eyebrow">Simple Process</div>
            <h2 className="hiw-title">
              How <span className="hiw-title-accent">FixGar</span> Works
            </h2>
            <p className="hiw-subtitle">
              Book trusted home services in just 3 simple steps
            </p>
          </div>

          {/* Cards */}
          <div className="hiw-grid">
            {/* Connector line */}
            <div className={`hiw-connector${sectionInView ? " show" : ""}`} />

            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`hiw-card${sectionInView ? " show" : ""}`}
                style={{ transitionDelay: sectionInView ? `${0.15 + i * 0.12}s` : "0s" }}
              >
                <div className="hiw-step-num">STEP {step.number}</div>

                <div
                  className="hiw-icon-wrap"
                  style={{ background: step.accentLight }}
                >
                  {step.icon}
                </div>

                <h3 className="hiw-card-title">{step.title}</h3>
                <p className="hiw-card-desc">{step.description}</p>

                <div
                  className="hiw-card-bar"
                  style={{ background: step.accent }}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`hiw-cta${sectionInView ? " show" : ""}`}>
            <a href="/book" className="hiw-cta-btn">
              Book Your First Service
              <svg viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <p className="hiw-cta-note">No subscription required · Pay per service</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Works;