// SCREEN 4 — PET Journey (drill-down traceability, 7 milestones)
const PJourney = ({ onBack }) => {
  const milestones = [
    {
      n: 1, l: 'User',      time: '08/04/2026 · 14:30', tone: 'amber',
      title: 'Người dùng chụp ảnh & đặt thu gom',
      avatar: 'U#8273',
      facts: [
        { k: 'Vị trí', v: 'Q.7, TP.HCM' },
        { k: 'Vật liệu', v: 'Nhựa PET ~3 kg' },
        { k: 'Anonymized ID', v: 'U-8273', mono: true },
      ],
      photos: 1,
    },
    {
      n: 2, l: 'Dispatch',   time: '08/04/2026 · 14:42', tone: 'slate',
      title: 'Hệ thống gộp với 7 đơn khác → tạo route 8 điểm',
      facts: [
        { k: 'Mã chuyến', v: 'TR-2026-0408-0142', mono: true },
        { k: 'Số đơn', v: '8 đơn / 1 route' },
        { k: 'Thuật toán', v: 'OR-tools VRP, bán kính 1.4km' },
      ],
    },
    {
      n: 3, l: 'Collector', time: '08/04/2026 · 14:55', tone: 'sky',
      title: 'Collector check-in & cân thực',
      avatar: 'Anh Tuấn · #C-042 · ⭐4.8',
      facts: [
        { k: 'Cân thực', v: '3.2 kg', highlight: true },
        { k: 'GPS check-in', v: '10.7411° N, 106.7170° E', mono: true },
        { k: 'Ảnh có watermark', v: 'GPS + timestamp' },
      ],
      photos: 2,
    },
    {
      n: 4, l: 'Hub Q.7',   time: '08/04/2026 · 16:20', tone: 'emerald',
      title: 'Quét QR & cân lại tại trạm',
      facts: [
        { k: 'Cân lại', v: '3.1 kg', highlight: true },
        { k: 'Lệch', v: '3% (≤5% pass)', good: true },
        { k: 'Mass Balance', v: '96% ✅', good: true },
      ],
    },
    {
      n: 5, l: 'Lô gộp',    time: '12/04/2026 · 11:00', tone: 'emerald-dark',
      title: 'Đạt 500 kg → đăng B2B Marketplace',
      facts: [
        { k: 'Mã lô', v: 'CU-2026-0412', mono: true, highlight: true },
        { k: 'Số đơn gốc gộp', v: '47 đơn' },
        { k: 'Grade', v: 'A — tạp chất <2%' },
      ],
    },
    {
      n: 6, l: 'Nhà máy',   time: '13/04/2026 · 09:30', tone: 'slate-dark',
      title: 'Nhà máy ABC thắng đấu giá kín',
      avatar: 'Recycler ABC · KYB Verified',
      facts: [
        { k: 'Giá thắng', v: '12,000 ₫/kg', highlight: true },
        { k: 'Vận đơn', v: 'VD-2026-0413', mono: true },
        { k: 'Xác nhận tái chế', v: '28/04/2026' },
      ],
    },
    {
      n: 7, l: 'ESG Impact', time: '28/04/2026', tone: 'amber-dark',
      title: 'Đóng vào báo cáo EPR cho nhãn hàng',
      facts: [
        { k: 'CO₂ giảm thải', v: '750 kg', highlight: true },
        { k: 'Đóng gói báo cáo', v: 'Unilever Vietnam Q2' },
        { k: 'Certificate', v: 'ESG-2026-Q2-X-0047', mono: true },
      ],
    },
  ];

  const toneStyles = {
    amber:        { bg: 'bg-amber-100',    text: 'text-amber-800',    dot: 'bg-amber-500' },
    slate:        { bg: 'bg-slate-100',    text: 'text-slate-700',    dot: 'bg-slate-500' },
    sky:          { bg: 'bg-sky-100',      text: 'text-sky-800',      dot: 'bg-sky-500' },
    emerald:      { bg: 'bg-emerald-100',  text: 'text-emerald-800',  dot: 'bg-emerald-500' },
    'emerald-dark': { bg: 'bg-emerald-700', text: 'text-white',         dot: 'bg-emerald-700' },
    'slate-dark': { bg: 'bg-slate-800',   text: 'text-white',         dot: 'bg-slate-800' },
    'amber-dark': { bg: 'bg-amber-900',   text: 'text-white',         dot: 'bg-amber-900' },
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-[12px] mb-4">
        <button onClick={onBack} className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1">
          <Icon.ChevronLeft size={12}/> ESG Dashboard
        </button>
        <Icon.ChevronRight size={12} className="text-slate-300"/>
        <span className="text-slate-500">Drill-down</span>
        <Icon.ChevronRight size={12} className="text-slate-300"/>
        <span className="font-mono font-bold text-slate-900">CU-2026-0412</span>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HPill tone="green"><Icon.Shield size={11}/> Verified · Blockchain ledger</HPill>
            <HPill tone="dark"><Icon.Eye size={11}/> Anti-greenwashing</HPill>
          </div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">PET Journey · 500 kg → 750 kg CO₂ giảm</h1>
          <div className="text-[12.5px] text-slate-500">Mỗi milestone có chứng cứ riêng — không thể chỉnh sửa sau khi ghi sổ</div>
        </div>
        <div className="flex gap-2">
          <HBtn variant="secondary" icon={Icon.Share}>Chia sẻ link</HBtn>
          <HBtn variant="secondary" icon={Icon.Download}>Xuất PDF</HBtn>
          <HBtn variant="dark" icon={Icon.QrCode}>QR public</HBtn>
        </div>
      </div>

      {/* Summary bar */}
      <HCard className="p-5 mb-6 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white border-emerald-700">
        <div className="grid grid-cols-5 gap-6">
          {[
            { l: 'Khối lượng', v: '500', u: 'kg PET' },
            { l: 'Đơn gốc', v: '47', u: 'người dùng' },
            { l: 'Mass balance', v: '96', u: '% verified' },
            { l: 'CO₂ giảm', v: '750', u: 'kg' },
            { l: 'Thời gian', v: '20', u: 'ngày end-to-end' },
          ].map(s => (
            <div key={s.l} className="border-l border-white/20 first:border-l-0 pl-4 first:pl-0">
              <div className="text-[10px] uppercase tracking-wider text-white/70 font-bold">{s.l}</div>
              <div className="text-[28px] font-extrabold tabular-nums font-mono leading-none mt-1">{s.v}</div>
              <div className="text-[11px] text-white/80">{s.u}</div>
            </div>
          ))}
        </div>
      </HCard>

      {/* TIMELINE */}
      <div className="relative">
        {/* Vertical line behind cards */}
        <svg className="absolute left-[36px] top-0 bottom-0" width="4" height="100%" preserveAspectRatio="none" viewBox="0 0 4 1000">
          <line x1="2" y1="0" x2="2" y2="1000" stroke="#10B981" strokeWidth="2" className="flow-line"/>
        </svg>

        <div className="space-y-5 relative">
          {milestones.map((m, i) => {
            const t = toneStyles[m.tone];
            const dark = m.tone.includes('dark');
            return (
              <div key={i} className="flex gap-5 slide-in" style={{animationDelay: `${i*60}ms`}}>
                {/* Number circle */}
                <div className="relative z-10 shrink-0">
                  <div className={`w-[72px] h-[72px] rounded-full ${t.dot} text-white flex flex-col items-center justify-center shadow-lg ring-4 ring-white`}>
                    <div className="text-[10px] uppercase tracking-wider font-bold opacity-80 leading-none">M{m.n}</div>
                    <div className="text-[18px] font-extrabold leading-tight mt-0.5">{m.l.length > 6 ? m.l.split(' ')[0] : m.l}</div>
                  </div>
                </div>

                {/* Card */}
                <HCard className={`flex-1 p-5 ${dark ? 'bg-slate-900 text-white border-slate-900' : ''}`}>
                  <div className="flex items-start justify-between mb-3 gap-4">
                    <div>
                      <div className={`text-[10px] uppercase tracking-wider font-bold mb-1 font-mono ${dark ? 'text-emerald-300' : 'text-slate-400'}`}>
                        {m.time}
                      </div>
                      <div className={`text-[16px] font-extrabold leading-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                        {m.title}
                      </div>
                      {m.avatar && (
                        <div className={`flex items-center gap-2 mt-2 ${dark ? 'text-white/80' : 'text-slate-600'} text-[12px]`}>
                          <div className={`w-6 h-6 rounded-full ${dark ? 'bg-white/15' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center text-[10px] font-bold`}>
                            {m.avatar.charAt(0)}
                          </div>
                          {m.avatar}
                        </div>
                      )}
                    </div>
                    {m.photos && (
                      <div className="flex gap-1.5 shrink-0">
                        {Array.from({length: m.photos}).map((_, j) => (
                          <div key={j} className="w-16 h-16 rounded-lg photo-ph border border-emerald-200 flex items-center justify-center relative overflow-hidden">
                            <Icon.Image size={18} className="text-emerald-700/40"/>
                            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[7px] font-mono px-1 py-0.5 leading-none">
                              GPS✓ TS✓
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className={`grid grid-cols-3 gap-3 pt-3 border-t ${dark ? 'border-white/15' : 'border-slate-100'}`}>
                    {m.facts.map((f, j) => (
                      <div key={j}>
                        <div className={`text-[10px] uppercase tracking-wider font-bold ${dark ? 'text-white/60' : 'text-slate-500'}`}>{f.k}</div>
                        <div className={`text-[13.5px] font-bold mt-0.5 ${
                          f.highlight ? (dark ? 'text-emerald-300' : 'text-emerald-700') :
                          dark ? 'text-white' : 'text-slate-900'
                        } ${f.mono ? 'font-mono tabular-nums' : ''} ${f.good ? '!text-emerald-600' : ''}`}>
                          {f.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </HCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER trust */}
      <HCard className="mt-6 p-5 bg-emerald-50/50 border-emerald-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
            <Icon.Shield size={22}/>
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-bold text-slate-900">7 milestones · 47 đơn gốc · 100% drill-downable</div>
            <div className="text-[12.5px] text-slate-600">Đây là chứng cứ "anti-greenwashing" cho audit Bộ TNMT, EU CBAM, ESG rating agency. Mọi số liệu có nguồn gốc.</div>
          </div>
          <HBtn variant="primary" iconRight={Icon.ExternalLink}>Public certificate</HBtn>
        </div>
      </HCard>
    </div>
  );
};

window.PJourney = PJourney;
