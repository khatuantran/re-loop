import React from 'react';

export const Pill = ({ children, tone = 'green', className = '' }) => {
  const tones = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    red: 'bg-red-50 text-red-700 border-red-100',
    earth: 'bg-amber-50/60 text-amber-900 border-amber-100',
    white: 'bg-white/90 text-slate-700 border-white/50 backdrop-blur',
    dark: 'bg-slate-900 text-white border-slate-900',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
};

export const Btn = ({
  variant = 'primary',
  size = 'md',
  radius = 'soft',
  className = '',
  children,
  icon: IconL,
  iconRight: IconR,
  disabled,
  ...rest
}) => {
  const variants = {
    primary:
      'bg-emerald-500 text-white hover:bg-emerald-600 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.55)]',
    primarySolid: 'bg-emerald-700 text-white hover:bg-emerald-800',
    primaryLight: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm',
    secondary: 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
    dark: 'bg-slate-900 text-white hover:bg-slate-800',
    danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50',
  };
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-[15px]',
    lg: 'h-14 px-5 text-base',
    xl: 'h-16 px-6 text-lg',
  };
  const radiusCls = radius === 'lg' ? 'rounded-lg' : 'rounded-[10px]';
  const disabledCls = disabled
    ? 'bg-slate-100 text-slate-400 cursor-not-allowed hover:bg-slate-100'
    : '';
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 ${radiusCls} ${variants[variant]} ${sizes[size]} ${disabledCls} ${className}`}
    >
      {IconL && <IconL size={size === 'sm' ? 16 : 18} />}
      {children}
      {IconR && <IconR size={size === 'sm' ? 16 : 18} />}
    </button>
  );
};

export const Card = ({ variant = 'soft', className = '', children, ...rest }) => {
  const styles =
    variant === 'hub'
      ? 'bg-white rounded-xl border border-slate-200'
      : 'bg-white rounded-2xl border border-slate-200/70 shadow-[0_2px_6px_-2px_rgba(15,23,42,0.06)]';
  return (
    <div {...rest} className={`${styles} ${className}`}>
      {children}
    </div>
  );
};

export const Field = ({ label, hint, children, required }) => (
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

export const Input = ({ className = '', ...rest }) => (
  <input
    {...rest}
    className={`w-full h-10 px-3 text-[14px] rounded-lg border border-slate-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none font-mono tabular-nums ${className}`}
  />
);

/**
 * PhoneFrame — preview wrapper hiển thị app trong khung điện thoại 390x844.
 * Chỉ dùng cho preview/marketing, KHÔNG dùng làm layout production. Production
 * render thẳng vào viewport và responsive bằng Tailwind breakpoints.
 */
export const PhoneFrame = ({ children, statusBarTone = 'dark', showHome = true }) => (
  <div className="relative mx-auto" style={{ width: 390 }}>
    <div
      className="relative bg-white rounded-[44px] overflow-hidden border border-slate-200 shadow-[0_30px_60px_-20px_rgba(4,120,87,0.18),0_0_0_8px_#fff,0_0_0_10px_rgba(15,23,42,0.06)]"
      style={{ height: 844 }}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-[110px] h-[28px] bg-slate-900 rounded-full"></div>
      <div
        className={`absolute top-0 left-0 right-0 z-20 h-11 px-7 flex items-center justify-between text-xs font-semibold ${
          statusBarTone === 'light' ? 'text-white' : 'text-slate-900'
        }`}
      >
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 7h2v2H1zm4-2h2v4H5zm4-2h2v6H9zm4-2h2v8h-2z" fill="currentColor" />
          </svg>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path
              d="M7 1c2.2 0 4.2.8 5.7 2.2l1-1A8.5 8.5 0 0 0 7 0a8.5 8.5 0 0 0-6.7 2.2l1 1A7 7 0 0 1 7 1zm0 3c1.4 0 2.7.5 3.7 1.4l1-1A6 6 0 0 0 7 3a6 6 0 0 0-4.7 2.4l1 1A4.6 4.6 0 0 1 7 4zm0 3c.7 0 1.4.3 1.9.8l1-1A4 4 0 0 0 7 6a4 4 0 0 0-2.9 1.8l1 1A2.6 2.6 0 0 1 7 7z"
              fill="currentColor"
            />
          </svg>
          <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
            <rect x=".5" y=".5" width="18" height="9" rx="2" stroke="currentColor" />
            <rect x="2" y="2" width="14" height="6" rx="1" fill="currentColor" />
            <rect x="20" y="3" width="1.5" height="4" rx=".5" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">{children}</div>
      {showHome && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 w-[140px] h-[5px] bg-slate-900/90 rounded-full"></div>
      )}
    </div>
  </div>
);
