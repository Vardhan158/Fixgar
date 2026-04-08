import { useState, useEffect, useRef } from "react";

/* ─── ICONS ──────────────────────────────────────────────────── */
const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
  </svg>
);
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
  </svg>
);
const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
  </svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 6 6 18M6 6l12 12"/>
  </svg>
);
const ArrowRight = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const ArrowLeft = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

/* ─── CONSTANTS ───────────────────────────────────────────────── */
const VISITING_CHARGE = 50;

const DUMMY_PROVIDER = {
  name: "Rajesh Kumar",
  phone: "+91 98765 43210",
  rating: 4.9,
  reviews: 312,
  eta: "12 min",
  experience: "6 yrs",
  avatar: "RK",
  badge: "Top Rated",
};

const TIME_SLOTS = [
  { id: "morning",   label: "Morning",   sub: "8 AM – 12 PM",  emoji: "🌅" },
  { id: "afternoon", label: "Afternoon", sub: "12 PM – 5 PM",  emoji: "☀️" },
  { id: "evening",   label: "Evening",   sub: "5 PM – 9 PM",   emoji: "🌆" },
];

const DEFAULT_SERVICE = {
  emoji: "🔧",
  name: "Plumber",
  category: "Plumbing",
  desc: "Fix leaking pipes, faucets, drain blocks & bathroom fittings.",
  price: 399,
};

/* ─── STEP INDICATOR ─────────────────────────────────────────── */
const STEPS = ["Service", "Location", "Schedule", "Confirm"];
function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
              style={{
                background: i < current ? "linear-gradient(135deg,#10b981,#059669)"
                           : i === current ? "linear-gradient(135deg,#3b82f6,#2563eb)"
                           : "#f3f4f6",
                color: i <= current ? "#fff" : "#9ca3af",
                boxShadow: i === current ? "0 4px 14px rgba(59,130,246,0.4)" : "none",
              }}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              className="text-xs mt-1 font-medium hidden sm:block"
              style={{ color: i === current ? "#2563eb" : i < current ? "#10b981" : "#9ca3af", fontFamily: "'DM Sans',sans-serif" }}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="h-0.5 w-10 sm:w-16 mx-1 rounded-full transition-all duration-500"
              style={{ background: i < current ? "linear-gradient(90deg,#10b981,#3b82f6)" : "#e5e7eb" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── SECTION CARD ───────────────────────────────────────────── */
function SectionCard({ title, icon, children, accent = false }) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
    >
      <div
        className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-50"
        style={{ background: accent ? "linear-gradient(90deg,#eff6ff,#f0fdf4)" : "#fafafa" }}
      >
        <span className="text-lg">{icon}</span>
        <h3 className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Sora',sans-serif" }}>{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ─── PULSE LOADER ───────────────────────────────────────────── */
function PulseLoader() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map(i => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

/* ─── LIVE TRACKING MAP (SVG) ────────────────────────────────── */
function LiveMap({ providerPos }) {
  return (
    <div style={{ position: "relative", width: "100%", height: 220, overflow: "hidden", background: "#e8f0fe", borderRadius: 0 }}>
      <svg viewBox="0 0 400 220" width="100%" height="220" style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Background */}
        <rect width="400" height="220" fill="#e8f0fe"/>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c7d9f5" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="400" height="220" fill="url(#grid)" opacity="0.3"/>
        {/* City blocks */}
        <rect x="10" y="10" width="70" height="50" rx="4" fill="#d4e3f7"/>
        <rect x="90" y="10" width="90" height="50" rx="4" fill="#d4e3f7"/>
        <rect x="190" y="10" width="80" height="50" rx="4" fill="#d4e3f7"/>
        <rect x="280" y="10" width="110" height="50" rx="4" fill="#d4e3f7"/>
        <rect x="10" y="75" width="50" height="60" rx="4" fill="#d4e3f7"/>
        <rect x="70" y="75" width="110" height="60" rx="4" fill="#d4e3f7"/>
        <rect x="190" y="75" width="60" height="60" rx="4" fill="#d4e3f7"/>
        <rect x="260" y="75" width="130" height="60" rx="4" fill="#d4e3f7"/>
        <rect x="10" y="150" width="100" height="60" rx="4" fill="#d4e3f7"/>
        <rect x="120" y="150" width="80" height="60" rx="4" fill="#d4e3f7"/>
        <rect x="210" y="150" width="90" height="60" rx="4" fill="#d4e3f7"/>
        <rect x="310" y="150" width="80" height="60" rx="4" fill="#d4e3f7"/>
        {/* Roads */}
        <line x1="0" y1="68" x2="400" y2="68" stroke="white" strokeWidth="6"/>
        <line x1="0" y1="140" x2="400" y2="140" stroke="white" strokeWidth="6"/>
        <line x1="80" y1="0" x2="80" y2="220" stroke="white" strokeWidth="5"/>
        <line x1="185" y1="0" x2="185" y2="220" stroke="white" strokeWidth="5"/>
        <line x1="290" y1="0" x2="290" y2="220" stroke="white" strokeWidth="5"/>
        {/* Route highlight */}
        <polyline
          points="75,195 75,140 75,68 185,68 185,40 272,40"
          stroke="#3b82f6" strokeWidth="4" fill="none"
          strokeDasharray="8 4" strokeLinecap="round" opacity="0.8"
        />
        {/* Provider dot */}
        <circle cx={providerPos.x} cy={providerPos.y} r="14" fill="rgba(59,130,246,0.15)"/>
        <circle cx={providerPos.x} cy={providerPos.y} r="9" fill="#2563eb" stroke="white" strokeWidth="2.5"/>
        {/* Destination pin */}
        <g transform="translate(258, 22)">
          <path d="M10 0C4.48 0 0 4.48 0 10c0 6.67 10 16 10 16s10-9.33 10-16C20 4.48 15.52 0 10 0z" fill="#ef4444"/>
          <circle cx="10" cy="10" r="4" fill="white"/>
        </g>
        {/* "You" label */}
        <rect x="282" y="24" width="28" height="14" rx="3" fill="white" stroke="#fca5a5" strokeWidth="0.5"/>
        <text x="296" y="34" textAnchor="middle" fontSize="9" fontWeight="600" fill="#ef4444" fontFamily="DM Sans,sans-serif">You</text>
        {/* Map label */}
        <rect x="318" y="200" width="74" height="16" rx="4" fill="rgba(255,255,255,0.85)"/>
        <text x="355" y="211" textAnchor="middle" fontSize="9" fill="#6b7280" fontFamily="DM Sans,sans-serif">Live Map</text>
      </svg>
    </div>
  );
}

/* ─── LIVE TRACKING SCREEN ───────────────────────────────────── */
function TrackingScreen({ provider, address, date, timeSlot, total, onBack }) {
  // Animate provider dot along the route waypoints
  const waypoints = [
    { x: 75, y: 195 },
    { x: 75, y: 140 },
    { x: 75, y: 68 },
    { x: 185, y: 68 },
    { x: 185, y: 40 },
    { x: 268, y: 40 },
  ];
  const [posIdx, setPosIdx] = useState(0);
  const [providerPos, setProviderPos] = useState(waypoints[0]);
  const animRef = useRef(null);
  const startRef = useRef(null);
  const SEGMENT_DURATION = 2200; // ms per segment

  useEffect(() => {
    let seg = 0;
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const t = Math.min(elapsed / SEGMENT_DURATION, 1);

      const from = waypoints[seg];
      const to   = waypoints[Math.min(seg + 1, waypoints.length - 1)];
      setProviderPos({
        x: from.x + (to.x - from.x) * t,
        y: from.y + (to.y - from.y) * t,
      });

      if (t >= 1 && seg < waypoints.length - 2) {
        seg++;
        startRef.current = timestamp;
        setPosIdx(seg);
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  // Derive status step from position index
  const trackStep = posIdx <= 1 ? 1 : posIdx <= 3 ? 2 : 3;

  const STATUS_STEPS = [
    { label: "Booking confirmed",  sub: "10:22 AM · Rajesh accepted your request", done: true,  active: false },
    { label: "En route to you",    sub: `~1.8 km away · Estimated ${provider.eta}`, done: trackStep > 1, active: trackStep === 1 },
    { label: "Provider arrives",   sub: "Estimated around 10:46 AM",               done: trackStep > 2, active: trackStep === 2 },
    { label: "Work begins",        sub: "Pay after completion · No hidden charges", done: trackStep > 3, active: trackStep === 3 },
  ];

  const slotLabel = TIME_SLOTS.find(s => s.id === timeSlot);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes pulseRing {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes slideUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .track-slide { animation: slideUp 0.4s cubic-bezier(.22,1,.36,1) both; }
        .pulse-ring {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: pulseRing 1.6s ease-out infinite;
        }
      `}</style>

      {/* ── Top bar ── */}
      <div
        className="sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center gap-3 px-4 py-3"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
      >
        <button
          onClick={onBack}
          className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft />
        </button>
        <div className="flex-1">
          <div className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Sora',sans-serif" }}>
            Live Tracking
          </div>
          <div className="text-xs text-gray-400" style={{ fontFamily: "'DM Sans',sans-serif" }}>
            {provider.name} · {provider.name.split(" ")[0]} is on the way
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: "#ecfdf5", color: "#065f46", border: "1px solid #a7f3d0" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          ETA {provider.eta}
        </div>
      </div>

      <div className="max-w-md mx-auto">

        {/* ── Map ── */}
        <div className="track-slide" style={{ animationDelay: "0ms" }}>
          <LiveMap providerPos={providerPos} />
        </div>

        <div className="px-4 py-4 space-y-4">

          {/* ── Provider strip ── */}
          <div
            className="track-slide bg-white rounded-2xl border border-gray-100 overflow-hidden"
            style={{ animationDelay: "60ms", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="p-4 flex items-center gap-4">
              {/* Avatar with pulse ring */}
              <div className="relative flex-shrink-0" style={{ width: 52, height: 52 }}>
                <div className="pulse-ring" style={{ top: -3, left: -3, right: -3, bottom: -3, borderRadius: "50%" }} />
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-white font-black text-base"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)" }}
                >
                  {provider.avatar}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm truncate" style={{ fontFamily: "'Sora',sans-serif" }}>
                  {provider.name}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <StarIcon />
                  <span className="text-sm font-semibold text-gray-700">{provider.rating}</span>
                  <span className="text-gray-400 text-xs">({provider.reviews} reviews)</span>
                </div>
                <div className="text-xs text-blue-500 font-medium mt-0.5">{provider.experience} experience</div>
              </div>
              <a
                href={`tel:${provider.phone}`}
                className="flex flex-col items-center justify-center w-12 h-12 rounded-xl border border-emerald-100 bg-emerald-50 hover:bg-emerald-100 transition-colors flex-shrink-0"
              >
                <div className="text-emerald-500"><PhoneIcon /></div>
                <span className="text-xs text-emerald-600 font-semibold mt-0.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>Call</span>
              </a>
            </div>

            {/* Phone number bar */}
            <div className="px-4 pb-4">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs"
                style={{ background: "#f0fdf4", border: "1px solid #d1fae5" }}
              >
                <div className="text-emerald-500"><PhoneIcon /></div>
                <span className="text-emerald-700 font-medium" style={{ fontFamily: "'DM Sans',sans-serif" }}>{provider.phone}</span>
                <span className="text-emerald-400 ml-auto">Tap to call</span>
              </div>
            </div>
          </div>

          {/* ── Status timeline ── */}
          <div
            className="track-slide bg-white rounded-2xl border border-gray-100 overflow-hidden"
            style={{ animationDelay: "120ms", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-50" style={{ background: "#fafafa" }}>
              <span className="text-lg">📍</span>
              <h3 className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Sora',sans-serif" }}>Order Status</h3>
            </div>
            <div className="p-5">
              {STATUS_STEPS.map((s, i) => (
                <div key={s.label} className="flex gap-3 items-stretch">
                  {/* Dot + connector */}
                  <div className="flex flex-col items-center" style={{ minWidth: 20 }}>
                    <div
                      style={{
                        width: 12, height: 12, borderRadius: "50%", flexShrink: 0, marginTop: 3,
                        background: s.done ? "#10b981" : s.active ? "#3b82f6" : "#d1d5db",
                        boxShadow: s.active ? "0 0 0 4px rgba(59,130,246,0.2)" : "none",
                        transition: "all 0.3s",
                      }}
                    />
                    {i < STATUS_STEPS.length - 1 && (
                      <div
                        style={{
                          width: 2, flex: 1, minHeight: 20, margin: "3px 0",
                          background: s.done ? "linear-gradient(180deg,#10b981,#3b82f6)" : "#e5e7eb",
                          borderRadius: 2, transition: "background 0.5s",
                        }}
                      />
                    )}
                  </div>
                  {/* Text */}
                  <div className="pb-4 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-semibold"
                        style={{
                          fontFamily: "'Sora',sans-serif",
                          color: s.done ? "#059669" : s.active ? "#1d4ed8" : "#9ca3af",
                        }}
                      >
                        {s.label}
                      </span>
                      {s.active && (
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ background: "#eff6ff", color: "#1d4ed8" }}
                        >
                          Live
                        </span>
                      )}
                      {s.done && (
                        <span className="text-xs text-emerald-500">✓</span>
                      )}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ fontFamily: "'DM Sans',sans-serif", color: "#9ca3af" }}
                    >
                      {s.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Booking summary ── */}
          <div
            className="track-slide bg-white rounded-2xl border border-gray-100 overflow-hidden"
            style={{ animationDelay: "180ms", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
          >
            <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-gray-50" style={{ background: "linear-gradient(90deg,#eff6ff,#f0fdf4)" }}>
              <span className="text-lg">🧾</span>
              <h3 className="font-bold text-gray-800 text-sm" style={{ fontFamily: "'Sora',sans-serif" }}>Booking Summary</h3>
            </div>
            <div className="p-5 space-y-2.5 text-sm">
              {[
                ["📍 Address", address],
                ["📅 Date",    date],
                ["🕐 Slot",    slotLabel ? `${slotLabel.label} · ${slotLabel.sub}` : "—"],
                ["💳 Total",   `₹${total}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between items-start gap-3">
                  <span className="text-gray-500 flex-shrink-0" style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
                  <span className="text-gray-800 font-medium text-right" style={{ fontFamily: "'DM Sans',sans-serif" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Safety note ── */}
          <div
            className="track-slide rounded-xl px-4 py-3 flex gap-3 items-start"
            style={{ animationDelay: "240ms", background: "#fffbeb", border: "1px solid #fde68a" }}
          >
            <span className="text-base mt-0.5">💡</span>
            <p className="text-xs text-amber-700" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Pay only after the job is done. Never pay in advance. If you feel unsafe, call our support line.
            </p>
          </div>

          {/* ── Bottom CTA ── */}
          <div className="track-slide pb-6" style={{ animationDelay: "300ms" }}>
            <button
              onClick={onBack}
              className="w-full border border-gray-200 text-gray-600 hover:border-gray-300 font-semibold text-sm rounded-xl py-3 transition-all duration-200"
              style={{ fontFamily: "'Sora',sans-serif" }}
            >
              ← Back to Booking
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function Booking({ initialService = DEFAULT_SERVICE }) {
  const [service]                     = useState(initialService);
  const [address, setAddress]         = useState("");
  const [date, setDate]               = useState("");
  const [timeSlot, setTimeSlot]       = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus]           = useState("idle"); // idle | searching | assigned | tracking
  const [provider, setProvider]       = useState(null);
  const [errors, setErrors]           = useState({});
  const [locLoading, setLocLoading]   = useState(false);
  const [locError, setLocError]       = useState("");
  const [locAccuracy, setLocAccuracy] = useState(null);
  const watchIdRef                    = useRef(null);
  const bestAccuracyRef               = useRef(Infinity);
  const [step, setStep]               = useState(0);
  const [searchProgress, setSearchProgress] = useState(0);
  const timerRef                      = useRef(null);
  const progressRef                   = useRef(null);

  const total = service.price + VISITING_CHARGE;
  const today = new Date().toISOString().split("T")[0];

  // Progress bar during searching
  useEffect(() => {
    if (status === "searching") {
      setSearchProgress(0);
      progressRef.current = setInterval(() => {
        setSearchProgress(p => Math.min(p + 2, 95));
      }, 80);
      timerRef.current = setTimeout(() => {
        clearInterval(progressRef.current);
        setSearchProgress(100);
        setTimeout(() => {
          setProvider(DUMMY_PROVIDER);
          setStatus("assigned");
          setStep(3);
        }, 400);
      }, 4200);
    }
    return () => { clearTimeout(timerRef.current); clearInterval(progressRef.current); };
  }, [status]);

  const validate = () => {
    const e = {};
    if (!address.trim()) e.address  = "Address is required";
    if (!date)           e.date     = "Please select a date";
    if (!timeSlot)       e.timeSlot = "Please select a time slot";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFindProvider = () => {
    if (!validate()) return;
    setStatus("searching");
    setStep(2);
  };

  const handleCancel = () => {
    clearTimeout(timerRef.current);
    clearInterval(progressRef.current);
    setStatus("idle");
    setStep(1);
    setSearchProgress(0);
  };

  const handleReset = () => {
    setAddress(""); setDate(""); setTimeSlot(""); setDescription("");
    setErrors({}); setStatus("idle"); setProvider(null); setStep(0); setSearchProgress(0);
  };

  const stopWatch = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  const buildAddressFromNominatim = (data) => {
    const a = data.address || {};
    const road     = a.road || a.pedestrian || a.footway || a.path || "";
    const houseNo  = a.house_number ? `${a.house_number}, ` : "";
    const locality = a.suburb || a.neighbourhood || a.quarter || a.residential || "";
    const area     = a.city_district || a.county || "";
    const city     = a.city || a.town || a.village || a.municipality || "";
    const state    = a.state || "";
    const pin      = a.postcode || "";
    const parts    = [houseNo + road, locality, area !== locality ? area : "", city, state, pin]
      .map(p => p.trim()).filter(Boolean);
    return parts.join(", ") || data.display_name;
  };

  const geocodeNominatim = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=18&addressdetails=1`;
    const res = await fetch(url, { headers: { "Accept-Language": "en-IN,en;q=0.9" } });
    if (!res.ok) throw new Error("Nominatim failed");
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return buildAddressFromNominatim(data);
  };

  const geocodeBigDataCloud = async (lat, lon) => {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("BigDataCloud failed");
    const d = await res.json();
    const parts = [d.locality || d.principalSubdivision || "", d.city || d.countryName || "", d.postcode || ""].filter(Boolean);
    const local  = d.localityInfo?.administrative?.find(l => l.order >= 8);
    const prefix = local ? local.name + ", " : "";
    return prefix + parts.join(", ");
  };

  const reverseGeocode = async (lat, lon) => {
    try { return await geocodeNominatim(lat, lon); }
    catch {
      try { return await geocodeBigDataCloud(lat, lon); }
      catch { return `${lat.toFixed(6)}°N, ${lon.toFixed(6)}°E`; }
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) { setLocError("Geolocation is not supported by your browser."); return; }
    if (locLoading) { stopWatch(); setLocLoading(false); setLocAccuracy(null); return; }
    setLocLoading(true); setLocError(""); setLocAccuracy(null);
    bestAccuracyRef.current = Infinity;
    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setLocAccuracy(Math.round(accuracy));
        if (accuracy < bestAccuracyRef.current) {
          bestAccuracyRef.current = accuracy;
          try {
            const readable = await reverseGeocode(latitude, longitude);
            setAddress(readable);
            setErrors(e => ({ ...e, address: undefined }));
            setStep(s => Math.max(s, 1));
          } catch {}
        }
        if (accuracy <= 20) { stopWatch(); setLocLoading(false); setLocAccuracy(null); }
      },
      (err) => {
        stopWatch(); setLocLoading(false); setLocAccuracy(null);
        switch (err.code) {
          case err.PERMISSION_DENIED:    setLocError("Location access denied. Please allow it in your browser settings and reload."); break;
          case err.POSITION_UNAVAILABLE: setLocError("GPS signal unavailable. Move to an open area and try again."); break;
          case err.TIMEOUT:              setLocError("Location timed out. Try again."); break;
          default:                       setLocError("Could not get location. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  };

  useEffect(() => () => stopWatch(), []);

  const isFormReady = address.trim() && date && timeSlot;

  /* ── TRACKING STATE ──────────────────────────── */
  if (status === "tracking" && provider) {
    return (
      <TrackingScreen
        provider={provider}
        address={address}
        date={date}
        timeSlot={timeSlot}
        total={total}
        onBack={() => setStatus("assigned")}
      />
    );
  }

  /* ── SEARCHING STATE ─────────────────────────── */
  if (status === "searching") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>
        <div className="w-full max-w-md text-center">
          <StepIndicator current={step} />
          <div
            className="bg-white rounded-3xl p-10 flex flex-col items-center"
            style={{ boxShadow: "0 8px 40px rgba(59,130,246,0.12)" }}
          >
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute w-24 h-24 rounded-full border-2 border-blue-100 animate-ping opacity-40" />
              <div className="absolute w-16 h-16 rounded-full border-2 border-blue-200 animate-ping opacity-60" style={{ animationDelay: "0.3s" }} />
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)", boxShadow: "0 8px 24px rgba(59,130,246,0.4)" }}
              >
                🔍
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: "'Sora',sans-serif" }}>
              Finding your {service.name}
            </h2>
            <p className="text-gray-400 text-sm mb-6" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Connecting you with verified professionals nearby…
            </p>
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className="h-2 rounded-full transition-all duration-200"
                style={{ width: `${searchProgress}%`, background: "linear-gradient(90deg,#3b82f6,#38bdf8)" }}
              />
            </div>
            <p className="text-blue-500 text-xs font-semibold mb-8" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              {searchProgress < 40 ? "Scanning nearby providers…" : searchProgress < 75 ? "Checking availability…" : "Almost there…"}
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 bg-blue-50 rounded-xl px-4 py-3 mb-6 w-full">
              <PulseLoader />
              <span style={{ fontFamily: "'DM Sans',sans-serif" }}>3–5 providers found in your area</span>
            </div>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 border border-gray-200 hover:border-red-200 rounded-xl px-5 py-2.5 transition-all duration-200"
              style={{ fontFamily: "'Sora',sans-serif" }}
            >
              <XIcon /> Cancel Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── ASSIGNED STATE ──────────────────────────── */
  if (status === "assigned" && provider) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>
        <div className="max-w-md mx-auto">
          <StepIndicator current={step} />

          {/* Success banner */}
          <div
            className="rounded-2xl p-5 mb-4 text-center"
            style={{ background: "linear-gradient(135deg,#ecfdf5,#d1fae5)", border: "1px solid #a7f3d0" }}
          >
            <div className="flex justify-center mb-2"><CheckCircle /></div>
            <h2 className="font-extrabold text-emerald-800 text-lg" style={{ fontFamily: "'Sora',sans-serif" }}>
              Provider Assigned!
            </h2>
            <p className="text-emerald-600 text-sm mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
              Your {service.name} is on the way 🎉
            </p>
          </div>

          {/* Provider card */}
          <div className="bg-white rounded-2xl overflow-hidden mb-4" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <div className="px-5 py-3 border-b border-gray-50 bg-gray-50 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-700" style={{ fontFamily: "'Sora',sans-serif" }}>Your Professional</span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">⭐ {provider.badge}</span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", boxShadow: "0 4px 14px rgba(59,130,246,0.4)" }}
                >
                  {provider.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-base" style={{ fontFamily: "'Sora',sans-serif" }}>{provider.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <StarIcon />
                    <span className="text-sm font-semibold text-gray-700">{provider.rating}</span>
                    <span className="text-gray-400 text-xs">({provider.reviews} reviews)</span>
                  </div>
                  <span className="text-xs text-blue-500 font-medium">{provider.experience} experience</span>
                </div>
              </div>

              {/* ETA + Phone row */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="flex flex-col items-center bg-blue-50 rounded-xl py-3">
                  <span className="text-2xl font-extrabold text-blue-600" style={{ fontFamily: "'Sora',sans-serif" }}>{provider.eta}</span>
                  <span className="text-xs text-blue-400 mt-0.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>ETA</span>
                </div>
                <a
                  href={`tel:${provider.phone}`}
                  className="flex flex-col items-center bg-emerald-50 rounded-xl py-3 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  <div className="text-emerald-500 mb-1"><PhoneIcon /></div>
                  <span className="text-xs text-emerald-600 font-semibold text-center" style={{ fontFamily: "'DM Sans',sans-serif" }}>{provider.phone}</span>
                </a>
              </div>

              {/* Booking summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                {[
                  ["📍 Address", address],
                  ["📅 Date",    date],
                  ["🕐 Slot",    TIME_SLOTS.find(s => s.id === timeSlot)?.label + " · " + TIME_SLOTS.find(s => s.id === timeSlot)?.sub],
                  ["💳 Total",   `₹${total}`],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between items-start gap-3">
                    <span className="text-gray-500 flex-shrink-0" style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
                    <span className="text-gray-800 font-medium text-right" style={{ fontFamily: "'DM Sans',sans-serif" }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 border border-gray-200 text-gray-600 hover:border-gray-300 font-semibold text-sm rounded-xl py-3 transition-all duration-200"
              style={{ fontFamily: "'Sora',sans-serif" }}
            >
              Book Another
            </button>
            <button
              onClick={() => setStatus("tracking")}
              className="flex-1 text-white font-bold text-sm rounded-xl py-3 transition-all duration-200 hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#3b82f6,#2563eb)", fontFamily: "'Sora',sans-serif", boxShadow: "0 4px 16px rgba(59,130,246,0.35)" }}
            >
              Track Live 📍
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── IDLE / FORM STATE ───────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes slideIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .slide-in { animation: slideIn 0.45s cubic-bezier(.22,1,.36,1) both; }
        input:focus, textarea:focus { outline: none; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
      `}</style>

      <div className="max-w-lg mx-auto">
        <StepIndicator current={step} />

        <div className="text-center mb-6 slide-in">
          <h1 className="text-2xl font-extrabold text-gray-900" style={{ fontFamily: "'Sora',sans-serif", letterSpacing: "-0.02em" }}>
            Book a Service
          </h1>
          <p className="text-gray-400 text-sm mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
            Fill in the details and we'll find you the best pro nearby.
          </p>
        </div>

        <div className="space-y-4">

          {/* 1. SERVICE SUMMARY */}
          <div className="slide-in" style={{ animationDelay: "0ms" }}>
            <SectionCard title="Selected Service" icon="🛠" accent>
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}
                >
                  {service.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-base" style={{ fontFamily: "'Sora',sans-serif" }}>{service.name}</h4>
                  <p className="text-gray-400 text-xs mt-0.5 leading-snug" style={{ fontFamily: "'DM Sans',sans-serif" }}>{service.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-extrabold text-blue-600 text-lg" style={{ fontFamily: "'Sora',sans-serif" }}>₹{service.price}</div>
                  <div className="text-gray-400 text-xs" style={{ fontFamily: "'DM Sans',sans-serif" }}>base price</div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* 2. ADDRESS */}
          <div className="slide-in" style={{ animationDelay: "60ms" }}>
            <SectionCard title="Service Address" icon="📍">
              <div className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Enter your full address…"
                    value={address}
                    onChange={e => { setAddress(e.target.value); if (e.target.value) setErrors(prev => ({ ...prev, address: undefined })); setStep(s => Math.max(s, 1)); }}
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 transition-colors duration-200 ${errors.address ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white"}`}
                    style={{ fontFamily: "'DM Sans',sans-serif" }}
                  />
                  {errors.address && (
                    <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      <AlertIcon /> {errors.address}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleGetLocation}
                    className={`flex items-center gap-2.5 text-sm font-semibold border rounded-xl px-4 py-2.5 transition-all duration-200 ${
                      locLoading
                        ? "text-blue-600 border-blue-200 bg-blue-50"
                        : "text-blue-600 hover:text-blue-700 border-blue-100 hover:border-blue-300 bg-blue-50 hover:bg-blue-100"
                    }`}
                    style={{ fontFamily: "'Sora',sans-serif" }}
                  >
                    {locLoading ? (
                      <>
                        <span className="relative flex-shrink-0 flex h-4 w-4 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
                        </span>
                        <span>{locAccuracy !== null ? `Refining… ±${locAccuracy}m` : "Acquiring GPS signal…"}</span>
                        <span
                          className="ml-auto text-xs text-red-400 font-medium border border-red-200 rounded-full px-2 py-0.5 hover:bg-red-50"
                          onClick={e => { e.stopPropagation(); stopWatch(); setLocLoading(false); setLocAccuracy(null); }}
                        >
                          Stop
                        </span>
                      </>
                    ) : (
                      <><MapPinIcon /><span>Use Current Location</span></>
                    )}
                  </button>

                  {locLoading && locAccuracy !== null && (
                    <div className="px-1">
                      <div className="flex justify-between text-xs mb-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                        <span className="text-gray-400">GPS Accuracy</span>
                        <span className={locAccuracy <= 30 ? "text-emerald-500 font-semibold" : locAccuracy <= 100 ? "text-amber-500 font-semibold" : "text-red-400 font-semibold"}>
                          {locAccuracy <= 20 ? "✓ Precise" : locAccuracy <= 50 ? "Good" : locAccuracy <= 100 ? "Fair" : "Weak"} · ±{locAccuracy}m
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-1.5 rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.max(5, Math.min(100, 100 - (locAccuracy / 200) * 100))}%`,
                            background: locAccuracy <= 30 ? "linear-gradient(90deg,#10b981,#34d399)" : locAccuracy <= 100 ? "linear-gradient(90deg,#f59e0b,#fbbf24)" : "linear-gradient(90deg,#ef4444,#f87171)",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {locError && (
                    <p className="flex items-center gap-1.5 text-red-500 text-xs px-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      <AlertIcon /> {locError}
                    </p>
                  )}
                </div>
              </div>
            </SectionCard>
          </div>

          {/* 3. DATE & TIME */}
          <div className="slide-in" style={{ animationDelay: "120ms" }}>
            <SectionCard title="Date & Time" icon="📅">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    Select Date
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><CalendarIcon /></span>
                    <input
                      type="date"
                      min={today}
                      value={date}
                      onChange={e => { setDate(e.target.value); setErrors(prev => ({ ...prev, date: undefined })); }}
                      className={`w-full border rounded-xl pl-9 pr-4 py-3 text-sm text-gray-800 transition-colors duration-200 ${errors.date ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-blue-400 focus:bg-white"}`}
                      style={{ fontFamily: "'DM Sans',sans-serif" }}
                    />
                  </div>
                  {errors.date && (
                    <p className="flex items-center gap-1.5 text-red-500 text-xs mt-1.5" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      <AlertIcon /> {errors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                    Preferred Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {TIME_SLOTS.map(slot => {
                      const active = timeSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          onClick={() => { setTimeSlot(slot.id); setErrors(prev => ({ ...prev, timeSlot: undefined })); }}
                          className="flex flex-col items-center py-3 px-2 rounded-xl border text-center transition-all duration-200"
                          style={{
                            background:  active ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "#f9fafb",
                            borderColor: active ? "transparent" : errors.timeSlot ? "#fca5a5" : "#e5e7eb",
                            boxShadow:   active ? "0 4px 14px rgba(59,130,246,0.35)" : "none",
                            transform:   active ? "scale(1.03)" : "scale(1)",
                          }}
                        >
                          <span className="text-xl mb-1">{slot.emoji}</span>
                          <span className="font-bold text-xs" style={{ fontFamily: "'Sora',sans-serif", color: active ? "#fff" : "#374151" }}>{slot.label}</span>
                          <span className="text-xs mt-0.5" style={{ fontFamily: "'DM Sans',sans-serif", color: active ? "rgba(255,255,255,0.75)" : "#9ca3af" }}>{slot.sub}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.timeSlot && (
                    <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                      <AlertIcon /> {errors.timeSlot}
                    </p>
                  )}
                </div>
              </div>
            </SectionCard>
          </div>

          {/* 4. PROBLEM DESCRIPTION */}
          <div className="slide-in" style={{ animationDelay: "180ms" }}>
            <SectionCard title="Describe the Problem" icon="📝">
              <textarea
                rows={3}
                placeholder="Optional: Describe the issue (e.g., 'bathroom tap leaking for 2 days')"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:border-blue-400 focus:bg-white transition-colors duration-200"
                style={{ fontFamily: "'DM Sans',sans-serif" }}
              />
              <p className="text-right text-xs text-gray-300 mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>{description.length}/300</p>
            </SectionCard>
          </div>

          {/* 5. PRICE SUMMARY */}
          <div className="slide-in" style={{ animationDelay: "240ms" }}>
            <SectionCard title="Price Summary" icon="💳" accent>
              <div className="space-y-2.5">
                {[
                  ["Base Price",     `₹${service.price}`],
                  ["Visiting Charge", `₹${VISITING_CHARGE}`],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between items-center text-sm">
                    <span className="text-gray-500" style={{ fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
                    <span className="text-gray-700 font-medium" style={{ fontFamily: "'DM Sans',sans-serif" }}>{val}</span>
                  </div>
                ))}
                <div className="h-px bg-gray-100 my-1" />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-sm" style={{ fontFamily: "'Sora',sans-serif" }}>Total Payable</span>
                  <span className="font-extrabold text-blue-600 text-xl" style={{ fontFamily: "'Sora',sans-serif" }}>₹{total}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                  💡 Pay after service. No hidden charges.
                </p>
              </div>
            </SectionCard>
          </div>

          {/* 6. FIND PROVIDER BUTTON */}
          <div className="slide-in pt-1 pb-6" style={{ animationDelay: "300ms" }}>
            <button
              onClick={handleFindProvider}
              disabled={!isFormReady}
              className="w-full flex items-center justify-center gap-2.5 font-bold text-base rounded-2xl py-4 transition-all duration-300"
              style={{
                fontFamily: "'Sora',sans-serif",
                background: isFormReady ? "linear-gradient(135deg,#3b82f6,#2563eb)" : "#e5e7eb",
                color:      isFormReady ? "#fff" : "#9ca3af",
                cursor:     isFormReady ? "pointer" : "not-allowed",
                boxShadow:  isFormReady ? "0 6px 24px rgba(59,130,246,0.4)" : "none",
                transform:  isFormReady ? "scale(1)" : "scale(0.99)",
              }}
            >
              {`Find ${service.name}`} <ArrowRight />
            </button>
            {!isFormReady && (
              <p className="text-center text-xs text-gray-400 mt-2" style={{ fontFamily: "'DM Sans',sans-serif" }}>
                Fill address, date & time slot to continue
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}