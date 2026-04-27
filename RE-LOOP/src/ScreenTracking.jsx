// SCREEN 5 — Tracking — WEB LAYOUT
const ScreenTracking = ({ onNavigate }) => {
  const [eta, setEta] = React.useState(12 * 60);
  const [progress, setProgress] = React.useState(0.55);
  const [showCancel, setShowCancel] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => {
      setEta(s => Math.max(0, s - 1));
      setProgress(p => Math.min(0.99, p + 0.0005));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const mm = Math.floor(eta / 60);
  const ss = String(eta % 60).padStart(2, '0');

  const trip = [
    { label: 'Điểm gốc', sub: 'Anh Hùng xuất phát · 14:32', done: true },
    { label: 'Trạm Q.4', sub: 'Đã ghé qua · 14:48', done: true },
    { label: 'Đường NTĐ', sub: 'Đang di chuyển · ~3 phút', current: true },
    { label: 'Bạn — 123 NTT', sub: 'Điểm thứ 4 · ETA 15:12', done: false },
  ];

  const pathD = "M 50,420 Q 150,320 250,360 Q 350,400 430,260 Q 520,140 660,160";

  return (
    <div className="px-8 py-8 max-w-[1280px] mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">Theo dõi đơn hàng</div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">Anh Hùng đang đến — còn {mm} phút</h1>
          <div className="text-[13px] text-slate-500">Đơn #08732 · Nhựa PET 3.2kg · Slot 14:00–15:00</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-full px-3.5 py-1.5 flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 bg-emerald-500 rounded-full pulse-dot"/>
          <span className="text-[12px] font-bold text-slate-700">Live tracking · cập nhật 5s</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* MAP */}
        <Card className="col-span-8 p-0 overflow-hidden h-[560px] relative">
          <div className="absolute inset-0 map-grid map-roads bg-[#E8F0EA]"/>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 720 560" preserveAspectRatio="none">
            <path d={pathD} stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 4" fill="none"/>
            <path d={pathD} stroke="#10B981" strokeWidth="5" fill="none"
                  style={{ strokeDasharray: '900', strokeDashoffset: 900 - 900 * progress }}/>
          </svg>

          {/* User pin (right top area) */}
          <div className="absolute" style={{ left: '91%', top: '28%', transform: 'translate(-50%,-100%)' }}>
            <div className="bg-white rounded-lg px-2.5 py-1.5 shadow-lg border border-slate-200 flex items-center gap-1.5 mb-1">
              <Icon.MapPin size={12} className="text-emerald-600"/>
              <span className="text-[11px] font-bold">Bạn · 123 NTT</span>
            </div>
            <div className="w-4 h-4 bg-emerald-600 rounded-full mx-auto border-[3px] border-white shadow"/>
          </div>

          {/* Truck pin */}
          <div className="absolute" style={{ left: '60%', top: '46%', transform: 'translate(-50%,-50%)' }}>
            <div className="absolute inset-0 ping-slow rounded-full bg-amber-400/50 w-16 h-16 -m-4"/>
            <div className="relative w-12 h-12 rounded-full bg-amber-500 border-[3px] border-white shadow-lg flex items-center justify-center">
              <Icon.Truck size={20} className="text-white"/>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-amber-500 text-white rounded-md px-2 py-0.5 text-[10px] font-bold whitespace-nowrap">{mm}'</div>
          </div>

          {/* Origin pin */}
          <div className="absolute" style={{ left: '7%', top: '75%', transform: 'translate(-50%,-50%)' }}>
            <div className="w-3.5 h-3.5 bg-slate-400 rounded-full border-[2px] border-white shadow"/>
          </div>

          {/* Map overlays */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-lg px-3 py-2 shadow-lg border border-slate-200">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">ETA</div>
            <div className="text-[28px] font-extrabold tabular-nums leading-none font-mono text-slate-900">{mm}:{ss}</div>
            <div className="text-[10.5px] text-slate-500 font-mono">phút : giây</div>
          </div>

          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg px-3 py-2 shadow-lg border border-slate-200 flex items-center gap-2">
            <Icon.Truck size={14} className="text-amber-500"/>
            <span className="text-[11.5px] font-bold text-slate-700">Honda Wave · 51X-12345</span>
          </div>

          <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
            <button className="w-8 h-8 rounded-md bg-white shadow border border-slate-200 text-slate-700 flex items-center justify-center font-bold">+</button>
            <button className="w-8 h-8 rounded-md bg-white shadow border border-slate-200 text-slate-700 flex items-center justify-center font-bold">−</button>
          </div>
        </Card>

        {/* SIDE PANEL */}
        <div className="col-span-4 space-y-4">
          {/* Big countdown */}
          <Card className="p-5 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white border-emerald-700">
            <div className="text-[11px] uppercase tracking-wider text-white/70 font-bold">Sẽ đến trong</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[56px] font-extrabold tabular-nums leading-none font-mono">{mm}</span>
              <span className="text-[14px] font-bold">phút</span>
            </div>
            <div className="text-[12px] text-white/80 mt-2">Anh Hùng đang đi đến chỗ bạn</div>
          </Card>

          {/* Collector */}
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">H</div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-slate-900">Anh Hùng <span className="text-[10.5px] font-mono text-slate-400 font-medium">#C-018</span></div>
                <div className="text-[11.5px] text-slate-500 flex items-center gap-1.5">
                  <Icon.Star size={11} className="text-amber-400" style={{fill:'#fbbf24'}}/> 4.9 · 678 đơn
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="h-10 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold text-[12.5px] flex items-center justify-center gap-1.5">
                <Icon.Phone size={14}/> Gọi
              </button>
              <button className="h-10 rounded-lg bg-emerald-500 text-white font-bold text-[12.5px] flex items-center justify-center gap-1.5">
                <Icon.Send size={14}/> Nhắn tin
              </button>
            </div>
          </Card>

          {/* Trip detail */}
          <Card className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Lộ trình</div>
            <div className="space-y-3">
              {trip.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center pt-0.5">
                    <div className={`w-3 h-3 rounded-full ${
                      s.done ? 'bg-emerald-500' : s.current ? 'bg-amber-400 ring-4 ring-amber-100' : 'bg-slate-200'
                    }`}/>
                    {i < trip.length - 1 && <div className={`w-0.5 h-7 ${s.done ? 'bg-emerald-500' : 'bg-slate-200'} mt-1`}/>}
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <div className={`text-[13px] font-bold ${s.current ? 'text-amber-700' : 'text-slate-900'}`}>
                      {s.label}
                      {s.current && <span className="ml-1.5 text-[10px] font-normal">• đang ở đây</span>}
                    </div>
                    <div className="text-[11px] text-slate-500">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-2">
            <Btn variant="primary" size="md" className="flex-1" onClick={() => onNavigate('cert')}>
              Tôi đã giao hàng
            </Btn>
            <button onClick={() => setShowCancel(true)}
                    className="h-11 px-4 rounded-[10px] bg-white border border-red-200 text-red-600 text-[13px] font-bold hover:bg-red-50">
              Hủy đơn
            </button>
          </div>
        </div>
      </div>

      {/* Cancel modal */}
      {showCancel && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md slide-in">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
              <Icon.Info size={22}/>
            </div>
            <div className="text-center text-[18px] font-extrabold text-slate-900 mb-1">Hủy đơn này?</div>
            <div className="text-center text-[13px] text-slate-500 mb-4 leading-relaxed">
              Bạn đã hủy <b className="text-red-600">2/5 đơn</b> trong tuần này. Hủy thêm sẽ tạm khóa tính năng đặt nhanh trong 24h.
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setShowCancel(false)} className="flex-1 h-11 rounded-[10px] bg-slate-100 text-slate-700 font-bold text-[13px]">Tiếp tục đơn</button>
              <button onClick={()=>{setShowCancel(false); onNavigate('home');}} className="flex-1 h-11 rounded-[10px] bg-red-500 text-white font-bold text-[13px]">Vẫn hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.ScreenTracking = ScreenTracking;
