import { useLocation } from 'react-router-dom';
import { IconBell, IconChevronRight } from '@reloop/ui';
import { NAV_ITEMS } from './nav-config.js';

const HamburgerIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function TopBar({ onMenuClick, online, setOnline }) {
  const { pathname } = useLocation();
  const current = NAV_ITEMS.find((n) =>
    n.to === '/' ? pathname === '/' : pathname.startsWith(n.to)
  );
  const label = current?.label ?? 'RE-LOOP Collector';

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="px-4 md:px-8 h-14 flex items-center gap-3 md:gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden w-9 h-9 -ml-1 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700"
          aria-label="Mở menu"
        >
          <HamburgerIcon />
        </button>

        <div className="text-[13px] text-slate-500 flex items-center gap-2 min-w-0">
          <span className="hidden sm:inline">RE-LOOP Collector</span>
          <IconChevronRight size={11} className="hidden sm:inline" />
          <span className="font-bold text-slate-900 truncate">{label}</span>
        </div>

        <div className="flex-1" />

        <button
          onClick={() => setOnline(!online)}
          className={`md:hidden h-8 px-2.5 rounded-lg font-bold text-[11.5px] flex items-center gap-1.5 ${
            online
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${online ? 'bg-emerald-500 pulse-dot' : 'bg-slate-400'}`}
          />
          {online ? 'On' : 'Off'}
        </button>

        <div className="hidden lg:block text-[12px] text-slate-500">
          Hôm nay <b className="text-slate-700">25/04</b> · Q.7, TP.HCM · 28°C
        </div>
        <button
          className="relative w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600"
          aria-label="Thông báo"
        >
          <IconBell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
        </button>
      </div>
    </div>
  );
}
