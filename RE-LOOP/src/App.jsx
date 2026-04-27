// Web shell — responsive web app layout, NOT a phone frame
const { useState: uS } = React;

const SCREENS = [
  { id: 'home',     label: 'Trang chủ',     icon: Icon.Home,     comp: () => <ScreenHomeWeb onNavigate={setScreenGlobal}/> },
];

let setScreenGlobal = () => {};

const NavLink = ({ icon: I, label, active, onClick, badge }) => (
  <button onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-semibold transition-colors ${
      active ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
    }`}>
    <I size={17} className={active ? 'text-emerald-700' : 'text-slate-400'}/>
    <span className="flex-1 text-left">{label}</span>
    {badge && <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-mono font-bold">{badge}</span>}
    {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>}
  </button>
);

const ScreenHomeWeb = ({ onNavigate }) => {
  const points = useCountUp(1250, 900);
  const co2 = useCountUp(12.4, 1100);
  const trees = useCountUp(0.6, 1100);
  const sparkData = [3.2, 5.8, 4.1, 7.3, 9.6, 12.4];

  const collectors = [
    { name: 'Anh Hùng', rating: 4.9, eta: 18, distance: '0.5 km', avatar: 'H', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Anh Tuấn', rating: 4.8, eta: 25, distance: '0.8 km', avatar: 'T', color: 'bg-amber-100 text-amber-700' },
    { name: 'Chị Lan',  rating: 4.6, eta: 50, distance: '1.4 km', avatar: 'L', color: 'bg-sky-100 text-sky-700' },
    { name: 'Chị Mai',  rating: 4.7, eta: 35, distance: '2.1 km', avatar: 'M', color: 'bg-rose-100 text-rose-700' },
  ];

  const history = [
    { id: 'RC-2026-0422-04219', date: '22/04', mat: 'Nhựa PET',       kg: 2.8, pts: 145 },
    { id: 'RC-2026-0418-09833', date: '18/04', mat: 'Carton + giấy',  kg: 5.4, pts: 180 },
    { id: 'RC-2026-0414-02018', date: '14/04', mat: 'Mô tơ điện cũ',  kg: 3.1, pts: 220 },
    { id: 'RC-2026-0408-07712', date: '08/04', mat: 'Nhựa PET',       kg: 1.9, pts: 95  },
  ];

  return (
    <div className="px-8 py-8 max-w-[1280px] mx-auto">
      {/* Greeting */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">Trang chủ</div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">Xin chào, Minh Anh 👋</h1>
          <div className="text-[13px] text-slate-500">Q.7, TP.HCM · 28°C, nắng nhẹ · Thứ Sáu 25/04/2026</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-[12px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot"/> +23 đơn hôm nay tại Q.7
          </span>
        </div>
      </div>

      {/* HERO band */}
      <Card className="p-0 overflow-hidden mb-6 bg-gradient-to-br from-emerald-700 to-emerald-500 border-emerald-700 text-white">
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-7 p-8">
            <div className="text-[12px] uppercase tracking-wider text-white/70 font-bold mb-2">Đặt thu gom</div>
            <div className="text-[34px] leading-[1.1] font-extrabold tracking-tight mb-2">
              Rác của bạn — chúng tôi đến tận nơi.
            </div>
            <div className="text-white/80 text-[14px] mb-5 max-w-md">
              Chụp ảnh, AI báo giá ngay. 5 collector đang trong 3km. Trung bình 18 phút có người tới.
            </div>
            <div className="flex items-center gap-3">
              <Btn variant="primarySolid" size="lg" className="!bg-white !text-emerald-700 hover:!bg-emerald-50" onClick={()=>onNavigate('flowA')} iconRight={Icon.ArrowRight}>
                Đặt lịch Thu gom
              </Btn>
              <Btn variant="ghost" size="lg" className="!text-white hover:!bg-white/10" onClick={()=>onNavigate('flowB')}>
                Bán đồ điện tử cũ →
              </Btn>
            </div>
          </div>
          <div className="col-span-5 relative bg-emerald-800/30 p-6 flex items-center">
            {/* Map preview */}
            <div className="w-full h-[180px] rounded-xl map-grid map-roads relative overflow-hidden border border-white/10">
              <div className="absolute inset-0">
                {/* user pin center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inset-0 ping-slow rounded-full bg-emerald-300/50 w-12 h-12 -m-4"/>
                  <div className="relative w-4 h-4 rounded-full bg-white border-[3px] border-emerald-600"/>
                </div>
                {[
                  {x:30,y:35,e:25},{x:65,y:30,e:50},{x:48,y:70,e:18},
                  {x:75,y:60,e:35},{x:22,y:62,e:42},
                ].map((p,i) => (
                  <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{left:`${p.x}%`,top:`${p.y}%`}}>
                    <div className="bg-white rounded-md px-1.5 py-0.5 shadow text-[10px] font-bold text-slate-700 font-mono">{p.e}'</div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mx-auto border border-white -mt-0.5"/>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-2 left-2 bg-white/95 rounded-md px-2 py-1 text-[10px] font-bold text-slate-700 flex items-center gap-1">
                <Icon.MapPin size={10}/> 5 collector trong 3km
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 3-up stat row */}
      <div className="grid grid-cols-12 gap-5 mb-6">
        {/* Wallet */}
        <Card className="col-span-5 p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Ví Green Points</div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
              <Icon.Coins size={18}/>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-[40px] font-extrabold tracking-tight text-slate-900 tabular-nums leading-none">{fmtNum(Math.floor(points))}</span>
            <span className="text-[14px] font-semibold text-amber-500">điểm</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11.5px] text-slate-500 mb-1.5">
              <span>Còn <b className="text-slate-700">250</b> điểm để nhận voucher 50K</span>
              <span className="font-mono">1250 / 1500</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-300 to-amber-500" style={{width:'83.3%'}}/>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'GrabFood', sub: '−30K', tone: 'bg-green-50 text-green-700 border-green-100' },
              { label: 'Shopee',   sub: '−50K', tone: 'bg-orange-50 text-orange-700 border-orange-100' },
              { label: 'ZaloPay',  sub: '−20K', tone: 'bg-sky-50 text-sky-700 border-sky-100' },
            ].map(v => (
              <button key={v.label} className={`rounded-lg border ${v.tone} px-2.5 py-2 text-left lift`}>
                <div className="text-[10.5px] font-semibold opacity-80">{v.label}</div>
                <div className="text-[14px] font-extrabold leading-none mt-0.5">{v.sub}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Carbon */}
        <Card className="col-span-4 p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Dấu chân Carbon</div>
            <Pill tone="green"><Icon.TrendingUp size={11}/> +18%</Pill>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-[40px] font-extrabold text-emerald-700 tabular-nums leading-none">{fmtNum(co2,1)}</span>
            <span className="text-[14px] font-semibold text-slate-500">kg CO₂ giảm</span>
          </div>
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100">
            <Icon.Trees size={20} className="text-emerald-600"/>
            <div className="text-[12px] text-emerald-800">≈ <b>{fmtNum(trees,1)} cây xanh</b> trồng mới</div>
          </div>
          <div className="mt-3">
            <Spark data={sparkData} width={260} height={56}/>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              {['T11','T12','T1','T2','T3','T4'].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </Card>

        {/* Quick actions */}
        <div className="col-span-3 space-y-3">
          <button onClick={()=>onNavigate('flowA')} className="w-full h-[78px] rounded-xl bg-white border border-slate-200 hover:border-emerald-300 px-4 flex items-center gap-3 lift text-left">
            <div className="w-11 h-11 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center"><Icon.Camera size={20}/></div>
            <div>
              <div className="text-[13.5px] font-bold text-slate-900">Đặt thu gom</div>
              <div className="text-[11px] text-slate-500">Chụp ảnh + AI báo giá</div>
            </div>
          </button>
          <button onClick={()=>onNavigate('flowB')} className="w-full h-[78px] rounded-xl bg-white border border-slate-200 hover:border-emerald-300 px-4 flex items-center gap-3 lift text-left">
            <div className="w-11 h-11 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center"><Icon.Gavel size={20}/></div>
            <div>
              <div className="text-[13.5px] font-bold text-slate-900">Bán đồ cũ</div>
              <div className="text-[11px] text-slate-500">Đấu giá đồ điện tử</div>
            </div>
          </button>
        </div>
      </div>

      {/* 2-col: Collectors + History */}
      <div className="grid grid-cols-12 gap-5">
        <Card className="col-span-7 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Collector gần bạn</div>
              <div className="text-[11.5px] text-slate-500">5 người trong bán kính 3km · cập nhật real-time</div>
            </div>
            <button className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">Xem tất cả <Icon.ChevronRight size={12}/></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {collectors.map(c => (
              <div key={c.name} className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 lift cursor-pointer flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full ${c.color} flex items-center justify-center font-extrabold text-base`}>{c.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-bold text-slate-900 truncate">{c.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Icon.Star size={10} className="text-amber-400" style={{fill:'#fbbf24'}}/>
                    {c.rating} · {c.distance}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[14px] font-extrabold text-emerald-700 tabular-nums leading-none">{c.eta}'</div>
                  <div className="text-[10px] text-slate-400">ETA</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Lịch sử gần đây</div>
              <div className="text-[11.5px] text-slate-500">Click để xem certificate</div>
            </div>
            <button className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">Tất cả <Icon.ChevronRight size={12}/></button>
          </div>
          <div className="space-y-2">
            {history.map((h, i) => (
              <div key={h.id} onClick={() => i === 0 && onNavigate('cert')}
                className="p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 flex items-center gap-3 cursor-pointer transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Icon.Recycle size={16} className="text-emerald-600"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-slate-900 truncate">{h.mat}</div>
                  <div className="text-[10.5px] text-slate-400 font-mono truncate">{h.id}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-extrabold text-amber-600 tabular-nums">+{h.pts}</div>
                  <div className="text-[10px] text-slate-400">{h.kg} kg · {h.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const SCREEN_REGISTRY = [
  { id: 'home',     label: 'Trang chủ',     icon: Icon.Home,     comp: ScreenHomeWeb },
  { id: 'flowA',    label: 'Đặt thu gom',   icon: Icon.Camera,   comp: ScreenFlowA },
  { id: 'flowB',    label: 'Bán đồ cũ',     icon: Icon.Package,  comp: ScreenFlowB },
  { id: 'auction',  label: 'Đấu giá live',  icon: Icon.Gavel,    comp: ScreenAuction },
  { id: 'tracking', label: 'Theo dõi',      icon: Icon.Truck,    comp: ScreenTracking },
  { id: 'cert',     label: 'Chứng chỉ',     icon: Icon.Recycle,  comp: ScreenCert },
];

const App = () => {
  const [screen, setScreen] = uS('home');
  setScreenGlobal = setScreen;
  const cur = SCREEN_REGISTRY.find(s => s.id === screen);

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
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">B2C · WEB APP</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-1.5">Hoạt động</div>
          {SCREEN_REGISTRY.map(s => (
            <NavLink key={s.id} icon={s.icon} label={s.label}
              active={screen === s.id} onClick={()=>setScreen(s.id)}/>
          ))}

          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-1.5 mt-5">Khác</div>
          {[
            { l: 'Ví & Voucher',    i: Icon.Wallet, badge: '1250' },
            { l: 'Cộng đồng',       i: Icon.User },
            { l: 'Cài đặt',         i: Icon.Settings },
          ].map(o => (
            <NavLink key={o.l} icon={o.i} label={o.l} badge={o.badge}/>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-200">
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">M</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-bold text-slate-900 truncate">Minh Anh</div>
              <div className="text-[10px] text-slate-500 truncate">Q.7, TP.HCM</div>
            </div>
            <Icon.ChevronRight size={14} className="text-slate-400"/>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-8 h-14 flex items-center gap-4">
            <div className="text-[13px] text-slate-500 flex items-center gap-2">
              <span>RE-LOOP</span>
              <Icon.ChevronRight size={11}/>
              <span className="font-bold text-slate-900">{cur.label}</span>
            </div>
            <div className="flex-1"/>
            <div className="relative">
              <Icon.Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              <input placeholder="Tìm collector, lô, đơn..." className="h-9 pl-9 pr-3 text-[12.5px] rounded-lg border border-slate-200 bg-slate-50 outline-none w-72 focus:border-emerald-300 focus:bg-white"/>
            </div>
            <button className="relative w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600">
              <Icon.Bell size={16}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400"/>
            </button>
          </div>
        </div>

        <div data-screen-label={cur.label}>
          <cur.comp onNavigate={setScreen}/>
        </div>
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
