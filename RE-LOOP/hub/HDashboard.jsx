// SCREEN 1 — Hub Dashboard (3 big actions + today snapshot)
const HDashboard = ({ onNavigate }) => {
  const cards = [
    { id: 'receive',   icon: Icon.Truck,   title: 'Nhận hàng từ Collector', sub: 'Cân, kiểm tra, ghi nhận lô đầu vào', count: 4, tone: 'amber',  cta: 'Mở danh sách lô chờ' },
    { id: 'process',   icon: Icon.Factory, title: 'Xử lý / Rã xác',          sub: 'Phân loại, rã xác, mass balance',     count: 2, tone: 'emerald', cta: 'Tiếp tục xử lý',     highlight: true },
    { id: 'sell',      icon: Icon.Package, title: 'Đăng bán B2B',            sub: 'Đưa lô đã xử lý lên Marketplace',     count: 6, tone: 'slate',   cta: 'Đăng lô mới' },
  ];

  const snapshot = [
    { l: 'Đã nhận',     v: '1,2',   u: 'tấn',     change: '+12%', good: true },
    { l: 'Đã xử lý',    v: '850',   u: 'kg',      change: '+8%',  good: true },
    { l: 'Đã bán',      v: '600',   u: 'kg',      change: '−4%',  good: false },
    { l: 'Doanh thu',   v: '12,4',  u: 'triệu ₫', change: '+18%', good: true },
  ];

  const recent = [
    { id: 'BAT-2026-0425-09',  status: 'received',  desc: '5 mô tơ điện · 40 kg',           when: '08:42', from: 'Anh Tuấn #C-018' },
    { id: 'BAT-2026-0425-08',  status: 'processing',desc: 'Carton hỗn hợp · 120 kg',         when: '07:15', from: 'Chị Lan #C-021' },
    { id: 'BAT-2026-0425-07',  status: 'listed',    desc: 'Nhựa PET phân loại · 350 kg',     when: 'Hôm qua', from: '—' },
    { id: 'BAT-2026-0425-06',  status: 'sold',      desc: 'Đồng phế liệu · 80 kg',           when: 'Hôm qua', from: '— Cty Nam Phong' },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-8">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <HPill tone="green"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-dot"/> Hoạt động</HPill>
            <HPill tone="dark"><Icon.Shield size={11}/> Tier 2 — Verified KYB</HPill>
            <span className="text-[12px] text-slate-500 font-mono">#H-005</span>
          </div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">Trạm xử lý Quận 7</h1>
          <div className="text-[13px] text-slate-500">214 Nguyễn Hữu Thọ, P. Tân Hưng, Q.7 · Thứ Sáu, 25/04/2026</div>
        </div>
        <div className="flex items-center gap-2">
          <HBtn variant="secondary" icon={Icon.Bell}>3 cảnh báo</HBtn>
          <HBtn variant="secondary" icon={Icon.Settings}>Cài đặt</HBtn>
        </div>
      </div>

      {/* 3 BIG ACTION CARDS */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {cards.map((c, i) => {
          const tones = {
            amber:   { bg: 'bg-gradient-to-br from-amber-50 to-white',    border: 'border-amber-200',   iconBg: 'bg-amber-500',    countBg: 'bg-red-500',     accent: 'text-amber-900' },
            emerald: { bg: 'bg-gradient-to-br from-emerald-700 to-emerald-600', border: 'border-emerald-700', iconBg: 'bg-white/15',     countBg: 'bg-amber-400 text-amber-950', accent: 'text-white' },
            slate:   { bg: 'bg-white',                                    border: 'border-slate-200',   iconBg: 'bg-slate-100',    countBg: 'bg-emerald-500', accent: 'text-slate-900' },
          }[c.tone];
          const highlight = c.highlight;
          return (
            <button key={c.id} onClick={() => onNavigate(c.id === 'process' ? 'disassembly' : c.id === 'sell' ? 'marketplace' : 'dashboard')}
              className={`relative text-left rounded-2xl border-2 ${tones.bg} ${tones.border} p-6 lift overflow-hidden`}
              style={{ minHeight: 240 }}>
              {/* count badge */}
              {c.count > 0 && (
                <div className={`absolute top-5 right-5 ${tones.countBg.includes('amber') ? 'bg-amber-400 text-amber-950' : 'bg-red-500 text-white'} rounded-full min-w-[28px] h-[28px] px-2 flex items-center justify-center text-[13px] font-extrabold tabular-nums`}>
                  {c.count}
                </div>
              )}
              <div className={`w-14 h-14 rounded-xl ${tones.iconBg} flex items-center justify-center mb-4 ${highlight ? 'text-white' : c.tone === 'amber' ? 'text-white' : 'text-slate-700'}`}>
                <c.icon size={28}/>
              </div>
              <div className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${highlight ? 'text-white/70' : 'text-slate-500'}`}>
                Bước {i+1}
              </div>
              <div className={`text-[20px] font-extrabold leading-tight mb-1.5 ${tones.accent}`}>
                {c.title}
              </div>
              <div className={`text-[12.5px] leading-relaxed mb-4 ${highlight ? 'text-white/80' : 'text-slate-500'}`}>
                {c.sub}
              </div>
              <div className={`inline-flex items-center gap-1.5 text-[13px] font-bold ${highlight ? 'text-white' : c.tone === 'amber' ? 'text-amber-700' : 'text-emerald-700'}`}>
                {c.cta} <Icon.ArrowRight size={16}/>
              </div>
            </button>
          );
        })}
      </div>

      {/* SNAPSHOT */}
      <div className="grid grid-cols-12 gap-5">
        <HCard className="col-span-8 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-[16px] font-bold text-slate-900">Snapshot hôm nay</h2>
              <div className="text-[12px] text-slate-500">Cập nhật lúc 14:32 · Tự động đồng bộ</div>
            </div>
            <HPill tone="green"><Icon.TrendingUp size={11}/> Trên trung bình tuần</HPill>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {snapshot.map((s) => (
              <div key={s.l} className="border-l-2 border-emerald-500 pl-4">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">{s.l}</div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[28px] font-extrabold text-slate-900 tabular-nums leading-none">{s.v}</span>
                  <span className="text-[12px] font-bold text-slate-500">{s.u}</span>
                </div>
                <div className={`text-[11px] font-semibold mt-1 ${s.good ? 'text-emerald-600' : 'text-red-500'}`}>
                  {s.change} so với hôm qua
                </div>
              </div>
            ))}
          </div>

          {/* tiny throughput chart */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Throughput 7 ngày (kg)</div>
              <div className="text-[11px] text-slate-400 font-mono">avg ≈ 980 kg/ngày</div>
            </div>
            <div className="flex items-end gap-2 h-24">
              {[820, 940, 1100, 880, 1050, 990, 1200].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full bg-emerald-100 rounded-t-md relative" style={{ height: `${v/14}px` }}>
                    <div className={`absolute bottom-0 inset-x-0 ${i === 6 ? 'bg-emerald-500' : 'bg-emerald-300'} rounded-t-md`} style={{ height: '100%' }}/>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{['T2','T3','T4','T5','T6','T7','CN'][i]}</div>
                </div>
              ))}
            </div>
          </div>
        </HCard>

        {/* Recent batches */}
        <HCard className="col-span-4 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-bold text-slate-900">Lô gần đây</h2>
            <button className="text-[12px] text-emerald-700 font-bold">Tất cả →</button>
          </div>
          <div className="space-y-2.5">
            {recent.map(r => {
              const statuses = {
                received:   { l: 'Đã nhận',     tone: 'amber' },
                processing: { l: 'Đang xử lý',  tone: 'emerald' },
                listed:     { l: 'Đang bán',    tone: 'slate' },
                sold:       { l: 'Đã bán',      tone: 'green' },
              };
              const st = statuses[r.status];
              const toneMap = { amber: 'amber', emerald: 'green', slate: 'slate', green: 'green' };
              return (
                <div key={r.id} className="flex items-start gap-3 pb-2.5 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-mono text-slate-400 leading-tight">{r.id}</div>
                    <div className="text-[13px] font-semibold text-slate-900 truncate leading-tight mt-0.5">{r.desc}</div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">{r.from} · {r.when}</div>
                  </div>
                  <HPill tone={toneMap[st.tone]} className="!text-[10px] !px-1.5 !py-0.5 shrink-0">{st.l}</HPill>
                </div>
              );
            })}
          </div>
        </HCard>
      </div>

      {/* Marketplace incentive banner */}
      <HCard className="mt-5 p-5 border-emerald-200 bg-emerald-50/50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
            <Icon.TrendingUp size={22}/>
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-bold text-slate-900">Bạn đang ở Top 12% Hub được ưu tiên feed</div>
            <div className="text-[12.5px] text-slate-600">Duy trì throughput ≥ 800 kg/ngày để giữ thứ hạng. Hub Top được hiển thị trước trên Marketplace B2B.</div>
          </div>
          <HBtn variant="primary" size="md" iconRight={Icon.ArrowRight}>Xem báo cáo</HBtn>
        </div>
      </HCard>
    </div>
  );
};

window.HDashboard = HDashboard;
