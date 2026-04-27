import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  IconBarChart,
  IconBell,
  IconGavel,
  IconLock,
  IconRecycle,
} from '@reloop/ui';

const NAV = [
  { to: '/', label: 'Marketplace', icon: IconGavel, end: true },
  { to: '/lot/CU-2026-0412', label: 'Lot · Sealed-bid', icon: IconLock, match: '/lot' },
  { to: '/esg', label: 'ESG Dashboard', icon: IconBarChart },
  { to: '/journey', label: 'PET Journey', icon: IconRecycle },
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

function NavTabs({ onNavigate, vertical }) {
  const { pathname } = useLocation();
  return (
    <nav className={vertical ? 'flex flex-col gap-1 p-3' : 'flex items-center gap-1 ml-2'}>
      {NAV.map((s) => {
        const I = s.icon;
        const isActive = s.match ? pathname.startsWith(s.match) : s.end ? pathname === '/' : pathname.startsWith(s.to);
        return (
          <NavLink
            key={s.to}
            to={s.to}
            onClick={onNavigate}
            className={`${vertical ? 'w-full' : 'h-10 shrink-0'} px-3.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 transition-colors ${
              isActive
                ? 'bg-emerald-50 text-emerald-800'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <I size={15} className={isActive ? 'text-emerald-700' : 'text-slate-400'} />
            <span className={vertical ? '' : 'whitespace-nowrap'}>{s.label}</span>
          </NavLink>
        );
      })}
    </nav>
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
    <div className="min-h-screen bg-[#F4F6F4]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center gap-3 md:gap-6">
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden w-9 h-9 -ml-1 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700"
            aria-label="Mở menu"
          >
            <HamburgerIcon />
          </button>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <IconRecycle size={20} />
            </div>
            <div className="hidden sm:block">
              <div className="text-[14px] font-extrabold tracking-tight text-emerald-900 leading-none">
                RE-LOOP
              </div>
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">B2B · PORTAL</div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 min-w-0 overflow-x-auto no-scrollbar">
            <NavTabs />
          </div>
          <div className="md:hidden flex-1 text-center">
            <div className="text-[13px] font-extrabold tracking-tight text-emerald-900">
              RE-LOOP B2B
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              className="relative w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600"
              aria-label="Thông báo"
            >
              <IconBell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="text-right hidden lg:block">
                <div className="text-[12px] font-bold text-slate-900 leading-tight">
                  Unilever Vietnam
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">Premium · 14 seats</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-extrabold text-sm">
                U
              </div>
            </div>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative h-full w-[260px] bg-white shadow-xl flex flex-col">
            <div className="px-4 py-4 border-b border-slate-200 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <IconRecycle size={20} />
              </div>
              <div>
                <div className="text-[14px] font-extrabold tracking-tight text-emerald-900 leading-none">
                  RE-LOOP
                </div>
                <div className="text-[9px] font-mono text-slate-500 mt-0.5">B2B · PORTAL</div>
              </div>
            </div>
            <NavTabs vertical onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
}
