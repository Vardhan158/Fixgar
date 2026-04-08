import { useState, useEffect } from "react";

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
  </svg>
);

const navLinks = ["Home", "Services", "About", "Blog", "Contact"];

const socialLinks = [
  { icon: <FacebookIcon />, label: "Facebook", href: "#" },
  { icon: <InstagramIcon />, label: "Instagram", href: "#" },
  { icon: <TwitterIcon />, label: "Twitter / X", href: "#" },
];

function NavLink({ children }) {
  return (
    <li>
      <a
        href="#"
        className="group relative inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span
          className="absolute -left-3 opacity-0 group-hover:opacity-100 text-blue-400 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
        >›</span>
        <span className="relative">
          {children}
          <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-blue-400 group-hover:w-full transition-all duration-300" />
        </span>
      </a>
    </li>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .footer-fade { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      <footer className="w-full bg-gray-950 text-gray-300 relative overflow-hidden">

        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-8 bg-blue-500/5 blur-2xl" />

        {/* Newsletter banner */}
        <div className="border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-base" style={{ fontFamily: "'Sora', sans-serif" }}>
                Get home-care tips & exclusive deals
              </p>
              <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                No spam, unsubscribe anytime.
              </p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <span>✅</span> You're in! Thanks for subscribing.
              </div>
            ) : (
              <div className="flex w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  className="flex-1 sm:w-56 bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-l-full px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-r-full transition-colors duration-300"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  Subscribe
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main footer grid */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* LEFT — Logo + tagline + about */}
            <div className="footer-fade" style={{ animationDelay: "0ms" }}>
              <a href="#" className="inline-flex items-baseline gap-0.5 mb-3">
                <span
                  className="text-2xl font-extrabold text-blue-400"
                  style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}
                >Fix</span>
                <span
                  className="text-2xl font-extrabold text-yellow-300"
                  style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}
                >Gar</span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed mt-2 max-w-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Trusted home services at your doorstep. Fast bookings, verified professionals, and 5-star experiences — every time.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Available 24/7 in 20+ cities
                </span>
              </div>
            </div>

            {/* CENTER — Quick links */}
            <div className="footer-fade" style={{ animationDelay: "100ms" }}>
              <h4
                className="text-white font-bold text-sm uppercase tracking-widest mb-5"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </ul>
            </div>

            {/* RIGHT — Contact + social */}
            <div className="footer-fade" style={{ animationDelay: "200ms" }}>
              <h4
                className="text-white font-bold text-sm uppercase tracking-widest mb-5"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Contact Us
              </h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <a
                    href="mailto:support@fixgar.com"
                    className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-300 text-sm group"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <MailIcon />
                    </span>
                    support@fixgar.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919999999999"
                    className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors duration-300 text-sm group"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <PhoneIcon />
                    </span>
                    +91 99999 99999
                  </a>
                </li>
              </ul>

              <h4
                className="text-white font-bold text-sm uppercase tracking-widest mb-4"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span style={{ fontFamily: "'DM Sans', sans-serif" }}>
              © 2026 <span className="text-gray-400 font-medium">FixGar</span>. All rights reserved.
            </span>
            <div className="flex items-center gap-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">Privacy Policy</a>
              <span className="text-gray-700">·</span>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">Terms of Service</a>
              <span className="text-gray-700">·</span>
              <a href="#" className="hover:text-gray-300 transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>

        {/* Scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 ${showScroll ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
        </button>
      </footer>
    </>
  );
}