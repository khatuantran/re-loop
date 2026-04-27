import { useNavigate } from 'react-router-dom';
import {
  Btn,
  Card,
  Pill,
  IconArrowRight,
  IconBell,
  IconFactory,
  IconPackage,
  IconSettings,
  IconShield,
  IconTrendingUp,
  IconTruck,
} from '@reloop/ui';

const cards = [
  {
    id: 'receive',
    icon: IconTruck,
    title: 'Nhận hàng từ Collector',
    sub: 'Cân, kiểm tra, ghi nhận lô đầu vào',
    count: 4,
    tone: 'amber',
    cta: 'Mở danh sách lô chờ',
    to: '/',
  },
  {
    id: 'process',
    icon: IconFactory,
    title: 'Xử lý / Rã xác',
    sub: 'Phân loại, rã xác, mass balance',
    count: 2,
    tone: 'emerald',
    cta: 'Tiếp tục xử lý',
    highlight: true,
    to: '/disassembly',
  },
  {
    id: 'sell',
    icon: IconPackage,
    title: 'Đăng bán B2B',
    sub: 'Đưa lô đã xử lý lên Marketplace',
    count: 6,
    tone: 'slate',
    cta: 'Đăng lô mới',
    to: '/marketplace',
  },
];

const snapshot = [
  { l: 'Đã nhận', v: '1,2', u: 'tấn', change: '+12%', good: true },
  { l: 'Đã xử lý', v: '850', u: 'kg', change: '+8%', good: true },
  { l: 'Đã bán', v: '600', u: 'kg', change: '−4%', good: false },
  { l: 'Doanh thu', v: '12,4', u: 'triệu ₫', change: '+18%', good: true },
];

const recent = [
  { id: 'BAT-2026-0425-09', status: 'received', desc: '5 mô tơ điện · 40 kg', when: '08:42', from: 'Anh Tuấn #C-018' },
  { id: 'BAT-2026-0425-08', status: 'processing', desc: 'Carton hỗn hợp · 120 kg', when: '07:15', from: 'Chị Lan #C-021' },
  { id: 'BAT-2026-0425-07', status: 'listed', desc: 'Nhựa PET phân loại · 350 kg', when: 'Hôm qua', from: '—' },
  { id: 'BAT-2026-0425-06', status: 'sold', desc: 'Đồng phế liệu · 80 kg', when: 'Hôm qua', from: '— Cty Nam Phong' },
];

const STATUS_MAP = {
  received: { l: 'Đã nhận', tone: 'amber' },
  processing: { l: 'Đang xử lý', tone: 'green' },
  listed: { l: 'Đang bán', tone: 'slate' },
  sold: { l: 'Đã bán', tone: 'green' },
};

export default function HDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6 md:mb-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Pill tone="green">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-dot" /> Hoạt động
            </Pill>
            <Pill tone="dark">
              <IconShield size={11} /> Tier 2 — Verified KYB
            </Pill>
            <span className="text-[12px] text-slate-500 font-mono">#H-005</span>
          </div>
          <h1 className="text-[22px] md:text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Trạm xử lý Quận 7
          </h1>
          <div className="text-[12px] md:text-[13px] text-slate-500">
            214 Nguyễn Hữu Thọ, P. Tân Hưng, Q.7 · Thứ Sáu, 25/04/2026
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="secondary" radius="lg" icon={IconBell}>
            3 cảnh báo
          </Btn>
          <Btn variant="secondary" radius="lg" icon={IconSettings}>
            Cài đặt
          </Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
        {cards.map((c, i) => {
          const tones = {
            amber: {
              bg: 'bg-gradient-to-br from-amber-50 to-white',
              border: 'border-amber-200',
              iconBg: 'bg-amber-500',
              iconText: 'text-white',
              accent: 'text-amber-900',
              cta: 'text-amber-700',
              countBg: 'bg-red-500 text-white',
            },
            emerald: {
              bg: 'bg-gradient-to-br from-emerald-700 to-emerald-600',
              border: 'border-emerald-700',
              iconBg: 'bg-white/15',
              iconText: 'text-white',
              accent: 'text-white',
              cta: 'text-white',
              countBg: 'bg-amber-400 text-amber-950',
            },
            slate: {
              bg: 'bg-white',
              border: 'border-slate-200',
              iconBg: 'bg-slate-100',
              iconText: 'text-slate-700',
              accent: 'text-slate-900',
              cta: 'text-emerald-700',
              countBg: 'bg-emerald-500 text-white',
            },
          }[c.tone];
          const highlight = c.highlight;
          const I = c.icon;
          return (
            <button
              key={c.id}
              onClick={() => navigate(c.to)}
              className={`relative text-left rounded-2xl border-2 ${tones.bg} ${tones.border} p-5 md:p-6 lift overflow-hidden`}
              style={{ minHeight: 220 }}
            >
              {c.count > 0 && (
                <div
                  className={`absolute top-4 md:top-5 right-4 md:right-5 ${tones.countBg} rounded-full min-w-[28px] h-[28px] px-2 flex items-center justify-center text-[13px] font-extrabold tabular-nums`}
                >
                  {c.count}
                </div>
              )}
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${tones.iconBg} ${tones.iconText} flex items-center justify-center mb-4`}
              >
                <I size={26} />
              </div>
              <div
                className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${highlight ? 'text-white/70' : 'text-slate-500'}`}
              >
                Bước {i + 1}
              </div>
              <div
                className={`text-[18px] md:text-[20px] font-extrabold leading-tight mb-1.5 ${tones.accent}`}
              >
                {c.title}
              </div>
              <div
                className={`text-[12px] md:text-[12.5px] leading-relaxed mb-4 ${highlight ? 'text-white/80' : 'text-slate-500'}`}
              >
                {c.sub}
              </div>
              <div
                className={`inline-flex items-center gap-1.5 text-[13px] font-bold ${tones.cta}`}
              >
                {c.cta} <IconArrowRight size={16} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        <Card variant="hub" className="md:col-span-8 p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
            <div>
              <h2 className="text-[16px] font-bold text-slate-900">Snapshot hôm nay</h2>
              <div className="text-[12px] text-slate-500">
                Cập nhật lúc 14:32 · Tự động đồng bộ
              </div>
            </div>
            <Pill tone="green">
              <IconTrendingUp size={11} /> Trên TB tuần
            </Pill>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {snapshot.map((s) => (
              <div key={s.l} className="border-l-2 border-emerald-500 pl-4">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  {s.l}
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-[24px] md:text-[28px] font-extrabold text-slate-900 tabular-nums leading-none">
                    {s.v}
                  </span>
                  <span className="text-[11px] md:text-[12px] font-bold text-slate-500">
                    {s.u}
                  </span>
                </div>
                <div
                  className={`text-[11px] font-semibold mt-1 ${s.good ? 'text-emerald-600' : 'text-red-500'}`}
                >
                  {s.change} so với hôm qua
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                Throughput 7 ngày (kg)
              </div>
              <div className="text-[11px] text-slate-400 font-mono">avg ≈ 980 kg/ngày</div>
            </div>
            <div className="flex items-end gap-2 h-24">
              {[820, 940, 1100, 880, 1050, 990, 1200].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div
                    className="w-full bg-emerald-100 rounded-t-md relative"
                    style={{ height: `${v / 14}px` }}
                  >
                    <div
                      className={`absolute bottom-0 inset-x-0 ${i === 6 ? 'bg-emerald-500' : 'bg-emerald-300'} rounded-t-md`}
                      style={{ height: '100%' }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'][i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card variant="hub" className="md:col-span-4 p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-bold text-slate-900">Lô gần đây</h2>
            <button className="text-[12px] text-emerald-700 font-bold">Tất cả →</button>
          </div>
          <div className="space-y-2.5">
            {recent.map((r) => {
              const st = STATUS_MAP[r.status];
              return (
                <div
                  key={r.id}
                  className="flex items-start gap-3 pb-2.5 border-b border-slate-100 last:border-0 last:pb-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-mono text-slate-400 leading-tight">
                      {r.id}
                    </div>
                    <div className="text-[13px] font-semibold text-slate-900 truncate leading-tight mt-0.5">
                      {r.desc}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {r.from} · {r.when}
                    </div>
                  </div>
                  <Pill
                    tone={st.tone}
                    className="!text-[10px] !px-1.5 !py-0.5 shrink-0"
                  >
                    {st.l}
                  </Pill>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card variant="hub" className="mt-5 p-5 border-emerald-200 bg-emerald-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <IconTrendingUp size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-bold text-slate-900">
              Bạn đang ở Top 12% Hub được ưu tiên feed
            </div>
            <div className="text-[12px] md:text-[12.5px] text-slate-600">
              Duy trì throughput ≥ 800 kg/ngày để giữ thứ hạng. Hub Top được hiển thị trước trên
              Marketplace B2B.
            </div>
          </div>
          <Btn variant="primary" radius="lg" size="md" iconRight={IconArrowRight}>
            Xem báo cáo
          </Btn>
        </div>
      </Card>
    </div>
  );
}
