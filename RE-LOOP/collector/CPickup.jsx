// SCREEN 3 — Pickup at stop — WEB LAYOUT (left context + right step)
const CPickup = ({ onNavigate }) => {
  const [step, setStep] = useState(1);
  const [weight, setWeight] = useState('');
  const [photos, setPhotos] = useState([true, false, false]);
  const [waitProgress, setWaitProgress] = useState(0);

  useEffect(() => {
    if (step !== 4) return;
    const t = setInterval(() => {
      setWaitProgress(p => {
        if (p >= 100) { clearInterval(t); setStep(5); return 100; }
        return p + 4;
      });
    }, 250);
    return () => clearInterval(t);
  }, [step]);

  const STEPS = ['Đã đến', 'Cân khối lượng', 'Chụp ảnh', 'Chờ user', 'Hoàn tất'];

  return (
    <div className="px-8 py-8 max-w-[1440px] mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">Stop 1/8 · D-2841</div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">12 Nguyễn Văn Linh, Q.7</h1>
          <div className="text-[13px] text-slate-500">Khách: Chị Minh Anh · Nhựa PET ~5kg · +45.000 ₫</div>
        </div>
        <Btn variant="ghost" size="md" onClick={()=>onNavigate('route')}>← Bản đồ chuyến</Btn>
      </div>

      {/* Stepper */}
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

      <div className="grid grid-cols-12 gap-5">
        {/* LEFT — order context */}
        <div className="col-span-4 space-y-4">
          <Card className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Khách hàng</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base">M</div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-slate-900">Chị Minh Anh</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Icon.Star size={11} className="text-amber-400" style={{fill:'#fbbf24'}}/> 4.8 · 18 đơn
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Icon.Phone size={16}/>
              </button>
            </div>
            <div className="text-[12px] text-slate-500">"Chung cư có thang máy, gọi trước 5 phút."</div>
          </Card>

          <Card className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Đơn hàng</div>
            <div className="space-y-2 text-[13px]">
              <div className="flex justify-between"><span className="text-slate-500">Mã</span><span className="font-mono font-bold">D-2841</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Vật liệu</span><span className="font-bold">Nhựa PET</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Khối lượng dự kiến</span><span className="font-bold tabular-nums">~5 kg</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Slot</span><span className="font-bold">14:00 – 15:00</span></div>
              <div className="border-t border-slate-100 my-2"/>
              <div className="flex justify-between items-baseline"><span className="text-[11px] text-slate-500 uppercase font-bold">Phí ước</span><span className="text-[20px] font-extrabold text-emerald-700 tabular-nums">+45.000 ₫</span></div>
            </div>
          </Card>
        </div>

        {/* RIGHT — current step */}
        <div className="col-span-8">
          {step === 1 && (
            <Card className="p-0 overflow-hidden">
              <div className="relative h-[420px] map-grid map-roads bg-[#E8F0EA]">
                <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
                  <div className="absolute inset-0 ping-slow rounded-full bg-emerald-400/50 w-20 h-20 -m-5"/>
                  <div className="relative w-14 h-14 rounded-full bg-emerald-500 border-[4px] border-white shadow-lg flex items-center justify-center">
                    <Icon.Truck size={22} className="text-white"/>
                  </div>
                </div>
                <div className="absolute" style={{ left: '53%', top: '46%', transform: 'translate(-50%,-100%)' }}>
                  <div className="bg-amber-400 text-amber-950 rounded-md px-2.5 py-1 shadow-md text-[11px] font-extrabold">ĐÍCH</div>
                </div>
                <div className="absolute rounded-full border-2 border-emerald-400 border-dashed"
                     style={{ left: '50%', top: '50%', width: 200, height: 200, transform: 'translate(-50%,-50%)' }}/>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon.MapPin size={20} className="text-emerald-600"/>
                    <span className="text-[18px] font-bold text-slate-900">Bạn cách 18m</span>
                    <Pill tone="green"><Icon.Check size={11}/> Trong vùng 100m</Pill>
                  </div>
                  <div className="text-[12px] text-slate-500 mt-1">GPS sẽ tự xác minh khi tap "Đã đến nơi"</div>
                </div>
                <Btn variant="primary" size="lg" onClick={() => setStep(2)} iconRight={Icon.CheckCircle}>
                  Đã đến nơi
                </Btn>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">Khối lượng thực</div>
                <div className="text-[12px] text-slate-400">Cân bằng cân điện tử, nhập số kg</div>
              </div>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl px-6 py-8 text-center mb-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-[88px] font-extrabold text-emerald-700 tabular-nums leading-none font-mono">{weight || '0'}</span>
                  <span className="text-[28px] font-extrabold text-slate-500">kg</span>
                </div>
                <div className="text-[12px] text-slate-500 mt-3">Ước tính ban đầu: <b className="text-slate-700">~5 kg</b></div>
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6">
                {['1','2','3','4','5','6','7','8','9','.','0','⌫'].map(k => (
                  <button key={k} onClick={() => {
                    if (k === '⌫') return setWeight(w => w.slice(0, -1));
                    if (k === '.' && weight.includes('.')) return;
                    if (weight.length >= 5) return;
                    setWeight(w => w + k);
                  }}
                    className="h-14 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-[24px] font-extrabold text-slate-900 transition-colors">
                    {k}
                  </button>
                ))}
              </div>
              <Btn variant="primary" size="lg" className="w-full max-w-md mx-auto !flex"
                   disabled={!weight || parseFloat(weight) <= 0}
                   onClick={() => setStep(3)}
                   iconRight={Icon.ArrowRight}>
                Tiếp tục — Chụp ảnh
              </Btn>
            </Card>
          )}

          {step === 3 && (
            <Card className="p-6">
              <div className="text-center mb-5">
                <div className="text-[18px] font-bold text-slate-900">Chụp ảnh xác nhận</div>
                <div className="text-[12px] text-slate-500">1–3 ảnh, có watermark GPS + giờ</div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {photos.map((p, i) => (
                  <button key={i} onClick={() => {
                    const next = [...photos]; next[i] = !next[i]; setPhotos(next);
                  }} className={`relative aspect-[4/3] rounded-2xl border-2 flex items-center justify-center transition-colors ${
                    p ? 'photo-ph border-emerald-300' : 'border-dashed border-slate-300 bg-white hover:border-emerald-300'
                  }`}>
                    {p ? (
                      <>
                        <Icon.Check size={36} className="text-emerald-600"/>
                        <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur rounded-md px-2 py-1">
                          <div className="text-[9px] text-white font-mono">10.7321, 106.7028</div>
                          <div className="text-[9px] text-white font-mono">25/04 14:32:18</div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-slate-400">
                        <Icon.Camera size={28}/>
                        <span className="text-[11px] font-bold mt-1">+ Ảnh {i+1}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 mb-5">
                <Icon.Shield size={16} className="text-amber-700 shrink-0 mt-0.5"/>
                <div className="text-[12px] text-amber-900 leading-relaxed">
                  Ảnh được gắn watermark GPS + thời gian để chống gian lận. Vui lòng chụp rõ rác trước mặt.
                </div>
              </div>
              <Btn variant="primary" size="lg" className="w-full" disabled={!photos.some(Boolean)} onClick={() => setStep(4)}>
                Gửi xác nhận
              </Btn>
            </Card>
          )}

          {step === 4 && (
            <Card className="p-12 text-center">
              <div className="relative mx-auto mb-6 w-32 h-32">
                <div className="w-32 h-32 rounded-full bg-amber-50 border-4 border-amber-200 flex items-center justify-center">
                  <Icon.User size={56} className="text-amber-500"/>
                </div>
                <div className="absolute inset-0 rounded-full bg-amber-300 ping-slow"/>
              </div>
              <div className="text-[24px] font-extrabold text-slate-900 mb-2">Chờ user xác nhận</div>
              <div className="text-[14px] text-slate-500 mb-8">Chị Minh Anh đang xác nhận khối lượng và ảnh</div>
              <div className="max-w-sm mx-auto">
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 transition-all duration-200" style={{width: `${waitProgress}%`}}/>
                </div>
                <div className="text-[11px] text-slate-500 mt-2 font-mono">Trung bình ~30 giây</div>
              </div>
              <button onClick={() => setStep(5)} className="mt-8 text-[13px] text-emerald-700 font-bold underline">
                [demo] bỏ qua chờ
              </button>
            </Card>
          )}

          {step === 5 && (
            <Card className="p-10 bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
              <div className="flex items-center gap-6 mb-6">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center text-white pop">
                    <Icon.Check size={48}/>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-emerald-300 ping-slow"/>
                </div>
                <div className="flex-1">
                  <div className="text-[28px] font-extrabold text-slate-900 leading-tight">Đã hoàn tất stop 1!</div>
                  <div className="text-[14px] text-slate-500 mt-1">Đang chuyển sang stop tiếp theo...</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-700 text-white rounded-2xl p-5 pop">
                  <div className="text-[11px] font-bold text-white/70 uppercase tracking-wider">Phí thực nhận</div>
                  <div className="text-[36px] font-extrabold tabular-nums leading-none mt-1">+45.000 ₫</div>
                </div>
                <div className="bg-white rounded-2xl border border-amber-200 p-5 pop flex items-center gap-3" style={{animationDelay:'0.15s'}}>
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Icon.Coins size={22}/>
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Điểm uy tín</div>
                    <div className="text-[24px] font-extrabold text-amber-600 tabular-nums">+45 điểm</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-amber-300 p-5 mb-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <Pill tone="amber">Stop tiếp theo</Pill>
                  <span className="text-[11.5px] font-mono text-amber-900 font-bold ml-auto">2/8</span>
                </div>
                <div className="text-[18px] font-extrabold text-slate-900 leading-tight">78 Lê Văn Lương</div>
                <div className="text-[12.5px] text-slate-500 mt-0.5">Carton ~12kg · 0.6km · +95.000 ₫</div>
              </div>

              <div className="flex gap-3">
                <Btn variant="primary" size="lg" className="flex-1" onClick={() => setStep(1)} iconRight={Icon.ArrowRight}>
                  Đến stop tiếp theo
                </Btn>
                <Btn variant="ghost" size="lg" onClick={() => onNavigate('route')}>
                  Bản đồ chuyến
                </Btn>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

window.CPickup = CPickup;
