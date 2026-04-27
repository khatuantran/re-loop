// SCREEN 2 — Disassembly / Mass Balance worksheet
const HDisassembly = ({ onNavigate }) => {
  const [selectedBatch, setSelectedBatch] = useState('BAT-2026-0425-09');
  const [outputs, setOutputs] = useState([
    { mat: 'Đồng (Cu)',         kg: 8.5,  pct: 21.3, value: 425000 },
    { mat: 'Nhôm (Al)',         kg: 6.2,  pct: 15.5, value: 186000 },
    { mat: 'Sắt thép',          kg: 18.4, pct: 46.0, value: 165600 },
    { mat: 'Nhựa ABS',          kg: 4.1,  pct: 10.3, value: 32800 },
    { mat: 'Hao hụt / không TC', kg: 2.8,  pct: 7.0,  value: 0, loss: true },
  ]);

  const batches = [
    { id: 'BAT-2026-0425-09', desc: '5 mô tơ điện · 40 kg', received: '08:42' },
    { id: 'BAT-2026-0425-08', desc: '1 tủ lạnh Sanyo · 60 kg', received: '07:15' },
  ];

  const totalIn = 40;
  const totalOut = outputs.reduce((s, x) => s + x.kg, 0);
  const balance = (totalOut / totalIn * 100);
  const totalValue = outputs.reduce((s, x) => s + x.value, 0);

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-6">
      {/* breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-3">
        <button onClick={()=>onNavigate('dashboard')} className="hover:text-emerald-700 font-semibold">Dashboard</button>
        <Icon.ChevronRight size={12}/>
        <span>Xử lý / Rã xác</span>
        <Icon.ChevronRight size={12}/>
        <span className="text-slate-900 font-mono font-bold">{selectedBatch}</span>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HPill tone="earth"><Icon.Factory size={11}/> Rã xác · Mô tơ điện</HPill>
            <HPill tone="amber">Đang xử lý</HPill>
          </div>
          <h1 className="text-[24px] font-extrabold text-slate-900 tracking-tight">Mass Balance Worksheet</h1>
          <div className="text-[12.5px] text-slate-500">Kết quả sẽ được ghi vào blockchain ledger sau khi xác nhận</div>
        </div>
        <div className="flex gap-2">
          <HBtn variant="secondary" icon={Icon.X}>Hủy</HBtn>
          <HBtn variant="primary" icon={Icon.Check}>Xác nhận & Ghi sổ</HBtn>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* LEFT: input batch picker */}
        <div className="col-span-3 space-y-3">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Lô đầu vào</div>
          {batches.map(b => (
            <button key={b.id} onClick={()=>setSelectedBatch(b.id)}
              className={`w-full text-left rounded-xl border-2 p-3 ${
                selectedBatch === b.id ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200 bg-white'
              }`}>
              <div className="text-[11px] font-mono text-slate-500">{b.id}</div>
              <div className="text-[13px] font-bold text-slate-900 leading-tight mt-0.5">{b.desc}</div>
              <div className="text-[11px] text-slate-500 mt-1">Nhận lúc {b.received}</div>
            </button>
          ))}

          <HCard className="p-4 mt-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Ảnh trước rã</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square rounded-lg photo-ph border border-slate-200 flex items-center justify-center">
                  <Icon.Image size={20} className="text-emerald-700/40"/>
                </div>
              ))}
            </div>
          </HCard>
        </div>

        {/* CENTER: worksheet */}
        <div className="col-span-6">
          <HCard className="overflow-hidden">
            {/* IN */}
            <div className="px-5 py-4 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-amber-800 font-bold">Đầu vào (IN)</div>
                <div className="text-[16px] font-bold text-amber-900">5× Mô tơ điện cũ</div>
              </div>
              <div className="text-right">
                <div className="text-[28px] font-extrabold tabular-nums text-amber-900 leading-none font-mono">{totalIn.toFixed(1)}</div>
                <div className="text-[11px] font-bold text-amber-700">KG</div>
              </div>
            </div>

            {/* arrow */}
            <div className="py-2 flex items-center justify-center bg-slate-50 border-b border-slate-100">
              <Icon.ArrowRight size={20} className="rotate-90 text-slate-400"/>
            </div>

            {/* OUT table */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Đầu ra (OUT) — 5 vật liệu</div>
                <button className="text-[11.5px] text-emerald-700 font-bold flex items-center gap-1">
                  <Icon.Plus size={12}/> Thêm dòng
                </button>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                    <th className="text-left pb-2 font-bold">Vật liệu</th>
                    <th className="text-right pb-2 font-bold w-[90px]">Khối lượng</th>
                    <th className="text-right pb-2 font-bold w-[70px]">% lô</th>
                    <th className="text-right pb-2 font-bold w-[110px]">Giá trị ước</th>
                  </tr>
                </thead>
                <tbody>
                  {outputs.map((o, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${o.loss ? 'bg-red-50/40' : ''}`}>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-sm ${
                            o.mat.includes('Đồng') ? 'bg-amber-700' :
                            o.mat.includes('Nhôm') ? 'bg-slate-400' :
                            o.mat.includes('Sắt')  ? 'bg-slate-700' :
                            o.mat.includes('Nhựa') ? 'bg-sky-500' : 'bg-red-400'
                          }`}/>
                          <span className={`text-[13px] font-semibold ${o.loss ? 'text-red-700' : 'text-slate-900'}`}>
                            {o.mat}
                          </span>
                        </div>
                      </td>
                      <td className="text-right">
                        <input type="text" defaultValue={o.kg.toFixed(1)} className="w-[80px] h-9 px-2 text-right text-[13px] rounded-md border border-slate-200 font-mono tabular-nums focus:border-emerald-500 outline-none"/>
                      </td>
                      <td className="text-right text-[12px] font-mono tabular-nums text-slate-500 pr-2">
                        {o.pct.toFixed(1)}%
                      </td>
                      <td className="text-right text-[13px] font-mono tabular-nums font-bold text-slate-900">
                        {o.value > 0 ? fmtNum(o.value) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 font-bold">
                    <td className="py-3 text-[12px] text-slate-700">TỔNG OUT</td>
                    <td className="text-right text-[14px] font-mono tabular-nums text-slate-900 pr-2">{totalOut.toFixed(1)} kg</td>
                    <td className="text-right text-[12px] font-mono tabular-nums text-slate-500 pr-2">100%</td>
                    <td className="text-right text-[14px] font-mono tabular-nums text-emerald-700">{fmtNum(totalValue)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* ratio bar */}
            <div className="px-5 pb-5">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Phân bổ vật liệu</div>
              <div className="flex h-6 rounded-md overflow-hidden border border-slate-200">
                {outputs.map((o, i) => (
                  <div key={i} className={`flex items-center justify-center text-[10px] font-bold text-white ${
                    o.mat.includes('Đồng') ? 'bg-amber-700' :
                    o.mat.includes('Nhôm') ? 'bg-slate-400' :
                    o.mat.includes('Sắt')  ? 'bg-slate-700' :
                    o.mat.includes('Nhựa') ? 'bg-sky-500' : 'bg-red-400'
                  }`} style={{ width: `${o.pct}%` }}>
                    {o.pct >= 10 && <span>{o.pct.toFixed(0)}%</span>}
                  </div>
                ))}
              </div>
            </div>
          </HCard>
        </div>

        {/* RIGHT: balance check + actions */}
        <div className="col-span-3 space-y-4">
          {/* Balance gauge */}
          <HCard className="p-5">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-3">Mass Balance</div>
            <div className="relative w-full aspect-square">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" className="ring-bg" strokeWidth="8" fill="none"/>
                <circle cx="50" cy="50" r="42" stroke="#10B981" strokeWidth="8" fill="none"
                        strokeDasharray={`${balance/100*264} 264`} strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[34px] font-extrabold tabular-nums text-slate-900 leading-none font-mono">{balance.toFixed(1)}<span className="text-[16px] text-slate-500">%</span></div>
                <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold mt-1">✓ Cân bằng</div>
              </div>
            </div>
            <div className="mt-3 text-[11px] text-slate-500 text-center leading-relaxed">
              IN <b className="text-slate-900 font-mono">{totalIn.toFixed(1)}</b> kg = OUT <b className="text-slate-900 font-mono">{totalOut.toFixed(1)}</b> kg<br/>
              Hao hụt <b className="text-red-600 font-mono">2.8</b> kg ({(2.8/totalIn*100).toFixed(1)}%) — trong ngưỡng cho phép ≤10%
            </div>
          </HCard>

          {/* Value summary */}
          <HCard className="p-5 bg-emerald-700 text-white border-emerald-700">
            <div className="text-[10px] uppercase tracking-wider text-white/70 font-bold">Tổng giá trị thu hồi</div>
            <div className="text-[28px] font-extrabold tabular-nums leading-none mt-1 font-mono">{fmtVnd(totalValue)}</div>
            <div className="text-[11.5px] text-white/80 mt-1">Sau khi trừ collector + phí xử lý</div>
            <div className="mt-3 pt-3 border-t border-white/20 text-[11.5px] flex justify-between">
              <span className="text-white/70">Margin ước tính</span>
              <span className="font-mono font-bold">+18.4%</span>
            </div>
          </HCard>

          {/* Operator notes */}
          <HCard className="p-4">
            <HField label="Ghi chú vận hành">
              <textarea rows="3" placeholder="VD: Mô tơ #3 bị gỉ nặng, nhôm thu hồi thấp hơn dự kiến..."
                className="w-full text-[12.5px] p-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 outline-none resize-none"/>
            </HField>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
              <Icon.Shield size={12} className="text-emerald-600"/>
              Ghi chú lưu vào audit trail, không thể chỉnh sau khi xác nhận
            </div>
          </HCard>

          <HBtn variant="primaryLight" size="lg" className="w-full" onClick={()=>onNavigate('marketplace')}
                iconRight={Icon.ArrowRight}>
            Đăng bán đầu ra B2B
          </HBtn>
        </div>
      </div>
    </div>
  );
};

window.HDisassembly = HDisassembly;
