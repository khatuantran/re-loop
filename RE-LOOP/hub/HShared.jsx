// Shared atoms for Hub portal — desktop B2B tone
const { useState, useEffect, useMemo } = React;

const fmtVnd = (n) => n.toLocaleString('vi-VN') + ' ₫';
const fmtNum = (n, d = 0) => n.toLocaleString('vi-VN', { maximumFractionDigits: d, minimumFractionDigits: d });

const HPill = ({ children, tone = "slate", className = "" }) => {
  const tones = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    red:   "bg-red-50 text-red-700 border-red-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    earth: "bg-amber-100/50 text-amber-900 border-amber-200/70",
    dark:  "bg-slate-900 text-white border-slate-900",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
};

const HBtn = ({ variant = "primary", size = "md", className = "", children, icon: I, iconRight: IR, ...rest }) => {
  const variants = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm",
    primaryLight: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    ghost: "text-slate-700 hover:bg-slate-100",
    dark: "bg-slate-900 text-white hover:bg-slate-800",
    danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50",
    disabled: "bg-slate-100 text-slate-400 cursor-not-allowed",
  };
  const sizes = { sm: "h-8 px-3 text-[13px]", md: "h-10 px-4 text-[14px]", lg: "h-12 px-5 text-[15px]" };
  return (
    <button {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}>
      {I && <I size={16}/>}
      {children}
      {IR && <IR size={16}/>}
    </button>
  );
};

const HCard = ({ className = "", children, ...rest }) => (
  <div {...rest} className={`bg-white rounded-xl border border-slate-200 ${className}`}>
    {children}
  </div>
);

const HField = ({ label, hint, children, required }) => (
  <div>
    <label className="flex items-center justify-between mb-1.5">
      <span className="text-[12px] font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {hint && <span className="text-[11px] text-slate-400 font-mono">{hint}</span>}
    </label>
    {children}
  </div>
);

const HInput = (p) => (
  <input {...p} className={`w-full h-10 px-3 text-[14px] rounded-lg border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none font-mono tabular-nums ${p.className||''}`}/>
);

window.fmtVnd = fmtVnd;
window.fmtNum = fmtNum;
window.HPill = HPill;
window.HBtn = HBtn;
window.HCard = HCard;
window.HField = HField;
window.HInput = HInput;
