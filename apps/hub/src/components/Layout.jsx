import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  IconChevronRight,
  IconHome,
  IconFactory,
  IconPackage,
  IconRecycle,
  IconSettings,
  IconStar,
  IconTrendingUp,
  IconTruck,
} from '@reloop/ui';

const NAV = [
  { to: '/', label: 'Dashboard', icon: IconHome },
  { to: '/disassembly', label: 'Xử lý / Rã xác', icon: IconFactory },
  { to: '/marketplace', label: 'Marketplace B2B', icon: IconPackage },
];

const EXTRAS = [
  { l: 'Báo cáo ESG', i: IconTrendingUp },
  { l: 'Collector partners', i: IconTruck },
  { l: 'Cài đặt trạm', i: IconSettings },
];

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

function Sidebar({ onNavigate }) {
  return (
    <div className="h-full bg-white border-r border-slate-200 flex flex-col w-[240px]">
      <div className="px-5 py-5 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
            <IconRecycle size={20} />
          </div>
          <div>
            <div className="text-[14px] font-extrabold tracking-tight text-emerald-900 leading-none">
              RE-LOOP
            </div>
            <div className="text-[9px] font-mono text-slate-500 mt-0.5">HUB · OPERATOR</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-1.5">
          Vận hành
        </div>
        {NAV.map(({ to, label, icon: I }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <I size={16} className={isActive ? 'text-emerald-700' : 'text-slate-400'} />
                {label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </>
            )}
          </NavLink>
        ))}

        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-1.5 mt-5">
          Khác
        </div>
        {EXTRAS.map((o) => (
          <button
            key={o.l}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-slate-500 hover:bg-slate-50"
          >
            <o.i size={16} className="text-slate-400" /> {o.l}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200">
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            M
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-bold text-slate-900 truncate">Trần Mạnh</div>
            <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
              <IconStar size={9} className="text-amber-400" style={{ fill: '#fbbf24' }} />
              Operator · #H-005
            </div>
          </div>
          <IconChevronRight size={14} className="text-slate-400" />
        </div>
      </div>
    </div>
  );
}

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex bg-[#F4F6F4]">
      <aside className="hidden lg:flex shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </aside>

      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative h-full">
            <Sidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 flex flex-col">
        <div className="lg:hidden bg-white border-b border-slate-200 sticky top-0 z-30 px-4 h-14 flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 -ml-1 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700"
            aria-label="Mở menu"
          >
            <HamburgerIcon />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <IconRecycle size={15} />
            </div>
            <div className="text-[13px] font-extrabold tracking-tight text-emerald-900">
              RE-LOOP Hub
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
