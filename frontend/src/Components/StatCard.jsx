import { useState, useEffect, useRef } from "react";

const stats = [
  {
    icon: "🛠",
    value: 10000,
    suffix: "+",
    label: "Services Completed",
    sublabel: "and counting every day",
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    border: "border-blue-100",
    glow: "rgba(59,130,246,0.12)",
  },
  {
    icon: "😊",
    value: 5000,
    suffix: "+",
    label: "Happy Customers",
    sublabel: "across 20+ cities",
    color: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    border: "border-emerald-100",
    glow: "rgba(16,185,129,0.12)",
  },
  {
    icon: "⭐",
    value: 4.8,
    suffix: "",
    prefix: "",
    label: "Average Rating",
    sublabel: "based on verified reviews",
    color: "from-amber-500 to-yellow-400",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    border: "border-amber-100",
    glow: "rgba(245,158,11,0.12)",
    isDecimal: true,
  },
];

function useCountUp(target, duration = 1800, started = false, isDecimal = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal
        ? parseFloat((eased * target).toFixed(1))
        : Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration, isDecimal]);
  return count;
}

function StatCard({ stat, index, started }) {
  const count = useCountUp(stat.value, 1800 + index * 200, started, stat.isDecimal);
  const [hovered, setHovered] = useState(false);

  const displayValue = stat.isDecimal ? count.toFixed(1) : count.toLocaleString();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col items-center text-center p-8 rounded-3xl border ${stat.border} bg-white transition-all duration-500 cursor-default`}
      style={{
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 20px 48px ${stat.glow}, 0 4px 16px rgba(0,0,0,0.08)`
          : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
        style={{ width: hovered ? "60%" : "32%" }}
      />

      {/* Icon */}
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-2xl ${stat.iconBg} text-3xl mb-5 transition-transform duration-300 group-hover:scale-110`}
        style={{ boxShadow: `0 4px 16px ${stat.glow}` }}
      >
        {stat.icon}
      </div>

      {/* Value */}
      <div
        className={`font-extrabold text-4xl md:text-5xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-none mb-1`}
        style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}
      >
        {stat.prefix || ""}{displayValue}{stat.suffix}
      </div>

      {/* Label */}
      <p className="text-gray-800 font-semibold text-base mt-3 mb-1"
        style={{ fontFamily: "'Sora', sans-serif" }}>
        {stat.label}
      </p>

      {/* Sublabel */}
      <p className="text-gray-400 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {stat.sublabel}
      </p>
    </div>
  );
}

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setStarted(true), 300);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="w-full py-16 px-6 bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-fade { animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) both; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Trusted by thousands
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight"
            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}
          >
            Numbers that speak for themselves
          </h2>
          <p
            className="text-gray-500 mt-3 text-base max-w-md mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            FixGar connects you with verified professionals — fast, reliable, and rated.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={visible ? "stat-fade" : "opacity-0"}
              style={{ animationDelay: `${i * 130 + 200}ms` }}
            >
              <StatCard stat={stat} index={i} started={started} />
            </div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <div
          className={`mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400 transition-all duration-700 delay-700 ${visible ? "opacity-100" : "opacity-0"}`}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {["🔒 Verified Professionals", "📍 Available in 20+ Cities", "🕐 24/7 Support", "💳 Secure Payments"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}