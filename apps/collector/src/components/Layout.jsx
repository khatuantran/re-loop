import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';
import BottomNav from './BottomNav.jsx';

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [online, setOnline] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setDrawerOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex bg-[#F4F6F4]">
      <aside className="hidden md:flex shrink-0 sticky top-0 h-screen">
        <Sidebar online={online} setOnline={setOnline} />
      </aside>

      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative h-full">
            <Sidebar
              online={online}
              setOnline={setOnline}
              onNavigate={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 flex flex-col">
        <TopBar
          onMenuClick={() => setDrawerOpen(true)}
          online={online}
          setOnline={setOnline}
        />
        <div className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
