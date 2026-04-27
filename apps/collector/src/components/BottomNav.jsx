import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from './nav-config.js';

export default function BottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 grid pb-[env(safe-area-inset-bottom)]"
      style={{ gridTemplateColumns: `repeat(${NAV_ITEMS.length}, minmax(0, 1fr))` }}
    >
      {NAV_ITEMS.map(({ to, label, icon: I, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center py-2 gap-1 text-[10px] font-semibold transition-colors ${
              isActive ? 'text-emerald-700' : 'text-slate-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <I size={20} className={isActive ? 'text-emerald-700' : 'text-slate-400'} />
              <span className="leading-none">{label}</span>
              {badge && (
                <span className="absolute top-1 right-3 text-[9px] min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
