// SCREEN 6 — Recycling Certificate — WEB LAYOUT
const ScreenCert = ({ onNavigate }) => {
  const milestones = [
    { l: 'Bạn',       sub: 'Q.7, TP.HCM · 25/04',  icon: Icon.User,    done: true },
    { l: 'Collector', sub: 'Anh Hùng #C-018 · 25/04', icon: Icon.Truck,   done: true },
    { l: 'Hub xử lý', sub: 'Trạm Q.7 #H-005 · 26/04', icon: Icon.Hub,     done: true },
    { l: 'Nhà máy',   sub: 'Nhà máy ABC · 28/04',  icon: Icon.Factory, done: true },
  ];

  return (
    <div className="px-8 py-8 max-w-[1280px] mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">Recycling Certificate</div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">Đơn #08732 — đã tái chế xong 🌱</h1>
          <div className="text-[13px] text-slate-500">Mã chứng nhận RC-2026-0425-08732 · verified on-chain · 28.04.2026</div>
        </div>
        <div className="flex gap-2">
          <Btn variant="ghost" size="md"><Icon.Share size={14}/> Chia sẻ</Btn>
          <Btn variant="primary" size="md" onClick={()=>onNavigate('home')}>Về trang chủ</Btn>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* CERT — left, dominant */}
        <div className="col-span-8">
          <div className="cert-edge"/>
          <div className="cert-paper px-10 py-9 relative shadow-2xl">
            {/* header */}
            <div className="flex items-center justify-between pb-5 border-b-2 border-dashed border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                  <Icon.Recycle size={24}/>
                </div>
                <div>
                  <div className="text-[18px] font-extrabold text-emerald-900 leading-none tracking-tight">RE-LOOP</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">CIRCULAR ECONOMY · VN</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Verified</div>
                <div className="flex items-center gap-1.5 text-emerald-700 mt-0.5">
                  <Icon.CheckCircle size={16}/>
                  <span className="text-[13px] font-bold">Đã tái chế</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="py-7 text-center">
              <div className="text-[11px] uppercase tracking-[0.25em] text-emerald-700 font-bold mb-2">Chứng nhận tái chế</div>
              <div className="text-[32px] font-extrabold text-slate-900 tracking-tight leading-tight">
                Bạn đã đóng góp cho<br/>kinh tế tuần hoàn
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5">
              {/* QR + ID */}
              <div className="col-span-5 flex items-center gap-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <div className="w-24 h-24 bg-white rounded-xl border border-emerald-200 flex items-center justify-center shrink-0">
                  <Icon.QrCode size={68} className="text-emerald-900"/>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Mã chứng nhận</div>
                  <div className="text-[15px] font-mono font-bold text-slate-900 tracking-tight leading-tight">RC-2026-0425</div>
                  <div className="text-[15px] font-mono font-bold text-slate-900 tracking-tight leading-tight">-08732</div>
                  <div className="text-[10.5px] text-slate-500 mt-1.5">Quét QR để xác minh</div>
                </div>
              </div>

              {/* Big CO2 stat */}
              <div className="col-span-7 p-5 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-600 text-white relative overflow-hidden">
                <div className="absolute top-2 right-2 opacity-20"><Icon.Leaf size={88}/></div>
                <div className="text-[10px] uppercase tracking-wider text-white/70 font-bold">Tác động tích cực</div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-[48px] font-extrabold tabular-nums leading-none">4.65</span>
                  <span className="text-[16px] font-bold">kg CO₂ giảm</span>
                </div>
                <div className="text-[12.5px] text-white/85 mt-2">≈ tiết kiệm điện <b>1 tủ lạnh chạy 5 ngày</b></div>
              </div>
            </div>

            {/* Details */}
            <div className="mt-7 grid grid-cols-2 gap-x-10 gap-y-3">
              <DetailRow k="Loại rác" v="Nhựa PET (chai)"/>
              <DetailRow k="Khối lượng thực" v="3.1 kg" mono/>
              <DetailRow k="Collector" v="Anh Hùng #C-018"/>
              <DetailRow k="Trạm xử lý" v="Trạm Q.7 #H-005"/>
              <DetailRow k="Nhà máy đích" v="Công ty ABC"/>
              <DetailRow k="Carbon giảm" v="4.65 kg CO₂" accent/>
            </div>

            {/* Timeline */}
            <div className="mt-7 pt-6 border-t-2 border-dashed border-emerald-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-4">Hành trình tái chế</div>
              <div className="relative">
                <div className="absolute top-6 left-6 right-6 h-0.5 bg-emerald-500"/>
                <div className="grid grid-cols-4 gap-2 relative">
                  {milestones.map((m, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 border-[5px] border-[#FFFEF9] text-white flex items-center justify-center relative z-10">
                        <m.icon size={18}/>
                      </div>
                      <div className="text-[12px] font-bold text-slate-900 mt-2.5 leading-tight">{m.l}</div>
                      <div className="text-[10.5px] text-slate-500 leading-tight mt-0.5">{m.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-7 pt-5 border-t border-slate-200 flex items-center justify-between">
              <div className="text-[10px] text-slate-400 font-mono">VERIFIED ON-CHAIN · 28.04.2026 · TX 0xa3f...92e</div>
              <div className="text-[10px] text-emerald-700 font-bold tracking-wider">RE-LOOP®</div>
            </div>
          </div>
          <div className="cert-edge-bottom"/>
        </div>

        {/* SIDE: Share + impact */}
        <div className="col-span-4 space-y-4">
          <Card className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Tổng tác động của bạn</div>
            <div className="space-y-3">
              <div>
                <div className="text-[11px] text-slate-500">Tích lũy 6 tháng</div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[28px] font-extrabold text-emerald-700 tabular-nums leading-none">12.4</span>
                  <span className="text-[12px] font-bold text-slate-500">kg CO₂</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Đơn hoàn thành</div>
                  <div className="text-[18px] font-extrabold tabular-nums">24</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold">Cây xanh ≈</div>
                  <div className="text-[18px] font-extrabold text-emerald-700 tabular-nums">0.6</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-[13px] font-bold text-slate-900 mb-1">Chia sẻ thành tích 🌱</div>
            <div className="text-[11.5px] text-slate-500 mb-3">Truyền cảm hứng cho bạn bè</div>
            <div className="grid grid-cols-2 gap-2">
              <button className="h-11 rounded-lg bg-[#1877F2] text-white font-bold text-[13px] flex items-center justify-center gap-2">
                <Icon.Share size={15}/> Facebook
              </button>
              <button className="h-11 rounded-lg bg-[#0068FF] text-white font-bold text-[13px] flex items-center justify-center gap-2">
                <Icon.Send size={15}/> Zalo
              </button>
              <button className="h-11 rounded-lg bg-slate-900 text-white font-bold text-[13px] flex items-center justify-center gap-2 col-span-2">
                <Icon.Share size={15}/> Tải PDF
              </button>
            </div>
          </Card>

          <Card className="p-5 bg-amber-50 border-amber-100">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Icon.Coins size={16}/>
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900">+145 Green Points</div>
                <div className="text-[11.5px] text-slate-600 leading-relaxed">Đã cộng vào ví. Còn 250 điểm để mở voucher 50K.</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ k, v, mono, accent }) => (
  <div className="flex items-center justify-between text-[13px] py-1 border-b border-slate-100 last:border-0">
    <span className="text-slate-500">{k}</span>
    <span className={`font-bold ${accent ? 'text-emerald-700' : 'text-slate-900'} ${mono ? 'font-mono tabular-nums' : ''}`}>{v}</span>
  </div>
);

window.ScreenCert = ScreenCert;
