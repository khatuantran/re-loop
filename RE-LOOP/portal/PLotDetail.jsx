// SCREEN 2 — Lot Detail + Sealed-bid Auction
const PLotDetail = ({ lotId, onBack, onJourney }) => {
  const [tab, setTab] = React.useState('source');
  const [bidPrice, setBidPrice] = React.useState(12000);
  const [agreed, setAgreed] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [activePhoto, setActivePhoto] = React.useState(0);

  const lot = LOTS.find(l => l.id === lotId) || LOTS[0];
  const total = bidPrice * lot.kg;

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] mb-4">
        <button onClick={onBack} className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1">
          <Icon.ChevronLeft size={12}/> Marketplace
        </button>
        <Icon.ChevronRight size={12} className="text-slate-300"/>
        <span className="text-slate-500">Đồng (Cu)</span>
        <Icon.ChevronRight size={12} className="text-slate-300"/>
        <span className="font-mono font-bold text-slate-900">{lot.id}</span>
      </div>

      <div className="grid grid-cols-[1fr_460px] gap-8">
        {/* LEFT — gallery + info */}
        <div>
          {/* main photo */}
          <div className={`aspect-[16/10] rounded-xl ${lot.tone} mb-3 flex items-center justify-center relative overflow-hidden`}>
            <Icon.Package size={64} className="text-emerald-700/30"/>
            <div className="absolute top-3 left-3 flex gap-2">
              <HPill tone="dark"><Icon.Camera size={11}/> Ảnh có watermark GPS+TS</HPill>
            </div>
            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-mono text-slate-700">
              {activePhoto+1} / 5
            </div>
          </div>
          {/* thumbnails */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {[0,1,2,3,4].map(i => (
              <button key={i} onClick={()=>setActivePhoto(i)}
                className={`aspect-[16/10] rounded-lg ${lot.tone} border-2 ${activePhoto === i ? 'border-emerald-600' : 'border-transparent'} flex items-center justify-center`}>
                <Icon.Image size={16} className="text-emerald-700/40"/>
              </button>
            ))}
          </div>

          {/* INFO STRIP */}
          <HCard className="p-5 mb-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <HPill tone="green"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot"/> Đang mở đấu giá</HPill>
                  <HPill tone="amber">Grade {lot.grade}</HPill>
                </div>
                <h1 className="text-[24px] font-extrabold text-slate-900 tracking-tight leading-tight">
                  {lot.mat} — {lot.desc}
                </h1>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <Icon.Share size={18}/>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Khối lượng</div>
                <div className="text-[18px] font-extrabold text-slate-900 font-mono tabular-nums">{lot.kg.toLocaleString('vi-VN')} <span className="text-[12px] text-slate-500">kg</span></div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Trạm</div>
                <div className="text-[14px] font-bold text-emerald-700 leading-tight mt-0.5">Q.7 #H-005</div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Icon.Star size={9} className="fill-amber-400" style={{fill:'#fbbf24'}}/>
                  {lot.rating} · {lot.txns} giao dịch
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Mã truy xuất</div>
                <div className="text-[12.5px] font-mono font-bold text-slate-900 mt-0.5">{lot.id}</div>
                <div className="text-[10px] text-emerald-700 font-bold">ESG-grade · drill-down</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Sẵn giao</div>
                <div className="text-[14px] font-bold text-slate-900 mt-0.5">25/04/2026</div>
                <div className="text-[10px] text-slate-500">Q.7 hoặc giao tận nơi</div>
              </div>
            </div>
          </HCard>

          {/* TABS */}
          <div className="border-b border-slate-200 flex gap-1 mb-4">
            {[
              { id: 'source',  l: 'Nguồn gốc',     i: Icon.Recycle, badge: '47 đơn gốc' },
              { id: 'quality', l: 'Quality Cert',  i: Icon.Shield,  badge: 'PASS' },
              { id: 'terms',   l: 'Điều khoản',    i: Icon.FileText },
            ].map(t => (
              <button key={t.id} onClick={()=>setTab(t.id)}
                className={`px-4 py-3 text-[13px] font-bold border-b-2 -mb-px flex items-center gap-2 ${
                  tab === t.id ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}>
                <t.i size={14}/> {t.l}
                {t.badge && <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${tab===t.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{t.badge}</span>}
              </button>
            ))}
          </div>

          {tab === 'source' && (
            <HCard className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[14px] font-bold text-slate-900">Lô được gộp từ 47 đơn gốc</div>
                  <div className="text-[11.5px] text-slate-500">Mỗi đơn có ảnh + GPS + timestamp riêng</div>
                </div>
                <button onClick={onJourney} className="text-[12px] font-bold text-emerald-700 flex items-center gap-1 hover:gap-1.5 transition-all">
                  Xem PET Journey đầy đủ <Icon.ArrowRight size={12}/>
                </button>
              </div>

              {/* mini chain */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { l: 'Users',     v: 47, i: Icon.User,   tone: 'bg-amber-50 text-amber-700' },
                  { l: 'Collectors',v: 6,  i: Icon.Truck,  tone: 'bg-sky-50 text-sky-700' },
                  { l: 'Hub',       v: 1,  i: Icon.Hub,    tone: 'bg-emerald-50 text-emerald-700' },
                  { l: 'Lô',        v: 1,  i: Icon.Package,tone: 'bg-slate-100 text-slate-700' },
                ].map(s => (
                  <div key={s.l} className={`${s.tone} rounded-lg p-3`}>
                    <s.i size={16}/>
                    <div className="text-[20px] font-extrabold tabular-nums font-mono mt-1 leading-none">{s.v}</div>
                    <div className="text-[10px] uppercase tracking-wider font-bold mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* mini map */}
              <div className="aspect-[16/8] rounded-lg bg-emerald-50/50 border border-slate-200 grid-bg relative overflow-hidden">
                {[
                  {x:18,y:30}, {x:24,y:44}, {x:30,y:28}, {x:36,y:60}, {x:42,y:36},
                  {x:48,y:50}, {x:54,y:32}, {x:60,y:58}, {x:66,y:42}, {x:72,y:30},
                  {x:78,y:54}, {x:25,y:70}, {x:50,y:72}, {x:70,y:68}
                ].map((p, i) => (
                  <div key={i} className="absolute w-2 h-2 rounded-full bg-emerald-500 -translate-x-1/2 -translate-y-1/2" style={{left:`${p.x}%`,top:`${p.y}%`}}/>
                ))}
                {/* hub center */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center ring-4 ring-emerald-200">
                    <Icon.Hub size={16}/>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur rounded px-2 py-1 text-[10px] font-mono text-slate-600">
                  47 điểm thu gom · bán kính 8.4 km
                </div>
              </div>
            </HCard>
          )}

          {tab === 'quality' && (
            <HCard className="p-5">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-lg mb-4 border border-emerald-200">
                <Icon.CheckCircle size={20} className="text-emerald-600 shrink-0 mt-0.5"/>
                <div>
                  <div className="text-[13px] font-bold text-emerald-900">Đạt Grade A — kiểm định bởi Hub Q.7</div>
                  <div className="text-[11.5px] text-emerald-800">Test mẫu 5g/lô, ngày 24/04/2026 — báo cáo có chữ ký số</div>
                </div>
              </div>
              <table className="w-full text-[12.5px]">
                <tbody>
                  {[
                    ['Độ tinh khiết',     '92.5%',    'Yêu cầu ≥90% cho Cu #1'],
                    ['Độ ẩm',             '0.8%',     '≤2%'],
                    ['Tạp chất kim loại', '1.2%',     '≤3%'],
                    ['Tạp chất hữu cơ',   '0.4%',     '≤1%'],
                    ['Kích thước trung bình', '12mm', '8–20mm'],
                  ].map(r => (
                    <tr key={r[0]} className="border-b border-slate-100 last:border-0">
                      <td className="py-2.5 text-slate-700 font-semibold">{r[0]}</td>
                      <td className="py-2.5 font-mono font-bold text-slate-900 tabular-nums">{r[1]}</td>
                      <td className="py-2.5 text-slate-500 text-[11px]">{r[2]}</td>
                      <td className="py-2.5 text-right"><Icon.Check size={14} className="text-emerald-600 inline"/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </HCard>
          )}

          {tab === 'terms' && (
            <HCard className="p-5 text-[12.5px] text-slate-700 space-y-2.5 leading-relaxed">
              <p>• Thanh toán: 30% đặt cọc khi thắng đấu, 70% trước khi nhận hàng. Escrow qua RE-LOOP.</p>
              <p>• Vận chuyển: Người mua tự sắp xếp hoặc đặt qua Hub (+5K/kg).</p>
              <p>• Buyer protection: 3 đơn đầu hoàn 100% nếu chất lượng lệch &gt;5% so với certificate.</p>
              <p>• Giải quyết tranh chấp: Dispute center, phán quyết trong 72h.</p>
            </HCard>
          )}
        </div>

        {/* RIGHT — Bid Panel STICKY */}
        <aside>
          <div className="sticky top-6 space-y-4">
            {!submitted ? (
              <HCard className="p-6 border-2 border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                    <Icon.Lock size={18}/>
                  </div>
                  <div>
                    <div className="text-[15px] font-extrabold text-slate-900 leading-tight">Đấu giá kín — Sealed Bid</div>
                    <div className="text-[10.5px] text-slate-500">Bạn không thấy giá đối thủ</div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3 flex items-start gap-2">
                  <Icon.Info size={14} className="text-amber-700 shrink-0 mt-0.5"/>
                  <div className="text-[11.5px] text-amber-900 leading-relaxed">
                    Trạm sẽ chọn người mua trong <b>24–48h</b> sau khi đấu giá đóng. Tiêu chí: giá cao + lịch sử + khoảng cách giao.
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11.5px] mb-1">
                    <span className="text-slate-500">Giá khởi điểm</span>
                    <span className="font-mono font-bold text-slate-700 tabular-nums">{lot.price.toLocaleString('vi-VN')} ₫/kg</span>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px]">
                    <span className="text-slate-500">Tổng tối thiểu (×{lot.kg}kg)</span>
                    <span className="font-mono font-bold text-slate-700 tabular-nums">{(lot.price*lot.kg).toLocaleString('vi-VN')} ₫</span>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-slate-700 mb-1.5 block">
                    Giá bid của bạn (₫/kg) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input type="number" value={bidPrice} onChange={e=>setBidPrice(+e.target.value || 0)}
                      className="w-full h-14 pl-4 pr-16 text-[24px] font-extrabold rounded-lg border-2 border-emerald-300 bg-emerald-50/30 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none font-mono tabular-nums text-slate-900"/>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-slate-500">₫/kg</span>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {[lot.price, lot.price+500, lot.price+1000, lot.price+2000].map(v => (
                      <button key={v} onClick={()=>setBidPrice(v)}
                        className={`flex-1 h-7 text-[10.5px] font-bold rounded-md border ${
                          bidPrice === v ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}>
                        {(v/1000).toFixed(1)}K
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-900 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-white/70 font-bold">Tổng bid của bạn</span>
                    <span className="text-[10px] font-mono text-emerald-400">live</span>
                  </div>
                  <div className="text-[26px] font-extrabold tabular-nums font-mono mt-1 leading-none">
                    {total.toLocaleString('vi-VN')} <span className="text-[12px] text-white/70">₫</span>
                  </div>
                  <div className="text-[10.5px] text-white/70 mt-0.5">{bidPrice.toLocaleString('vi-VN')} ₫/kg × {lot.kg} kg</div>
                </div>

                <label className="flex items-start gap-2 mt-4 cursor-pointer">
                  <button onClick={()=>setAgreed(!agreed)} className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${agreed ? 'bg-emerald-700 border-emerald-700' : 'border-slate-300 bg-white'}`}>
                    {agreed && <Icon.Check size={11} className="text-white"/>}
                  </button>
                  <span className="text-[11.5px] text-slate-600 leading-relaxed">
                    Tôi đồng ý <a className="text-emerald-700 font-bold">điều khoản đấu giá</a> và <a className="text-emerald-700 font-bold">buyer protection</a>
                  </span>
                </label>

                <button onClick={()=>{ if(agreed) setSubmitted(true); }}
                  disabled={!agreed}
                  className={`w-full mt-4 h-12 rounded-lg font-bold text-[14px] flex items-center justify-center gap-2 ${
                    agreed ? 'bg-emerald-700 text-white hover:bg-emerald-800' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}>
                  <Icon.Lock size={16}/> Đặt giá kín
                </button>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-start gap-2 text-[11px] text-slate-600">
                    <span className="text-base leading-none">🛡️</span>
                    <span>3 đơn đầu hoàn 100% nếu lô không đạt chất lượng đã cam kết</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] text-slate-600">
                    <span className="text-base leading-none">📜</span>
                    <span>Mã truy xuất ESG-grade — drill-down từng đơn gốc cho audit</span>
                  </div>
                  <div className="flex items-start gap-2 text-[11px] text-slate-600">
                    <span className="text-base leading-none">⏱️</span>
                    <span>Đóng đấu giá sau <b className="font-mono text-slate-900">{lot.countdown}</b></span>
                  </div>
                </div>
              </HCard>
            ) : (
              <HCard className="p-6 border-2 border-emerald-500 bg-emerald-50/40 slide-in">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3">
                  <Icon.Check size={28}/>
                </div>
                <div className="text-center">
                  <div className="text-[18px] font-extrabold text-emerald-900">Đã đặt giá thành công!</div>
                  <div className="text-[12.5px] text-emerald-800 mt-1">Mã bid: <span className="font-mono font-bold">BID-2026-0425-#7842</span></div>
                  <div className="text-[26px] font-extrabold font-mono tabular-nums text-emerald-700 mt-3">
                    {total.toLocaleString('vi-VN')} ₫
                  </div>
                  <div className="text-[11.5px] text-slate-600 mt-1">{bidPrice.toLocaleString('vi-VN')} ₫/kg × {lot.kg} kg</div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-white border border-slate-200 text-[11.5px] text-slate-600 leading-relaxed">
                  Trạm Q.7 sẽ thông báo kết quả trong <b className="text-slate-900">24–48h</b>. Bạn nhận được email + push khi có quyết định.
                </div>
                <button onClick={onBack} className="w-full mt-3 h-10 rounded-lg bg-slate-900 text-white font-bold text-[13px]">
                  Tiếp tục mua sắm
                </button>
              </HCard>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

window.PLotDetail = PLotDetail;
