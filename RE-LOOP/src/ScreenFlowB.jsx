// SCREEN 3 — Flow B: Mode Selector + Form — WEB LAYOUT
const ScreenFlowB = ({ onNavigate }) => {
  const [mode, setMode] = React.useState('speed');
  const [stage, setStage] = React.useState('select');
  const [photos, setPhotos] = React.useState([true, true, false, false, false]);
  const [floor, setFloor] = React.useState('Lầu 3');
  const [needsHelp, setNeedsHelp] = React.useState(true);

  const ModeCard = ({ id, icon: I, title, tagline, fitFor, price, features, accent }) => {
    const active = mode === id;
    const tone = accent === 'amber' ? {
      ring: 'border-amber-400 bg-amber-50/40 shadow-[0_18px_40px_-18px_rgba(251,191,36,0.4)]',
      iconBg: 'bg-amber-100 text-amber-600',
      tag: 'text-amber-700',
      check: 'bg-amber-400 border-amber-400',
      price: 'text-amber-700',
    } : {
      ring: 'border-emerald-500 bg-emerald-50/40 shadow-[0_18px_40px_-18px_rgba(16,185,129,0.4)]',
      iconBg: 'bg-emerald-100 text-emerald-600',
      tag: 'text-emerald-700',
      check: 'bg-emerald-500 border-emerald-500',
      price: 'text-emerald-700',
    };
    return (
      <button onClick={() => setMode(id)}
        className={`relative w-full text-left rounded-2xl border-2 p-6 transition-all ${active ? tone.ring : 'border-slate-200 bg-white hover:border-slate-300'}`}>
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${tone.iconBg}`}>
            <I size={28}/>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[20px] font-extrabold text-slate-900">{title}</span>
              {id === 'speed' && <Pill tone="green" className="!py-0.5 !text-[10px]">Phổ biến</Pill>}
            </div>
            <div className={`text-[13px] font-bold ${tone.tag}`}>{tagline}</div>
          </div>
          <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? tone.check : 'bg-white border-slate-300'}`}>
            {active && <Icon.Check size={16} className="text-white"/>}
          </div>
        </div>
        <div className="text-[13px] text-slate-600 mb-4 leading-relaxed">{fitFor}</div>
        <div className="space-y-2 mb-4">
          {features.map(f => (
            <div key={f} className="flex items-center gap-2 text-[12.5px] text-slate-700">
              <Icon.Check size={14} className={tone.price}/>
              {f}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Giá</span>
          <span className={`text-[15px] font-extrabold tabular-nums ${tone.price}`}>{price}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="px-8 py-8 max-w-[1280px] mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">Bán đồ cũ</div>
          <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {stage === 'select' ? 'Chọn chế độ phù hợp' : 'Khai báo chi tiết'}
          </h1>
          <div className="text-[13px] text-slate-500">
            {stage === 'select'
              ? 'Đồ cũ to (tủ lạnh, máy giặt, sofa)? Bạn có 2 cách bán'
              : `${mode === 'speed' ? 'Speed Mode' : 'Auction Mode'} · điền thông tin để collector hiểu món hàng`
            }
          </div>
        </div>
        {stage === 'form' && (
          <Btn variant="ghost" size="md" onClick={()=>setStage('select')}>← Đổi chế độ</Btn>
        )}
      </div>

      {stage === 'select' && (
        <>
          <div className="grid grid-cols-2 gap-5 mb-6">
            <ModeCard
              id="speed" icon={Icon.Zap}
              title="Speed Mode"
              tagline="Chốt ngay — nhận tiền trong 2 phút"
              fitFor="Bạn ưu tiên tiện lợi, không cần tối đa giá. RE-LOOP áp giá sàn cố định, Collector gần nhất nhận đơn ngay."
              features={['Chờ ~2 phút', 'Giá sàn cố định', 'Tự động chọn collector gần nhất']}
              price="18.000 ₫/kg"
              accent="emerald"
            />
            <ModeCard
              id="auction" icon={Icon.Gavel}
              title="Auction Mode"
              tagline="Tối đa hóa giá — chờ 30–60 phút"
              fitFor="Bạn có thời gian, muốn so sánh. Tối đa 3 báo giá từ Collector trong 10 km, bạn chọn tốt nhất."
              features={['Chờ 30–60 phút', 'Tối đa 3 báo giá', 'Bán kính 10 km']}
              price="Tối đa 3 báo giá"
              accent="amber"
            />
          </div>

          <Card className="p-0 overflow-hidden mb-6">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">So sánh nhanh</div>
              <div className="text-[11px] text-slate-400">Đang chọn: <b className="text-slate-700">{mode === 'speed' ? 'Speed' : 'Auction'}</b></div>
            </div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-3 px-5 text-left text-[11px] uppercase tracking-wider text-slate-400 font-bold">Tiêu chí</th>
                  <th className={`py-3 px-5 text-center text-[12px] font-bold ${mode === 'speed' ? 'text-emerald-700 bg-emerald-50/40' : 'text-slate-700'}`}>Speed Mode</th>
                  <th className={`py-3 px-5 text-center text-[12px] font-bold ${mode === 'auction' ? 'text-amber-700 bg-amber-50/40' : 'text-slate-700'}`}>Auction Mode</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Thời gian chờ', '~2 phút', '30–60 phút'],
                  ['Số báo giá', '1 (cố định)', 'Tối đa 3'],
                  ['Bán kính tìm', '3 km', '10 km'],
                  ['Phù hợp', 'Cần nhanh, gọn', 'Cần giá tốt'],
                  ['Hủy đơn', 'Miễn phí trước 1 phút', 'Miễn phí trước 5 phút'],
                ].map(([k, a, b], i) => (
                  <tr key={k} className={`border-b border-slate-50 last:border-0 ${i % 2 ? 'bg-slate-50/30' : ''}`}>
                    <td className="py-3 px-5 text-slate-500 font-medium">{k}</td>
                    <td className={`py-3 px-5 font-bold text-center ${mode === 'speed' ? 'text-emerald-700 bg-emerald-50/30' : 'text-slate-700'}`}>{a}</td>
                    <td className={`py-3 px-5 font-bold text-center ${mode === 'auction' ? 'text-amber-700 bg-amber-50/30' : 'text-slate-700'}`}>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="flex justify-end">
            <Btn variant="primary" size="lg" iconRight={Icon.ArrowRight} onClick={() => setStage('form')}>
              {mode === 'speed' ? 'Tiếp tục với Speed Mode' : 'Tiếp tục với Auction Mode'}
            </Btn>
          </div>
        </>
      )}

      {stage === 'form' && (
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8 space-y-5">
            <Card className="p-6">
              <Pill tone={mode === 'speed' ? 'green' : 'amber'} className="mb-4">
                {mode === 'speed' ? <Icon.Zap size={11}/> : <Icon.Gavel size={11}/>}
                {mode === 'speed' ? 'Speed Mode' : 'Auction Mode'}
              </Pill>
              <div className="space-y-5">
                <div>
                  <Label>Mô tả đồ cần bán</Label>
                  <Input defaultValue="Tủ lạnh Sanyo 150L, hỏng máy nén"/>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Số lượng</Label>
                    <Input defaultValue="1"/>
                  </div>
                  <div>
                    <Label>Kích cỡ</Label>
                    <Select value="Lớn" options={['Vừa','Lớn','Rất lớn']}/>
                  </div>
                  <div>
                    <Label>Tình trạng</Label>
                    <Select value="Hỏng" options={['Tốt','Cũ', 'Hỏng']}/>
                  </div>
                </div>

                <div>
                  <Label>Ảnh (1–5 ảnh, bắt buộc) <span className="text-emerald-600 font-mono">{photos.filter(Boolean).length}/5</span></Label>
                  <div className="grid grid-cols-5 gap-3 mt-1">
                    {photos.map((p, i) => (
                      <button key={i} onClick={() => {
                        const next = [...photos]; next[i] = !next[i]; setPhotos(next);
                      }} className={`aspect-square rounded-xl border-2 flex items-center justify-center text-slate-400 transition-colors ${
                        p ? 'photo-ph border-emerald-200' : 'border-dashed border-slate-300 bg-white hover:border-emerald-300'
                      }`}>
                        {p ? <Icon.Check size={22} className="text-emerald-600"/> : <Icon.Plus size={20}/>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Tầng / lầu</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {['Trệt','Lầu 1','Lầu 2','Lầu 3','Lầu 4+'].map(f => (
                      <button key={f} onClick={()=>setFloor(f)}
                        className={`h-11 rounded-lg text-[12.5px] font-bold border ${
                          floor === f ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                        }`}>{f}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Ghi chú (không bắt buộc)</Label>
                  <textarea rows="3" defaultValue="Chung cư có thang máy, gọi trước 10 phút khi đến."
                    className="w-full text-[13px] px-3 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none resize-none"/>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-4 space-y-4">
            <Card className="p-5">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Tùy chọn thêm</div>
              <button onClick={()=>setNeedsHelp(!needsHelp)} className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 mb-3">
                <div className="text-left">
                  <div className="text-[13px] font-bold text-slate-900">Cần khuân vác</div>
                  <div className="text-[11.5px] text-slate-500">+10K nếu cần &gt;2 người</div>
                </div>
                <div className={`w-11 h-6 rounded-full p-0.5 transition-colors shrink-0 ${needsHelp ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  <div className={`w-5 h-5 rounded-full bg-white transition-transform ${needsHelp ? 'translate-x-5' : ''}`}/>
                </div>
              </button>
            </Card>

            <Card className="p-5">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">Ước tính</div>
              <div className="space-y-2">
                <div className="flex justify-between text-[13px]"><span className="text-slate-500">Cân nặng dự kiến</span><span className="font-bold tabular-nums">~40 kg</span></div>
                <div className="flex justify-between text-[13px]"><span className="text-slate-500">Giá sàn</span><span className="font-bold tabular-nums">720.000 ₫</span></div>
                {needsHelp && <div className="flex justify-between text-[13px]"><span className="text-slate-500">Phụ phí khuân</span><span className="font-bold tabular-nums">+10.000 ₫</span></div>}
                <div className="border-t border-slate-100 my-2"/>
                <div className="flex justify-between items-baseline">
                  <span className="text-[12px] text-slate-500 uppercase tracking-wider font-bold">Tổng (tham khảo)</span>
                  <span className="text-[20px] font-extrabold text-emerald-700 tabular-nums">{needsHelp ? '730K' : '720K'}</span>
                </div>
              </div>
            </Card>

            <Btn variant="primary" size="lg" className="w-full"
                 onClick={() => onNavigate(mode === 'speed' ? 'tracking' : 'auction')}
                 iconRight={Icon.ArrowRight}>
              {mode === 'speed' ? 'Đặt lịch — Speed' : 'Bắt đầu Auction'}
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
};

const Label = ({ children }) => (
  <label className="block text-[11.5px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">{children}</label>
);
const Input = (p) => (
  <input {...p} className="w-full h-11 px-3.5 text-[13.5px] rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none"/>
);
const Select = ({ value, options }) => (
  <div className="relative">
    <select defaultValue={value} className="w-full h-11 px-3.5 pr-9 text-[13.5px] rounded-lg border border-slate-200 focus:border-emerald-500 outline-none appearance-none bg-white">
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
    <Icon.ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none"/>
  </div>
);

window.ScreenFlowB = ScreenFlowB;
