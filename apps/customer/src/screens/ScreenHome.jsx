import { Link } from 'react-router-dom';
import {
  Btn,
  Card,
  Pill,
  Spark,
  useCountUp,
  fmtNum,
  IconArrowRight,
  IconCamera,
  IconChevronRight,
  IconCoins,
  IconGavel,
  IconMapPin,
  IconRecycle,
  IconStar,
  IconTrees,
  IconTrendingUp,
} from '@reloop/ui';
import {
  collectorsNearby,
  recentHistory,
  mapPins,
  sparkData,
  voucherTiles,
} from '../data/home.js';

export default function ScreenHome() {
  const points = useCountUp(1250, 900);
  const co2 = useCountUp(12.4, 1100);
  const trees = useCountUp(0.6, 1100);

  return (
    <div className="px-4 md:px-8 py-4 md:py-8 max-w-[1280px] mx-auto">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 md:mb-6">
        <div>
          <div className="text-[12px] uppercase tracking-wider text-slate-500 font-bold">
            Trang chủ
          </div>
          <h1 className="text-[22px] md:text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Xin chào, Minh Anh 👋
          </h1>
          <div className="text-[12px] md:text-[13px] text-slate-500">
            Q.7, TP.HCM · 28°C, nắng nhẹ · Thứ Sáu 25/04/2026
          </div>
        </div>
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-[12px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot" />
            +23 đơn hôm nay tại Q.7
          </span>
        </div>
      </div>

      {/* HERO band */}
      <Card className="p-0 overflow-hidden mb-5 md:mb-6 bg-gradient-to-br from-emerald-700 to-emerald-500 border-emerald-700 text-white">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-7 p-6 md:p-8">
            <div className="text-[12px] uppercase tracking-wider text-white/70 font-bold mb-2">
              Đặt thu gom
            </div>
            <div className="text-[24px] md:text-[34px] leading-[1.1] font-extrabold tracking-tight mb-2">
              Rác của bạn — chúng tôi đến tận nơi.
            </div>
            <div className="text-white/80 text-[13px] md:text-[14px] mb-5 max-w-md">
              Chụp ảnh, AI báo giá ngay. 5 collector đang trong 3km. Trung bình 18 phút có người tới.
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/flow-a">
                <Btn
                  variant="primarySolid"
                  size="lg"
                  className="!bg-white !text-emerald-700 hover:!bg-emerald-50"
                  iconRight={IconArrowRight}
                >
                  Đặt lịch Thu gom
                </Btn>
              </Link>
              <Link to="/flow-b">
                <Btn variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
                  Bán đồ điện tử cũ →
                </Btn>
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 relative bg-emerald-800/30 p-4 md:p-6 flex items-center">
            <div className="w-full h-[180px] rounded-xl map-grid map-roads relative overflow-hidden border border-white/10">
              <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute inset-0 ping-slow rounded-full bg-emerald-300/50 w-12 h-12 -m-4" />
                  <div className="relative w-4 h-4 rounded-full bg-white border-[3px] border-emerald-600" />
                </div>
                {mapPins.map((p, i) => (
                  <div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-full"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <div className="bg-white rounded-md px-1.5 py-0.5 shadow text-[10px] font-bold text-slate-700 font-mono">
                      {p.e}'
                    </div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mx-auto border border-white -mt-0.5" />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-2 left-2 bg-white/95 rounded-md px-2 py-1 text-[10px] font-bold text-slate-700 flex items-center gap-1">
                <IconMapPin size={10} /> 5 collector trong 3km
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stat row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-5 md:mb-6">
        {/* Wallet */}
        <Card className="md:col-span-5 p-5 md:p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              Ví Green Points
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
              <IconCoins size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-[32px] md:text-[40px] font-extrabold tracking-tight text-slate-900 tabular-nums leading-none">
              {fmtNum(Math.floor(points))}
            </span>
            <span className="text-[14px] font-semibold text-amber-500">điểm</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11.5px] text-slate-500 mb-1.5">
              <span>
                Còn <b className="text-slate-700">250</b> điểm để nhận voucher 50K
              </span>
              <span className="font-mono">1250 / 1500</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-300 to-amber-500"
                style={{ width: '83.3%' }}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {voucherTiles.map((v) => (
              <button
                key={v.label}
                className={`rounded-lg border ${v.tone} px-2.5 py-2 text-left lift`}
              >
                <div className="text-[10.5px] font-semibold opacity-80">{v.label}</div>
                <div className="text-[14px] font-extrabold leading-none mt-0.5">{v.sub}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Carbon */}
        <Card className="md:col-span-4 p-5 md:p-6">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              Dấu chân Carbon
            </div>
            <Pill tone="green">
              <IconTrendingUp size={11} /> +18%
            </Pill>
          </div>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-[32px] md:text-[40px] font-extrabold text-emerald-700 tabular-nums leading-none">
              {fmtNum(co2, 1)}
            </span>
            <span className="text-[14px] font-semibold text-slate-500">kg CO₂ giảm</span>
          </div>
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100">
            <IconTrees size={20} className="text-emerald-600" />
            <div className="text-[12px] text-emerald-800">
              ≈ <b>{fmtNum(trees, 1)} cây xanh</b> trồng mới
            </div>
          </div>
          <div className="mt-3">
            <Spark data={sparkData} width={260} height={56} />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
              {['T11', 'T12', 'T1', 'T2', 'T3', 'T4'].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick actions */}
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-1 gap-3">
          <Link
            to="/flow-a"
            className="h-[78px] rounded-xl bg-white border border-slate-200 hover:border-emerald-300 px-4 flex items-center gap-3 lift text-left"
          >
            <div className="w-11 h-11 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <IconCamera size={20} />
            </div>
            <div className="min-w-0">
              <div className="text-[13.5px] font-bold text-slate-900">Đặt thu gom</div>
              <div className="text-[11px] text-slate-500 truncate">Chụp ảnh + AI báo giá</div>
            </div>
          </Link>
          <Link
            to="/flow-b"
            className="h-[78px] rounded-xl bg-white border border-slate-200 hover:border-emerald-300 px-4 flex items-center gap-3 lift text-left"
          >
            <div className="w-11 h-11 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <IconGavel size={20} />
            </div>
            <div className="min-w-0">
              <div className="text-[13.5px] font-bold text-slate-900">Bán đồ cũ</div>
              <div className="text-[11px] text-slate-500 truncate">Đấu giá đồ điện tử</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Collectors + History */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        <Card className="md:col-span-7 p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Collector gần bạn</div>
              <div className="text-[11.5px] text-slate-500">
                5 người trong bán kính 3km · cập nhật real-time
              </div>
            </div>
            <button className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">
              <span className="hidden sm:inline">Xem tất cả</span>
              <IconChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {collectorsNearby.map((c) => (
              <div
                key={c.name}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 lift cursor-pointer flex items-center gap-3"
              >
                <div
                  className={`w-11 h-11 rounded-full ${c.color} flex items-center justify-center font-extrabold text-base shrink-0`}
                >
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-bold text-slate-900 truncate">{c.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <IconStar size={10} className="text-amber-400" style={{ fill: '#fbbf24' }} />
                    {c.rating} · {c.distance}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[14px] font-extrabold text-emerald-700 tabular-nums leading-none">
                    {c.eta}'
                  </div>
                  <div className="text-[10px] text-slate-400">ETA</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="md:col-span-5 p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Lịch sử gần đây</div>
              <div className="text-[11.5px] text-slate-500">Click để xem certificate</div>
            </div>
            <Link to="/cert" className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">
              Tất cả <IconChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {recentHistory.map((h, i) => (
              <Link
                key={h.id}
                to={i === 0 ? '/cert' : '#'}
                className="p-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 flex items-center gap-3 cursor-pointer transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                  <IconRecycle size={16} className="text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-slate-900 truncate">{h.mat}</div>
                  <div className="text-[10.5px] text-slate-400 font-mono truncate">{h.id}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-extrabold text-amber-600 tabular-nums">+{h.pts}</div>
                  <div className="text-[10px] text-slate-400">
                    {h.kg} kg · {h.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
