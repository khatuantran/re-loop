// Hub App shell — desktop sidebar nav
const H_SCREENS = [
  { id: 'dashboard',   label: 'Dashboard',         icon: Icon.Home,    comp: HDashboard },
  { id: 'disassembly', label: 'Xử lý / Rã xác',    icon: Icon.Factory, comp: HDisassembly },
  { id: 'marketplace', label: 'Marketplace B2B',   icon: Icon.Package, comp: HMarketplace },
];

const HApp = () => {
  const [screen, setScreen] = React.useState('dashboard');
  const Comp = H_SCREENS.find(s => s.id === screen).comp;

  return (
    <div className="min-h-screen flex bg-[#F4F6F4]">
      {/* SIDEBAR */}
      <aside className="w-[240px] shrink-0 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Icon.Recycle size={20}/>
            </div>
            <div>
              <div className="text-[14px] font-extrabold tracking-tight text-emerald-900 leading-none">RE-LOOP</div>
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">HUB · OPERATOR</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-1.5">Vận hành</div>
          {H_SCREENS.map(s => {
            const a = screen === s.id;
            return (
              <button key={s.id} onClick={() => setScreen(s.id)}
                data-screen-label={s.label}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-colors ${
                  a ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
                }`}>
                <s.icon size={16} className={a ? 'text-emerald-700' : 'text-slate-400'}/>
                {s.label}
                {a && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500"/>}
              </button>
            );
          })}

          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-1.5 mt-5">Khác</div>
          {[
            { l: 'Báo cáo ESG',       i: Icon.TrendingUp },
            { l: 'Collector partners', i: Icon.Truck },
            { l: 'Cài đặt trạm',      i: Icon.Settings },
          ].map(o => (
            <button key={o.l} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-slate-500 hover:bg-slate-50">
              <o.i size={16} className="text-slate-400"/> {o.l}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-200">
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">M</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-bold text-slate-900 truncate">Trần Mạnh</div>
              <div className="text-[10px] text-slate-500 truncate">Operator · #H-005</div>
            </div>
            <Icon.ChevronRight size={14} className="text-slate-400"/>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 min-w-0">
        <div data-screen-label={screen}>
          <Comp onNavigate={setScreen} />
        </div>
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<HApp />);
