import React, { useEffect, useRef, useState, useCallback } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Homeowner · Mumbai",
    rating: 5,
    service: "Plumbing",
    review:
      "Amazing service! The plumber arrived within 45 minutes and fixed the leaking pipe in no time. Super professional and left the place spotless. Will definitely book again.",
    initials: "PS",
    accent: "#3a85d4",
    accentLight: "#edf4fc",
  },
  {
    name: "Rahul Mehta",
    role: "Tenant · Bangalore",
    rating: 5,
    service: "Electrical Repair",
    review:
      "Booked an electrician for a short-circuit issue late at night. The support team was incredibly responsive and sent a verified pro within the hour. Truly 24/7 support!",
    initials: "RM",
    accent: "#b8882a",
    accentLight: "#fdf6e8",
  },
  {
    name: "Anjali Verma",
    role: "Homeowner · Delhi",
    rating: 5,
    service: "Home Cleaning",
    review:
      "The cleaning team was thorough, polite, and used eco-friendly products. My apartment looks brand new. Transparent pricing — no surprises on the bill. Highly recommend!",
    initials: "AV",
    accent: "#4caf7d",
    accentLight: "#edf8f2",
  },
  {
    name: "Karan Patel",
    role: "Business Owner · Pune",
    rating: 5,
    service: "AC Service",
    review:
      "Got my office ACs serviced before summer. The technician was knowledgeable, efficient, and explained everything clearly. Fair price and zero hassle. FixGar is my go-to now.",
    initials: "KP",
    accent: "#7c6cd4",
    accentLight: "#f0eefe",
  },
  {
    name: "Sneha Reddy",
    role: "Homeowner · Hyderabad",
    rating: 5,
    service: "Carpentry",
    review:
      "Had a wardrobe door repaired and some shelves installed. The carpenter was skilled and done in two hours flat. FixGar's booking flow is seamless — took less than a minute.",
    initials: "SR",
    accent: "#a0653a",
    accentLight: "#fdf2ea",
  },
  {
    name: "Arjun Nair",
    role: "Homeowner · Chennai",
    rating: 4,
    service: "Pest Control",
    review:
      "Very effective pest control treatment. The team wore protective gear, explained the chemicals used, and followed up after two days. Honest, professional, and affordable.",
    initials: "AN",
    accent: "#d4506a",
    accentLight: "#fdeef1",
  },
];

const StarRating = ({ rating }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 14 14"
        fill={i < rating ? "#b8882a" : "none"}
        stroke={i < rating ? "#b8882a" : "#d4c9b8"}
        strokeWidth="1.2"
        width="14"
        height="14"
      >
        <path d="M7 1l1.5 3.1L12 4.6l-2.5 2.4.6 3.4L7 8.8l-3.1 1.6.6-3.4L2 4.6l3.5-.5z" />
      </svg>
    ))}
  </div>
);

const QuoteIcon = ({ color }) => (
  <svg viewBox="0 0 32 24" fill="none" width="32" height="24">
    <path
      d="M0 24V14.4C0 6.4 4.267 1.6 12.8 0l1.6 2.4C10.133 3.6 7.733 6.267 7.2 10.4H13V24H0zm18 0V14.4C18 6.4 22.267 1.6 30.8 0L32 2.4C27.733 3.6 25.333 6.267 24.8 10.4H31V24H18z"
      fill={color}
      opacity="0.18"
    />
  </svg>
);

const useInView = (threshold = 0.08) => {
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

const VISIBLE = 3;

const Testimonials = () => {
  const [sectionRef, inView] = useInView();
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const timerRef = useRef(null);
  const total = testimonials.length;
  const maxStart = total - VISIBLE;

  const go = useCallback((dir) => {
    setAnimDir(dir);
    setActive((p) => {
      if (dir === "next") return p >= maxStart ? 0 : p + 1;
      return p <= 0 ? maxStart : p - 1;
    });
    setTimeout(() => setAnimDir(null), 380);
  }, [maxStart]);

  useEffect(() => {
    timerRef.current = setInterval(() => go("next"), 5000);
    return () => clearInterval(timerRef.current);
  }, [go]);

  const pause  = () => clearInterval(timerRef.current);
  const resume = () => { timerRef.current = setInterval(() => go("next"), 5000); };

  const visible = testimonials.slice(active, active + VISIBLE);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=DM+Serif+Display&display=swap');

        .tst * { box-sizing: border-box; }

        .tst {
          font-family: 'Sora', sans-serif;
          background: #faf8f5;
          position: relative;
          overflow: hidden;
        }
        .tst::before, .tst::after {
          content: '';
          position: absolute; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #e4dcd0 30%, #e4dcd0 70%, transparent);
        }
        .tst::before { top: 0; }
        .tst::after  { bottom: 0; }

        .tst-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, #d4c9b8 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.28; pointer-events: none;
        }
        .tst-blob {
          position: absolute; bottom: -180px; left: -120px;
          width: 460px; height: 460px;
          background: radial-gradient(ellipse, #f5e6c0 0%, transparent 68%);
          pointer-events: none; opacity: 0.6;
        }
        .tst-blob2 {
          position: absolute; top: -140px; right: -100px;
          width: 380px; height: 380px;
          background: radial-gradient(ellipse, #ddeeff 0%, transparent 68%);
          pointer-events: none; opacity: 0.55;
        }

        .tst-inner {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
          padding: 6rem 2rem;
        }

        /* ── Header ── */
        .tst-header {
          text-align: center; margin-bottom: 3.5rem;
          opacity: 0; transform: translateY(20px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .tst-header.show { opacity: 1; transform: translateY(0); }

        .tst-eyebrow {
          display: inline-block;
          font-size: .72rem; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase;
          color: #3a85d4; background: #edf4fc;
          border: 1px solid #b8d4f0; border-radius: 100px;
          padding: 4px 14px; margin-bottom: 1rem;
        }
        .tst-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 2.9rem);
          color: #1a1714; line-height: 1.15;
          letter-spacing: -.02em; margin: 0 0 .75rem;
        }
        .tst-title em { font-style: normal; color: #b8882a; }
        .tst-subtitle {
          font-size: 1rem; color: #8a7e72;
          max-width: 400px; margin: 0 auto; line-height: 1.65;
        }

        /* ── Carousel ── */
        .tst-carousel-wrap {
          position: relative;
          opacity: 0; transform: translateY(24px);
          transition: opacity .55s ease .15s, transform .55s ease .15s;
        }
        .tst-carousel-wrap.show { opacity: 1; transform: translateY(0); }

        .tst-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          transition: opacity .35s ease, transform .35s ease;
        }
        .tst-grid.slide-left  { opacity: 0; transform: translateX(-24px); }
        .tst-grid.slide-right { opacity: 0; transform: translateX(24px); }

        /* ── Card ── */
        .tst-card {
          background: #fff;
          border: 1px solid #ece5da;
          border-radius: 20px;
          padding: 1.75rem 1.5rem 1.5rem;
          display: flex; flex-direction: column; gap: .9rem;
          cursor: default; position: relative; overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .tst-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 52px rgba(30,20,10,.1);
          border-color: #d4c9b8;
        }
        .tst-card-bar {
          position: absolute; top: 0; left: 10%; right: 10%;
          height: 3px; border-radius: 0 0 6px 6px;
          opacity: 0; transition: opacity .22s ease;
        }
        .tst-card:hover .tst-card-bar { opacity: 1; }

        .tst-review {
          font-size: .875rem; color: #5a504a;
          line-height: 1.75; margin: 0; flex: 1;
          font-style: italic;
        }
        .tst-divider { height: 1px; background: #f0ebe3; }

        /* ── User row ── */
        .tst-user { display: flex; align-items: center; gap: .85rem; }
        .tst-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Serif Display', serif;
          font-size: 1rem; flex-shrink: 0; border: 2px solid;
        }
        .tst-user-info { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        .tst-user-name { font-size: .875rem; font-weight: 600; color: #1a1714; line-height: 1; }
        .tst-user-role { font-size: .72rem; color: #9c8e7e; line-height: 1; }

        .tst-service-tag {
          font-size: .68rem; font-weight: 600;
          letter-spacing: .05em; text-transform: uppercase;
          border-radius: 100px; padding: 3px 10px;
          border: 1px solid; white-space: nowrap;
          align-self: flex-start;
        }

        /* ── Controls ── */
        .tst-controls {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; margin-top: 2.5rem;
          opacity: 0; transform: translateY(12px);
          transition: opacity .5s ease .4s, transform .5s ease .4s;
        }
        .tst-controls.show { opacity: 1; transform: translateY(0); }

        .tst-nav-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: #fff; border: 1.5px solid #d4c9b8;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background .18s, border-color .18s, transform .15s;
        }
        .tst-nav-btn:hover {
          background: #1a1714; border-color: #1a1714;
          transform: translateY(-1px);
        }
        .tst-nav-btn:hover .tst-nav-path { stroke: #fff; }
        .tst-nav-path { stroke: #4a4440; transition: stroke .18s; }

        .tst-dots { display: flex; gap: .5rem; align-items: center; }
        .tst-dot {
          height: 7px; border-radius: 4px;
          background: #d4c9b8; cursor: pointer;
          transition: background .22s, width .22s;
          width: 7px;
        }
        .tst-dot.active { background: #b8882a; width: 22px; }

        /* ── Summary strip ── */
        .tst-summary {
          display: flex; justify-content: center; align-items: center;
          gap: 2.5rem; margin-top: 3rem;
          padding: 1.4rem 2.5rem;
          background: #fff; border: 1px solid #ece5da;
          border-radius: 16px; width: fit-content; margin-inline: auto;
          opacity: 0; transform: translateY(14px);
          transition: opacity .5s ease .55s, transform .5s ease .55s;
        }
        .tst-summary.show { opacity: 1; transform: translateY(0); }
        .tst-summary-item { display: flex; align-items: center; gap: .6rem; }
        .tst-summary-val {
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem; line-height: 1;
        }
        .tst-summary-label {
          font-size: .72rem; font-weight: 500;
          color: #9c8e7e; text-transform: uppercase;
          letter-spacing: .06em; line-height: 1.3; white-space: pre-line;
        }
        .tst-summary-sep { width: 1px; height: 36px; background: #e4dcd0; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .tst-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 580px) {
          .tst-grid { grid-template-columns: 1fr; }
          .tst-inner { padding: 4rem 1.25rem; }
          .tst-summary { flex-direction: column; gap: 1rem; padding: 1.25rem 2rem; }
          .tst-summary-sep { width: 60px; height: 1px; }
        }
      `}</style>

      <section className="tst" ref={sectionRef}>
        <div className="tst-bg" />
        <div className="tst-blob" />
        <div className="tst-blob2" />

        <div className="tst-inner">

          {/* ── Header ── */}
          <div className={`tst-header${inView ? " show" : ""}`}>
            <div className="tst-eyebrow">Customer Stories</div>
            <h2 className="tst-title">
              What Our <em>Customers</em> Say
            </h2>
            <p className="tst-subtitle">
              Real experiences from happy customers across India
            </p>
          </div>

          {/* ── Carousel ── */}
          <div
            className={`tst-carousel-wrap${inView ? " show" : ""}`}
            onMouseEnter={pause}
            onMouseLeave={resume}
          >
            <div className={`tst-grid${animDir === "next" ? " slide-left" : animDir === "prev" ? " slide-right" : ""}`}>
              {visible.map((t) => (
                <div key={t.name + active} className="tst-card">
                  <div className="tst-card-bar" style={{ background: t.accent }} />

                  {/* Quote + stars */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <QuoteIcon color={t.accent} />
                    <StarRating rating={t.rating} />
                  </div>

                  {/* Review */}
                  <p className="tst-review">"{t.review}"</p>

                  <div className="tst-divider" />

                  {/* User + service tag */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".5rem", flexWrap: "wrap" }}>
                    <div className="tst-user">
                      <div
                        className="tst-avatar"
                        style={{ background: t.accentLight, borderColor: t.accent + "44", color: t.accent }}
                      >
                        {t.initials}
                      </div>
                      <div className="tst-user-info">
                        <span className="tst-user-name">{t.name}</span>
                        <span className="tst-user-role">{t.role}</span>
                      </div>
                    </div>
                    <span
                      className="tst-service-tag"
                      style={{ color: t.accent, background: t.accentLight, borderColor: t.accent + "44" }}
                    >
                      {t.service}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Controls ── */}
          <div className={`tst-controls${inView ? " show" : ""}`}>
            <button className="tst-nav-btn" onClick={() => go("prev")} aria-label="Previous">
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <path className="tst-nav-path" d="M10 13L5 8l5-5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="tst-dots">
              {Array.from({ length: maxStart + 1 }).map((_, i) => (
                <div
                  key={i}
                  className={`tst-dot${i === active ? " active" : ""}`}
                  onClick={() => { pause(); setActive(i); resume(); }}
                />
              ))}
            </div>

            <button className="tst-nav-btn" onClick={() => go("next")} aria-label="Next">
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <path className="tst-nav-path" d="M6 3l5 5-5 5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ── Summary strip ── */}
          <div className={`tst-summary${inView ? " show" : ""}`}>
            {[
              { val: "4.9★", label: "Average\nRating",      color: "#b8882a" },
              { val: "12K+", label: "Verified\nReviews",    color: "#3a85d4" },
              { val: "98%",  label: "Would\nRecommend",     color: "#4caf7d" },
            ].map((s, i) => (
              <React.Fragment key={s.val}>
                {i > 0 && <div className="tst-summary-sep" />}
                <div className="tst-summary-item">
                  <div className="tst-summary-val" style={{ color: s.color }}>{s.val}</div>
                  <div className="tst-summary-label">{s.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default Testimonials;