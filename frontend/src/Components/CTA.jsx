import { useState, useEffect } from "react";

const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const WrenchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const FloatingOrb = ({ className, delay = 0 }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-30 animate-pulse ${className}`}
    style={{ animationDelay: `${delay}s`, animationDuration: "4s" }}
  />
);

const StatPill = ({ icon, text, delay }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <span className="text-blue-200">{icon}</span>
      {text}
    </div>
  );
};

export default function CTA() {
  const [mounted, setMounted] = useState(false);
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full py-16 px-6 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        .fixgar-section { font-family: 'DM Sans', sans-serif; }
        .fixgar-headline { font-family: 'Sora', sans-serif; }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-fade-slide { animation: fadeSlideUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        .animate-scale-in  { animation: scaleIn 0.6s cubic-bezier(.22,1,.36,1) both; }
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #bfdbfe 40%, #fff 60%, #bfdbfe 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .grid-pattern {
          background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .btn-glow:hover { box-shadow: 0 0 32px rgba(255,255,255,0.35); }
        .btn-outline-glow:hover { box-shadow: 0 0 24px rgba(255,255,255,0.15); }
      `}</style>

      <div className="fixgar-section max-w-6xl mx-auto">
        <div
          className={`relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 60%, #1e3a8a 100%)" }}
        >
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 grid-pattern" />

          {/* Floating orbs */}
          <FloatingOrb className="w-72 h-72 bg-blue-300 -top-16 -left-16" delay={0} />
          <FloatingOrb className="w-96 h-96 bg-indigo-400 -bottom-24 -right-24" delay={1.5} />
          <FloatingOrb className="w-48 h-48 bg-sky-300 top-1/2 left-1/3" delay={0.8} />

          {/* Decorative ring */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border-2 border-white/10" />
          <div className="absolute -bottom-32 -left-16 w-64 h-64 rounded-full border border-white/10" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 py-16 md:py-20">

            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 mb-8 text-white text-sm font-semibold tracking-wide transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <SparkleIcon />
              #1 Home Services Platform
            </div>

            {/* Headline */}
            <h2
              className={`fixgar-headline text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl mb-4 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <span className="shimmer-text">Book your service</span>
              <br />
              <span className="text-white">in seconds.</span>
            </h2>

            {/* Subtext */}
            <p
              className={`text-blue-100 text-lg md:text-xl max-w-xl mb-10 leading-relaxed transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "320ms" }}
            >
              Fast, reliable, and trusted home services at your doorstep —
              anytime you need them.
            </p>

            {/* Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-4 mb-12 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "440ms" }}
            >
              {/* Primary CTA */}
              <button
                onMouseEnter={() => setPrimaryHovered(true)}
                onMouseLeave={() => setPrimaryHovered(false)}
                className="btn-glow group flex items-center gap-2.5 bg-white text-blue-700 font-semibold rounded-full px-8 py-3.5 text-base transition-all duration-300 hover:scale-105 hover:bg-blue-50 active:scale-100"
              >
                <span>Get Started</span>
                <span className={`transition-transform duration-300 ${primaryHovered ? "translate-x-1" : ""}`}>
                  <ArrowIcon />
                </span>
              </button>

              {/* Secondary CTA */}
              <button
                onMouseEnter={() => setSecondaryHovered(true)}
                onMouseLeave={() => setSecondaryHovered(false)}
                className="btn-outline-glow group flex items-center gap-2.5 bg-transparent text-white font-semibold rounded-full px-8 py-3.5 text-base border-2 border-white/40 hover:border-white/70 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-100"
              >
                <WrenchIcon />
                <span>Explore Services</span>
              </button>
            </div>

            {/* Trust stats pills */}
            <div
              className={`flex flex-wrap justify-center gap-3 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "560ms" }}
            >
              <StatPill icon="⚡" text="Instant Booking" delay={600} />
              <StatPill icon="⭐" text="4.9/5 Rating" delay={700} />
              <StatPill icon="🛡️" text="Verified Experts" delay={800} />
              <StatPill icon="🏠" text="50k+ Homes Served" delay={900} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}