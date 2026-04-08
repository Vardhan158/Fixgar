import React, { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Fast Service",
    description: "Quick response and on-time service delivery at your doorstep — every single time.",
    accent: "#3a85d4",
    accentLight: "#edf4fc",
    stat: "< 60 min",
    statLabel: "avg. response",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="24" cy="24" r="18" fill="#3a85d4" opacity="0.12"/>
        <path d="M27 10l-9 14h8l-3 14" stroke="#3a85d4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Verified Professionals",
    description: "All service providers are background-checked, trained, and rated by real customers.",
    accent: "#4caf7d",
    accentLight: "#edf8f2",
    stat: "300+",
    statLabel: "certified pros",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="24" cy="24" r="18" fill="#4caf7d" opacity="0.12"/>
        <circle cx="24" cy="19" r="6" stroke="#4caf7d" strokeWidth="2" fill="none"/>
        <path d="M13 38c0-6.075 4.925-11 11-11s11 4.925 11 11" stroke="#4caf7d" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="33" cy="17" r="5" fill="#4caf7d" opacity="0.2"/>
        <path d="M30.5 17l1.8 1.8L35 15" stroke="#4caf7d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Affordable Pricing",
    description: "Transparent pricing with no hidden charges. Know the cost before we begin.",
    accent: "#b8882a",
    accentLight: "#fdf6e8",
    stat: "₹149",
    statLabel: "starts from",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="24" cy="24" r="18" fill="#b8882a" opacity="0.12"/>
        <circle cx="24" cy="24" r="13" stroke="#b8882a" strokeWidth="1.8" fill="none"/>
        <path d="M20 19h6a3 3 0 0 1 0 6h-6" stroke="#b8882a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 25h7" stroke="#b8882a" strokeWidth="2" strokeLinecap="round"/>
        <line x1="24" y1="16" x2="24" y2="19" stroke="#b8882a" strokeWidth="2" strokeLinecap="round"/>
        <line x1="24" y1="31" x2="24" y2="34" stroke="#b8882a" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "24/7 Support",
    description: "Our support team is always available to assist you — day or night, any day.",
    accent: "#7c6cd4",
    accentLight: "#f0eefe",
    stat: "24/7",
    statLabel: "live support",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="24" cy="24" r="18" fill="#7c6cd4" opacity="0.12"/>
        <path d="M16 20a8 8 0 0 1 16 0v2c0 1.1.9 2 2 2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1" stroke="#7c6cd4" strokeWidth="1.9" strokeLinecap="round" fill="none"/>
        <path d="M14 24a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3v-2h-4Z" fill="#7c6cd4" opacity="0.35" stroke="#7c6cd4" strokeWidth="1.6"/>
        <path d="M31 24h4a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3v0" stroke="#7c6cd4" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <path d="M21 33c0 1.657 1.343 3 3 3s3-1.343 3-3" stroke="#7c6cd4" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
];

const metrics = [
  { value: "12K+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "50+", label: "Cities Covered" },
  { value: "99%", label: "Satisfaction Rate" },
];

const useInView = (threshold = 0.1) => {
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

const WhyChooseUs = () => {
  const [sectionRef, inView] = useInView(0.08);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=DM+Serif+Display&display=swap');

        .wcu * { box-sizing: border-box; }

        .wcu {
          font-family: 'Sora', sans-serif;
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }
        .wcu::before, .wcu::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e4dcd0 30%, #e4dcd0 70%, transparent);
        }
        .wcu::before { top: 0; }
        .wcu::after  { bottom: 0; }

        /* Layered background */
        .wcu-bg-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, #d4c9b8 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.25;
          pointer-events: none;
        }
        .wcu-bg-blob1 {
          position: absolute;
          top: -200px; left: -150px;
          width: 500px; height: 500px;
          background: radial-gradient(ellipse, #fdf6e8 0%, transparent 70%);
          pointer-events: none;
        }
        .wcu-bg-blob2 {
          position: absolute;
          bottom: -160px; right: -120px;
          width: 420px; height: 420px;
          background: radial-gradient(ellipse, #edf4fc 0%, transparent 70%);
          pointer-events: none;
        }

        .wcu-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }

        /* Header */
        .wcu-header {
          text-align: center;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .wcu-header.show { opacity: 1; transform: translateY(0); }

        .wcu-eyebrow {
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
          margin-bottom: 1rem;
        }
        .wcu-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 2.9rem);
          color: #1a1714;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 0.75rem;
        }
        .wcu-title em { font-style: normal; color: #3a85d4; }
        .wcu-subtitle {
          font-size: 1rem;
          color: #8a7e72;
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* Features grid */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        /* Feature card */
        .wcu-card {
          background: #fff;
          border: 1px solid #ece5da;
          border-radius: 20px;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          cursor: default;
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.45s ease,
            transform 0.45s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .wcu-card.show { opacity: 1; transform: translateY(0); }
        .wcu-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 22px 52px rgba(30,20,10,0.1);
          border-color: #d4c9b8;
        }

        /* Left accent bar on hover */
        .wcu-card-bar {
          position: absolute;
          top: 12%; bottom: 12%;
          left: 0;
          width: 3px;
          border-radius: 0 4px 4px 0;
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .wcu-card:hover .wcu-card-bar { opacity: 1; }

        /* Icon */
        .wcu-icon-wrap {
          width: 76px;
          height: 76px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }
        .wcu-card:hover .wcu-icon-wrap {
          transform: scale(1.1) rotate(-4deg);
        }

        /* Mini stat pill inside card */
        .wcu-stat {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          background: #faf8f5;
          border: 1px solid #ece5da;
          border-radius: 12px;
          padding: 6px 16px;
        }
        .wcu-stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          color: #1a1714;
          line-height: 1;
        }
        .wcu-stat-label {
          font-size: 0.65rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #b0a496;
          margin-top: 2px;
        }

        .wcu-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.15rem;
          color: #1a1714;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .wcu-card-desc {
          font-size: 0.845rem;
          color: #8a7e72;
          line-height: 1.7;
          margin: 0;
        }

        /* Metrics band */
        .wcu-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: #1a1714;
          border-radius: 20px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease 0.55s, transform 0.55s ease 0.55s;
        }
        .wcu-metrics.show { opacity: 1; transform: translateY(0); }

        .wcu-metric {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          text-align: center;
          position: relative;
        }
        .wcu-metric + .wcu-metric::before {
          content: '';
          position: absolute;
          left: 0; top: 20%; bottom: 20%;
          width: 1px;
          background: rgba(255,255,255,0.1);
        }
        .wcu-metric-value {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          color: #b8882a;
          line-height: 1;
          margin-bottom: 6px;
        }
        .wcu-metric-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .wcu-grid    { grid-template-columns: repeat(2, 1fr); }
          .wcu-metrics { grid-template-columns: repeat(2, 1fr); }
          .wcu-metric + .wcu-metric::before { display: none; }
          .wcu-metric:nth-child(odd)::after {
            content: '';
            position: absolute;
            right: 0; top: 20%; bottom: 20%;
            width: 1px;
            background: rgba(255,255,255,0.1);
          }
        }
        @media (max-width: 560px) {
          .wcu-grid    { grid-template-columns: 1fr; }
          .wcu-metrics { grid-template-columns: repeat(2, 1fr); }
          .wcu-inner   { padding: 4rem 1.25rem; }
        }
      `}</style>

      <section className="wcu" ref={sectionRef}>
        <div className="wcu-bg-dots" />
        <div className="wcu-bg-blob1" />
        <div className="wcu-bg-blob2" />

        <div className="wcu-inner">

          {/* ── Header ── */}
          <div className={`wcu-header${inView ? " show" : ""}`}>
            <div className="wcu-eyebrow">Our Promise</div>
            <h2 className="wcu-title">
              Why Choose <em>FixGar</em>
            </h2>
            <p className="wcu-subtitle">
              Reliable, trusted home services delivered at your convenience — guaranteed
            </p>
          </div>

          {/* ── Feature cards ── */}
          <div className="wcu-grid">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`wcu-card${inView ? " show" : ""}`}
                style={{ transitionDelay: inView ? `${0.1 + i * 0.1}s` : "0s" }}
              >
                {/* Accent side bar */}
                <div className="wcu-card-bar" style={{ background: f.accent }} />

                {/* Icon */}
                <div className="wcu-icon-wrap" style={{ background: f.accentLight }}>
                  {f.icon}
                </div>

                {/* Stat pill */}
                <div className="wcu-stat">
                  <span className="wcu-stat-value" style={{ color: f.accent }}>{f.stat}</span>
                  <span className="wcu-stat-label">{f.statLabel}</span>
                </div>

                <h3 className="wcu-card-title">{f.title}</h3>
                <p className="wcu-card-desc">{f.description}</p>
              </div>
            ))}
          </div>

          {/* ── Metrics band ── */}
          <div className={`wcu-metrics${inView ? " show" : ""}`}>
            {metrics.map((m) => (
              <div key={m.label} className="wcu-metric">
                <div className="wcu-metric-value">{m.value}</div>
                <div className="wcu-metric-label">{m.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;