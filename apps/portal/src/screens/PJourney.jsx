import { Link } from 'react-router-dom';
import {
  Btn,
  Card,
  Pill,
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
  IconExternalLink,
  IconEye,
  IconImage,
  IconQrCode,
  IconShare,
  IconShield,
} from '@reloop/ui';

const milestones = [
  {
    n: 1, l: 'User', time: '08/04/2026 · 14:30', tone: 'amber',
    title: 'Người dùng chụp ảnh & đặt thu gom',
    avatar: 'U#8273',
    facts: [
      { k: 'Vị trí', v: 'Q.7, TP.HCM' },
      { k: 'Vật liệu', v: 'Nhựa PET ~3 kg' },
      { k: 'Anonymized ID', v: 'U-8273', mono: true },
    ],
    photos: 1,
  },
  {
    n: 2, l: 'Dispatch', time: '08/04/2026 · 14:42', tone: 'slate',
    title: 'Hệ thống gộp với 7 đơn khác → tạo route 8 điểm',
    facts: [
      { k: 'Mã chuyến', v: 'TR-2026-0408-0142', mono: true },
      { k: 'Số đơn', v: '8 đơn / 1 route' },
      { k: 'Thuật toán', v: 'OR-tools VRP, bán kính 1.4km' },
    ],
  },
  {
    n: 3, l: 'Collector', time: '08/04/2026 · 14:55', tone: 'sky',
    title: 'Collector check-in & cân thực',
    avatar: 'Anh Tuấn · #C-042 · ⭐4.8',
    facts: [
      { k: 'Cân thực', v: '3.2 kg', highlight: true },
      { k: 'GPS check-in', v: '10.7411° N, 106.7170° E', mono: true },
      { k: 'Ảnh có watermark', v: 'GPS + timestamp' },
    ],
    photos: 2,
  },
  {
    n: 4, l: 'Hub Q.7', time: '08/04/2026 · 16:20', tone: 'emerald',
    title: 'Quét QR & cân lại tại trạm',
    facts: [
      { k: 'Cân lại', v: '3.1 kg', highlight: true },
      { k: 'Lệch', v: '3% (≤5% pass)', good: true },
      { k: 'Mass Balance', v: '96% ✅', good: true },
    ],
  },
  {
    n: 5, l: 'Lô gộp', time: '12/04/2026 · 11:00', tone: 'emerald-dark',
    title: 'Đạt 500 kg → đăng B2B Marketplace',
    facts: [
      { k: 'Mã lô', v: 'CU-2026-0412', mono: true, highlight: true },
      { k: 'Số đơn gốc gộp', v: '47 đơn' },
      { k: 'Grade', v: 'A — tạp chất <2%' },
    ],
  },
  {
    n: 6, l: 'Nhà máy', time: '13/04/2026 · 09:30', tone: 'slate-dark',
    title: 'Nhà máy ABC thắng đấu giá kín',
    avatar: 'Recycler ABC · KYB Verified',
    facts: [
      { k: 'Giá thắng', v: '12,000 ₫/kg', highlight: true },
      { k: 'Vận đơn', v: 'VD-2026-0413', mono: true },
      { k: 'Xác nhận tái chế', v: '28/04/2026' },
    ],
  },
  {
    n: 7, l: 'ESG Impact', time: '28/04/2026', tone: 'amber-dark',
    title: 'Đóng vào báo cáo EPR cho nhãn hàng',
    facts: [
      { k: 'CO₂ giảm thải', v: '750 kg', highlight: true },
      { k: 'Đóng gói báo cáo', v: 'Unilever Vietnam Q2' },
      { k: 'Certificate', v: 'ESG-2026-Q2-X-0047', mono: true },
    ],
  },
];

const TONE_DOT = {
  amber: 'bg-amber-500',
  slate: 'bg-slate-500',
  sky: 'bg-sky-500',
  emerald: 'bg-emerald-500',
  'emerald-dark': 'bg-emerald-700',
  'slate-dark': 'bg-slate-800',
  'amber-dark': 'bg-amber-900',
};

export default function PJourney() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 md:py-6">
      <div className="flex items-center gap-2 text-[12px] mb-4 flex-wrap">
        <Link
          to="/esg"
          className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
        >
          <IconChevronLeft size={12} /> ESG Dashboard
        </Link>
        <IconChevronRight size={12} className="text-slate-300" />
        <span className="text-slate-500">Drill-down</span>
        <IconChevronRight size={12} className="text-slate-300" />
        <span className="font-mono font-bold text-slate-900">CU-2026-0412</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-5 md:mb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Pill tone="green">
              <IconShield size={11} /> Verified · Blockchain
            </Pill>
            <Pill tone="dark">
              <IconEye size={11} /> Anti-greenwashing
            </Pill>
          </div>
          <h1 className="text-[22px] md:text-[28px] font-extrabold text-slate-900 tracking-tight leading-tight">
            PET Journey · 500 kg → 750 kg CO₂ giảm
          </h1>
          <div className="text-[12px] md:text-[12.5px] text-slate-500">
            Mỗi milestone có chứng cứ riêng — không thể chỉnh sửa sau khi ghi sổ
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn variant="secondary" radius="lg" icon={IconShare}>
            Chia sẻ
          </Btn>
          <Btn variant="secondary" radius="lg" icon={IconDownload}>
            PDF
          </Btn>
          <Btn variant="dark" radius="lg" icon={IconQrCode}>
            QR public
          </Btn>
        </div>
      </div>

      <Card
        variant="hub"
        className="p-5 mb-5 md:mb-6 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white border-emerald-700"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {[
            { l: 'Khối lượng', v: '500', u: 'kg PET' },
            { l: 'Đơn gốc', v: '47', u: 'người dùng' },
            { l: 'Mass balance', v: '96', u: '% verified' },
            { l: 'CO₂ giảm', v: '750', u: 'kg' },
            { l: 'Thời gian', v: '20', u: 'ngày E2E' },
          ].map((s) => (
            <div
              key={s.l}
              className="md:border-l border-white/20 md:first:border-l-0 md:pl-4 md:first:pl-0"
            >
              <div className="text-[10px] uppercase tracking-wider text-white/70 font-bold">
                {s.l}
              </div>
              <div className="text-[24px] md:text-[28px] font-extrabold tabular-nums font-mono leading-none mt-1">
                {s.v}
              </div>
              <div className="text-[11px] text-white/80">{s.u}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="relative">
        <div className="absolute left-[28px] md:left-[36px] top-0 bottom-0 w-0.5 bg-emerald-500" />

        <div className="space-y-4 md:space-y-5 relative">
          {milestones.map((m, i) => {
            const dotColor = TONE_DOT[m.tone];
            const dark = m.tone.includes('dark');
            return (
              <div
                key={i}
                className="flex gap-3 md:gap-5 slide-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative z-10 shrink-0">
                  <div
                    className={`w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-full ${dotColor} text-white flex flex-col items-center justify-center shadow-lg ring-4 ring-[#F4F6F4]`}
                  >
                    <div className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold opacity-80 leading-none">
                      M{m.n}
                    </div>
                    <div className="text-[14px] md:text-[18px] font-extrabold leading-tight mt-0.5">
                      {m.l.length > 6 ? m.l.split(' ')[0] : m.l}
                    </div>
                  </div>
                </div>

                <Card
                  variant="hub"
                  className={`flex-1 min-w-0 p-4 md:p-5 ${
                    dark ? 'bg-slate-900 text-white border-slate-900' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <div
                        className={`text-[10px] uppercase tracking-wider font-bold mb-1 font-mono ${
                          dark ? 'text-emerald-300' : 'text-slate-400'
                        }`}
                      >
                        {m.time}
                      </div>
                      <div
                        className={`text-[14px] md:text-[16px] font-extrabold leading-tight ${
                          dark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {m.title}
                      </div>
                      {m.avatar && (
                        <div
                          className={`flex items-center gap-2 mt-2 ${
                            dark ? 'text-white/80' : 'text-slate-600'
                          } text-[12px]`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full ${
                              dark ? 'bg-white/15' : 'bg-emerald-100 text-emerald-700'
                            } flex items-center justify-center text-[10px] font-bold`}
                          >
                            {m.avatar.charAt(0)}
                          </div>
                          {m.avatar}
                        </div>
                      )}
                    </div>
                    {m.photos && (
                      <div className="flex gap-1.5 shrink-0">
                        {Array.from({ length: m.photos }).map((_, j) => (
                          <div
                            key={j}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-lg photo-ph border border-emerald-200 flex items-center justify-center relative overflow-hidden"
                          >
                            <IconImage size={18} className="text-emerald-700/40" />
                            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[7px] font-mono px-1 py-0.5 leading-none">
                              GPS✓ TS✓
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div
                    className={`grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t ${
                      dark ? 'border-white/15' : 'border-slate-100'
                    }`}
                  >
                    {m.facts.map((f, j) => (
                      <div key={j}>
                        <div
                          className={`text-[10px] uppercase tracking-wider font-bold ${
                            dark ? 'text-white/60' : 'text-slate-500'
                          }`}
                        >
                          {f.k}
                        </div>
                        <div
                          className={`text-[13.5px] font-bold mt-0.5 ${
                            f.highlight
                              ? dark
                                ? 'text-emerald-300'
                                : 'text-emerald-700'
                              : dark
                                ? 'text-white'
                                : 'text-slate-900'
                          } ${f.mono ? 'font-mono tabular-nums' : ''} ${f.good ? '!text-emerald-600' : ''}`}
                        >
                          {f.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <Card
        variant="hub"
        className="mt-5 md:mt-6 p-5 bg-emerald-50/50 border-emerald-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
            <IconShield size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-bold text-slate-900">
              7 milestones · 47 đơn gốc · 100% drill-downable
            </div>
            <div className="text-[12px] md:text-[12.5px] text-slate-600">
              Đây là chứng cứ "anti-greenwashing" cho audit Bộ TNMT, EU CBAM, ESG rating.
            </div>
          </div>
          <Btn variant="primary" radius="lg" iconRight={IconExternalLink}>
            Public certificate
          </Btn>
        </div>
      </Card>
    </div>
  );
}
