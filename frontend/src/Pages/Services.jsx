import { useState, useEffect, useRef } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

/* ─── ICONS ──────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m6 9 6 6 6-6"/></svg>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
);

const trustFeatures = [
  { icon: "🛡️", title: "Verified Professionals", desc: "Every expert is background-checked and skill-tested before onboarding." },
  { icon: "⚡", title: "Fast Service", desc: "Same-day and next-day slots available across all categories." },
  { icon: "💰", title: "Affordable Pricing", desc: "Transparent pricing with no hidden charges — ever." },
  { icon: "🕐", title: "24/7 Support", desc: "Our team is always available to help you before and after every booking." },
];

const CATEGORIES = ["All", "Plumbing", "Electrical", "Cleaning", "Appliance Repair"];

const ALL_SERVICES = [
  { id: 1,  category: "Plumbing",        emoji: "🔧", title: "Pipe Leak Repair",       desc: "Fix leaking pipes, joints & faucets quickly and cleanly.",          price: 399,  rating: 4.8, reviews: 1240 },
  { id: 2,  category: "Plumbing",        emoji: "🚿", title: "Bathroom Fitting",        desc: "Install showers, taps & complete bathroom plumbing setups.",         price: 599,  rating: 4.7, reviews: 893  },
  { id: 3,  category: "Plumbing",        emoji: "🪠", title: "Drain Unclogging",         desc: "Powerful hydro-jet cleaning for blocked drains and sewers.",         price: 299,  rating: 4.6, reviews: 2100 },
  { id: 4,  category: "Electrical",      emoji: "💡", title: "Wiring & Switchboards",   desc: "Safe rewiring, new boards & circuit breaker installation.",          price: 499,  rating: 4.9, reviews: 740  },
  { id: 5,  category: "Electrical",      emoji: "🔌", title: "Fan & Light Installation", desc: "Ceiling fans, chandeliers, spotlights — fitted in under an hour.",   price: 249,  rating: 4.7, reviews: 3200 },
  { id: 6,  category: "Electrical",      emoji: "⚡", title: "MCB & Fuse Repair",        desc: "Diagnose and fix tripped breakers, blown fuses & power failures.",   price: 349,  rating: 4.8, reviews: 560  },
  { id: 7,  category: "Cleaning",        emoji: "🧹", title: "Deep Home Cleaning",       desc: "Top-to-bottom scrub for kitchens, bathrooms & living areas.",       price: 899,  rating: 4.9, reviews: 4100 },
  { id: 8,  category: "Cleaning",        emoji: "🛋️", title: "Sofa & Carpet Cleaning",  desc: "Steam & dry foam cleaning that removes stains and allergens.",       price: 599,  rating: 4.7, reviews: 1870 },
  { id: 9,  category: "Cleaning",        emoji: "🪟", title: "Window & Glass Cleaning", desc: "Streak-free shine for all window types including high-rise panels.", price: 349,  rating: 4.6, reviews: 980  },
  { id: 10, category: "Appliance Repair",emoji: "🧊", title: "AC Service & Repair",      desc: "Gas refill, deep clean, filter service & cooling diagnostics.",      price: 449,  rating: 4.8, reviews: 5200 },
  { id: 11, category: "Appliance Repair",emoji: "👕", title: "Washing Machine Repair",   desc: "Fix drum, motor, drainage & electronic faults for all brands.",      price: 399,  rating: 4.7, reviews: 2340 },
  { id: 12, category: "Appliance Repair",emoji: "🍳", title: "Microwave & Oven Repair",  desc: "Diagnose and repair heating elements, panels & turntables.",        price: 349,  rating: 4.6, reviews: 1120 },
];

/* ─── STAR RATING ─────────────────────────────────────────────── */
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <StarIcon key={i} filled={i <= Math.round(rating)} />
      ))}
    </div>
  );
}

/* ─── SKELETON CARD ───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
      <div className="w-14 h-14 rounded-2xl bg-gray-100 mb-4" />
      <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-full mb-1" />
      <div className="h-3 bg-gray-100 rounded w-4/5 mb-4" />
      <div className="h-8 bg-gray-100 rounded-xl w-full" />
    </div>
  );
}

/* ─── SERVICE CARD ────────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const [booked, setBooked] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="service-card-fade bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col"
      style={{
        animationDelay: `${index * 60}ms`,
        transition: "transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease",
        transform: hovered ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 20px 48px rgba(59,130,246,0.10), 0 4px 16px rgba(0,0,0,0.07)"
          : "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Card header */}
      <div className="relative p-5 pb-4">
        {/* Category tag */}
        <span
          className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-500 border border-blue-100"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {service.category}
        </span>

        {/* Emoji icon */}
        <div
          className="flex items-center justify-center w-14 h-14 rounded-2xl text-3xl mb-4 transition-transform duration-300"
          style={{
            background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
            transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)",
          }}
        >
          {service.emoji}
        </div>

        <h3
          className="text-gray-900 font-bold text-base mb-1 leading-snug"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {service.title}
        </h3>
        <p
          className="text-gray-400 text-sm leading-relaxed line-clamp-2"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {service.desc}
        </p>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-gray-50" />

      {/* Card footer */}
      <div className="p-5 pt-4 mt-auto">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <span
              className="text-blue-600 font-extrabold text-lg"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              ₹{service.price}
            </span>
            <span className="text-gray-400 text-xs ml-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              onwards
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <StarRating rating={service.rating} />
            <span className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {service.rating} ({service.reviews.toLocaleString()})
            </span>
          </div>
        </div>

        <button
          onClick={() => { setBooked(true); setTimeout(() => setBooked(false), 2000); }}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-300"
          style={{
            fontFamily: "'Sora', sans-serif",
            background: booked
              ? "linear-gradient(135deg, #10b981, #059669)"
              : hovered
                ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                : "linear-gradient(135deg, #eff6ff, #dbeafe)",
            color: booked || hovered ? "#fff" : "#2563eb",
          }}
        >
          {booked ? (
            <><span>✓</span> Booked!</>
          ) : (
            <><span>Book Now</span><ArrowRight /></>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────────── */
export default function Services() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [sort, setSort]           = useState("default");
  const [loading, setLoading]     = useState(true);
  const [sortOpen, setSortOpen]   = useState(false);
  const sortRef                   = useRef(null);

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filter + sort
  const filtered = ALL_SERVICES
    .filter(s => category === "All" || s.category === category)
    .filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc")    return a.price - b.price;
      if (sort === "price-desc")   return b.price - a.price;
      if (sort === "rating-desc")  return b.rating - a.rating;
      return 0;
    });

  const sortLabel = { default: "Sort By", "price-asc": "Price: Low → High", "price-desc": "Price: High → Low", "rating-desc": "Rating: High → Low" };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <Navbar/>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes headerIn {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .service-card-fade { animation: fadeSlideUp 0.5s cubic-bezier(.22,1,.36,1) both; }
        .header-in         { animation: headerIn 0.6s cubic-bezier(.22,1,.36,1) both; }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* ── PAGE HEADER ─────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)" }}
      >
        {/* decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute top-0 left-0 right-0 bottom-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center header-in">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-semibold rounded-full px-4 py-1.5 mb-5 tracking-wide">
            🏠 Home Services Platform
          </span>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight"
            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}
          >
            Our Services
          </h1>
          <p className="text-blue-200 text-base md:text-lg mb-8 max-w-lg mx-auto">
            Choose from a wide range of home services — booked in seconds, delivered with care.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search services (e.g., 'AC repair', 'deep clean'…)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white text-gray-800 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XIcon />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── CATEGORY + SORT BAR ─────────────────────── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="flex-shrink-0 text-sm font-semibold rounded-full px-4 py-2 border transition-all duration-200"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  background:    category === cat ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "transparent",
                  color:         category === cat ? "#fff" : "#6b7280",
                  borderColor:   category === cat ? "transparent" : "#e5e7eb",
                  boxShadow:     category === cat ? "0 4px 12px rgba(59,130,246,0.3)" : "none",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative flex-shrink-0" ref={sortRef}>
            <button
              onClick={() => setSortOpen(o => !o)}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl px-3.5 py-2 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 bg-white"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {sortLabel[sort]}
              <span className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}>
                <ChevronDown />
              </span>
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 z-30 min-w-[200px]">
                {[
                  ["default",     "Default"],
                  ["price-asc",   "Price: Low → High"],
                  ["price-desc",  "Price: High → Low"],
                  ["rating-desc", "Rating: High → Low"],
                ].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => { setSort(val); setSortOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color:      sort === val ? "#2563eb" : "#374151",
                      fontWeight: sort === val ? "600" : "400",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── SERVICES GRID ───────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Result count */}
        {!loading && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              Showing <span className="text-gray-900 font-semibold">{filtered.length}</span> service{filtered.length !== 1 ? "s" : ""}
              {category !== "All" && <> in <span className="text-blue-600 font-semibold">{category}</span></>}
              {search && <> matching "<span className="text-blue-600 font-semibold">{search}</span>"</>}
            </p>
            {(category !== "All" || search || sort !== "default") && (
              <button
                onClick={() => { setCategory("All"); setSearch(""); setSort("default"); }}
                className="text-xs text-blue-500 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors"
              >
                <XIcon /> Clear filters
              </button>
            )}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-gray-800 font-bold text-xl mb-2" style={{ fontFamily: "'Sora', sans-serif" }}>
              No services found
            </h3>
            <p className="text-gray-400 text-sm max-w-xs mb-6">
              Try adjusting your search or clearing the category filter.
            </p>
            <button
              onClick={() => { setCategory("All"); setSearch(""); setSort("default"); }}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Cards */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* ── CTA STRIP ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div
          className="relative overflow-hidden rounded-3xl text-center px-8 py-12"
          style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #38bdf8 100%)" }}
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }} />
          <div className="relative">
            <span className="text-3xl mb-3 block">🚨</span>
            <h2
              className="text-2xl md:text-3xl font-extrabold text-white mb-2"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Need help urgently?
            </h2>
            <p className="text-blue-200 text-base mb-7">
              Book instantly and get a professional at your door within hours.
            </p>
            <button
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold text-sm px-8 py-3.5 rounded-full hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Book Now <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* ── TRUST SECTION ───────────────────────────── */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
              Why choose FixGar
            </span>
            <h2
              className="text-2xl md:text-3xl font-extrabold text-gray-900"
              style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}
            >
              Built for your peace of mind
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((f, i) => (
              <div
                key={f.title}
                className="group flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3
                  className="text-gray-900 font-bold text-base mb-2"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
