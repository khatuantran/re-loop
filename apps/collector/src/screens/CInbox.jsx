import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Pill,
  fmtNum,
  IconArrowRight,
  IconGavel,
  IconMapPin,
  IconRecycle,
  IconSparkles,
  IconZap,
} from '@reloop/ui';

const newOrders = [
  { id: 'D-2841', dist: '1.2 km', mat: 'Nhựa PET', kg: 5, fee: 45000, addr: '123 Nguyễn Thị Thập, Q.7', slot: '14:00 – 15:00', auction: false },
  { id: 'D-2842', dist: '2.4 km', mat: 'Carton + giấy', kg: 12, fee: 95000, addr: '78 Lê Văn Lương, Q.7', slot: '15:00 – 16:00', auction: false, hot: true },
  { id: 'D-2843', dist: '3.8 km', mat: 'Tủ lạnh cũ (cồng kềnh)', kg: 45, fee: 0, addr: '224 Huỳnh Tấn Phát, Q.7', slot: 'ASAP', auction: true, floor: 18000 },
  { id: 'D-2844', dist: '0.8 km', mat: 'Lon nhôm', kg: 3, fee: 28000, addr: '12 Phạm Hữu Lầu, Q.7', slot: '16:00 – 17:00', auction: false },
];
const running = [
  { id: 'D-2839', dist: '0.5 km', mat: 'Mô tơ điện', kg: 8, fee: 65000, addr: '45 Nguyễn Văn Linh, Q.7', step: 'Đang đến (3 phút)' },
];
const done = [
  { id: 'D-2837', dist: '1.1 km', mat: 'Carton', kg: 6, fee: 52000, addr: '99 Lê Văn Lương, Q.7', when: 'Hôm nay 11:24' },
  { id: 'D-2835', dist: '2.0 km', mat: 'Nhựa PET', kg: 4, fee: 38000, addr: '12 Nguyễn Thị Thập, Q.7', when: 'Hôm nay 09:55' },
  { id: 'D-2832', dist: '0.9 km', mat: 'Hỗn hợp', kg: 11, fee: 88000, addr: 'Hoa Sen Plaza, Q.7', when: 'Hôm qua' },
];

export default function CInbox() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('new');
  const counts = { new: newOrders.length, run: running.length, done: done.length };

  return (
    <div className="px-4 md:px-8 py-4 md:py-8 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 md:mb-6">
        <div className="min-w-0">
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">
            Đơn hàng
          </div>
          <h1 className="text-[22px] md:text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Chào anh Tuấn 👋
          </h1>
          <div className="text-[12px] md:text-[13px] text-slate-500">
            Có <b className="text-emerald-700">{counts.new} đơn mới</b> trong khu vực · Q.7,
            TP.HCM
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-6">
        {[
          { l: 'Hôm nay', v: '8', s: 'đơn hoàn tất', tone: 'emerald' },
          { l: 'Đã thu', v: '48 kg', s: '/ 200 kg quota ngày', tone: 'slate' },
          { l: 'Phí kiếm', v: '+412K', s: 'VNĐ', tone: 'amber' },
          { l: 'Đánh giá', v: '4.9', s: '12 đánh giá hôm nay', tone: 'sky' },
        ].map((s) => (
          <Card key={s.l} className="p-4 md:p-5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              {s.l}
            </div>
            <div
              className={`text-[24px] md:text-[32px] font-extrabold tabular-nums mt-1 leading-none ${
                s.tone === 'emerald'
                  ? 'text-emerald-700'
                  : s.tone === 'amber'
                    ? 'text-amber-600'
                    : s.tone === 'sky'
                      ? 'text-sky-700'
                      : 'text-slate-900'
              }`}
            >
              {s.v}
            </div>
            <div className="text-[11px] md:text-[11.5px] text-slate-500 mt-1.5">{s.s}</div>
          </Card>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-1.5 inline-flex gap-1 mb-5 overflow-x-auto no-scrollbar max-w-full">
        {[
          { id: 'new', l: 'Đơn mới', c: counts.new },
          { id: 'run', l: 'Đang chạy', c: counts.run },
          { id: 'done', l: 'Hoàn tất', c: counts.done },
        ].map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-[12.5px] md:text-[13px] font-bold transition-colors flex items-center gap-2 whitespace-nowrap ${
                active ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t.l}
              <span
                className={`text-[10.5px] font-mono px-1.5 py-0.5 rounded ${active ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}
              >
                {t.c}
              </span>
            </button>
          );
        })}
      </div>

      {tab === 'new' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {newOrders.map((o, i) => (
            <div
              key={o.id}
              className={`rounded-2xl bg-white border-2 ${
                o.auction ? 'border-amber-300' : 'border-slate-200'
              } p-4 md:p-5 slide-in hover:shadow-lg transition-shadow`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Pill tone={o.auction ? 'amber' : 'green'}>
                    {o.auction ? (
                      <>
                        <IconGavel size={11} /> Đấu giá
                      </>
                    ) : (
                      <>
                        <IconZap size={11} /> Speed
                      </>
                    )}
                  </Pill>
                  {o.hot && (
                    <Pill tone="red">
                      <IconSparkles size={11} /> Hot
                    </Pill>
                  )}
                  <span className="text-[11px] font-mono text-slate-400">{o.id}</span>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[18px] md:text-[20px] font-extrabold text-emerald-700 leading-none tabular-nums">
                    {o.dist}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">cách bạn</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <IconRecycle size={20} className="text-emerald-600 shrink-0" />
                <span className="text-[16px] md:text-[18px] font-bold text-slate-900 truncate">
                  {o.mat}
                </span>
                <span className="text-[14px] font-bold text-slate-500 tabular-nums ml-auto shrink-0">
                  ~{o.kg}kg
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[12px] md:text-[12.5px] text-slate-600 mb-4">
                <IconMapPin size={13} className="text-slate-400 shrink-0" />
                <span className="truncate flex-1">{o.addr}</span>
                <span className="text-slate-300 hidden sm:inline">·</span>
                <span className="font-bold whitespace-nowrap text-slate-700 hidden sm:inline">
                  {o.slot}
                </span>
              </div>

              {o.auction ? (
                <div className="flex items-center gap-3">
                  <div className="flex-1 px-3 py-2.5 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="text-[10px] text-amber-900 font-bold uppercase tracking-wider">
                      Giá sàn
                    </div>
                    <div className="text-[14px] md:text-[16px] font-extrabold text-amber-700 tabular-nums">
                      {fmtNum(o.floor)} ₫/kg
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/route')}
                    className="h-12 px-4 md:px-5 rounded-lg bg-amber-400 text-amber-950 font-extrabold text-[13px] md:text-[14px] flex items-center gap-2 shadow-[0_8px_20px_-6px_rgba(251,191,36,0.6)] shrink-0"
                  >
                    <IconGavel size={16} /> Đặt giá
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      Phí ước tính
                    </div>
                    <div className="text-[20px] md:text-[24px] font-extrabold text-emerald-700 tabular-nums leading-none">
                      +{fmtNum(o.fee)} ₫
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/route')}
                    className="h-12 px-4 md:px-5 rounded-lg bg-emerald-500 text-white font-extrabold text-[13px] md:text-[14px] flex items-center gap-2 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] shrink-0"
                  >
                    Nhận đơn <IconArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === 'run' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {running.map((o) => (
            <div
              key={o.id}
              className="rounded-2xl bg-white border-2 border-emerald-500 p-5 shadow-[0_12px_28px_-12px_rgba(16,185,129,0.4)]"
            >
              <Pill tone="green" className="mb-3">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-dot" /> {o.step}
              </Pill>
              <div className="flex items-center gap-2 mb-1">
                <IconRecycle size={20} className="text-emerald-600" />
                <span className="text-[18px] font-bold text-slate-900">{o.mat}</span>
                <span className="text-[14px] font-bold text-slate-500 tabular-nums ml-auto">
                  ~{o.kg}kg
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[12.5px] text-slate-600 mb-4">
                <IconMapPin size={13} className="text-slate-400" />
                <span className="truncate">{o.addr}</span>
              </div>
              <button
                onClick={() => navigate('/pickup')}
                className="w-full h-12 rounded-lg bg-emerald-700 text-white font-extrabold text-[14px] md:text-[15px] flex items-center justify-center gap-2"
              >
                Tiếp tục → Tại điểm <IconArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'done' && (
        <Card className="p-0 overflow-hidden">
          <div className="md:hidden divide-y divide-slate-100">
            {done.map((o) => (
              <div key={o.id} className="p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900">{o.mat}</div>
                  <div className="text-[11.5px] text-slate-500 truncate">{o.addr}</div>
                  <div className="text-[10.5px] font-mono text-slate-400">
                    {o.id} · {o.kg}kg · {o.when}
                  </div>
                </div>
                <div className="text-right shrink-0 font-extrabold text-emerald-700 tabular-nums">
                  +{fmtNum(o.fee)}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-5 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    Mã
                  </th>
                  <th className="text-left py-3 px-5 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    Vật liệu
                  </th>
                  <th className="text-left py-3 px-5 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    Địa chỉ
                  </th>
                  <th className="text-right py-3 px-5 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    KG
                  </th>
                  <th className="text-right py-3 px-5 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    Phí
                  </th>
                  <th className="text-right py-3 px-5 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    Khi nào
                  </th>
                </tr>
              </thead>
              <tbody>
                {done.map((o) => (
                  <tr
                    key={o.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="py-3 px-5 font-mono text-slate-500">{o.id}</td>
                    <td className="py-3 px-5 font-bold text-slate-900">{o.mat}</td>
                    <td className="py-3 px-5 text-slate-600">{o.addr}</td>
                    <td className="py-3 px-5 text-right tabular-nums font-bold">{o.kg}</td>
                    <td className="py-3 px-5 text-right tabular-nums font-extrabold text-emerald-700">
                      +{fmtNum(o.fee)} ₫
                    </td>
                    <td className="py-3 px-5 text-right text-slate-500">{o.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
