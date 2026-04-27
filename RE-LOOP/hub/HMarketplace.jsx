// SCREEN 3 — Marketplace listing form (B2B)
const HMarketplace = ({ onNavigate }) => {
  const [photos, setPhotos] = useState([true, true, true, false, false, false]);
  const [pricingMode, setPricingMode] = useState('fixed'); // fixed | auction
  const [demandPreview, setDemandPreview] = useState(false);

  // dummy demand based on price
  const fixedPrice = 50000;
  const fairPrice = { low: 45000, mid: 50000, high: 58000 };

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-6">
      <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-3">
        <button onClick={()=>onNavigate('dashboard')} className="hover:text-emerald-700 font-semibold">Dashboard</button>
        <Icon.ChevronRight size={12}/>
        <span>Marketplace B2B</span>
        <Icon.ChevronRight size={12}/>
        <span className="text-slate-900 font-bold">Đăng lô mới</span>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HPill tone="green"><Icon.Package size={11}/> Lô đã xử lý</HPill>
            <HPill tone="slate" className="font-mono">LST-2026-0425-#42</HPill>
          </div>
          <h1 className="text-[24px] font-extrabold text-slate-900 tracking-tight">Đăng lô vật liệu lên Marketplace</h1>
          <div className="text-[12.5px] text-slate-500">Người mua: nhà máy, recycler công nghiệp, vendor xuất khẩu</div>
        </div>
        <div className="flex gap-2">
          <HBtn variant="secondary">Lưu nháp</HBtn>
          <HBtn variant="primary" icon={Icon.Send}>Đăng bán</HBtn>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* MAIN FORM */}
        <div className="col-span-8 space-y-5">
          <HCard className="p-6">
            <h3 className="text-[14px] font-bold text-slate-900 mb-4">1. Thông tin lô</h3>
            <div className="grid grid-cols-2 gap-4">
              <HField label="Loại vật liệu" required hint="Chọn từ danh mục chuẩn">
                <select className="w-full h-10 px-3 text-[14px] rounded-lg border border-slate-200 bg-white focus:border-emerald-500 outline-none font-semibold appearance-none">
                  <option>Đồng (Cu) — phế liệu</option>
                </select>
              </HField>
              <HField label="Phân loại" required>
                <select className="w-full h-10 px-3 text-[14px] rounded-lg border border-slate-200 bg-white focus:border-emerald-500 outline-none font-semibold appearance-none">
                  <option>Cu #1 — sạch, không pha</option>
                </select>
              </HField>
              <HField label="Khối lượng" required hint="kg, đã cân tại trạm">
                <HInput defaultValue="350.0"/>
              </HField>
              <HField label="Độ tinh khiết ước" hint="%">
                <HInput defaultValue="92.5"/>
              </HField>
              <HField label="Vị trí lô" required>
                <HInput defaultValue="Kho A — Trạm Q.7 #H-005"/>
              </HField>
              <HField label="Sẵn giao từ" required>
                <HInput defaultValue="25/04/2026"/>
              </HField>
            </div>
          </HCard>

          <HCard className="p-6">
            <h3 className="text-[14px] font-bold text-slate-900 mb-1">2. Ảnh vật liệu</h3>
            <div className="text-[11.5px] text-slate-500 mb-3">3–6 ảnh thực tế · ảnh đầu là ảnh đại diện</div>
            <div className="grid grid-cols-6 gap-2">
              {photos.map((p, i) => (
                <button key={i} onClick={() => { const n=[...photos]; n[i]=!n[i]; setPhotos(n); }}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center relative ${
                    p ? 'photo-ph border-emerald-200' : 'border-dashed border-slate-300 bg-white'
                  }`}>
                  {p ? (
                    <>
                      <Icon.Check size={20} className="text-emerald-600"/>
                      {i === 0 && <span className="absolute top-1 left-1 bg-emerald-700 text-white text-[9px] font-bold px-1 py-0.5 rounded">CHÍNH</span>}
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-slate-400">
                      <Icon.Plus size={16}/>
                      <span className="text-[9px] mt-0.5">Ảnh {i+1}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </HCard>

          <HCard className="p-6">
            <h3 className="text-[14px] font-bold text-slate-900 mb-4">3. Pricing</h3>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { id: 'fixed',   icon: Icon.Coins,  l: 'Giá cố định',     d: 'Người mua đầu tiên trả đủ giá lấy lô' },
                { id: 'auction', icon: Icon.Gavel,  l: 'Đấu giá B2B',    d: 'Mở 24h, người trả cao nhất thắng' },
              ].map(m => (
                <button key={m.id} onClick={()=>setPricingMode(m.id)}
                  className={`text-left p-4 rounded-xl border-2 ${
                    pricingMode === m.id ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200 bg-white'
                  }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <m.icon size={18} className={pricingMode === m.id ? 'text-emerald-700' : 'text-slate-500'}/>
                    <span className="text-[14px] font-bold">{m.l}</span>
                    {pricingMode === m.id && <Icon.Check size={14} className="ml-auto text-emerald-600"/>}
                  </div>
                  <div className="text-[11.5px] text-slate-500">{m.d}</div>
                </button>
              ))}
            </div>

            {pricingMode === 'fixed' ? (
              <div className="space-y-4">
                <HField label="Giá đăng bán" required hint="₫ / kg">
                  <HInput defaultValue="50000" onChange={()=>setDemandPreview(true)}/>
                </HField>

                {/* fair price band */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Khung giá thị trường (Cu #1, TP.HCM)</div>
                    <div className="text-[10px] font-mono text-slate-400">cập nhật 14:30</div>
                  </div>
                  <div className="relative h-12 rounded-lg bg-gradient-to-r from-amber-200 via-emerald-200 to-amber-200 border border-slate-200">
                    <div className="absolute inset-y-1 left-[20%] right-[20%] bg-emerald-500/30 rounded-md"/>
                    {/* current */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-[50%]">
                      <div className="w-1 h-12 bg-slate-900 rounded-full"/>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md font-mono whitespace-nowrap">
                        50.000 ₫
                      </div>
                    </div>
                    <div className="absolute -bottom-5 left-0 text-[10px] font-mono text-slate-500">{fmtNum(fairPrice.low/1000)}K</div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-700 font-bold">FAIR</div>
                    <div className="absolute -bottom-5 right-0 text-[10px] font-mono text-slate-500">{fmtNum(fairPrice.high/1000)}K</div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mt-6 flex items-start gap-2">
                  <Icon.TrendingUp size={16} className="text-emerald-700 shrink-0 mt-0.5"/>
                  <div className="text-[12px] text-emerald-900">
                    <b>Tốt:</b> Giá của bạn ở giữa khung fair. Dự đoán <b className="font-mono">8–12 inquiry</b> trong 48h. Tổng lô <b className="font-mono">{fmtVnd(50000 * 350)}</b>.
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <HField label="Giá khởi điểm ₫/kg"><HInput defaultValue="42000"/></HField>
                  <HField label="Bước giá ₫/kg"><HInput defaultValue="500"/></HField>
                  <HField label="Thời gian">
                    <select className="w-full h-10 px-3 text-[14px] rounded-lg border border-slate-200 font-mono"><option>24 giờ</option></select>
                  </HField>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <Icon.Info size={14} className="text-amber-700 shrink-0 mt-0.5"/>
                  <div className="text-[12px] text-amber-900">
                    Đấu giá phù hợp lô lớn (≥200kg) hoặc loại hiếm. Margin trung bình +6–14% so với giá cố định.
                  </div>
                </div>
              </div>
            )}
          </HCard>

          <HCard className="p-6">
            <h3 className="text-[14px] font-bold text-slate-900 mb-4">4. Vận chuyển</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: 'Người mua tự đến',  d: 'Tại trạm Q.7',    sel: true },
                { l: 'Hub giao',          d: 'Phụ phí ~5K/kg',  sel: false },
                { l: 'Thương lượng',      d: 'Liên hệ buyer',   sel: false },
              ].map((s, i) => (
                <button key={i} className={`p-3 rounded-lg border-2 text-left ${
                  s.sel ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200'
                }`}>
                  <div className="text-[13px] font-bold text-slate-900">{s.l}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{s.d}</div>
                </button>
              ))}
            </div>
          </HCard>
        </div>

        {/* SIDEBAR — preview + buyers */}
        <div className="col-span-4 space-y-4">
          {/* Live preview */}
          <HCard className="overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Preview · Trang Marketplace</div>
              <Icon.Search size={12} className="text-slate-400"/>
            </div>
            <div className="p-4">
              <div className="aspect-[16/10] rounded-lg photo-ph border border-emerald-100 mb-3 flex items-center justify-center text-emerald-700/30 font-mono text-[10px]">
                [ảnh đại diện]
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <HPill tone="green" className="!text-[9px] !px-1.5 !py-0">Verified Hub</HPill>
                <HPill tone="slate" className="!text-[9px] !px-1.5 !py-0 !font-mono">#H-005</HPill>
              </div>
              <div className="text-[15px] font-extrabold text-slate-900 leading-tight">Đồng (Cu) #1 — 350 kg</div>
              <div className="text-[11.5px] text-slate-500">Tinh khiết ~92.5% · Q.7, TP.HCM</div>

              <div className="my-3 border-t border-dashed border-slate-200"/>

              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-slate-500">Giá cố định</span>
                <span className="text-[20px] font-extrabold text-emerald-700 font-mono tabular-nums">50.000 ₫/kg</span>
              </div>
              <div className="text-right text-[11px] text-slate-500 mt-0.5">
                Tổng lô <b className="font-mono text-slate-700">{fmtVnd(50000 * 350)}</b>
              </div>

              <button className="w-full mt-3 h-10 rounded-lg bg-emerald-500 text-white font-bold text-[13px]">
                Liên hệ mua
              </button>
            </div>
          </HCard>

          {/* Suggested buyers */}
          <HCard className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[13px] font-bold text-slate-900">Buyer phù hợp</div>
                <div className="text-[11px] text-slate-500">Match theo loại + khoảng cách</div>
              </div>
              <HPill tone="green">3 match</HPill>
            </div>
            <div className="space-y-2.5">
              {[
                { n: 'CTCP Đồng Nam Phong',  loc: 'Q.Bình Tân · 14km', tag: 'Top buyer', tone: 'green' },
                { n: 'Recycler Việt Đức',     loc: 'Bình Dương · 28km', tag: 'Mua thường xuyên', tone: 'slate' },
                { n: 'Export Asia Co.',       loc: 'Cát Lái · 19km',    tag: 'Xuất khẩu',  tone: 'amber' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm">
                    {b.n.split(' ').slice(-1)[0][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-bold text-slate-900 truncate leading-tight">{b.n}</div>
                    <div className="text-[10.5px] text-slate-500">{b.loc}</div>
                  </div>
                  <HPill tone={b.tone} className="!text-[9px] !px-1.5 !py-0">{b.tag}</HPill>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 h-9 rounded-lg border border-slate-200 text-[12px] font-bold text-slate-700 hover:bg-slate-50">
              Gửi notify riêng (3 buyer)
            </button>
          </HCard>

          {/* Audit */}
          <HCard className="p-4 bg-slate-900 text-white border-slate-900">
            <div className="flex items-center gap-2 mb-2">
              <Icon.Shield size={14} className="text-emerald-400"/>
              <div className="text-[10px] uppercase tracking-wider font-bold text-white/70">Audit chain</div>
            </div>
            <div className="text-[11.5px] text-white/80 leading-relaxed">
              Lô này có nguồn gốc rõ: <b className="text-white">5 mô tơ</b> rã từ <b className="text-white font-mono">BAT-...09</b> → mass balance verified → ghi vào ledger.
            </div>
            <button className="mt-2 text-[11.5px] text-emerald-400 font-bold flex items-center gap-1">
              Xem certificate chain <Icon.ArrowRight size={12}/>
            </button>
          </HCard>
        </div>
      </div>
    </div>
  );
};

window.HMarketplace = HMarketplace;
