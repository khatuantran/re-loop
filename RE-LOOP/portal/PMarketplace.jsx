// SCREEN 1 — Marketplace Feed (Procurement view)
const { useState: useS1, useMemo: useM1 } = React;

const LOTS = [
  { id: 'CU-2026-0412', mat: 'Nhựa PET', grade: 'A', kg: 500,  hub: 'Trạm Q.7 — TP.HCM',     price: 11500, rating: 4.8, txns: 124, countdown: '18:24:30', tone: 'photo-ph',       color: 'sky',     desc: 'Trong suốt, tạp chất <2%' },
  { id: 'FE-2026-0398', mat: 'Sắt thép', grade: 'B', kg: 1200, hub: 'Trạm Thủ Đức — TP.HCM', price: 8200,  rating: 4.6, txns: 89,  countdown: '06:12:08', tone: 'photo-ph-blue',  color: 'slate',   desc: 'Sắt vụn từ nồi cơm, mô tơ' },
  { id: 'CU-2026-0411', mat: 'Đồng (Cu)', grade: 'A', kg: 350, hub: 'Trạm Q.7 — TP.HCM',     price: 50000, rating: 4.9, txns: 156, countdown: '23:55:00', tone: 'photo-ph-amber', color: 'amber',   desc: 'Cu #1, tinh khiết 92.5%' },
  { id: 'PE-2026-0405', mat: 'Nhựa HDPE', grade: 'A', kg: 280, hub: 'Trạm Bình Tân',         price: 9800,  rating: 4.7, txns: 67,  countdown: '12:08:14', tone: 'photo-ph',       color: 'sky',     desc: 'Can nhựa cứng, bóc nhãn' },
  { id: 'PA-2026-0402', mat: 'Carton',   grade: 'A', kg: 850,  hub: 'Trạm Bình Dương',       price: 3200,  rating: 4.5, txns: 203, countdown: '02:42:11', tone: 'photo-ph-amber', color: 'amber',   desc: 'Khô, sạch, đã ép kiện' },
  { id: 'AL-2026-0401', mat: 'Nhôm (Al)', grade: 'B', kg: 180, hub: 'Trạm Hà Đông — Hà Nội', price: 38000, rating: 4.4, txns: 41,  countdown: '47:18:42', tone: 'photo-ph-blue',  color: 'slate',   desc: 'Lon, khung cửa hỗn hợp' },
];

const PMarketplace = ({ onOpen }) => {
  const [selectedMats, setSelectedMats] = useS1(['Nhựa PET', 'Đồng']);
  const [trustOnly, setTrustOnly] = useS1(true);
  const [weight, setWeight] = useS1(500);
  const [sort, setSort] = useS1('Mới nhất');

  const filtered = useM1(() => {
    return LOTS.filter(l =>
      (selectedMats.length === 0 || selectedMats.some(m => l.mat.includes(m))) &&
      (!trustOnly || l.rating >= 4.5)
    );
  }, [selectedMats, trustOnly]);

  const toggleMat = (m) => {
    setSelectedMats(s => s.includes(m) ? s.filter(x => x !== m) : [...s, m]);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8 grid grid-cols-[280px_1fr] gap-6">
      {/* SIDEBAR FILTER */}
      <aside>
        <div className="sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon.Filter size={16} className="text-slate-500"/>
              <h3 className="text-[14px] font-bold text-slate-900">Bộ lọc</h3>
            </div>
            <button className="text-[11px] text-emerald-700 font-bold">Đặt lại</button>
          </div>

          <HCard className="p-4 mb-3">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2.5">Loại vật liệu</div>
            <div className="space-y-2">
              {['Nhựa PET','Nhựa HDPE','Đồng','Sắt','Carton','Nhôm'].map(m => {
                const on = selectedMats.includes(m);
                return (
                  <label key={m} className="flex items-center gap-2.5 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${on ? 'bg-emerald-700 border-emerald-700' : 'border-slate-300 bg-white'}`}>
                      {on && <Icon.Check size={11} className="text-white"/>}
                    </div>
                    <input type="checkbox" checked={on} onChange={()=>toggleMat(m)} className="sr-only"/>
                    <span className={`text-[13px] ${on ? 'font-bold text-slate-900' : 'text-slate-600'} group-hover:text-slate-900`}>{m}</span>
                  </label>
                );
              })}
            </div>
          </HCard>

          <HCard className="p-4 mb-3">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2.5">Khu vực</div>
            <select className="w-full h-9 px-2.5 text-[13px] rounded-lg border border-slate-200 bg-white outline-none">
              <option>TP.HCM (4)</option>
              <option>Hà Nội (1)</option>
              <option>Bình Dương (1)</option>
            </select>
          </HCard>

          <HCard className="p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Khối lượng tối thiểu</div>
              <span className="text-[12px] font-mono font-bold text-emerald-700">{weight} kg</span>
            </div>
            <input type="range" min="100" max="5000" step="50" value={weight} onChange={e=>setWeight(+e.target.value)}
              className="w-full accent-emerald-600"/>
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>100kg</span><span>5,000kg</span>
            </div>
          </HCard>

          <HCard className="p-4 mb-3">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2.5">Grade</div>
            <div className="grid grid-cols-3 gap-1.5">
              {['A','B','C'].map(g => (
                <button key={g} className={`h-8 rounded-md text-[12px] font-bold border ${g==='A' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-slate-600 border-slate-200'}`}>
                  {g}
                </button>
              ))}
            </div>
          </HCard>

          <HCard className="p-4">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <button onClick={()=>setTrustOnly(!trustOnly)} className={`w-9 h-5 rounded-full relative transition-colors ${trustOnly ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${trustOnly ? 'left-4' : 'left-0.5'}`}/>
              </button>
              <div>
                <div className="text-[12.5px] font-bold text-slate-900">Trạm uy tín ⭐4.5+</div>
                <div className="text-[10.5px] text-slate-500">Verified KYB · Insurance covered</div>
              </div>
            </label>
          </HCard>
        </div>
      </aside>

      {/* MAIN FEED */}
      <main className="min-w-0">
        {/* header */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <HPill tone="green"><Icon.Gavel size={11}/> Sealed-bid Marketplace</HPill>
              <HPill tone="dark"><Icon.Shield size={11}/> Buyer Protection</HPill>
            </div>
            <h1 className="text-[26px] font-extrabold text-slate-900 tracking-tight">Marketplace nguyên liệu sỉ</h1>
            <div className="text-[13px] text-slate-500">{filtered.length} lô đang mở · cập nhật real-time · 8 thành phố</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-slate-500">Sắp xếp</span>
            <select value={sort} onChange={e=>setSort(e.target.value)}
              className="h-9 px-3 text-[13px] rounded-lg border border-slate-200 bg-white font-semibold outline-none">
              <option>Mới nhất</option>
              <option>Giá thấp nhất</option>
              <option>Khoảng cách</option>
              <option>Sắp đóng đấu giá</option>
            </select>
          </div>
        </div>

        {/* active filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-5 pb-4 border-b border-slate-200">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Đang lọc:</span>
          {selectedMats.map(m => (
            <button key={m} onClick={()=>toggleMat(m)}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-emerald-100 text-emerald-800 text-[11.5px] font-bold border border-emerald-200">
              {m} <Icon.X size={11}/>
            </button>
          ))}
          {trustOnly && (
            <button onClick={()=>setTrustOnly(false)}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-emerald-100 text-emerald-800 text-[11.5px] font-bold border border-emerald-200">
              Uy tín 4.5+ <Icon.X size={11}/>
            </button>
          )}
          <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-slate-100 text-slate-600 text-[11.5px] font-bold border border-slate-200">
            ≥ {weight} kg
          </span>
        </div>

        {/* GRID OF LOTS */}
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(l => (
            <button key={l.id} onClick={()=>onOpen(l.id)}
              className="group text-left bg-white rounded-xl border border-slate-200 overflow-hidden lift">
              {/* image */}
              <div className={`aspect-[16/10] ${l.tone} relative flex items-center justify-center`}>
                <Icon.Package size={28} className="text-emerald-700/30"/>
                {/* countdown */}
                <div className="absolute top-2.5 left-2.5 bg-slate-900/85 text-white px-2 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 backdrop-blur">
                  <Icon.Clock size={10} className="pulse-soft"/> Còn {l.countdown}
                </div>
                {/* grade */}
                <div className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold border-2 border-white ${
                  l.grade === 'A' ? 'bg-emerald-500 text-white' :
                  l.grade === 'B' ? 'bg-amber-400 text-amber-950' : 'bg-slate-300 text-slate-800'
                }`}>{l.grade}</div>
              </div>

              {/* body */}
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-[10px] uppercase tracking-wider font-bold ${
                    l.color === 'sky' ? 'text-sky-700' : l.color === 'amber' ? 'text-amber-800' : 'text-slate-600'
                  }`}>{l.mat} · Grade {l.grade}</span>
                </div>
                <div className="text-[15px] font-extrabold text-slate-900 leading-tight">{l.kg.toLocaleString('vi-VN')} kg · {l.desc}</div>
                <div className="flex items-center gap-1 mt-1.5 text-[11.5px] text-slate-500">
                  <Icon.MapPin size={11}/> {l.hub}
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Giá khởi điểm</div>
                    <div className="text-[16px] font-extrabold text-emerald-700 font-mono tabular-nums">
                      {l.price.toLocaleString('vi-VN')}<span className="text-[10px] text-slate-500"> ₫/kg</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Icon.Star size={11} className="text-amber-400 fill-amber-400" style={{fill:'#fbbf24'}}/>
                      <span className="text-[11.5px] font-bold text-slate-700 font-mono">{l.rating}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{l.txns} giao dịch</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10.5px] font-mono">
                  <span className="text-slate-400">{l.id}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Xem & Đặt giá <Icon.ArrowRight size={11}/>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

window.PMarketplace = PMarketplace;
window.LOTS = LOTS;
