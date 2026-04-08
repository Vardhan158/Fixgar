import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Bookings", path: "/bookings" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600&family=DM+Serif+Display&display=swap');

        .fg-nav {
          font-family: 'Sora', sans-serif;
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.97);
          border-bottom: 1px solid #f0ede8;
          transition: box-shadow 0.25s ease;
        }
        .fg-nav.scrolled {
          box-shadow: 0 2px 16px rgba(30, 24, 16, 0.07);
        }
        .fg-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .fg-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .fg-logo-mark {
          width: 36px;
          height: 36px;
          background: #1a1714;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .fg-logo-mark svg {
          width: 18px;
          height: 18px;
        }
        .fg-logo-text {
          font-family: 'DM Serif Display', serif;
          font-size: 1.35rem;
          letter-spacing: -0.01em;
          color: #1a1714;
          line-height: 1;
        }
        .fg-logo-text span {
          color: #b8882a;
        }

        /* Desktop nav links */
        .fg-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .fg-link {
          position: relative;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #6b6457;
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s;
        }
        .fg-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 1.5px;
          width: 0;
          background: #b8882a;
          transition: width 0.25s ease;
        }
        .fg-link:hover {
          color: #1a1714;
        }
        .fg-link:hover::after {
          width: 100%;
        }
        .fg-link.active {
          color: #1a1714;
          font-weight: 600;
        }
        .fg-link.active::after {
          width: 100%;
        }

        /* Auth buttons */
        .fg-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .fg-btn {
          font-family: 'Sora', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 7px 18px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.18s ease;
          text-decoration: none;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .fg-btn-ghost {
          color: #4a4440;
          background: transparent;
          border: 1px solid #dcd8d0;
        }
        .fg-btn-ghost:hover {
          background: #f7f5f2;
          border-color: #b8b0a4;
          color: #1a1714;
        }
        .fg-btn-primary {
          background: #1a1714;
          color: #fff;
          border: 1px solid #1a1714;
        }
        .fg-btn-primary:hover {
          background: #b8882a;
          border-color: #b8882a;
        }
        .fg-btn-danger {
          background: transparent;
          color: #b84040;
          border: 1px solid #e5c5c5;
        }
        .fg-btn-danger:hover {
          background: #fdf2f2;
          border-color: #cc7070;
        }

        /* Hamburger */
        .fg-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .fg-hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #1a1714;
          border-radius: 2px;
          transition: transform 0.22s ease, opacity 0.22s ease;
          transform-origin: center;
        }
        .fg-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .fg-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .fg-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile drawer */
        .fg-mobile {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease;
          border-top: 1px solid transparent;
        }
        .fg-mobile.open {
          max-height: 480px;
          border-top-color: #f0ede8;
        }
        .fg-mobile-inner {
          padding: 1.25rem 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .fg-mobile-link {
          font-size: 0.925rem;
          font-weight: 500;
          color: #4a4440;
          text-decoration: none;
          padding: 0.6rem 0;
          border-bottom: 1px solid #f4f2ef;
          letter-spacing: 0.01em;
          transition: color 0.15s;
        }
        .fg-mobile-link:last-of-type { border-bottom: none; }
        .fg-mobile-link.active { color: #1a1714; }
        .fg-mobile-link:hover { color: #b8882a; }
        .fg-mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid #f0ede8;
          margin-top: 0.5rem;
        }
        .fg-mobile-actions .fg-btn {
          justify-content: center;
          padding: 9px 18px;
          font-size: 0.85rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .fg-links, .fg-actions { display: none; }
          .fg-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`fg-nav${scrolled ? " scrolled" : ""}`}>
        <div className="fg-nav-inner">

          {/* Logo */}
          <Link to="/" className="fg-logo">
            <div className="fg-logo-mark">
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9.5h5M3 6.5h8M3 12.5h3" stroke="#b8882a" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="13" cy="12" r="2.2" stroke="#fff" strokeWidth="1.4"/>
                <path d="M13 5V9.8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="fg-logo-text">Fix<span>Gar</span></span>
          </Link>

          {/* Desktop nav */}
          <ul className="fg-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`fg-link${isActive(link.path) ? " active" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop auth */}
          <div className="fg-actions">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="fg-btn fg-btn-ghost">Log in</Link>
                <Link to="/register" className="fg-btn fg-btn-primary">Get started</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="fg-btn fg-btn-ghost">Dashboard</Link>
                <button onClick={onLogout} className="fg-btn fg-btn-danger">Sign out</button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            className={`fg-hamburger${isOpen ? " open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`fg-mobile${isOpen ? " open" : ""}`} aria-hidden={!isOpen}>
          <div className="fg-mobile-inner">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`fg-mobile-link${isActive(link.path) ? " active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="fg-mobile-actions">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="fg-btn fg-btn-ghost">Log in</Link>
                  <Link to="/register" className="fg-btn fg-btn-primary">Get started</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="fg-btn fg-btn-ghost">Dashboard</Link>
                  <button onClick={onLogout} className="fg-btn fg-btn-danger">Sign out</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;