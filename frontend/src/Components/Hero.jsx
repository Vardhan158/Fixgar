import React, { useEffect, useState } from "react";

const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { value: "12K+", label: "Happy Customers" },
    { value: "300+", label: "Verified Pros" },
    { value: "4.9★", label: "Average Rating" },
  ];

  const badges = ["Plumbing", "Electrical", "Carpentry", "Cleaning", "Painting"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=DM+Serif+Display&display=swap');

        .fg-hero * { box-sizing: border-box; }

        .fg-hero {
          font-family: 'Sora', sans-serif;
          background: #faf8f5;
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        /* Subtle dot grid background */
        .fg-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #d4c9b8 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.45;
          pointer-events: none;
        }

        /* Gold accent blob */
        .fg-hero-blob {
          position: absolute;
          top: -120px;
          right: -80px;
          width: 520px;
          height: 520px;
          background: radial-gradient(ellipse at 60% 40%, #f5e6c0 0%, transparent 70%);
          pointer-events: none;
        }
        .fg-hero-blob2 {
          position: absolute;
          bottom: -160px;
          left: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(ellipse, #ddeeff 0%, transparent 70%);
          pointer-events: none;
          opacity: 0.6;
        }

        .fg-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        /* LEFT */
        .fg-hero-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Eyebrow tag */
        .fg-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1px solid #e8e0d4;
          border-radius: 100px;
          padding: 5px 14px 5px 8px;
          font-size: 0.78rem;
          font-weight: 500;
          color: #6b5e4a;
          width: fit-content;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s;
        }
        .fg-eyebrow.show { opacity: 1; transform: translateY(0); }
        .fg-eyebrow-dot {
          width: 22px;
          height: 22px;
          background: #b8882a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .fg-eyebrow-dot svg { width: 11px; height: 11px; }

        /* Headline */
        .fg-headline {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 3.6rem);
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: #1a1714;
          margin: 0;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s;
        }
        .fg-headline.show { opacity: 1; transform: translateY(0); }
        .fg-fix { color: #3a85d4; }
        .fg-gar { color: #b8882a; }

        /* Sub */
        .fg-sub {
          font-size: 1.05rem;
          color: #7a6e62;
          line-height: 1.65;
          max-width: 440px;
          margin: 0;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.55s ease 0.25s, transform 0.55s ease 0.25s;
        }
        .fg-sub.show { opacity: 1; transform: translateY(0); }

        /* CTAs */
        .fg-ctas {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s;
        }
        .fg-ctas.show { opacity: 1; transform: translateY(0); }

        .fg-btn-primary {
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          padding: 12px 28px;
          border-radius: 100px;
          background: #1a1714;
          color: #fff;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .fg-btn-primary:hover {
          background: #b8882a;
          transform: translateY(-1px);
        }
        .fg-btn-primary svg { width: 14px; height: 14px; }

        .fg-btn-secondary {
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 11px 24px;
          border-radius: 100px;
          background: transparent;
          color: #3a85d4;
          border: 1.5px solid #b8d4f0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.18s, border-color 0.18s, transform 0.15s;
          text-decoration: none;
        }
        .fg-btn-secondary:hover {
          background: #edf4fc;
          border-color: #3a85d4;
          transform: translateY(-1px);
        }

        /* Service badges */
        .fg-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease 0.45s, transform 0.5s ease 0.45s;
        }
        .fg-badges.show { opacity: 1; transform: translateY(0); }
        .fg-badge {
          font-size: 0.75rem;
          font-weight: 500;
          color: #6b5e4a;
          background: #fff;
          border: 1px solid #e4dcd0;
          border-radius: 100px;
          padding: 4px 12px;
        }

        /* Stats */
        .fg-stats {
          display: flex;
          gap: 2rem;
          padding-top: 0.5rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease 0.55s, transform 0.5s ease 0.55s;
        }
        .fg-stats.show { opacity: 1; transform: translateY(0); }
        .fg-stat-value {
          font-family: 'DM Serif Display', serif;
          font-size: 1.5rem;
          color: #1a1714;
          line-height: 1;
        }
        .fg-stat-label {
          font-size: 0.72rem;
          font-weight: 500;
          color: #9c8e7e;
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .fg-stat-divider {
          width: 1px;
          height: 36px;
          background: #ddd8d0;
          align-self: center;
        }

        /* RIGHT — illustration */
        .fg-hero-right {
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
        }
        .fg-hero-right.show { opacity: 1; transform: translateX(0); }

        .fg-illustration-wrap {
          position: relative;
          width: 100%;
          max-width: 480px;
        }

        /* Floating card decorations */
        .fg-float-card {
          position: absolute;
          background: #fff;
          border: 1px solid #ece5da;
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 20px rgba(30,20,10,0.08);
          font-size: 0.78rem;
          font-weight: 500;
          color: #3a3228;
          white-space: nowrap;
          z-index: 2;
        }
        .fg-float-card .dot {
          width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
        }
        .dot-green { background: #4caf7d; }
        .dot-amber { background: #b8882a; }
        .dot-blue  { background: #3a85d4; }

        .fg-card-top {
          top: 18px;
          left: -28px;
          animation: floatA 3.8s ease-in-out infinite;
        }
        .fg-card-bottom {
          bottom: 28px;
          right: -24px;
          animation: floatB 4.2s ease-in-out infinite;
        }
        .fg-card-mid {
          bottom: 100px;
          left: -20px;
          animation: floatA 5s ease-in-out infinite reverse;
        }

        @keyframes floatA {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }

        /* Main SVG illustration */
        .fg-main-illus {
          width: 100%;
          animation: floatMain 5.5s ease-in-out infinite;
          filter: drop-shadow(0 24px 40px rgba(30,20,10,0.1));
        }
        @keyframes floatMain {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        /* Mobile */
        @media (max-width: 860px) {
          .fg-hero-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 3.5rem 1.5rem;
            text-align: center;
          }
          .fg-eyebrow, .fg-ctas, .fg-badges, .fg-stats { justify-content: center; margin: 0 auto; }
          .fg-sub { max-width: 100%; }
          .fg-hero-right { transform: translateX(0); }
          .fg-hero-right.show { transform: translateX(0); }
          .fg-float-card { display: none; }
          .fg-illustration-wrap { max-width: 340px; }
        }
      `}</style>

      <section className="fg-hero">
        <div className="fg-hero-blob" />
        <div className="fg-hero-blob2" />

        <div className="fg-hero-inner">

          {/* ── LEFT ── */}
          <div className="fg-hero-left">

            <div className={`fg-eyebrow${visible ? " show" : ""}`}>
              <div className="fg-eyebrow-dot">
                <svg viewBox="0 0 11 11" fill="none">
                  <circle cx="5.5" cy="5.5" r="3" fill="#fff"/>
                  <circle cx="5.5" cy="5.5" r="1.5" fill="#b8882a"/>
                </svg>
              </div>
              Now available in 50+ cities
            </div>

            <h1 className={`fg-headline${visible ? " show" : ""}`}>
              <span className="fg-fix">Fix</span>
              <span className="fg-gar">Gar</span>
              {" – "}Trusted<br />
              Home Services<br />
              Near You
            </h1>

            <p className={`fg-sub${visible ? " show" : ""}`}>
              Book plumbers, electricians &amp; more in seconds.
              Vetted professionals at your door — guaranteed.
            </p>

            <div className={`fg-ctas${visible ? " show" : ""}`}>
              <a href="/bookings" className="fg-btn-primary">
                Book Now
                <svg viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/services" className="fg-btn-secondary">
                Explore Services
              </a>
            </div>

            <div className={`fg-badges${visible ? " show" : ""}`}>
              {badges.map((b) => (
                <span key={b} className="fg-badge">{b}</span>
              ))}
            </div>

            <div className={`fg-stats${visible ? " show" : ""}`}>
              {stats.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="fg-stat-divider" />}
                  <div>
                    <div className="fg-stat-value">{s.value}</div>
                    <div className="fg-stat-label">{s.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className={`fg-hero-right${visible ? " show" : ""}`}>
            <div className="fg-illustration-wrap">

              {/* Floating cards */}
              <div className="fg-float-card fg-card-top">
                <div className="dot dot-green" />
                Booking confirmed!
              </div>
              <div className="fg-float-card fg-card-bottom">
                <div className="dot dot-blue" />
                Pro on the way · 12 min
              </div>
              <div className="fg-float-card fg-card-mid">
                <div className="dot dot-amber" />
                4.9 ★ rated service
              </div>

              {/* Main SVG Illustration */}
              <svg
                className="fg-main-illus"
                viewBox="0 0 460 420"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background card */}
                <rect x="30" y="30" width="400" height="360" rx="28" fill="#ffffff" stroke="#ece5da" strokeWidth="1.5"/>

                {/* House shape */}
                <path d="M230 80L130 160V340H330V160L230 80Z" fill="#f5f0e8" stroke="#ddd5c4" strokeWidth="1.5"/>
                {/* Roof */}
                <path d="M110 165L230 72L350 165" stroke="#b8882a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                {/* Door */}
                <rect x="200" y="255" width="60" height="85" rx="8" fill="#1a1714"/>
                <circle cx="253" cy="298" r="4" fill="#b8882a"/>
                {/* Windows */}
                <rect x="140" y="190" width="55" height="50" rx="7" fill="#ddeeff" stroke="#b8d4f0" strokeWidth="1.2"/>
                <line x1="167" y1="190" x2="167" y2="240" stroke="#b8d4f0" strokeWidth="1.2"/>
                <line x1="140" y1="215" x2="195" y2="215" stroke="#b8d4f0" strokeWidth="1.2"/>

                <rect x="265" y="190" width="55" height="50" rx="7" fill="#ddeeff" stroke="#b8d4f0" strokeWidth="1.2"/>
                <line x1="292" y1="190" x2="292" y2="240" stroke="#b8d4f0" strokeWidth="1.2"/>
                <line x1="265" y1="215" x2="320" y2="215" stroke="#b8d4f0" strokeWidth="1.2"/>

                {/* Path / walkway */}
                <rect x="215" y="340" width="30" height="18" rx="4" fill="#e0d8cc"/>

                {/* Wrench tool – right side */}
                <g transform="translate(318, 260)">
                  <circle cx="18" cy="18" r="18" fill="#b8882a" opacity="0.12"/>
                  <path d="M10 26C10 26 12 20 18 18C22 16.5 28 17 28 12C28 8 24.5 6 21 6C19 6 17.5 6.8 17.5 6.8L20 9.5C20 9.5 22.5 9 23 11C23.5 13 21 14 18.5 14.5C15 15.5 12 19 11.5 22L10 26Z" fill="#b8882a"/>
                  <line x1="10" y1="26" x2="6" y2="30" stroke="#b8882a" strokeWidth="2.5" strokeLinecap="round"/>
                </g>

                {/* Lightbulb – left side */}
                <g transform="translate(104, 255)">
                  <circle cx="18" cy="18" r="18" fill="#3a85d4" opacity="0.1"/>
                  <path d="M18 8C13.6 8 10 11.6 10 16C10 19 11.6 21.5 14 23V26H22V23C24.4 21.5 26 19 26 16C26 11.6 22.4 8 18 8Z" fill="#3a85d4" opacity="0.8"/>
                  <rect x="14" y="27" width="8" height="2" rx="1" fill="#3a85d4"/>
                  <rect x="15" y="30" width="6" height="2" rx="1" fill="#3a85d4"/>
                </g>

                {/* Checkmark badge – bottom center */}
                <g transform="translate(198, 355)">
                  <circle cx="14" cy="14" r="14" fill="#4caf7d" opacity="0.15"/>
                  <path d="M8 14L12 18L20 10" stroke="#4caf7d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>

                {/* Decorative dots */}
                <circle cx="60" cy="70" r="5" fill="#b8882a" opacity="0.3"/>
                <circle cx="80" cy="55" r="3" fill="#b8882a" opacity="0.2"/>
                <circle cx="395" cy="80" r="6" fill="#3a85d4" opacity="0.2"/>
                <circle cx="378" cy="60" r="3.5" fill="#3a85d4" opacity="0.15"/>
                <circle cx="60" cy="340" r="4" fill="#4caf7d" opacity="0.25"/>
              </svg>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Hero;