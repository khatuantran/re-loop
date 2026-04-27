import { NavLink } from 'react-router-dom';
import { IconStar, IconTruck } from '@reloop/ui';
import { NAV_ITEMS } from './nav-config.js';

const NavItem = ({ to, icon: I, label, badge, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    end={to === '/'}
    className={({ isActive }) =>
      `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-semibold transition-colors ${
        isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <I size={17} className={isActive ? 'text-emerald-700' : 'text-slate-400'} />
        <span className="flex-1 text-left">{label}</span>
        {badge && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-mono font-bold">
            {badge}
          </span>
        )}
        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
      </>
    )}
  </NavLink>
);

export default function Sidebar({ online, setOnline, onNavigate }) {
  return (
    <div className="h-full bg-white border-r border-slate-200 flex flex-col w-[240px]">
      <div className="px-5 py-5 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
            <IconTruck size={20} />
          </div>
          <div>
            <div className="text-[14px] font-extrabold tracking-tight text-emerald-900 leading-none">
              RE-LOOP
            </div>
            <div className="text-[9px] font-mono text-slate-500 mt-0.5">COLLECTOR · TIER 2</div>
          </div>
        </div>
      </div>

      <div className="px-3 py-3 border-b border-slate-100">
        <button
          onClick={() => setOnline(!online)}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-bold text-[13px] transition-colors ${
            online
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${online ? 'bg-emerald-500 pulse-dot' : 'bg-slate-400'}`}
          />
          {online ? 'Đang online' : 'Offline'}
        </button>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-1">
        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-1.5">
          Hoạt động
        </div>
        {NAV_ITEMS.map((s) => (
          <NavItem key={s.to} {...s} onClick={onNavigate} />
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200">
        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            T
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-bold text-slate-900 truncate">
              Anh Tuấn · #C-018
            </div>
            <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
              <IconStar size={9} className="text-amber-400" style={{ fill: '#fbbf24' }} />
              4.9 · 678 đơn
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
