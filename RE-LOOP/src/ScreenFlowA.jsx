// SCREEN 2 — Flow A: Standard pickup — WEB LAYOUT
// Layout: 3-step process across one page, two-column main area
const ScreenFlowA = ({ onNavigate }) => {
  const [step, setStep] = React.useState(1);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [editPrice, setEditPrice] = React.useState(false);
  const [slot, setSlot] = React.useState('14:00 – 15:00');
  const [countdown, setCountdown] = React.useState(1500);

  const triggerAnalyze = () => {
    setAnalyzing(true);
    setStep(2);
    setTimeout(() => setAnalyzing(false), 1800);
  };

  React.useEffect(() => {
    if (step !== 4) return;
    const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [step]);

  const mm = String(Math.floor(countdown / 60)).padStart(2, '0');
  const ss = String(countdown % 60).padStart(2, '0');

  const STEPS = ['Chụp ảnh', 'Kết quả AI', 'Xác nhận'];

  return (
    <div className="px-8 py-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">Đặt thu gom</div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">Rác tiêu chuẩn — 3 bước, &lt; 60s</h1>
          <div className="text-[13px] text-slate-500">Chụp ảnh → AI nhận diện → Xác nhận</div>
        </div>
        <Pill tone="green"><Icon.Clock size={11}/> Trung bình 45s</Pill>
      </div>

      {/* Stepper bar */}
      {step !== 4 && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            {STEPS.map((label, i) => {
              const n = i + 1;
              return (
                <React.Fragment key={n}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold border-2 transition-colors ${
                      step >= n ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-400'
                    }`}>
                      {step > n ? <Icon.Check size={14}/> : n}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold leading-none">Bước {n}</div>
                      <div className={`text-[13px] font-bold leading-tight mt-0.5 ${step >= n ? 'text-slate-900' : 'text-slate-400'}`}>{label}</div>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 rounded ${step > n ? 'bg-emerald-500' : 'bg-slate-200'}`}/>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1 — CAPTURE */}
      {step === 1 && (
        <div className="grid grid-cols-12 gap-5">
          <Card className="col-span-8 p-0 overflow-hidden">
            <div className="relative bg-slate-900 aspect-[16/10] flex items-center justify-center">
              <div className="absolute inset-0 photo-ph opacity-20"></div>
              <div className="absolute inset-10 border-2 border-white/40 border-dashed rounded-2xl"></div>
              {['tl','tr','bl','br'].map(p => (
                <div key={p} className={`absolute w-8 h-8 border-emerald-400 ${
                  p==='tl' ? 'top-12 left-12 border-t-[3px] border-l-[3px] rounded-tl-lg' :
                  p==='tr' ? 'top-12 right-12 border-t-[3px] border-r-[3px] rounded-tr-lg' :
                  p==='bl' ? 'bottom-24 left-12 border-b-[3px] border-l-[3px] rounded-bl-lg' :
                             'bottom-24 right-12 border-b-[3px] border-r-[3px] rounded-br-lg'
                }`}></div>
              ))}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur rounded-full px-4 py-2 text-white text-[12px] font-medium flex items-center gap-2">
                <Icon.Sparkles size={14} className="text-amber-300"/>
                Chụp toàn bộ rác để AI nhận diện chính xác
              </div>
              <div className="text-center text-white/30 font-mono text-[12px]">
                <Icon.Image size={80} className="mx-auto mb-2 text-white/40"/>
                [Camera viewfinder]
              </div>
              <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6">
                <button className="w-12 h-12 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white">
                  <Icon.Image size={20}/>
                </button>
                <button onClick={triggerAnalyze}
                  className="w-[78px] h-[78px] rounded-full bg-white border-[5px] border-white/40 flex items-center justify-center active:scale-95 transition-transform">
                  <div className="w-full h-full rounded-full bg-emerald-500"/>
                </button>
                <button className="w-12 h-12 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-white">
                  <Icon.Recycle size={20}/>
                </button>
              </div>
            </div>
          </Card>

          <div className="col-span-4 space-y-4">
            <Card className="p-5">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Mẹo chụp ảnh đẹp</div>
              <div className="space-y-2.5">
                {[
                  ['Đủ ánh sáng', 'Tránh chụp trong tối'],
                  ['Toàn bộ vật phẩm', 'Đừng cắt mép'],
                  ['Một loại / ảnh', 'Phân loại trước'],
                ].map(([t, s], i) => (
                  <div key={t} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i+1}</div>
                    <div>
                      <div className="text-[12.5px] font-bold text-slate-900">{t}</div>
                      <div className="text-[11px] text-slate-500">{s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Ví dụ ảnh đẹp</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: 'Chai PET', c: 'bg-sky-50 text-sky-700 border-sky-100' },
                  { l: 'Carton',   c: 'bg-amber-50 text-amber-800 border-amber-100' },
                  { l: 'Kim loại', c: 'bg-slate-100 text-slate-700 border-slate-200' },
                  { l: 'Lon nhôm', c: 'bg-zinc-50 text-zinc-700 border-zinc-200' },
                ].map((e) => (
                  <div key={e.l} className={`aspect-square rounded-xl border ${e.c} flex flex-col items-center justify-center text-[11px] font-bold`}>
                    <Icon.Package size={22} className="mb-1.5 opacity-70"/>
                    {e.l}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* STEP 2 — AI RESULT */}
      {step === 2 && (
        <div className="grid grid-cols-12 gap-5">
          {/* Left: photo + summary */}
          <div className="col-span-7 space-y-5">
            <Card className="p-0 overflow-hidden">
              <div className="relative photo-ph aspect-[16/9] flex items-center justify-center">
                <div className="text-emerald-700/40 font-mono text-[12px]">[ảnh rác đã chụp]</div>
                <div className="absolute top-3 left-3"><Pill tone="white"><Icon.Camera size={11}/> 1 ảnh</Pill></div>
                {!analyzing && (
                  <div className="absolute top-3 right-3"><Pill tone="green"><Icon.Sparkles size={11}/> Phân tích xong</Pill></div>
                )}
              </div>
            </Card>

            {analyzing ? (
              <Card className="p-5 flex items-center gap-4 border-emerald-100">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Icon.Sparkles size={22} className="text-emerald-600 animate-pulse"/>
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-bold text-slate-900">AI đang phân tích...</div>
                  <div className="text-[12px] text-slate-500">Nhận diện vật liệu · ước tính khối lượng · tra giá khu vực</div>
                </div>
                <div className="w-32 h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{width:'70%', animation:'shimmer 1.5s linear infinite'}}/>
                </div>
              </Card>
            ) : (
              <Card className="p-0 overflow-hidden border-emerald-200 shadow-[0_18px_40px_-18px_rgba(16,185,129,0.4)] slide-in">
                <div className="bg-gradient-to-br from-emerald-50 to-white p-5 border-b border-emerald-100 flex items-center justify-between">
                  <Pill tone="green"><Icon.Sparkles size={11}/> Kết quả AI</Pill>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">Độ chính xác</span>
                    <span className="text-[14px] font-bold text-emerald-700">94%</span>
                    <div className="w-16 h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{width:'94%'}}/>
                    </div>
                  </div>
                </div>
                <div className="p-5 grid grid-cols-3 gap-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Vật liệu</div>
                    <div className="text-[20px] font-extrabold text-slate-900 mt-1">Nhựa PET</div>
                    <div className="text-[12px] text-slate-500">chai trong suốt</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Khối lượng</div>
                    <div className="text-[20px] font-extrabold text-slate-900 mt-1 tabular-nums">~3.2 kg</div>
                    <div className="text-[12px] text-slate-500">ước tính</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Giá tham khảo</div>
                    <div className="text-[20px] font-extrabold text-emerald-700 mt-1 tabular-nums">~24.000 ₫</div>
                    <button onClick={()=>setEditPrice(!editPrice)} className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                      <Icon.Edit size={11}/> Chỉnh tay
                    </button>
                  </div>
                </div>
                {editPrice && (
                  <div className="mx-5 mb-5 bg-amber-50 border border-amber-100 rounded-xl p-3 text-[12px] text-amber-900 flex items-start gap-2">
                    <Icon.Info size={14} className="shrink-0 mt-0.5"/>
                    Bạn có thể sửa loại / khối lượng nếu AI sai. Collector sẽ cân lại khi đến.
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Right: address + slot */}
          <div className="col-span-5 space-y-5">
            <Card className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <Icon.MapPin size={18} className="text-emerald-600"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Địa chỉ thu gom</div>
                  <div className="text-[14px] font-bold text-slate-900 leading-snug">123 Nguyễn Thị Thập, P. Tân Phú</div>
                  <div className="text-[12px] text-slate-500">Quận 7, TP.HCM · GPS đã xác nhận</div>
                </div>
                <button className="text-[11.5px] text-emerald-700 font-bold">Đổi</button>
              </div>
            </Card>

            <Card className="p-5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Khung giờ còn trống</div>
              <div className="grid grid-cols-3 gap-2">
                {['08:00 – 09:00','10:00 – 11:00','12:00 – 13:00','14:00 – 15:00','15:00 – 16:00','17:00 – 18:00'].map(s => (
                  <button key={s} onClick={()=>setSlot(s)}
                    className={`py-2.5 rounded-lg text-[12px] font-bold border transition-colors ${
                      slot === s ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                    }`}>{s}</button>
                ))}
              </div>
            </Card>

            {!analyzing && (
              <Btn variant="primary" size="lg" className="w-full"
                   iconRight={Icon.ArrowRight}
                   onClick={() => setStep(3)}>
                Tiếp tục — Xác nhận
              </Btn>
            )}
          </div>
        </div>
      )}

      {/* STEP 3 — CONFIRM */}
      {step === 3 && (
        <div className="grid grid-cols-12 gap-5">
          <Card className="col-span-8 p-6">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-4">Tóm tắt đơn hàng</div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <SumRow label="Rác" value="Nhựa PET · 3.2 kg"/>
              <SumRow label="Địa chỉ" value="123 Nguyễn Thị Thập, Q.7"/>
              <SumRow label="Khung giờ" value={slot}/>
              <SumRow label="Collector" value="Tự động chọn gần nhất"/>
            </div>
            <div className="my-5 border-t border-dashed border-slate-200"/>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[12px] text-slate-500">Bạn nhận được</div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-[40px] font-extrabold text-amber-500 tabular-nums leading-none">+160</span>
                  <span className="text-[14px] font-bold text-amber-600">điểm</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[12px] text-slate-500">Giá tham khảo</div>
                <div className="text-[24px] font-extrabold text-slate-900 tabular-nums">~24.000 ₫</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[12px] text-slate-500 px-1">
              <Icon.Shield size={14} className="text-emerald-600"/>
              Đơn này sẽ có Recycling Certificate ID sau khi hoàn tất
            </div>
          </Card>

          <div className="col-span-4 space-y-3">
            <Btn variant="primary" size="lg" className="w-full" onClick={() => setStep(4)}>
              Xác nhận đặt lịch
            </Btn>
            <Btn variant="ghost" size="lg" className="w-full" onClick={()=>setStep(2)}>
              Quay lại chỉnh sửa
            </Btn>
            <Card className="p-4 bg-emerald-50 border-emerald-100">
              <div className="flex items-start gap-2">
                <Icon.Info size={14} className="text-emerald-700 shrink-0 mt-0.5"/>
                <div className="text-[11.5px] text-emerald-900 leading-relaxed">
                  Collector sẽ liên hệ trước khi đến. Phí giao dịch <b>0 đồng</b> với rác tái chế.
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* STEP 4 — SUCCESS */}
      {step === 4 && (
        <div className="grid grid-cols-12 gap-5 mt-4">
          <Card className="col-span-7 p-8 bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <Icon.Check size={40}/>
                </div>
                <div className="absolute inset-0 rounded-full bg-emerald-300 ping-slow"/>
              </div>
              <div>
                <div className="text-[24px] font-extrabold text-slate-900 leading-tight">Đã đặt lịch thành công!</div>
                <div className="text-[14px] text-slate-500 mt-1">Anh Hùng đang trên đường đến lấy rác của bạn</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base">H</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-slate-900">Anh Hùng</div>
                  <div className="text-[11.5px] text-slate-500 flex items-center gap-1.5">
                    <Icon.Star size={11} className="text-amber-400" style={{fill:'#fbbf24'}}/> 4.9 · #C-018
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Icon.Phone size={16}/>
                </button>
              </div>
              <div className="bg-slate-900 text-white rounded-xl p-4 text-center">
                <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold mb-1">Sẽ đến trong</div>
                <div className="text-[36px] font-extrabold tabular-nums leading-none font-mono">{mm}:{ss}</div>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <Btn variant="dark" size="lg" className="flex-1" onClick={()=>onNavigate('tracking')} iconRight={Icon.ArrowRight}>
                Theo dõi Collector
              </Btn>
              <Btn variant="ghost" size="lg" onClick={()=>onNavigate('home')}>
                Về trang chủ
              </Btn>
            </div>
          </Card>

          <Card className="col-span-5 p-6">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Tiếp theo</div>
            <div className="space-y-3">
              {[
                ['Anh Hùng đến tận nơi', 'Trong ~25 phút', Icon.Truck, true],
                ['Cân & xác nhận khối lượng', 'Bạn được +160 điểm', Icon.Recycle, false],
                ['Nhận Recycling Certificate', 'Sau 2-3 ngày xử lý', Icon.Shield, false],
              ].map(([t, s, I, active], i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    <I size={16}/>
                  </div>
                  <div className="flex-1">
                    <div className={`text-[13px] font-bold ${active ? 'text-slate-900' : 'text-slate-500'}`}>{t}</div>
                    <div className="text-[11px] text-slate-500">{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

const SumRow = ({ label, value }) => (
  <div>
    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">{label}</div>
    <div className="text-[15px] font-bold text-slate-900 mt-0.5">{value}</div>
  </div>
);

window.ScreenFlowA = ScreenFlowA;
