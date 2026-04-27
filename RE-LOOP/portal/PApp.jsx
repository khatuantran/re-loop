// Portal app shell — top tabs nav across 4 screens
const PORTAL_SCREENS = [
  { id: 'marketplace', label: 'Marketplace',     icon: Icon.Gavel },
  { id: 'lot',         label: 'Lot · Sealed-bid', icon: Icon.Lock },
  { id: 'esg',         label: 'ESG Dashboard',   icon: Icon.BarChart },
  { id: 'journey',     label: 'PET Journey',     icon: Icon.Recycle },
];

const PApp = () => {
  const [screen, setScreen] = React.useState('marketplace');
  const [activeLot, setActiveLot] = React.useState('CU-2026-0412');

  return (
    <div className="min-h-screen bg-[#F4F6F4]">
      {/* TOP NAV */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Icon.Recycle size={20}/>
            </div>
            <div>
              <div className="text-[14px] font-extrabold tracking-tight text-emerald-900 leading-none">RE-LOOP</div>
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">B2B · PORTAL</div>
            </div>
          </div>

          <nav className="flex items-center gap-1 ml-4">
            {PORTAL_SCREENS.map(s => {
              const a = screen === s.id;
              return (
                <button key={s.id} onClick={() => setScreen(s.id)}
                  data-screen-label={s.label}
                  className={`h-10 px-3.5 rounded-lg text-[13px] font-semibold flex items-center gap-2 ${
                    a ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
                  }`}>
                  <s.icon size={15} className={a ? 'text-emerald-700' : 'text-slate-400'}/> {s.label}
                </button>
              );
            })}
          </nav>

          <div className="flex-1"/>

          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600">
              <Icon.Bell size={17}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"/>
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="text-right">
                <div className="text-[12px] font-bold text-slate-900 leading-tight">Unilever Vietnam</div>
                <div className="text-[10px] text-slate-500 leading-tight">Premium · 14 seats</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-extrabold text-sm">U</div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main data-screen-label={screen}>
        {screen === 'marketplace' && (
          <PMarketplace onOpen={(id)=>{ setActiveLot(id); setScreen('lot'); }}/>
        )}
        {screen === 'lot' && (
          <PLotDetail lotId={activeLot} onBack={()=>setScreen('marketplace')} onJourney={()=>setScreen('journey')}/>
        )}
        {screen === 'esg' && (
          <PESG onJourney={()=>setScreen('journey')}/>
        )}
        {screen === 'journey' && (
          <PJourney onBack={()=>setScreen('esg')}/>
        )}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<PApp />);
