// SCREEN 2 — Route Map — WEB LAYOUT (8/4 split: map + stops list)
const CRoute = ({ onNavigate }) => {
  const stops = [
    { n: 1, addr: 'Số 12 Nguyễn Văn Linh', mat: 'Nhựa PET', kg: 5,  fee: 45,  x: 22, y: 78 },
    { n: 2, addr: '78 Lê Văn Lương',       mat: 'Carton',   kg: 12, fee: 95,  x: 35, y: 62 },
    { n: 3, addr: '224 Huỳnh Tấn Phát',    mat: 'Lon nhôm', kg: 3,  fee: 28,  x: 50, y: 70 },
    { n: 4, addr: '45 Nguyễn Thị Thập',    mat: 'Nhựa PET', kg: 4,  fee: 36,  x: 60, y: 50 },
    { n: 5, addr: '99 Phạm Hữu Lầu',       mat: 'Hỗn hợp',  kg: 11, fee: 88,  x: 70, y: 35 },
    { n: 6, addr: 'Hoa Sen Plaza, Q.7',    mat: 'Carton',   kg: 8,  fee: 60,  x: 80, y: 22 },
    { n: 7, addr: '312 Tôn Dật Tiên',      mat: 'Mô tơ',    kg: 6,  fee: 50,  x: 65, y: 18 },
    { n: 8, addr: 'Trạm Q.7 #H-005',       mat: 'Trả về trạm', kg: 0, fee: 0, x: 45, y: 12, hub: true },
  ];

  const totalKg = stops.reduce((s, x) => s + x.kg, 0);
  const totalFee = stops.reduce((s, x) => s + x.fee, 0);
  const pathSvg = stops.map((s, i) => (i === 0 ? `M ${s.x*7.2},${s.y*5.6}` : `L ${s.x*7.2},${s.y*5.6}`)).join(' ');

  return (
    <div className="px-8 py-8 max-w-[1440px] mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">Chuyến #R-0425-A</div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">Gộp 8 điểm — Q.7</h1>
          <div className="text-[13px] text-slate-500">12.4 km · ~95 phút · phí ước +340K</div>
        </div>
        <Btn variant="primary" size="lg" iconRight={Icon.Truck} onClick={() => onNavigate('pickup')}>
          Bắt đầu chuyến
        </Btn>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {[['Tổng điểm','8','stops'],['Tổng KG',`${totalKg}`,'kg'],['Tổng KM','12.4','km'],['Phí ước',`+${totalFee}K`,'VNĐ']].map(([l,v,s])=>(
          <Card key={l} className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{l}</div>
            <div className="text-[28px] font-extrabold text-slate-900 tabular-nums mt-1 leading-none">{v}</div>
            <div className="text-[11.5px] text-slate-500 mt-1.5">{s}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* MAP */}
        <Card className="col-span-8 p-0 overflow-hidden h-[600px] relative">
          <div className="absolute inset-0 map-grid map-roads bg-[#E8F0EA]"/>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 720 560" preserveAspectRatio="none">
            <path d={pathSvg} stroke="#FFFFFF" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
            <path d={pathSvg} stroke="#10B981" strokeWidth="4" fill="none" strokeDasharray="10 5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {stops.map(s => (
            <div key={s.n} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%,-50%)' }}>
              {s.n === 1 && <div className="absolute inset-0 ping-slow rounded-full bg-emerald-400/50 w-12 h-12 -m-2"/>}
              <div className={`relative w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-[14px] border-[3px] border-white shadow-md ${
                s.hub ? 'bg-emerald-700 text-white' : s.n === 1 ? 'bg-amber-400 text-amber-950' : 'bg-white text-emerald-700'
              }`}>
                {s.hub ? <Icon.Hub size={16}/> : s.n}
              </div>
            </div>
          ))}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur rounded-lg px-3 py-2 shadow border border-slate-200">
            <div className="text-[10px] uppercase text-slate-400 font-bold">Đang xem</div>
            <div className="text-[13px] font-bold text-slate-900">Chuyến R-0425-A</div>
          </div>
        </Card>

        {/* STOPS LIST */}
        <div className="col-span-4 space-y-3">
          <Card className="p-4 bg-amber-50 border-2 border-amber-300">
            <div className="flex items-center justify-between mb-1.5">
              <Pill tone="amber"><Icon.MapPin size={11}/> Stop kế tiếp</Pill>
              <span className="text-[12px] font-bold text-amber-900 font-mono">1/8</span>
            </div>
            <div className="text-[15px] font-extrabold text-slate-900 leading-tight">Số 12 Nguyễn Văn Linh</div>
            <div className="text-[12px] text-slate-600 mt-0.5 mb-3">Nhựa PET ~5kg · 1.2km · +45.000 ₫</div>
            <Btn variant="primary" size="md" className="w-full" onClick={()=>onNavigate('pickup')} iconRight={Icon.ArrowRight}>
              Đến stop 1
            </Btn>
          </Card>

          <Card className="p-0 overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Tất cả 8 điểm
            </div>
            <div className="max-h-[380px] overflow-y-auto">
              {stops.map(s => (
                <div key={s.n} className={`flex items-center gap-3 px-4 py-3 border-b border-slate-50 last:border-0 ${
                  s.n === 1 ? 'bg-amber-50/40' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-[12px] shrink-0 ${
                    s.hub ? 'bg-emerald-700 text-white' : s.n === 1 ? 'bg-amber-400 text-amber-950' : 'bg-white border border-slate-200 text-slate-600'
                  }`}>
                    {s.hub ? <Icon.Hub size={14}/> : s.n}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-bold text-slate-900 truncate">{s.addr}</div>
                    <div className="text-[10.5px] text-slate-500 truncate">{s.mat}{s.kg ? ` · ~${s.kg}kg` : ''}</div>
                  </div>
                  {s.fee > 0 && <div className="text-[12.5px] font-extrabold text-emerald-700 tabular-nums shrink-0">+{s.fee}K</div>}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

window.CRoute = CRoute;
