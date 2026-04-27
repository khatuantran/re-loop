import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Btn,
  Card,
  Pill,
  IconCheck,
  IconClock,
  IconGavel,
  IconInfo,
  IconLoader,
  IconStar,
  IconTrendingUp,
} from '@reloop/ui';

const BIDS = [
  { name: 'Anh Tuấn', avatar: 'T', rating: 4.8, price: 22000, eta: 35, jobs: 412, since: '2 năm' },
  { name: 'Chị Lan', avatar: 'L', rating: 4.6, price: 25000, eta: 50, jobs: 289, since: '1 năm', best: true },
  { name: 'Anh Hùng', avatar: 'H', rating: 4.9, price: 20000, eta: 25, jobs: 678, since: '3 năm' },
];

export default function ScreenAuction() {
  const navigate = useNavigate();
  const [time, setTime] = useState(30 * 60);
  const [bidsShown, setBidsShown] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setTime((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setBidsShown(1), 800);
    const t2 = setTimeout(() => setBidsShown(2), 2400);
    const t3 = setTimeout(() => setBidsShown(3), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const mm = String(Math.floor(time / 60)).padStart(2, '0');
  const ss = String(time % 60).padStart(2, '0');
  const sorted = [...BIDS].sort((a, b) => b.price - a.price);

  return (
    <div className="px-4 md:px-8 py-4 md:py-8 max-w-[1280px] mx-auto">
      <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white p-5 md:p-6 mb-5 md:mb-6 shadow-[0_18px_40px_-18px_rgba(251,191,36,0.5)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
          <div className="md:col-span-4">
            <Pill tone="white" className="!text-amber-700 mb-3">
              <IconGavel size={11} /> Auction Mode
            </Pill>
            <div className="text-[11px] uppercase tracking-wider text-white/70 font-bold">
              Còn lại
            </div>
            <div className="text-[44px] md:text-[56px] font-extrabold tabular-nums leading-none font-mono">
              {mm}:{ss}
            </div>
            <div className="text-[12px] text-white/80 mt-2">
              Tủ lạnh Sanyo 150L · 1 món · Giá sàn 18.000 ₫/kg
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="bg-white/15 backdrop-blur rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-emerald-300 rounded-full pulse-dot" />
                <div className="text-[12.5px] font-bold">
                  Đang gửi đến 14 Collector trong 10km
                </div>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-300 transition-all"
                  style={{ width: `${(bidsShown / 3) * 100}%` }}
                />
              </div>
              <div className="text-[11px] text-white/80 mt-1.5 font-mono">
                {bidsShown}/3 báo giá nhận được
              </div>
            </div>
          </div>
          <div className="md:col-span-3 md:text-right">
            <button
              onClick={() => navigate('/flow-b')}
              className="text-[12px] text-white/80 hover:text-white underline"
            >
              ← Đổi chế độ
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        <div className="md:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[16px] md:text-[18px] font-extrabold text-slate-900">
                Báo giá nhận được
              </div>
              <div className="text-[11.5px] md:text-[12px] text-slate-500">
                Sắp xếp theo giá cao nhất · click "Chọn" để chốt
              </div>
            </div>
            <button className="text-[12px] text-slate-500 font-bold flex items-center gap-1">
              Sắp xếp ↓
            </button>
          </div>

          <div className="space-y-3">
            {sorted.map((b, idx) => {
              const visible = idx < bidsShown;
              if (!visible) {
                if (idx === bidsShown) {
                  return (
                    <div
                      key={`empty-${idx}`}
                      className="rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 p-5 flex items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                        <IconLoader size={20} className="animate-spin" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-bold text-slate-600">
                          Đang chờ Collector phản hồi...
                        </div>
                        <div className="text-[12px] text-slate-400">
                          Trung bình mất 8–12 phút
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={`empty-${idx}`}
                    className="rounded-2xl border border-slate-200 bg-white/40 p-5 flex items-center gap-4 opacity-50"
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="h-3 w-32 bg-slate-100 rounded mb-2" />
                      <div className="h-2.5 w-24 bg-slate-100 rounded" />
                    </div>
                  </div>
                );
              }

              const isSel = selected === idx;
              return (
                <div
                  key={b.name}
                  className={`slide-in rounded-2xl border bg-white p-4 md:p-5 transition-all ${
                    isSel
                      ? 'border-amber-400 shadow-[0_18px_40px_-18px_rgba(251,191,36,0.5)]'
                      : b.best
                        ? 'border-amber-200'
                        : 'border-slate-200'
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg md:text-xl shrink-0">
                      {b.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[15px] md:text-[16px] font-bold text-slate-900">
                          {b.name}
                        </span>
                        {b.best && (
                          <Pill tone="amber">
                            <IconTrendingUp size={11} /> Cao nhất
                          </Pill>
                        )}
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 text-[11.5px] md:text-[12px] text-slate-500 mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <IconStar size={11} className="text-amber-400" style={{ fill: '#fbbf24' }} />
                          {b.rating}
                        </span>
                        <span>·</span>
                        <span>{b.jobs} đơn</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="hidden sm:inline">{b.since} kinh nghiệm</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-slate-500 mt-1">
                        <IconClock size={12} /> ETA <b className="text-slate-700">{b.eta} phút</b>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[20px] md:text-[24px] font-extrabold text-slate-900 tabular-nums leading-none">
                        {b.price.toLocaleString('vi-VN')}
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold mt-0.5">VNĐ / kg</div>
                      <Btn
                        variant={isSel ? 'primarySolid' : 'primary'}
                        size="sm"
                        className="mt-3"
                        onClick={() => {
                          setSelected(idx);
                          setTimeout(() => navigate('/tracking'), 600);
                        }}
                      >
                        {isSel ? (
                          <>
                            <IconCheck size={14} /> Đã chọn
                          </>
                        ) : (
                          'Chọn'
                        )}
                      </Btn>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-4 space-y-4">
          <Card className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">
              Mặt hàng đấu giá
            </div>
            <div className="aspect-video rounded-xl photo-ph border border-slate-200 mb-3" />
            <div className="text-[14px] font-bold text-slate-900">Tủ lạnh Sanyo 150L</div>
            <div className="text-[12px] text-slate-500 mt-0.5">
              Hỏng máy nén · ~40 kg · Lầu 3
            </div>
          </Card>

          <Card className="p-5 bg-emerald-50 border-emerald-100">
            <div className="flex items-start gap-2.5">
              <IconInfo size={16} className="text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-[12px] text-emerald-900 leading-relaxed">
                Có thể chọn ngay khi xuất hiện báo giá đầu tiên — không cần chờ hết 30 phút.
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-3">
              Thống kê khu vực
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-[12.5px]">
                <span className="text-slate-500">Giá trung bình tuần</span>
                <span className="font-bold tabular-nums">22.500 ₫/kg</span>
              </div>
              <div className="flex justify-between text-[12.5px]">
                <span className="text-slate-500">Auction khu vực</span>
                <span className="font-bold tabular-nums">+18 hôm nay</span>
              </div>
              <div className="flex justify-between text-[12.5px]">
                <span className="text-slate-500">Tỷ lệ nhận đủ 3 bid</span>
                <span className="font-bold tabular-nums">87%</span>
              </div>
            </div>
          </Card>

          <button className="w-full h-11 text-[13px] text-slate-500 font-bold border border-slate-200 rounded-lg hover:bg-slate-50">
            Hủy phiên đấu giá
          </button>
        </div>
      </div>
    </div>
  );
}
