// Shared atoms and the device frame that wraps each screen.
const { useState, useEffect, useRef, useMemo } = React;

const Pill = ({ children, tone = "green", className = "" }) => {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    red: "bg-red-50 text-red-700 border-red-100",
    earth: "bg-amber-50/60 text-amber-900 border-amber-100",
    white: "bg-white/90 text-slate-700 border-white/50 backdrop-blur",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
};

const Btn = ({ variant = "primary", size = "md", className = "", children, icon: IconL, iconRight: IconR, ...rest }) => {
  const variants = {
    primary: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.55)]",
    primarySolid: "bg-emerald-700 text-white hover:bg-emerald-800",
    secondary: "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
    danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50",
  };
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-[15px]",
    lg: "h-14 px-5 text-base",
    xl: "h-16 px-6 text-lg",
  };
  return (
    <button {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-all duration-150 ${variants[variant]} ${sizes[size]} ${className}`}>
      {IconL && <IconL size={size === 'sm' ? 16 : 18} />}
      {children}
      {IconR && <IconR size={size === 'sm' ? 16 : 18} />}
    </button>
  );
};

const Card = ({ className = "", children, ...rest }) => (
  <div {...rest} className={`bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_6px_-2px_rgba(15,23,42,0.06)] ${className}`}>
    {children}
  </div>
);

// A "phone" frame for screens that should feel mobile-first, but live on a web canvas.
const PhoneFrame = ({ children, statusBarTone = "dark", showHome = true }) => {
  return (
    <div className="relative mx-auto" style={{ width: 390 }}>
      <div className="relative bg-white rounded-[44px] overflow-hidden border border-slate-200 shadow-[0_30px_60px_-20px_rgba(4,120,87,0.18),0_0_0_8px_#fff,0_0_0_10px_rgba(15,23,42,0.06)]"
           style={{ height: 844 }}>
        {/* notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-[110px] h-[28px] bg-slate-900 rounded-full"></div>
        {/* status bar */}
        <div className={`absolute top-0 left-0 right-0 z-20 h-11 px-7 flex items-center justify-between text-xs font-semibold ${statusBarTone === 'light' ? 'text-white' : 'text-slate-900'}`}>
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 7h2v2H1zm4-2h2v4H5zm4-2h2v6H9zm4-2h2v8h-2z" fill="currentColor"/></svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M7 1c2.2 0 4.2.8 5.7 2.2l1-1A8.5 8.5 0 0 0 7 0a8.5 8.5 0 0 0-6.7 2.2l1 1A7 7 0 0 1 7 1zm0 3c1.4 0 2.7.5 3.7 1.4l1-1A6 6 0 0 0 7 3a6 6 0 0 0-4.7 2.4l1 1A4.6 4.6 0 0 1 7 4zm0 3c.7 0 1.4.3 1.9.8l1-1A4 4 0 0 0 7 6a4 4 0 0 0-2.9 1.8l1 1A2.6 2.6 0 0 1 7 7z" fill="currentColor"/></svg>
            <svg width="22" height="10" viewBox="0 0 22 10" fill="none"><rect x=".5" y=".5" width="18" height="9" rx="2" stroke="currentColor"/><rect x="2" y="2" width="14" height="6" rx="1" fill="currentColor"/><rect x="20" y="3" width="1.5" height="4" rx=".5" fill="currentColor"/></svg>
          </div>
        </div>
        {/* content area */}
        <div className="absolute inset-0 overflow-hidden">{children}</div>
        {/* home indicator */}
        {showHome && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 w-[140px] h-[5px] bg-slate-900/90 rounded-full"></div>
        )}
      </div>
    </div>
  );
};

// Spark line svg
const Spark = ({ data, height = 36, width = 120, color = "#10B981" }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => `${i * stepX},${height - ((v - min) / range) * (height - 4) - 2}`).join(' ');
  const area = `0,${height} ${points} ${width},${height}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#sparkGrad)"/>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// Animated count
const useCountUp = (target, duration = 800) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    let raf;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
};

const fmtVnd = (n) => n.toLocaleString('vi-VN') + ' ₫';
const fmtNum = (n, d = 0) => n.toLocaleString('vi-VN', { maximumFractionDigits: d, minimumFractionDigits: d });

window.Pill = Pill;
window.Btn = Btn;
window.Card = Card;
window.PhoneFrame = PhoneFrame;
window.Spark = Spark;
window.useCountUp = useCountUp;
window.fmtVnd = fmtVnd;
window.fmtNum = fmtNum;
