// Collector App — WEB LAYOUT (full dashboard for driver)
const CApp = () => {
  const [screen, setScreen] = React.useState('inbox');
  const [online, setOnline] = React.useState(true);

  const NAV = [
    { id: 'inbox',  label: 'Đơn hàng',  icon: Icon.Package, badge: 4,  comp: CInbox },
    { id: 'route',  label: 'Chuyến hôm nay', icon: Icon.MapPin, badge: 8, comp: CRoute },
    { id: 'pickup', label: 'Tại điểm',  icon: Icon.Truck, comp: CPickup },
    { id: 'earnings', label: 'Thu nhập', icon: Icon.TrendingUp, comp: () => <CEarnings/> },
    { id: 'profile', label: 'Hồ sơ',    icon: Icon.User, comp: () => <CProfile/> },
  ];
  const cur = NAV.find(s => s.id === screen);
  const Comp = cur.comp;

  return (
    <div className="min-h-screen flex bg-[#F4F6F4]">
      {/* SIDEBAR */}
      <aside className="w-[240px] shrink-0 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Icon.Truck size={20}/>
            </div>
            <div>
              <div className="text-[14px] font-extrabold tracking-tight text-emerald-900 leading-none">RE-LOOP</div>
              <div className="text-[9px] font-mono text-slate-500 mt-0.5">COLLECTOR · TIER 2</div>
            </div>
          </div>
        </div>

        <div className="px-3 py-3 border-b border-slate-100">
          <button onClick={()=>setOnline(!online)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-bold text-[13px] transition-colors ${
              online ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500'
            }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${online ? 'bg-emerald-500 pulse-dot' : 'bg-slate-400'}`}/>
            {online ? 'Đang online' : 'Offline'}
          </button>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 mb-1.5">Hoạt động</div>
          {NAV.map(s => {
            const active = screen === s.id;
            const I = s.icon;
            return (
              <button key={s.id} onClick={()=>setScreen(s.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-semibold transition-colors ${
                  active ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'
                }`}>
                <I size={17} className={active ? 'text-emerald-700' : 'text-slate-400'}/>
                <span className="flex-1 text-left">{s.label}</span>
                {s.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-mono font-bold">{s.badge}</span>}
                {active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"/>}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200">
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">T</div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-bold text-slate-900 truncate">Anh Tuấn · #C-018</div>
              <div className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                <Icon.Star size={9} className="text-amber-400" style={{fill:'#fbbf24'}}/> 4.9 · 678 đơn
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0">
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-8 h-14 flex items-center gap-4">
            <div className="text-[13px] text-slate-500 flex items-center gap-2">
              <span>RE-LOOP Collector</span>
              <Icon.ChevronRight size={11}/>
              <span className="font-bold text-slate-900">{cur.label}</span>
            </div>
            <div className="flex-1"/>
            <div className="text-[12px] text-slate-500">Hôm nay <b className="text-slate-700">25/04</b> · Q.7, TP.HCM · 28°C</div>
            <button className="relative w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-600">
              <Icon.Bell size={16}/>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400"/>
            </button>
          </div>
        </div>
        <div data-screen-label={cur.label}>
          <Comp onNavigate={setScreen}/>
        </div>
      </main>
    </div>
  );
};

const CEarnings = () => {
  const [range, setRange] = React.useState('week');
  const [filter, setFilter] = React.useState('all');

  // 7-day data
  const days = [
    { d: 'T2', date: '19/04', n: 6,  v: 285, peak: false },
    { d: 'T3', date: '20/04', n: 9,  v: 425, peak: false },
    { d: 'T4', date: '21/04', n: 7,  v: 320, peak: false },
    { d: 'T5', date: '22/04', n: 11, v: 540, peak: true  },
    { d: 'T6', date: '23/04', n: 8,  v: 412, peak: false },
    { d: 'T7', date: '24/04', n: 10, v: 478, peak: false },
    { d: 'CN', date: '25/04', n: 7,  v: 380, peak: false, today: true },
  ];
  const maxV = Math.max(...days.map(d => d.v));

  // breakdown
  const breakdown = [
    { l: 'Phí thu gom (cố định)', v: 1820, pct: 64, color: 'bg-emerald-500' },
    { l: 'Bonus đấu giá',         v: 580,  pct: 20, color: 'bg-amber-400' },
    { l: 'Bonus giờ cao điểm',    v: 280,  pct: 10, color: 'bg-sky-500' },
    { l: 'Tip từ khách',          v: 160,  pct: 6,  color: 'bg-rose-400' },
  ];

  const transactions = [
    { id: 'TX-2026-04250847', dt: '25/04 14:32', type: 'in',  cat: 'Đơn D-2841', sub: 'Nhựa PET · 5kg · Q.7', amt: 45000, status: 'cleared' },
    { id: 'TX-2026-04250812', dt: '25/04 13:18', type: 'in',  cat: 'Đơn D-2840', sub: 'Carton · 12kg · Q.7', amt: 95000, status: 'cleared' },
    { id: 'TX-2026-04250755', dt: '25/04 11:24', type: 'in',  cat: 'Đơn D-2839', sub: 'Mô tơ điện · 8kg · Q.7', amt: 65000, status: 'cleared' },
    { id: 'TX-2026-04250701', dt: '25/04 09:55', type: 'bonus', cat: 'Bonus đấu giá', sub: 'Lô #L-2189 thắng', amt: 80000, status: 'cleared' },
    { id: 'TX-2026-04240935', dt: '24/04 18:12', type: 'in',  cat: 'Đơn D-2832', sub: 'Hỗn hợp · 11kg · Q.7', amt: 88000, status: 'cleared' },
    { id: 'TX-2026-04240845', dt: '24/04 16:30', type: 'tip', cat: 'Tip từ khách', sub: 'Chị Mai · D-2830', amt: 20000, status: 'cleared' },
    { id: 'TX-2026-04240712', dt: '24/04 11:08', type: 'in',  cat: 'Đơn D-2828', sub: 'Carton · 6kg · Q.7', amt: 52000, status: 'cleared' },
    { id: 'TX-2026-04230999', dt: '23/04 20:00', type: 'out', cat: 'Rút về MoMo', sub: 'Tài khoản ****1842', amt: -1500000, status: 'cleared' },
    { id: 'TX-2026-04230745', dt: '23/04 13:45', type: 'in',  cat: 'Đơn D-2825', sub: 'Nhựa PET · 4kg · Q.4', amt: 38000, status: 'cleared' },
    { id: 'TX-2026-04230612', dt: '23/04 09:22', type: 'pending', cat: 'Đơn D-2823', sub: 'Đang giữ — chờ T+1', amt: 72000, status: 'pending' },
  ];

  const filtered = filter === 'all' ? transactions : transactions.filter(t => {
    if (filter === 'in') return t.type === 'in';
    if (filter === 'bonus') return t.type === 'bonus' || t.type === 'tip';
    if (filter === 'out') return t.type === 'out';
    return true;
  });

  const typeMap = {
    in:      { icon: Icon.Recycle, color: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-100' },
    bonus:   { icon: Icon.Gavel,   color: 'bg-amber-100 text-amber-700',     border: 'border-amber-100' },
    tip:     { icon: Icon.Sparkles,color: 'bg-rose-100 text-rose-600',       border: 'border-rose-100' },
    out:     { icon: Icon.ArrowRight,color: 'bg-slate-100 text-slate-600',    border: 'border-slate-100' },
    pending: { icon: Icon.Clock,   color: 'bg-slate-100 text-slate-500',     border: 'border-slate-100' },
  };

  return (
    <div className="px-8 py-8 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">Thu nhập</div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">Tuần này: 2.840.000 ₫</h1>
          <div className="text-[13px] text-slate-500">58 đơn hoàn tất · trung bình <b className="text-slate-700">48.965 ₫/đơn</b> · top <b className="text-emerald-700">12% Q.7</b></div>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="ghost" size="md" iconLeft={Icon.Share}>Xuất CSV</Btn>
          <Btn variant="primary" size="md" iconLeft={Icon.Wallet}>Rút tiền</Btn>
        </div>
      </div>

      {/* Available balance — HERO */}
      <Card className="p-0 overflow-hidden mb-6 bg-gradient-to-br from-emerald-700 to-emerald-500 border-emerald-700 text-white">
        <div className="grid grid-cols-12">
          <div className="col-span-7 p-6 border-r border-white/15">
            <div className="text-[11px] uppercase tracking-wider text-white/70 font-bold mb-1">Số dư khả dụng</div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[44px] font-extrabold tabular-nums leading-none">1.420.000</span>
              <span className="text-[18px] font-bold text-white/80">₫</span>
            </div>
            <div className="text-[12px] text-white/70 flex items-center gap-2 mb-4">
              <Icon.Clock size={12}/> Thanh toán tự động vào 20:00 hôm nay (T+0)
            </div>
            <div className="flex items-center gap-2.5">
              <button className="h-10 px-4 rounded-lg bg-white text-emerald-700 font-extrabold text-[13px] flex items-center gap-2 hover:bg-emerald-50">
                <Icon.Wallet size={15}/> Rút về MoMo
              </button>
              <button className="h-10 px-4 rounded-lg bg-white/15 text-white font-bold text-[13px] flex items-center gap-2 hover:bg-white/25 backdrop-blur">
                <Icon.QrCode size={15}/> Rút về VietQR
              </button>
            </div>
          </div>
          <div className="col-span-5 p-6 grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold">Đang giữ (T+1)</div>
              <div className="text-[22px] font-extrabold tabular-nums mt-1">+412K</div>
              <div className="text-[10.5px] text-white/60 mt-0.5">8 đơn hôm nay</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold">Đã rút tháng</div>
              <div className="text-[22px] font-extrabold tabular-nums mt-1">7.5M</div>
              <div className="text-[10.5px] text-white/60 mt-0.5">5 lần rút</div>
            </div>
            <div className="col-span-2 pt-3 border-t border-white/15">
              <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold mb-1.5">Tài khoản nhận mặc định</div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-[10px] font-extrabold">M</div>
                <div>
                  <div className="text-[13px] font-bold">MoMo · ****1842</div>
                  <div className="text-[11px] text-white/70">Tuấn Nguyễn · đã xác minh</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 4 KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Hôm nay', v: '412K', s: '8 đơn · 4.9★', delta: '+12%', tone: 'emerald' },
          { l: 'Tuần này', v: '2.84M', s: '58 đơn · TB 48.9K/đơn', delta: '+8%', tone: 'amber' },
          { l: 'Tháng này', v: '11.2M', s: '246 đơn · 1.840 kg', delta: '+24%', tone: 'sky' },
          { l: 'Hiệu suất', v: '94%', s: '54/58 đơn 5 sao', delta: '+2pp', tone: 'rose' },
        ].map(s => (
          <Card key={s.l} className="p-5">
            <div className="flex items-start justify-between">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{s.l}</div>
              <Pill tone="green"><Icon.TrendingUp size={10}/> {s.delta}</Pill>
            </div>
            <div className={`text-[32px] font-extrabold tabular-nums mt-1 leading-none ${
              s.tone === 'emerald' ? 'text-emerald-700' : s.tone === 'amber' ? 'text-amber-600' : s.tone === 'sky' ? 'text-sky-700' : 'text-rose-600'
            }`}>{s.v}</div>
            <div className="text-[11.5px] text-slate-500 mt-1.5">{s.s}</div>
          </Card>
        ))}
      </div>

      {/* CHART + BREAKDOWN */}
      <div className="grid grid-cols-12 gap-5 mb-6">
        {/* Bar chart */}
        <Card className="col-span-8 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Thu nhập theo ngày</div>
              <div className="text-[11.5px] text-slate-500">7 ngày gần nhất · cột vàng = ngày peak</div>
            </div>
            <div className="bg-slate-100 rounded-lg p-1 inline-flex gap-0.5">
              {[
                ['week', 'Tuần'],
                ['month', 'Tháng'],
                ['ytd', 'Năm'],
              ].map(([id, l]) => (
                <button key={id} onClick={()=>setRange(id)}
                  className={`px-3 py-1.5 rounded-md text-[11.5px] font-bold transition-colors ${
                    range === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}>{l}</button>
              ))}
            </div>
          </div>

          <div className="relative h-[220px] flex items-end gap-3 pb-8 border-b border-slate-100">
            {/* horizontal grid */}
            <div className="absolute inset-x-0 top-0 bottom-8 pointer-events-none">
              {[0, 0.33, 0.66, 1].map((p, i) => (
                <div key={i} className="absolute inset-x-0 border-t border-dashed border-slate-100"
                     style={{ top: `${p * 100}%` }}/>
              ))}
            </div>
            {days.map((d, i) => {
              const h = (d.v / maxV) * 100;
              return (
                <div key={d.d} className="flex-1 flex flex-col items-center justify-end relative group h-full">
                  <div className="text-[10.5px] font-extrabold text-slate-700 tabular-nums mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 bg-slate-900 text-white px-2 py-1 rounded shadow-lg">
                    {d.v}K · {d.n} đơn
                  </div>
                  <div className={`w-full rounded-t-lg transition-all duration-700 relative ${
                    d.today ? 'bg-emerald-500' : d.peak ? 'bg-amber-400' : 'bg-emerald-200'
                  }`} style={{ height: `${h}%`, animationDelay: `${i*0.06}s` }}>
                    <div className={`absolute -top-6 left-1/2 -translate-x-1/2 text-[10.5px] font-extrabold tabular-nums whitespace-nowrap ${
                      d.today ? 'text-emerald-700' : d.peak ? 'text-amber-700' : 'text-slate-500'
                    }`}>{d.v}K</div>
                  </div>
                  <div className={`absolute -bottom-1 text-center ${d.today ? 'text-emerald-700 font-extrabold' : 'text-slate-500'}`}>
                    <div className="text-[11px] font-bold">{d.d}</div>
                    <div className="text-[9px] font-mono opacity-70">{d.date}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-5 mt-3 text-[11px]">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-200"/><span className="text-slate-600">Bình thường</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400"/><span className="text-slate-600">Ngày peak</span></div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500"/><span className="text-slate-600">Hôm nay</span></div>
            <div className="flex-1 text-right text-slate-500">Tổng tuần: <b className="text-slate-900 tabular-nums">2.840.000 ₫</b></div>
          </div>
        </Card>

        {/* Breakdown donut-ish stacked */}
        <Card className="col-span-4 p-6">
          <div className="text-[15px] font-bold text-slate-900">Cấu trúc thu nhập</div>
          <div className="text-[11.5px] text-slate-500 mb-5">Tuần này · phân tích nguồn</div>

          {/* stacked bar */}
          <div className="flex h-3 rounded-full overflow-hidden mb-4">
            {breakdown.map(b => (
              <div key={b.l} className={b.color} style={{width: `${b.pct}%`}}/>
            ))}
          </div>

          <div className="space-y-3">
            {breakdown.map(b => (
              <div key={b.l} className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-sm ${b.color} shrink-0`}/>
                <span className="text-[12.5px] text-slate-700 flex-1 truncate">{b.l}</span>
                <span className="text-[12.5px] font-mono font-bold text-slate-500">{b.pct}%</span>
                <span className="text-[12.5px] font-extrabold text-slate-900 tabular-nums w-14 text-right">{b.v}K</span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11.5px] text-slate-500">Mục tiêu tuần (3M)</span>
              <span className="text-[11.5px] font-mono font-bold text-emerald-700">94.7%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600" style={{width: '94.7%'}}/>
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5">Còn <b className="text-slate-700">160K</b> nữa để đạt mục tiêu</div>
          </div>
        </Card>
      </div>

      {/* TRANSACTIONS TABLE */}
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-[15px] font-bold text-slate-900">Lịch sử giao dịch</div>
            <div className="text-[11.5px] text-slate-500">{filtered.length} giao dịch · cập nhật real-time</div>
          </div>
          <div className="bg-slate-100 rounded-lg p-1 inline-flex gap-0.5">
            {[
              ['all', 'Tất cả'],
              ['in', 'Phí thu gom'],
              ['bonus', 'Bonus & Tip'],
              ['out', 'Rút tiền'],
            ].map(([id, l]) => (
              <button key={id} onClick={()=>setFilter(id)}
                className={`px-3 py-1.5 rounded-md text-[11.5px] font-bold transition-colors ${
                  filter === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}>{l}</button>
            ))}
          </div>
          <button className="h-9 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-[12px] font-bold text-slate-600 flex items-center gap-1.5">
            <Icon.Search size={12}/> Tìm
          </button>
        </div>

        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60">
              <th className="text-left py-2.5 px-6 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">Loại</th>
              <th className="text-left py-2.5 px-3 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">Mô tả</th>
              <th className="text-left py-2.5 px-3 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">Mã giao dịch</th>
              <th className="text-left py-2.5 px-3 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">Thời gian</th>
              <th className="text-center py-2.5 px-3 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">Trạng thái</th>
              <th className="text-right py-2.5 px-6 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => {
              const m = typeMap[t.type];
              const I = m.icon;
              const isOut = t.amt < 0;
              const isPending = t.status === 'pending';
              return (
                <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-emerald-50/20 transition-colors">
                  <td className="py-3 px-6">
                    <div className={`w-9 h-9 rounded-lg ${m.color} border ${m.border} flex items-center justify-center`}>
                      <I size={15}/>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-[13px] font-bold text-slate-900 leading-tight">{t.cat}</div>
                    <div className="text-[11px] text-slate-500 leading-tight">{t.sub}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[11px] font-mono text-slate-500">{t.id}</span>
                  </td>
                  <td className="py-3 px-3 text-[12px] text-slate-600 tabular-nums">{t.dt}</td>
                  <td className="py-3 px-3 text-center">
                    {isPending
                      ? <Pill tone="amber"><Icon.Clock size={10}/> Đang giữ</Pill>
                      : <Pill tone="green"><Icon.Check size={10}/> Đã thanh toán</Pill>
                    }
                  </td>
                  <td className="py-3 px-6 text-right">
                    <div className={`text-[15px] font-extrabold tabular-nums ${
                      isOut ? 'text-slate-700' : isPending ? 'text-amber-600' : 'text-emerald-700'
                    }`}>
                      {isOut ? '−' : '+'}{fmtNum(Math.abs(t.amt))} ₫
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
          <span>Hiển thị {filtered.length} / 246 giao dịch tháng này</span>
          <button className="font-bold text-emerald-700 flex items-center gap-1">Xem tất cả <Icon.ChevronRight size={12}/></button>
        </div>
      </Card>
    </div>
  );
};

const CProfile = () => {
  const tier = { current: 'Tier 2 — Pro', next: 'Tier 3 — Elite', progress: 72, ordersToNext: 84 };

  const stats = [
    { l: 'Tổng đơn',     v: '2.847', s: 'từ 03/2024',         icon: Icon.Package,   tone: 'emerald' },
    { l: 'Đánh giá TB',  v: '4.92',  s: '892 lượt 5★ (94%)',  icon: Icon.Star,      tone: 'amber' },
    { l: 'Tổng KG thu',  v: '18.4t', s: 'tương đương 920 cây',icon: Icon.Recycle,   tone: 'sky' },
    { l: 'Tỷ lệ hoàn',   v: '98.6%', s: '4 hủy / 247 tháng', icon: Icon.CheckCircle, tone: 'rose' },
  ];

  const badges = [
    { l: 'Top 10% Q.7',     sub: 'Tháng 4/2026',    icon: Icon.TrendingUp, color: 'from-emerald-500 to-emerald-700' },
    { l: '500 đơn 5★',      sub: 'Đạt 18/04/2026',  icon: Icon.Star,       color: 'from-amber-400 to-amber-600' },
    { l: 'Eco Champion',    sub: '10 tấn nhựa thu', icon: Icon.Leaf,       color: 'from-emerald-400 to-teal-600' },
    { l: 'Speed Master',    sub: 'ETA TB <20 phút', icon: Icon.Zap,        color: 'from-sky-400 to-sky-600' },
    { l: 'Auction Pro',     sub: '50 lô đấu thắng', icon: Icon.Gavel,      color: 'from-rose-400 to-rose-600' },
    { l: 'Năm thứ 2',       sub: 'Cùng RE-LOOP',    icon: Icon.Sparkles,   color: 'from-violet-400 to-violet-600' },
  ];

  const docs = [
    { l: 'CCCD',            sub: '0790****1842',     status: 'verified', exp: 'Hết hạn 12/2031' },
    { l: 'Bằng lái xe A1',  sub: 'B279****5102',     status: 'verified', exp: 'Hết hạn 08/2028' },
    { l: 'Đăng ký xe Honda Wave', sub: '59-X1 ****', status: 'verified', exp: '—' },
    { l: 'Hợp đồng RE-LOOP',sub: 'CT-2024-0312',     status: 'verified', exp: 'Vô thời hạn' },
    { l: 'Bảo hiểm xe',     sub: 'PVI · ****8821',   status: 'expiring', exp: 'Hết hạn 15/06/2026' },
  ];

  const skills = [
    { l: 'Vận chuyển cồng kềnh', enabled: true,  desc: 'Đồ điện tử, tủ lạnh' },
    { l: 'Cân điện tử cá nhân',  enabled: true,  desc: 'Có cân ±10g chính xác' },
    { l: 'Xe có thùng kín',      enabled: true,  desc: '500L · chống mưa' },
    { l: 'Ngoại ngữ (EN)',       enabled: false, desc: 'Khách quốc tế' },
  ];

  const reviews = [
    { name: 'Chị Minh Anh',   stars: 5, when: '2 ngày trước', text: 'Anh đến đúng giờ, cân chính xác, thái độ rất nhiệt tình. Sẽ đặt lại lần sau.' },
    { name: 'Anh Đức',         stars: 5, when: '4 ngày trước', text: 'Lấy đồ nặng giúp luôn không phàn nàn. 10 điểm.' },
    { name: 'Cô Hà',           stars: 4, when: '1 tuần trước', text: 'Tốt, chỉ cần báo trước 5 phút khi đến là hoàn hảo.' },
  ];

  return (
    <div className="px-8 py-8 max-w-[1440px] mx-auto">
      {/* HERO */}
      <Card className="p-0 overflow-hidden mb-6">
        {/* cover */}
        <div className="h-32 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 relative">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)',
            backgroundSize: '60px 60px, 80px 80px',
          }}/>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="h-9 px-3 rounded-lg bg-white/15 backdrop-blur text-white text-[12px] font-bold flex items-center gap-1.5 hover:bg-white/25">
              <Icon.Share size={13}/> Chia sẻ profile
            </button>
            <button className="h-9 px-3 rounded-lg bg-white text-emerald-700 text-[12px] font-bold flex items-center gap-1.5">
              <Icon.Settings size={13}/> Chỉnh sửa
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 -mt-14 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-3 flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-[44px] border-[5px] border-white shadow-md">T</div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-emerald-500 border-[3px] border-white flex items-center justify-center">
                <Icon.CheckCircle size={16} className="text-white"/>
              </div>
            </div>
            <div className="mt-3 text-center">
              <div className="text-[18px] font-extrabold text-slate-900 tracking-tight">Anh Tuấn Nguyễn</div>
              <div className="text-[11px] text-slate-500 font-mono">#C-018 · Q.7, TP.HCM</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Icon.Star size={12} className="text-amber-400" style={{fill:'#fbbf24'}}/>
                <span className="text-[12.5px] font-bold text-slate-700">4.92</span>
                <span className="text-[11px] text-slate-400">· 2,847 đơn</span>
              </div>
            </div>
          </div>

          {/* tier card */}
          <div className="col-span-5 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white">
                <Icon.Sparkles size={18}/>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Hạng hiện tại</div>
                <div className="text-[18px] font-extrabold text-amber-900 leading-none">{tier.current}</div>
              </div>
              <Pill tone="amber" className="ml-auto">+15% phí</Pill>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-amber-900">Tiến tới <b>{tier.next}</b></span>
                <span className="font-mono font-bold text-amber-900">{tier.progress}%</span>
              </div>
              <div className="h-2.5 bg-amber-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600" style={{width: `${tier.progress}%`}}/>
              </div>
              <div className="text-[11px] text-amber-800 mt-1.5">Còn <b>{tier.ordersToNext} đơn</b> & duy trì 4.85★ trong 30 ngày</div>
            </div>
          </div>

          {/* quick contact */}
          <div className="col-span-4 grid grid-cols-2 gap-2">
            <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5">
              <div className="text-[9.5px] uppercase tracking-wider text-slate-400 font-bold">Email</div>
              <div className="text-[12px] font-bold text-slate-700 truncate">tuan.n@***.com</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5">
              <div className="text-[9.5px] uppercase tracking-wider text-slate-400 font-bold">SĐT</div>
              <div className="text-[12px] font-bold text-slate-700 font-mono">090 8***842</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5">
              <div className="text-[9.5px] uppercase tracking-wider text-slate-400 font-bold">Tham gia</div>
              <div className="text-[12px] font-bold text-slate-700">12/03/2024</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5">
              <div className="text-[9.5px] uppercase tracking-wider text-slate-400 font-bold">Khu vực</div>
              <div className="text-[12px] font-bold text-slate-700">Q.7, Q.4, Q.8</div>
            </div>
          </div>
        </div>
      </Card>

      {/* STATS GRID */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map(s => {
          const I = s.icon;
          const tones = {
            emerald: ['bg-emerald-50 border-emerald-100', 'text-emerald-600', 'text-emerald-700'],
            amber:   ['bg-amber-50 border-amber-100',     'text-amber-600',   'text-amber-600'],
            sky:     ['bg-sky-50 border-sky-100',         'text-sky-600',     'text-sky-700'],
            rose:    ['bg-rose-50 border-rose-100',       'text-rose-500',    'text-rose-600'],
          }[s.tone];
          return (
            <Card key={s.l} className="p-5">
              <div className="flex items-start justify-between">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{s.l}</div>
                <div className={`w-9 h-9 rounded-lg ${tones[0]} ${tones[1]} border flex items-center justify-center`}>
                  <I size={17}/>
                </div>
              </div>
              <div className={`text-[32px] font-extrabold tabular-nums mt-1 leading-none ${tones[2]}`}>{s.v}</div>
              <div className="text-[11.5px] text-slate-500 mt-1.5">{s.s}</div>
            </Card>
          );
        })}
      </div>

      {/* BADGES */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[15px] font-bold text-slate-900">Huy hiệu thành tích</div>
            <div className="text-[11.5px] text-slate-500">6 huy hiệu · còn 14 chưa mở khóa</div>
          </div>
          <button className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">Xem tất cả <Icon.ChevronRight size={12}/></button>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {badges.map(b => {
            const I = b.icon;
            return (
              <div key={b.l} className="text-center group cursor-pointer">
                <div className={`relative aspect-square rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  <I size={32}/>
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center">
                    <Icon.Check size={11} className="text-emerald-600"/>
                  </div>
                </div>
                <div className="text-[12px] font-extrabold text-slate-900 mt-2 leading-tight">{b.l}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{b.sub}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* DOCS + SKILLS */}
      <div className="grid grid-cols-12 gap-5 mb-6">
        <Card className="col-span-7 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Giấy tờ xác minh</div>
              <div className="text-[11.5px] text-slate-500">5/5 đã xác minh · 1 sắp hết hạn</div>
            </div>
            <Pill tone="green"><Icon.Shield size={11}/> KYC level 3</Pill>
          </div>
          <div className="space-y-2">
            {docs.map(d => (
              <div key={d.l} className="flex items-center gap-3 px-3 py-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  d.status === 'verified' ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' : 'bg-amber-50 border border-amber-100 text-amber-600'
                }`}>
                  <Icon.Shield size={16}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-slate-900 leading-tight">{d.l}</div>
                  <div className="text-[11px] text-slate-500 font-mono leading-tight">{d.sub}</div>
                </div>
                <div className="text-right shrink-0">
                  {d.status === 'verified'
                    ? <Pill tone="green"><Icon.Check size={10}/> Đã xác minh</Pill>
                    : <Pill tone="amber"><Icon.Clock size={10}/> Sắp hết hạn</Pill>
                  }
                  <div className="text-[10.5px] text-slate-500 mt-0.5">{d.exp}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full h-10 rounded-lg border-2 border-dashed border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-[12.5px] font-bold text-slate-500 hover:text-emerald-700 flex items-center justify-center gap-2 transition-colors">
            <Icon.Camera size={14}/> Thêm giấy tờ
          </button>
        </Card>

        <Card className="col-span-5 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Năng lực & xe</div>
              <div className="text-[11.5px] text-slate-500">Bật/tắt loại đơn nhận được</div>
            </div>
          </div>
          <div className="space-y-2">
            {skills.map(s => (
              <div key={s.l} className="flex items-center gap-3 px-3 py-3 rounded-lg border border-slate-100">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  s.enabled ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                }`}>
                  <Icon.Truck size={15}/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[13px] font-bold leading-tight ${s.enabled ? 'text-slate-900' : 'text-slate-500'}`}>{s.l}</div>
                  <div className="text-[10.5px] text-slate-500 leading-tight">{s.desc}</div>
                </div>
                <div className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${s.enabled ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${s.enabled ? 'translate-x-4' : 'translate-x-0'}`}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* REVIEWS */}
      <Card className="p-6 mb-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4 border-r border-slate-100 pr-6">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Đánh giá tổng</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[56px] font-extrabold text-amber-500 tabular-nums leading-none">4.92</span>
              <div className="flex">
                {[1,2,3,4,5].map(n => <Icon.Star key={n} size={14} className="text-amber-400" style={{fill:'#fbbf24'}}/>)}
              </div>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">Từ <b>892 đánh giá</b></div>
            <div className="mt-4 space-y-1.5">
              {[[5, 84], [4, 12], [3, 3], [2, 0.5], [1, 0.5]].map(([n, pct]) => (
                <div key={n} className="flex items-center gap-2 text-[11px]">
                  <span className="w-3 text-slate-500 font-mono">{n}★</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400" style={{width: `${pct}%`}}/>
                  </div>
                  <span className="w-10 text-right font-mono text-slate-500 tabular-nums">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-8">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[15px] font-bold text-slate-900">Đánh giá gần đây</div>
              <button className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">Tất cả 892 <Icon.ChevronRight size={12}/></button>
            </div>
            <div className="space-y-3">
              {reviews.map((r, i) => (
                <div key={i} className="flex gap-3 pb-3 border-b border-slate-100 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">
                    {r.name.split(' ').pop()[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-bold text-slate-900">{r.name}</span>
                      <span className="flex">
                        {[1,2,3,4,5].map(n => (
                          <Icon.Star key={n} size={11} className={n <= r.stars ? 'text-amber-400' : 'text-slate-200'} style={{fill: n <= r.stars ? '#fbbf24' : '#e2e8f0'}}/>
                        ))}
                      </span>
                      <span className="text-[10.5px] text-slate-400 ml-auto">{r.when}</span>
                    </div>
                    <div className="text-[12.5px] text-slate-600 leading-relaxed">{r.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* SETTINGS quick row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { l: 'Cài đặt thông báo', icon: Icon.Bell, sub: 'Push, SMS, email' },
          { l: 'Bảo mật & mật khẩu', icon: Icon.Shield, sub: '2FA đã bật' },
          { l: 'Trung tâm hỗ trợ', icon: Icon.Info, sub: 'FAQ, hotline 24/7' },
          { l: 'Đăng xuất', icon: Icon.ArrowRight, sub: 'Tất cả thiết bị', danger: true },
        ].map(s => {
          const I = s.icon;
          return (
            <button key={s.l} className={`bg-white rounded-xl border border-slate-200 hover:border-emerald-300 px-4 py-3.5 flex items-center gap-3 lift text-left ${s.danger ? 'hover:border-red-300' : ''}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                s.danger ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-slate-50 text-slate-600 border border-slate-100'
              }`}>
                <I size={16}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-[13px] font-bold leading-tight ${s.danger ? 'text-red-600' : 'text-slate-900'}`}>{s.l}</div>
                <div className="text-[10.5px] text-slate-500 leading-tight">{s.sub}</div>
              </div>
              <Icon.ChevronRight size={14} className="text-slate-400"/>
            </button>
          );
        })}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<CApp/>);
