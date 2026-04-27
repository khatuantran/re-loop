// SCREEN 1 — HOME (5 zones)
const ScreenHome = ({ onNavigate }) => {
  const points = useCountUp(1250, 900);
  const co2 = useCountUp(12.4, 1100);
  const trees = useCountUp(0.6, 1100);
  const sparkData = [3.2, 5.8, 4.1, 7.3, 9.6, 12.4];
  const monthLabels = ['T11', 'T12', 'T1', 'T2', 'T3', 'T4'];

  const collectors = [
    { name: 'Anh Tuấn',   rating: 4.8, eta: 25, x: 35, y: 60, distance: '0.8km' },
    { name: 'Chị Lan',    rating: 4.6, eta: 50, x: 65, y: 35, distance: '1.4km' },
    { name: 'Anh Hùng',   rating: 4.9, eta: 18, x: 50, y: 75, distance: '0.5km' },
    { name: 'Chị Mai',    rating: 4.7, eta: 35, x: 75, y: 65, distance: '2.1km' },
    { name: 'Anh Phúc',   rating: 4.5, eta: 42, x: 25, y: 30, distance: '1.9km' },
  ];

  const history = [
    { id: 'RC-2026-0422-04219', date: '22/04', mat: 'Nhựa PET', kg: 2.8, pts: 145, status: 'recycled' },
    { id: 'RC-2026-0418-09833', date: '18/04', mat: 'Carton + giấy', kg: 5.4, pts: 180, status: 'recycled' },
    { id: 'RC-2026-0414-02018', date: '14/04', mat: 'Mô tơ điện cũ', kg: 3.1, pts: 220, status: 'recycled' },
  ];

  return (
    <PhoneFrame statusBarTone="light">
      <div className="h-full overflow-y-auto pb-24" style={{ scrollbarWidth: 'thin' }}>

        {/* TOP — emerald header w/ greeting */}
        <div className="relative bg-gradient-to-br from-emerald-700 to-emerald-500 px-5 pt-14 pb-8 text-white">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
                <Icon.User size={18}/>
              </div>
              <div>
                <div className="text-[11px] text-white/70 leading-none">Xin chào,</div>
                <div className="text-[15px] font-semibold leading-tight">Minh Anh</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center relative">
                <Icon.Bell size={17}/>
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-amber-400 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* ZONE A — Hero CTA */}
          <div className="mb-3">
            <div className="text-[26px] leading-[1.15] font-bold tracking-tight mb-1">
              Rác của bạn —<br/>chúng tôi đến tận nơi.
            </div>
            <div className="text-white/80 text-[13px]">Q.7, TP.HCM · 28°C, nắng nhẹ</div>
          </div>

          <button onClick={() => onNavigate('flowA')}
            className="w-full bg-white text-emerald-700 rounded-2xl h-[64px] px-5 flex items-center justify-between shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)] active:scale-[.99] transition-transform">
            <div className="text-left">
              <div className="font-bold text-[17px] leading-tight">Đặt lịch Thu gom</div>
              <div className="text-[12px] text-emerald-700/70">Chụp ảnh — AI báo giá ngay</div>
            </div>
            <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Icon.ArrowRight size={20}/>
            </div>
          </button>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12px] text-white/85">
              <span className="flex -space-x-2">
                {['#FBBF24','#34D399','#A7F3D0'].map((c,i)=>(
                  <span key={i} className="w-5 h-5 rounded-full border-2 border-emerald-600" style={{background:c}}/>
                ))}
              </span>
              <span><b className="text-white">+23 đơn</b> hôm nay tại Q.7</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-white/70">
              <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full pulse-dot"></span>
              live
            </div>
          </div>
        </div>

        {/* ZONE B — Wallet (overlap card) */}
        <div className="px-5 -mt-5 relative z-10">
          <Card className="p-5 lift">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Ví Green Points</div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-[36px] font-extrabold tracking-tight text-slate-900 tabular-nums">
                    {fmtNum(Math.floor(points))}
                  </span>
                  <span className="text-[13px] font-semibold text-amber-500">điểm</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
                <Icon.Coins size={22}/>
              </div>
            </div>

            {/* progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                <span>Còn <b className="text-slate-700">250</b> điểm để nhận voucher 50K</span>
                <span className="font-mono">1250 / 1500</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-300 to-amber-500 rounded-full" style={{ width: '83.3%' }}></div>
              </div>
            </div>

            {/* quick redeem */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: 'GrabFood', sub: '−30K', tone: 'bg-green-50 text-green-700 border-green-100' },
                { label: 'Shopee',   sub: '−50K', tone: 'bg-orange-50 text-orange-700 border-orange-100' },
                { label: 'ZaloPay',  sub: '−20K', tone: 'bg-sky-50 text-sky-700 border-sky-100' },
              ].map((v) => (
                <button key={v.label} className={`rounded-xl border ${v.tone} px-2 py-2.5 text-left lift`}>
                  <div className="text-[11px] font-semibold opacity-80">{v.label}</div>
                  <div className="text-[15px] font-bold leading-none mt-0.5">{v.sub}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* ZONE C — Carbon footprint */}
        <div className="px-5 mt-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-1">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Dấu chân Carbon</div>
              <Pill tone="green"><Icon.TrendingUp size={11}/> +18% so với T3</Pill>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-[32px] font-extrabold text-emerald-700 tabular-nums leading-none">
                    {fmtNum(co2, 1)}
                  </span>
                  <span className="text-[14px] font-semibold text-slate-500">kg CO₂</span>
                </div>
                <div className="text-[12px] text-slate-500 mt-1">đã giảm trong tháng 4</div>

                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100">
                  <Icon.Trees size={20} className="text-emerald-600"/>
                  <div className="text-[12px] text-emerald-800 leading-tight">
                    ≈ <b>{fmtNum(trees, 1)} cây xanh</b> trồng mới
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <Spark data={sparkData} width={130} height={64}/>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-0.5" style={{ width: 130 }}>
                  {monthLabels.map(m => <span key={m}>{m}</span>)}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ZONE D — Map */}
        <div className="px-5 mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[15px] font-bold text-slate-900">Collector gần bạn</div>
            <button className="text-[12px] text-emerald-700 font-semibold flex items-center gap-0.5">
              Xem bản đồ <Icon.ChevronRight size={14}/>
            </button>
          </div>
          <Card className="overflow-hidden">
            <div className="relative h-[180px] map-grid map-roads">
              {/* user pin */}
              <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
                <span className="absolute inset-0 ping-slow rounded-full bg-emerald-400/40 w-10 h-10 -m-3"></span>
                <div className="relative w-4 h-4 rounded-full bg-emerald-500 border-[3px] border-white shadow-md"></div>
              </div>
              {/* collector pins */}
              {collectors.map((c, i) => (
                <div key={i} className="absolute group" style={{ left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%,-100%)' }}>
                  <div className="bg-white rounded-full px-1.5 py-1 shadow-md border border-slate-200 flex items-center gap-1">
                    <Icon.Truck size={11} className="text-emerald-600"/>
                    <span className="text-[10px] font-semibold tabular-nums">{c.eta}'</span>
                  </div>
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mx-auto -mt-0.5 border border-white"></div>
                </div>
              ))}
              {/* radius label */}
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-[10px] font-semibold text-slate-600 border border-white/50 flex items-center gap-1">
                <Icon.MapPin size={10}/> 5 collector trong 3km
              </div>
            </div>
            <div className="p-3 flex items-center gap-3 bg-emerald-50/50 border-t border-emerald-100">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">H</div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-slate-900 truncate">Anh Hùng — gần nhất</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Icon.Star size={10} className="text-amber-400"/> 4.9 · 0.5km · sẽ đến trong ~18 phút
                </div>
              </div>
              <div className="text-[11px] font-semibold text-emerald-700 px-2.5 py-1 rounded-full bg-white border border-emerald-200">~18 phút</div>
            </div>
          </Card>
        </div>

        {/* ZONE E — History */}
        <div className="px-5 mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[15px] font-bold text-slate-900">Lịch sử gần đây</div>
            <button className="text-[12px] text-emerald-700 font-semibold flex items-center gap-0.5">
              Tất cả <Icon.ChevronRight size={14}/>
            </button>
          </div>
          <div className="space-y-2">
            {history.map((h, i) => (
              <Card key={h.id} className="p-3 flex items-center gap-3 lift cursor-pointer"
                    onClick={() => i === 0 && onNavigate('cert')}>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Icon.Recycle size={18} className="text-emerald-600"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-semibold text-slate-900 truncate">{h.mat}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{h.date}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono truncate">{h.id}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-bold text-amber-600">+{h.pts}</div>
                  <div className="text-[10px] text-slate-400">{h.kg} kg</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="h-6"/>
      </div>

      {/* bottom nav */}
      <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-slate-200 px-3 pt-2 pb-6 z-20">
        <div className="flex items-center justify-around">
          {[
            { i: Icon.Home, l: 'Trang chủ', active: true },
            { i: Icon.Calendar, l: 'Đơn hàng' },
            { i: Icon.Wallet, l: 'Ví' },
            { i: Icon.User, l: 'Tôi' },
          ].map((t, idx) => (
            <button key={idx} className={`flex flex-col items-center gap-0.5 py-1.5 px-3 ${t.active ? 'text-emerald-700' : 'text-slate-400'}`}>
              <t.i size={20}/>
              <span className="text-[10px] font-semibold">{t.l}</span>
            </button>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
};

window.ScreenHome = ScreenHome;
