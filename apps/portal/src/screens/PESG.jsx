import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Btn,
  Card,
  Pill,
  IconArrowRight,
  IconCoins,
  IconDownload,
  IconFilter,
  IconPackage,
  IconSearch,
  IconSend,
  IconShield,
  IconSparkles,
  IconTrees,
  IconTrendingUp,
} from '@reloop/ui';

const monthly = [38, 41, 39, 44, 47, 45, 49, 52, 48, 53, 51, 47];
const materials = [
  { l: 'PET', pct: 45, color: '#10B981' },
  { l: 'HDPE', pct: 22, color: '#3B82F6' },
  { l: 'Carton', pct: 18, color: '#F59E0B' },
  { l: 'Sắt', pct: 9, color: '#64748B' },
  { l: 'Khác', pct: 6, color: '#94A3B8' },
];
const topHubs = [
  { n: 'Trạm Q.7 — TP.HCM', kg: 3240 },
  { n: 'Trạm Thủ Đức', kg: 2180 },
  { n: 'Trạm Bình Dương', kg: 1890 },
  { n: 'Trạm Hà Đông — HN', kg: 1450 },
  { n: 'Trạm Bình Tân', kg: 1120 },
  { n: 'Trạm Q.12', kg: 980 },
  { n: 'Trạm Long Biên — HN', kg: 720 },
  { n: 'Trạm Đà Nẵng', kg: 580 },
  { n: 'Trạm Cát Lái', kg: 410 },
  { n: 'Trạm Cần Thơ', kg: 270 },
];
const lots = [
  { id: 'CU-2026-0412', mat: 'PET', kg: 500, hub: 'Q.7', date: '12/04', status: 'done' },
  { id: 'FE-2026-0398', mat: 'Sắt', kg: 1200, hub: 'TĐ', date: '08/04', status: 'processing' },
  { id: 'PE-2026-0405', mat: 'HDPE', kg: 280, hub: 'B.Tân', date: '14/04', status: 'done' },
  { id: 'PA-2026-0402', mat: 'Carton', kg: 850, hub: 'BD', date: '09/04', status: 'done' },
  { id: 'CU-2026-0411', mat: 'Cu', kg: 350, hub: 'Q.7', date: '21/04', status: 'shipped' },
  { id: 'AL-2026-0401', mat: 'Al', kg: 180, hub: 'HĐ', date: '18/04', status: 'done' },
];

const STATUS_MAP = {
  done: { l: 'Đã tái chế', tone: 'green', i: '✅' },
  processing: { l: 'Đang xử lý', tone: 'amber', i: '🔄' },
  shipped: { l: 'Vận chuyển', tone: 'slate', i: '🚚' },
};

export default function PESG() {
  const [period, setPeriod] = useState('Tháng 4/2026');
  const eprPct = 47;
  const eprTarget = 60;

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 md:py-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-5 md:mb-6 pb-4 md:pb-5 border-b border-slate-200">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center font-extrabold text-[18px] md:text-[20px] shrink-0">
            U
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">
                ESG / EPR Dashboard
              </span>
              <Pill tone="dark">
                <IconSparkles size={11} /> Premium
              </Pill>
              <Pill tone="green">
                <IconShield size={11} /> Audit-ready
              </Pill>
            </div>
            <h1 className="text-[22px] md:text-[26px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Unilever Vietnam
            </h1>
            <div className="text-[12px] md:text-[12.5px] text-slate-500">
              Báo cáo NĐ 08/2022/NĐ-CP · Q2/2026 · Bộ TNMT-ready
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-10 px-3 text-[13px] rounded-lg border border-slate-200 bg-white font-semibold outline-none"
          >
            <option>Tháng 4/2026</option>
            <option>Q1/2026</option>
            <option>Q2/2026</option>
          </select>
          <Btn variant="secondary" radius="lg" icon={IconDownload}>
            PDF
          </Btn>
          <Btn variant="secondary" radius="lg" icon={IconDownload}>
            Excel
          </Btn>
          <Btn variant="dark" radius="lg" icon={IconSend}>
            Nộp Bộ TNMT
          </Btn>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-6">
        <Card variant="hub" className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-1">
            <IconPackage size={14} className="text-slate-400" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              Khối lượng tái chế
            </span>
          </div>
          <div className="text-[24px] md:text-[32px] font-extrabold text-slate-900 font-mono tabular-nums leading-none mt-2">
            12,840 <span className="text-[14px] text-slate-500">kg</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            <Pill tone="green" className="!text-[10px] !px-1.5 !py-0">
              <IconTrendingUp size={9} /> +18%
            </Pill>
            <span className="text-[11px] text-slate-500">vs T3/2026</span>
          </div>
        </Card>

        <Card variant="hub" className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-1">
            <IconShield size={14} className="text-slate-400" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              Tỷ lệ EPR
            </span>
          </div>
          <div className="flex items-end gap-3 mt-2">
            <div className="text-[24px] md:text-[32px] font-extrabold text-emerald-700 font-mono tabular-nums leading-none">
              {eprPct}
              <span className="text-[14px] text-slate-500">%</span>
            </div>
            <div className="relative w-12 h-12 shrink-0">
              <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${(eprPct / 100) * 88} 88`}
                />
              </svg>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 mt-1.5">
            Mục tiêu 2026: <b className="text-slate-700 font-mono">{eprTarget}%</b>
          </div>
        </Card>

        <Card variant="hub" className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-1">
            <IconTrees size={14} className="text-slate-400" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              CO₂ giảm thải
            </span>
          </div>
          <div className="text-[24px] md:text-[32px] font-extrabold text-slate-900 font-mono tabular-nums leading-none mt-2">
            19.2 <span className="text-[14px] text-slate-500">tấn</span>
          </div>
          <div className="text-[11px] text-emerald-700 mt-1.5 font-semibold">
            ≈ 980 cây xanh / năm
          </div>
        </Card>

        <Card
          variant="hub"
          className="p-4 md:p-5 bg-gradient-to-br from-amber-50 to-white border-amber-200"
        >
          <div className="flex items-center gap-2 mb-1">
            <IconCoins size={14} className="text-amber-700" />
            <span className="text-[11px] uppercase tracking-wider text-amber-800 font-bold">
              Carbon credit
            </span>
          </div>
          <div className="text-[24px] md:text-[32px] font-extrabold text-amber-900 font-mono tabular-nums leading-none mt-2">
            $384 <span className="text-[14px] text-amber-700">USD</span>
          </div>
          <div className="text-[11px] text-amber-800 mt-1.5 flex items-center gap-1">
            <IconSparkles size={10} /> ~$30/tấn CO₂
          </div>
        </Card>
      </div>

      <Card
        variant="hub"
        className="p-4 mb-5 md:mb-6 border-amber-200 bg-amber-50/60 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center shrink-0">
          <IconSparkles size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-bold text-amber-900">
            Còn 13% nữa để đạt mục tiêu EPR Q2/2026
          </div>
          <div className="text-[12px] text-amber-800">
            Gợi ý: tăng mua PET (+1,800kg) — RE-LOOP có 4 lô PET Grade A đang mở
          </div>
        </div>
        <Link to="/">
          <Btn variant="primary" radius="lg" size="sm" iconRight={IconArrowRight}>
            Xem 4 lô gợi ý
          </Btn>
        </Link>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5 md:mb-6">
        <Card variant="hub" className="md:col-span-6 p-5">
          <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
            <div>
              <div className="text-[14px] font-bold text-slate-900">
                Tỷ lệ tái chế theo tháng
              </div>
              <div className="text-[11px] text-slate-500">12 tháng qua</div>
            </div>
            <Pill tone="green">
              <IconTrendingUp size={11} /> +9pt YoY
            </Pill>
          </div>
          <div className="relative h-44">
            <svg
              viewBox="0 0 480 160"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 40}
                  x2="480"
                  y2={i * 40}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                />
              ))}
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={monthly
                  .map((v, i) => `${i * (480 / 11)},${160 - (v - 30) * 4}`)
                  .join(' ')}
              />
              <polygon
                fill="url(#g)"
                opacity="0.3"
                points={`0,160 ${monthly
                  .map((v, i) => `${i * (480 / 11)},${160 - (v - 30) * 4}`)
                  .join(' ')} 480,160`}
              />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {monthly.map((v, i) => (
                <circle
                  key={i}
                  cx={i * (480 / 11)}
                  cy={160 - (v - 30) * 4}
                  r="3"
                  fill="#10B981"
                  stroke="white"
                  strokeWidth="1.5"
                />
              ))}
              <circle
                cx={(monthly.length - 1) * (480 / 11)}
                cy={160 - (monthly[monthly.length - 1] - 30) * 4}
                r="6"
                fill="#047857"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1 px-1">
            {['T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'T1', 'T2', 'T3', 'T4'].map(
              (m) => (
                <span key={m}>{m}</span>
              )
            )}
          </div>
        </Card>

        <Card variant="hub" className="md:col-span-3 p-5">
          <div className="text-[14px] font-bold text-slate-900 mb-1">Phân bổ vật liệu</div>
          <div className="text-[11px] text-slate-500 mb-3">Tháng 4/2026</div>
          <div className="relative w-32 h-32 mx-auto mb-3">
            <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
              {(() => {
                let off = 0;
                return materials.map((m, i) => {
                  const seg = (
                    <circle
                      key={i}
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={m.color}
                      strokeWidth="6"
                      strokeDasharray={`${(m.pct * 88) / 100} 88`}
                      strokeDashoffset={(-off * 88) / 100}
                    />
                  );
                  off += m.pct;
                  return seg;
                });
              })()}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[20px] font-extrabold text-slate-900 font-mono leading-none">
                12.8t
              </div>
              <div className="text-[9px] uppercase tracking-wider text-slate-500 font-bold mt-0.5">
                Tổng
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            {materials.map((m) => (
              <div key={m.l} className="flex items-center gap-2 text-[11.5px]">
                <span
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ background: m.color }}
                />
                <span className="font-semibold text-slate-700 flex-1">{m.l}</span>
                <span className="font-mono font-bold tabular-nums text-slate-900">
                  {m.pct}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="hub" className="md:col-span-3 p-5">
          <div className="text-[14px] font-bold text-slate-900 mb-1">Top 10 trạm</div>
          <div className="text-[11px] text-slate-500 mb-3">Theo khối lượng</div>
          <div className="space-y-2">
            {topHubs.map((h, i) => {
              const pct = (h.kg / topHubs[0].kg) * 100;
              return (
                <div key={h.n}>
                  <div className="flex items-center gap-2 text-[11px] mb-0.5">
                    <span className="w-4 text-right font-mono text-slate-400 tabular-nums">
                      {i + 1}
                    </span>
                    <span className="flex-1 truncate font-semibold text-slate-700">
                      {h.n.replace('Trạm ', '')}
                    </span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {(h.kg / 1000).toFixed(1)}t
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 ml-6 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card variant="hub" className="overflow-hidden">
        <div className="px-4 md:px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[15px] font-bold text-slate-900">
                Lô đã thu mua — tháng 4/2026
              </h2>
              <Pill tone="green">
                <IconShield size={11} /> Blockchain
              </Pill>
            </div>
            <div className="text-[11.5px] text-slate-500">
              Click "Drill-down" để xem PET Journey 7 milestones
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <IconSearch
                size={13}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Tìm mã lô…"
                className="h-9 pl-8 pr-3 text-[12px] rounded-lg border border-slate-200 outline-none w-48"
              />
            </div>
            <Btn variant="secondary" radius="lg" size="sm" icon={IconFilter}>
              Lọc
            </Btn>
          </div>
        </div>

        <div className="md:hidden divide-y divide-slate-100">
          {lots.map((l) => {
            const st = STATUS_MAP[l.status];
            return (
              <Link
                key={l.id}
                to="/journey"
                className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-mono font-bold text-slate-900 text-[12px] truncate">
                    {l.id}
                  </div>
                  <div className="text-[12px] text-slate-700">
                    {l.mat} · {l.kg.toLocaleString('vi-VN')} kg
                  </div>
                  <div className="text-[10.5px] text-slate-500">
                    Q. {l.hub} · {l.date}/2026
                  </div>
                </div>
                <Pill tone={st.tone} className="!text-[10px] !px-1.5 !py-0 shrink-0">
                  {st.i} {st.l}
                </Pill>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 font-bold">
              <tr>
                <th className="text-left px-5 py-2.5">Mã lô</th>
                <th className="text-left py-2.5">Loại</th>
                <th className="text-right py-2.5">Khối lượng</th>
                <th className="text-left py-2.5">Trạm</th>
                <th className="text-left py-2.5">Ngày</th>
                <th className="text-left py-2.5">Đơn gốc</th>
                <th className="text-left py-2.5">CO₂ giảm</th>
                <th className="text-left py-2.5">Status</th>
                <th className="text-right py-2.5 pr-5"></th>
              </tr>
            </thead>
            <tbody>
              {lots.map((l) => {
                const st = STATUS_MAP[l.status];
                return (
                  <tr
                    key={l.id}
                    className="border-t border-slate-100 hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="px-5 py-3 font-mono font-bold text-slate-900 text-[12px]">
                      {l.id}
                    </td>
                    <td className="text-[12.5px] font-semibold text-slate-700">{l.mat}</td>
                    <td className="text-right font-mono font-bold tabular-nums text-slate-900 text-[12.5px]">
                      {l.kg.toLocaleString('vi-VN')} kg
                    </td>
                    <td className="text-[12px] text-slate-700">Q. {l.hub}</td>
                    <td className="text-[12px] font-mono text-slate-500">{l.date}/2026</td>
                    <td className="text-[12px] font-mono text-slate-500">
                      {Math.round(l.kg / 8)} đơn
                    </td>
                    <td className="text-[12px] font-mono text-emerald-700 font-bold">
                      {((l.kg * 1.5) / 1000).toFixed(2)}t
                    </td>
                    <td>
                      <Pill tone={st.tone} className="!text-[10px] !px-1.5 !py-0">
                        {st.i} {st.l}
                      </Pill>
                    </td>
                    <td className="text-right pr-5">
                      <Link
                        to="/journey"
                        className="text-[11.5px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 ml-auto"
                      >
                        Drill-down <IconArrowRight size={11} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-5 py-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
          <span>Hiển thị 6 / 47 lô</span>
          <button className="font-bold text-emerald-700">Xem tất cả →</button>
        </div>
      </Card>
    </div>
  );
}
