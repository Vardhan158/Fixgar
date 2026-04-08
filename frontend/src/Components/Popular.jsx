import React, { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Plumbing",
    price: "Starting from ₹199",
    tag: "Most Booked",
    tagColor: "#3a85d4",
    tagBg: "#edf4fc",
    accent: "#3a85d4",
    accentLight: "#edf4fc",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <rect width="56" height="56" rx="16" fill="#edf4fc"/>
        <path d="M18 38C18 38 21 27 28 24C33.5 21.5 41 22.5 41 15C41 9.5 36.5 7 32 7C29 7 26.5 8.5 26.5 8.5L30.5 13C30.5 13 34.5 12 35.2 15.5C35.9 19 32 20.5 28.5 21.5C23 23.5 19.5 30.5 19 36L18 38Z" fill="#3a85d4"/>
        <line x1="18" y1="38" x2="13" y2="44" stroke="#3a85d4" strokeWidth="3.2" strokeLinecap="round"/>
        <circle cx="38" cy="40" r="6" fill="#3a85d4" opacity="0.15"/>
        <path d="M35 40h6M38 37v6" stroke="#3a85d4" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Electrical Repair",
    price: "Starting from ₹299",
    tag: "Popular",
    tagColor: "#b8882a",
    tagBg: "#fdf6e8",
    accent: "#b8882a",
    accentLight: "#fdf6e8",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <rect width="56" height="56" rx="16" fill="#fdf6e8"/>
        <path d="M28 9C21.4 9 16 14.4 16 21C16 25.8 18.7 30 23 32.2V37H33V32.2C37.3 30 40 25.8 40 21C40 14.4 34.6 9 28 9Z" fill="#b8882a" opacity="0.85"/>
        <rect x="23" y="38" width="10" height="3" rx="1.5" fill="#b8882a"/>
        <rect x="24.5" y="42" width="7" height="3" rx="1.5" fill="#b8882a" opacity="0.6"/>
        <path d="M30 16l-5 8h6l-5 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Home Cleaning",
    price: "Starting from ₹149",
    tag: "Top Rated",
    tagColor: "#4caf7d",
    tagBg: "#edf8f2",
    accent: "#4caf7d",
    accentLight: "#edf8f2",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <rect width="56" height="56" rx="16" fill="#edf8f2"/>
        <rect x="24" y="10" width="8" height="22" rx="4" fill="#4caf7d" opacity="0.8"/>
        <ellipse cx="28" cy="36" rx="12" ry="5" fill="#4caf7d" opacity="0.25" stroke="#4caf7d" strokeWidth="1.5"/>
        <ellipse cx="28" cy="40" rx="10" ry="4" fill="#4caf7d" opacity="0.2" stroke="#4caf7d" strokeWidth="1.2"/>
        <ellipse cx="28" cy="44" rx="8" ry="3" fill="#4caf7d" opacity="0.15" stroke="#4caf7d" strokeWidth="1"/>
        <circle cx="40" cy="14" r="4" fill="#4caf7d" opacity="0.2"/>
        <path d="M38 14l1.5 1.5L42 12" stroke="#4caf7d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "AC Service",
    price: "Starting from ₹399",
    tag: "Trending",
    tagColor: "#7c6cd4",
    tagBg: "#f0eefe",
    accent: "#7c6cd4",
    accentLight: "#f0eefe",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <rect width="56" height="56" rx="16" fill="#f0eefe"/>
        <rect x="10" y="18" width="36" height="14" rx="6" fill="none" stroke="#7c6cd4" strokeWidth="1.8"/>
        <rect x="10" y="18" width="36" height="14" rx="6" fill="#7c6cd4" opacity="0.08"/>
        <circle cx="36" cy="25" r="3.5" fill="#7c6cd4" opacity="0.9"/>
        <line x1="18" y1="22" x2="28" y2="22" stroke="#7c6cd4" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="18" y1="25" x2="26" y2="25" stroke="#7c6cd4" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="18" y1="28" x2="24" y2="28" stroke="#7c6cd4" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M22 32v6M26 32v8M30 32v6M34 32v4" stroke="#7c6cd4" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: "Carpentry",
    price: "Starting from ₹249",
    tag: null,
    accent: "#a0653a",
    accentLight: "#fdf2ea",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <rect width="56" height="56" rx="16" fill="#fdf2ea"/>
        <rect x="12" y="26" width="32" height="6" rx="3" fill="#a0653a" opacity="0.85"/>
        <rect x="19" y="14" width="6" height="14" rx="3" fill="#a0653a" opacity="0.7"/>
        <rect x="31" y="14" width="6" height="14" rx="3" fill="#a0653a" opacity="0.7"/>
        <rect x="19" y="32" width="6" height="10" rx="3" fill="#a0653a" opacity="0.7"/>
        <rect x="31" y="32" width="6" height="10" rx="3" fill="#a0653a" opacity="0.7"/>
      </svg>
    ),
  },
  {
    title: "Painting",
    price: "Starting from ₹499",
    tag: null,
    accent: "#d4506a",
    accentLight: "#fdeef1",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <rect width="56" height="56" rx="16" fill="#fdeef1"/>
        <rect x="20" y="9" width="10" height="26" rx="5" fill="#d4506a" opacity="0.8"/>
        <ellipse cx="25" cy="40" rx="9" ry="5" fill="#d4506a" opacity="0.3"/>
        <circle cx="25" cy="40" r="4" fill="#d4506a" opacity="0.6"/>
        <circle cx="38" cy="20" r="5" fill="#b8882a" opacity="0.3"/>
        <circle cx="38" cy="20" r="2.5" fill="#b8882a" opacity="0.7"/>
        <circle cx="38" cy="33" r="4" fill="#3a85d4" opacity="0.25"/>
        <circle cx="38" cy="33" r="2" fill="#3a85d4" opacity="0.6"/>
      </svg>
    ),
  },
  {
    title: "Pest Control",
    price: "Starting from ₹349",
    tag: null,
    accent: "#4caf7d",
    accentLight: "#edf8f2",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <rect width="56" height="56" rx="16" fill="#edf8f2"/>
        <path d="M28 14C22 14 18 18.5 18 24C18 30 22 36 28 38C34 36 38 30 38 24C38 18.5 34 14 28 14Z" fill="#4caf7d" opacity="0.2" stroke="#4caf7d" strokeWidth="1.5"/>
        <path d="M28 20v12M22 26h12" stroke="#4caf7d" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="28" cy="26" r="4" fill="#4caf7d" opacity="0.4"/>
        <path d="M18 20l-5-3M38 20l5-3M16 28l-5 1M40 28l5 1" stroke="#4caf7d" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: "CCTV Installation",
    price: "Starting from ₹599",
    tag: "New",
    tagColor: "#d4506a",
    tagBg: "#fdeef1",
    accent: "#3a85d4",
    accentLight: "#edf4fc",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="56" height="56">
        <rect width="56" height="56" rx="16" fill="#edf4fc"/>
        <rect x="10" y="20" width="26" height="16" rx="6" fill="#3a85d4" opacity="0.15" stroke="#3a85d4" strokeWidth="1.6"/>
        <circle cx="23" cy="28" r="4" fill="#3a85d4" opacity="0.3"/>
        <circle cx="23" cy="28" r="2" fill="#3a85d4"/>
        <path d="M36 24l8-4v16l-8-4V24Z" fill="#3a85d4" opacity="0.5" stroke="#3a85d4" strokeWidth="1.4"/>
        <line x1="23" y1="36" x2="23" y2="43" stroke="#3a85d4" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="17" y1="43" x2="29" y2="43" stroke="#3a85d4" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
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

const PopularServices = () => {
  const [sectionRef, sectionInView] = useInView(0.08);
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, 4);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=DM+Serif+Display&display=swap');

        .ps * { box-sizing: border-box; }

        .ps {
          font-family: 'Sora', sans-serif;
          background: #faf8f5;
          position: relative;
          overflow: hidden;
        }

        .ps::before, .ps::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e4dcd0 30%, #e4dcd0 70%, transparent);
        }
        .ps::before { top: 0; }
        .ps::after  { bottom: 0; }

        .ps-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #d4c9b8 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.28;
          pointer-events: none;
        }
        .ps-blob {
          position: absolute;
          top: -160px; right: -120px;
          width: 480px; height: 480px;
          background: radial-gradient(ellipse, #ddeeff 0%, transparent 70%);
          opacity: 0.5;
          pointer-events: none;
        }

        .ps-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }

        /* Header */
        .ps-header {
          text-align: center;
          margin-bottom: 3.5rem;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .ps-header.show { opacity: 1; transform: translateY(0); }

        .ps-eyebrow {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3a85d4;
          background: #edf4fc;
          border: 1px solid #b8d4f0;
          border-radius: 100px;
          padding: 4px 14px;
          margin-bottom: 1rem;
        }

        .ps-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 2.9rem);
          color: #1a1714;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 0.75rem;
        }
        .ps-title-accent { color: #b8882a; }

        .ps-subtitle {
          font-size: 1rem;
          color: #8a7e72;
          max-width: 380px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* Grid */
        .ps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        /* Card */
        .ps-card {
          background: #ffffff;
          border: 1px solid #ece5da;
          border-radius: 20px;
          padding: 1.6rem 1.4rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: pointer;
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
        .ps-card.show { opacity: 1; transform: translateY(0); }
        .ps-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(30,20,10,0.1);
          border-color: #d4c9b8;
        }

        /* Top bar accent that appears on hover */
        .ps-card-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          border-radius: 20px 20px 0 0;
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .ps-card:hover .ps-card-topbar { opacity: 1; }

        /* Tag badge */
        .ps-tag {
          position: absolute;
          top: 14px; right: 14px;
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: 100px;
          padding: 3px 9px;
          border: 1px solid;
        }

        /* Icon area */
        .ps-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }
        .ps-card:hover .ps-icon-wrap { transform: scale(1.08) rotate(-3deg); }

        .ps-card-body { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; }

        .ps-card-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          color: #1a1714;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .ps-card-price {
          font-size: 0.78rem;
          font-weight: 500;
          color: #9c8e7e;
          margin: 0;
        }

        /* Book button */
        .ps-book-btn {
          font-family: 'Sora', sans-serif;
          font-size: 0.8rem;
          font-weight: 600;
          width: 100%;
          padding: 9px 0;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #1a1714;
          color: #fff;
          transition: background 0.18s, transform 0.15s;
          margin-top: auto;
        }
        .ps-book-btn:hover { background: var(--card-accent); transform: translateY(-1px); }
        .ps-book-btn svg { width: 12px; height: 12px; }

        /* "View all" row */
        .ps-footer {
          display: flex;
          justify-content: center;
          margin-top: 3rem;
          gap: 1rem;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s;
        }
        .ps-footer.show { opacity: 1; transform: translateY(0); }

        .ps-view-btn {
          font-family: 'Sora', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 11px 28px;
          border-radius: 100px;
          background: transparent;
          color: #1a1714;
          border: 1.5px solid #d4c9b8;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background 0.18s, border-color 0.18s, transform 0.15s;
          text-decoration: none;
        }
        .ps-view-btn:hover {
          background: #f4f0ea;
          border-color: #b8b0a4;
          transform: translateY(-1px);
        }
        .ps-view-btn svg { width: 13px; height: 13px; transition: transform 0.2s; }
        .ps-view-btn:hover svg { transform: rotate(90deg); }

        /* Responsive */
        @media (max-width: 1024px) {
          .ps-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 720px) {
          .ps-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .ps-inner { padding: 4rem 1.25rem; }
        }
        @media (max-width: 440px) {
          .ps-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="ps" ref={sectionRef}>
        <div className="ps-bg" />
        <div className="ps-blob" />

        <div className="ps-inner">

          {/* Header */}
          <div className={`ps-header${sectionInView ? " show" : ""}`}>
            <div className="ps-eyebrow">What We Offer</div>
            <h2 className="ps-title">
              Popular <span className="ps-title-accent">Services</span>
            </h2>
            <p className="ps-subtitle">
              Explore our most booked home services — trusted by thousands
            </p>
          </div>

          {/* Grid */}
          <div className="ps-grid">
            {visibleServices.map((svc, i) => (
              <div
                key={svc.title}
                className={`ps-card${sectionInView ? " show" : ""}`}
                style={{
                  transitionDelay: sectionInView ? `${0.1 + i * 0.08}s` : "0s",
                  "--card-accent": svc.accent,
                }}
              >
                {/* Hover top bar */}
                <div
                  className="ps-card-topbar"
                  style={{ background: svc.accent }}
                />

                {/* Tag badge */}
                {svc.tag && (
                  <span
                    className="ps-tag"
                    style={{
                      color: svc.tagColor,
                      background: svc.tagBg,
                      borderColor: svc.tagColor + "44",
                    }}
                  >
                    {svc.tag}
                  </span>
                )}

                {/* Icon */}
                <div
                  className="ps-icon-wrap"
                  style={{ background: svc.accentLight }}
                >
                  {svc.icon}
                </div>

                {/* Text */}
                <div className="ps-card-body">
                  <h3 className="ps-card-title">{svc.title}</h3>
                  <p className="ps-card-price">{svc.price}</p>
                </div>

                {/* CTA */}
                <button
                  className="ps-book-btn"
                  onClick={() => window.location.href = "/book"}
                >
                  Book Now
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Footer row */}
          <div className={`ps-footer${sectionInView ? " show" : ""}`}>
            <button
              className="ps-view-btn"
              onClick={() => setShowAll((p) => !p)}
            >
              {showAll ? "Show Less" : "View All Services"}
              <svg viewBox="0 0 13 13" fill="none">
                <path
                  d={showAll
                    ? "M6.5 10V3M3 6.5l3.5-3.5 3.5 3.5"
                    : "M6.5 3v7M3 6.5l3.5 3.5 3.5-3.5"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default PopularServices;