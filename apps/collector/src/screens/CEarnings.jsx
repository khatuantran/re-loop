import { useState } from 'react';
import {
  Btn,
  Card,
  Pill,
  fmtNum,
  IconArrowRight,
  IconCheck,
  IconChevronRight,
  IconClock,
  IconGavel,
  IconQrCode,
  IconRecycle,
  IconSearch,
  IconShare,
  IconSparkles,
  IconTrendingUp,
  IconWallet,
} from '@reloop/ui';

const days = [
  { d: 'T2', date: '19/04', n: 6, v: 285, peak: false },
  { d: 'T3', date: '20/04', n: 9, v: 425, peak: false },
  { d: 'T4', date: '21/04', n: 7, v: 320, peak: false },
  { d: 'T5', date: '22/04', n: 11, v: 540, peak: true },
  { d: 'T6', date: '23/04', n: 8, v: 412, peak: false },
  { d: 'T7', date: '24/04', n: 10, v: 478, peak: false },
  { d: 'CN', date: '25/04', n: 7, v: 380, peak: false, today: true },
];

const breakdown = [
  { l: 'Phí thu gom (cố định)', v: 1820, pct: 64, color: 'bg-emerald-500' },
  { l: 'Bonus đấu giá', v: 580, pct: 20, color: 'bg-amber-400' },
  { l: 'Bonus giờ cao điểm', v: 280, pct: 10, color: 'bg-sky-500' },
  { l: 'Tip từ khách', v: 160, pct: 6, color: 'bg-rose-400' },
];

const transactions = [
  { id: 'TX-2026-04250847', dt: '25/04 14:32', type: 'in', cat: 'Đơn D-2841', sub: 'Nhựa PET · 5kg · Q.7', amt: 45000, status: 'cleared' },
  { id: 'TX-2026-04250812', dt: '25/04 13:18', type: 'in', cat: 'Đơn D-2840', sub: 'Carton · 12kg · Q.7', amt: 95000, status: 'cleared' },
  { id: 'TX-2026-04250755', dt: '25/04 11:24', type: 'in', cat: 'Đơn D-2839', sub: 'Mô tơ điện · 8kg · Q.7', amt: 65000, status: 'cleared' },
  { id: 'TX-2026-04250701', dt: '25/04 09:55', type: 'bonus', cat: 'Bonus đấu giá', sub: 'Lô #L-2189 thắng', amt: 80000, status: 'cleared' },
  { id: 'TX-2026-04240935', dt: '24/04 18:12', type: 'in', cat: 'Đơn D-2832', sub: 'Hỗn hợp · 11kg · Q.7', amt: 88000, status: 'cleared' },
  { id: 'TX-2026-04240845', dt: '24/04 16:30', type: 'tip', cat: 'Tip từ khách', sub: 'Chị Mai · D-2830', amt: 20000, status: 'cleared' },
  { id: 'TX-2026-04240712', dt: '24/04 11:08', type: 'in', cat: 'Đơn D-2828', sub: 'Carton · 6kg · Q.7', amt: 52000, status: 'cleared' },
  { id: 'TX-2026-04230999', dt: '23/04 20:00', type: 'out', cat: 'Rút về MoMo', sub: 'Tài khoản ****1842', amt: -1500000, status: 'cleared' },
  { id: 'TX-2026-04230745', dt: '23/04 13:45', type: 'in', cat: 'Đơn D-2825', sub: 'Nhựa PET · 4kg · Q.4', amt: 38000, status: 'cleared' },
  { id: 'TX-2026-04230612', dt: '23/04 09:22', type: 'pending', cat: 'Đơn D-2823', sub: 'Đang giữ — chờ T+1', amt: 72000, status: 'pending' },
];

const typeMap = {
  in: { icon: IconRecycle, color: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-100' },
  bonus: { icon: IconGavel, color: 'bg-amber-100 text-amber-700', border: 'border-amber-100' },
  tip: { icon: IconSparkles, color: 'bg-rose-100 text-rose-600', border: 'border-rose-100' },
  out: { icon: IconArrowRight, color: 'bg-slate-100 text-slate-600', border: 'border-slate-100' },
  pending: { icon: IconClock, color: 'bg-slate-100 text-slate-500', border: 'border-slate-100' },
};

export default function CEarnings() {
  const [range, setRange] = useState('week');
  const [filter, setFilter] = useState('all');
  const maxV = Math.max(...days.map((d) => d.v));

  const filtered =
    filter === 'all'
      ? transactions
      : transactions.filter((t) => {
          if (filter === 'in') return t.type === 'in';
          if (filter === 'bonus') return t.type === 'bonus' || t.type === 'tip';
          if (filter === 'out') return t.type === 'out';
          return true;
        });

  return (
    <div className="px-4 md:px-8 py-4 md:py-8 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 md:mb-6">
        <div className="min-w-0">
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">
            Thu nhập
          </div>
          <h1 className="text-[22px] md:text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Tuần này: 2.840.000 ₫
          </h1>
          <div className="text-[12px] md:text-[13px] text-slate-500">
            58 đơn hoàn tất · TB <b className="text-slate-700">48.965 ₫/đơn</b> · top{' '}
            <b className="text-emerald-700">12% Q.7</b>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="ghost" size="md" icon={IconShare}>
            Xuất CSV
          </Btn>
          <Btn variant="primary" size="md" icon={IconWallet}>
            Rút tiền
          </Btn>
        </div>
      </div>

      <Card className="p-0 overflow-hidden mb-5 md:mb-6 bg-gradient-to-br from-emerald-700 to-emerald-500 border-emerald-700 text-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-7 p-5 md:p-6 md:border-r border-white/15">
            <div className="text-[11px] uppercase tracking-wider text-white/70 font-bold mb-1">
              Số dư khả dụng
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[36px] md:text-[44px] font-extrabold tabular-nums leading-none">
                1.420.000
              </span>
              <span className="text-[16px] md:text-[18px] font-bold text-white/80">₫</span>
            </div>
            <div className="text-[12px] text-white/70 flex items-center gap-2 mb-4">
              <IconClock size={12} /> Thanh toán tự động vào 20:00 hôm nay (T+0)
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button className="h-10 px-4 rounded-lg bg-white text-emerald-700 font-extrabold text-[13px] flex items-center gap-2 hover:bg-emerald-50">
                <IconWallet size={15} /> Rút về MoMo
              </button>
              <button className="h-10 px-4 rounded-lg bg-white/15 text-white font-bold text-[13px] flex items-center gap-2 hover:bg-white/25 backdrop-blur">
                <IconQrCode size={15} /> Rút về VietQR
              </button>
            </div>
          </div>
          <div className="md:col-span-5 p-5 md:p-6 grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold">
                Đang giữ (T+1)
              </div>
              <div className="text-[20px] md:text-[22px] font-extrabold tabular-nums mt-1">
                +412K
              </div>
              <div className="text-[10.5px] text-white/60 mt-0.5">8 đơn hôm nay</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold">
                Đã rút tháng
              </div>
              <div className="text-[20px] md:text-[22px] font-extrabold tabular-nums mt-1">
                7.5M
              </div>
              <div className="text-[10.5px] text-white/60 mt-0.5">5 lần rút</div>
            </div>
            <div className="col-span-2 pt-3 border-t border-white/15">
              <div className="text-[10px] uppercase tracking-wider text-white/60 font-bold mb-1.5">
                Tài khoản nhận mặc định
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-[10px] font-extrabold">
                  M
                </div>
                <div>
                  <div className="text-[13px] font-bold">MoMo · ****1842</div>
                  <div className="text-[11px] text-white/70">Tuấn Nguyễn · đã xác minh</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-6">
        {[
          { l: 'Hôm nay', v: '412K', s: '8 đơn · 4.9★', delta: '+12%', tone: 'emerald' },
          { l: 'Tuần này', v: '2.84M', s: '58 đơn · TB 48.9K', delta: '+8%', tone: 'amber' },
          { l: 'Tháng này', v: '11.2M', s: '246 đơn · 1.840 kg', delta: '+24%', tone: 'sky' },
          { l: 'Hiệu suất', v: '94%', s: '54/58 đơn 5 sao', delta: '+2pp', tone: 'rose' },
        ].map((s) => (
          <Card key={s.l} className="p-4 md:p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                {s.l}
              </div>
              <Pill tone="green">
                <IconTrendingUp size={10} /> {s.delta}
              </Pill>
            </div>
            <div
              className={`text-[24px] md:text-[32px] font-extrabold tabular-nums mt-1 leading-none ${
                s.tone === 'emerald'
                  ? 'text-emerald-700'
                  : s.tone === 'amber'
                    ? 'text-amber-600'
                    : s.tone === 'sky'
                      ? 'text-sky-700'
                      : 'text-rose-600'
              }`}
            >
              {s.v}
            </div>
            <div className="text-[11px] md:text-[11.5px] text-slate-500 mt-1.5">{s.s}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-5 md:mb-6">
        <Card className="md:col-span-8 p-5 md:p-6">
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Thu nhập theo ngày</div>
              <div className="text-[11.5px] text-slate-500">
                7 ngày gần nhất · cột vàng = ngày peak
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-1 inline-flex gap-0.5">
              {[
                ['week', 'Tuần'],
                ['month', 'Tháng'],
                ['ytd', 'Năm'],
              ].map(([id, l]) => (
                <button
                  key={id}
                  onClick={() => setRange(id)}
                  className={`px-3 py-1.5 rounded-md text-[11.5px] font-bold transition-colors ${
                    range === id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-[200px] md:h-[220px] flex items-end gap-2 md:gap-3 pb-8 border-b border-slate-100">
            <div className="absolute inset-x-0 top-0 bottom-8 pointer-events-none">
              {[0, 0.33, 0.66, 1].map((p, i) => (
                <div
                  key={i}
                  className="absolute inset-x-0 border-t border-dashed border-slate-100"
                  style={{ top: `${p * 100}%` }}
                />
              ))}
            </div>
            {days.map((d) => {
              const h = (d.v / maxV) * 100;
              return (
                <div
                  key={d.d}
                  className="flex-1 flex flex-col items-center justify-end relative group h-full"
                >
                  <div
                    className={`w-full rounded-t-lg transition-all duration-700 relative ${
                      d.today
                        ? 'bg-emerald-500'
                        : d.peak
                          ? 'bg-amber-400'
                          : 'bg-emerald-200'
                    }`}
                    style={{ height: `${h}%` }}
                  >
                    <div
                      className={`absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2 text-[10px] md:text-[10.5px] font-extrabold tabular-nums whitespace-nowrap ${
                        d.today
                          ? 'text-emerald-700'
                          : d.peak
                            ? 'text-amber-700'
                            : 'text-slate-500'
                      }`}
                    >
                      {d.v}K
                    </div>
                  </div>
                  <div
                    className={`absolute -bottom-1 text-center ${
                      d.today ? 'text-emerald-700 font-extrabold' : 'text-slate-500'
                    }`}
                  >
                    <div className="text-[10px] md:text-[11px] font-bold">{d.d}</div>
                    <div className="text-[8px] md:text-[9px] font-mono opacity-70">{d.date}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-3 text-[10.5px] md:text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-200" />
              <span className="text-slate-600">Bình thường</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-400" />
              <span className="text-slate-600">Peak</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-slate-600">Hôm nay</span>
            </div>
            <div className="flex-1 text-right text-slate-500 min-w-0">
              Tổng: <b className="text-slate-900 tabular-nums">2.840.000 ₫</b>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-4 p-5 md:p-6">
          <div className="text-[15px] font-bold text-slate-900">Cấu trúc thu nhập</div>
          <div className="text-[11.5px] text-slate-500 mb-5">Tuần này · phân tích nguồn</div>

          <div className="flex h-3 rounded-full overflow-hidden mb-4">
            {breakdown.map((b) => (
              <div key={b.l} className={b.color} style={{ width: `${b.pct}%` }} />
            ))}
          </div>

          <div className="space-y-3">
            {breakdown.map((b) => (
              <div key={b.l} className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-sm ${b.color} shrink-0`} />
                <span className="text-[12.5px] text-slate-700 flex-1 truncate">{b.l}</span>
                <span className="text-[12.5px] font-mono font-bold text-slate-500">{b.pct}%</span>
                <span className="text-[12.5px] font-extrabold text-slate-900 tabular-nums w-14 text-right">
                  {b.v}K
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11.5px] text-slate-500">Mục tiêu tuần (3M)</span>
              <span className="text-[11.5px] font-mono font-bold text-emerald-700">94.7%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                style={{ width: '94.7%' }}
              />
            </div>
            <div className="text-[11px] text-slate-500 mt-1.5">
              Còn <b className="text-slate-700">160K</b> nữa để đạt mục tiêu
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3 md:gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-bold text-slate-900">Lịch sử giao dịch</div>
            <div className="text-[11.5px] text-slate-500">
              {filtered.length} giao dịch · cập nhật real-time
            </div>
          </div>
          <div className="bg-slate-100 rounded-lg p-1 inline-flex gap-0.5 overflow-x-auto no-scrollbar max-w-full">
            {[
              ['all', 'Tất cả'],
              ['in', 'Phí'],
              ['bonus', 'Bonus'],
              ['out', 'Rút'],
            ].map(([id, l]) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-3 py-1.5 rounded-md text-[11.5px] font-bold transition-colors whitespace-nowrap ${
                  filter === id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button className="hidden md:flex h-9 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-[12px] font-bold text-slate-600 items-center gap-1.5">
            <IconSearch size={12} /> Tìm
          </button>
        </div>

        <div className="md:hidden divide-y divide-slate-100">
          {filtered.map((t) => {
            const m = typeMap[t.type];
            const I = m.icon;
            const isOut = t.amt < 0;
            const isPending = t.status === 'pending';
            return (
              <div key={t.id} className="px-4 py-3 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg ${m.color} border ${m.border} flex items-center justify-center shrink-0`}
                >
                  <I size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-slate-900 leading-tight">
                    {t.cat}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-tight truncate">{t.sub}</div>
                  <div className="text-[10.5px] text-slate-400 tabular-nums">{t.dt}</div>
                </div>
                <div className="text-right shrink-0">
                  <div
                    className={`text-[14px] font-extrabold tabular-nums ${
                      isOut
                        ? 'text-slate-700'
                        : isPending
                          ? 'text-amber-600'
                          : 'text-emerald-700'
                    }`}
                  >
                    {isOut ? '−' : '+'}
                    {fmtNum(Math.abs(t.amt))}
                  </div>
                  {isPending && (
                    <div className="text-[10px] text-amber-600 font-bold">Đang giữ</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60">
                <th className="text-left py-2.5 px-6 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">
                  Loại
                </th>
                <th className="text-left py-2.5 px-3 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">
                  Mô tả
                </th>
                <th className="text-left py-2.5 px-3 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">
                  Mã giao dịch
                </th>
                <th className="text-left py-2.5 px-3 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">
                  Thời gian
                </th>
                <th className="text-center py-2.5 px-3 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">
                  Trạng thái
                </th>
                <th className="text-right py-2.5 px-6 text-[10.5px] uppercase tracking-wider text-slate-500 font-bold">
                  Số tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const m = typeMap[t.type];
                const I = m.icon;
                const isOut = t.amt < 0;
                const isPending = t.status === 'pending';
                return (
                  <tr
                    key={t.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-emerald-50/20 transition-colors"
                  >
                    <td className="py-3 px-6">
                      <div
                        className={`w-9 h-9 rounded-lg ${m.color} border ${m.border} flex items-center justify-center`}
                      >
                        <I size={15} />
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-[13px] font-bold text-slate-900 leading-tight">
                        {t.cat}
                      </div>
                      <div className="text-[11px] text-slate-500 leading-tight">{t.sub}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-mono text-slate-500">{t.id}</span>
                    </td>
                    <td className="py-3 px-3 text-[12px] text-slate-600 tabular-nums">{t.dt}</td>
                    <td className="py-3 px-3 text-center">
                      {isPending ? (
                        <Pill tone="amber">
                          <IconClock size={10} /> Đang giữ
                        </Pill>
                      ) : (
                        <Pill tone="green">
                          <IconCheck size={10} /> Đã thanh toán
                        </Pill>
                      )}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <div
                        className={`text-[15px] font-extrabold tabular-nums ${
                          isOut
                            ? 'text-slate-700'
                            : isPending
                              ? 'text-amber-600'
                              : 'text-emerald-700'
                        }`}
                      >
                        {isOut ? '−' : '+'}
                        {fmtNum(Math.abs(t.amt))} ₫
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
          <span>Hiển thị {filtered.length} / 246 giao dịch tháng</span>
          <button className="font-bold text-emerald-700 flex items-center gap-1">
            Xem tất cả <IconChevronRight size={12} />
          </button>
        </div>
      </Card>
    </div>
  );
}
