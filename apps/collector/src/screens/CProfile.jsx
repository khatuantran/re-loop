import {
  Card,
  Pill,
  IconArrowRight,
  IconBell,
  IconCamera,
  IconCheck,
  IconCheckCircle,
  IconChevronRight,
  IconClock,
  IconGavel,
  IconInfo,
  IconLeaf,
  IconPackage,
  IconRecycle,
  IconSettings,
  IconShare,
  IconShield,
  IconSparkles,
  IconStar,
  IconTrendingUp,
  IconTruck,
  IconZap,
} from '@reloop/ui';

const tier = { current: 'Tier 2 — Pro', next: 'Tier 3 — Elite', progress: 72, ordersToNext: 84 };

const stats = [
  { l: 'Tổng đơn', v: '2.847', s: 'từ 03/2024', icon: IconPackage, tone: 'emerald' },
  { l: 'Đánh giá TB', v: '4.92', s: '892 lượt 5★ (94%)', icon: IconStar, tone: 'amber' },
  { l: 'Tổng KG thu', v: '18.4t', s: 'tương đương 920 cây', icon: IconRecycle, tone: 'sky' },
  { l: 'Tỷ lệ hoàn', v: '98.6%', s: '4 hủy / 247 tháng', icon: IconCheckCircle, tone: 'rose' },
];

const badges = [
  { l: 'Top 10% Q.7', sub: 'Tháng 4/2026', icon: IconTrendingUp, color: 'from-emerald-500 to-emerald-700' },
  { l: '500 đơn 5★', sub: 'Đạt 18/04/2026', icon: IconStar, color: 'from-amber-400 to-amber-600' },
  { l: 'Eco Champion', sub: '10 tấn nhựa thu', icon: IconLeaf, color: 'from-emerald-400 to-teal-600' },
  { l: 'Speed Master', sub: 'ETA TB <20 phút', icon: IconZap, color: 'from-sky-400 to-sky-600' },
  { l: 'Auction Pro', sub: '50 lô đấu thắng', icon: IconGavel, color: 'from-rose-400 to-rose-600' },
  { l: 'Năm thứ 2', sub: 'Cùng RE-LOOP', icon: IconSparkles, color: 'from-violet-400 to-violet-600' },
];

const docs = [
  { l: 'CCCD', sub: '0790****1842', status: 'verified', exp: 'Hết hạn 12/2031' },
  { l: 'Bằng lái xe A1', sub: 'B279****5102', status: 'verified', exp: 'Hết hạn 08/2028' },
  { l: 'Đăng ký xe Honda Wave', sub: '59-X1 ****', status: 'verified', exp: '—' },
  { l: 'Hợp đồng RE-LOOP', sub: 'CT-2024-0312', status: 'verified', exp: 'Vô thời hạn' },
  { l: 'Bảo hiểm xe', sub: 'PVI · ****8821', status: 'expiring', exp: 'Hết hạn 15/06/2026' },
];

const skills = [
  { l: 'Vận chuyển cồng kềnh', enabled: true, desc: 'Đồ điện tử, tủ lạnh' },
  { l: 'Cân điện tử cá nhân', enabled: true, desc: 'Có cân ±10g chính xác' },
  { l: 'Xe có thùng kín', enabled: true, desc: '500L · chống mưa' },
  { l: 'Ngoại ngữ (EN)', enabled: false, desc: 'Khách quốc tế' },
];

const reviews = [
  { name: 'Chị Minh Anh', stars: 5, when: '2 ngày trước', text: 'Anh đến đúng giờ, cân chính xác, thái độ rất nhiệt tình. Sẽ đặt lại lần sau.' },
  { name: 'Anh Đức', stars: 5, when: '4 ngày trước', text: 'Lấy đồ nặng giúp luôn không phàn nàn. 10 điểm.' },
  { name: 'Cô Hà', stars: 4, when: '1 tuần trước', text: 'Tốt, chỉ cần báo trước 5 phút khi đến là hoàn hảo.' },
];

export default function CProfile() {
  return (
    <div className="px-4 md:px-8 py-4 md:py-8 max-w-[1440px] mx-auto">
      <Card className="p-0 overflow-hidden mb-5 md:mb-6">
        <div className="h-32 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500 relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 30%, white 1px, transparent 1px)',
              backgroundSize: '60px 60px, 80px 80px',
            }}
          />
          <div className="absolute top-3 md:top-4 right-3 md:right-4 flex gap-2">
            <button className="hidden sm:flex h-9 px-3 rounded-lg bg-white/15 backdrop-blur text-white text-[12px] font-bold items-center gap-1.5 hover:bg-white/25">
              <IconShare size={13} /> Chia sẻ
            </button>
            <button className="h-9 px-3 rounded-lg bg-white text-emerald-700 text-[12px] font-bold flex items-center gap-1.5">
              <IconSettings size={13} /> Chỉnh sửa
            </button>
          </div>
        </div>

        <div className="px-4 md:px-6 pb-6 pt-0 -mt-14 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-end">
          <div className="md:col-span-3 flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-[36px] md:text-[44px] border-[5px] border-white shadow-md">
                T
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-emerald-500 border-[3px] border-white flex items-center justify-center">
                <IconCheckCircle size={16} className="text-white" />
              </div>
            </div>
            <div className="mt-3 text-center">
              <div className="text-[16px] md:text-[18px] font-extrabold text-slate-900 tracking-tight">
                Anh Tuấn Nguyễn
              </div>
              <div className="text-[11px] text-slate-500 font-mono">#C-018 · Q.7, TP.HCM</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <IconStar size={12} className="text-amber-400" style={{ fill: '#fbbf24' }} />
                <span className="text-[12.5px] font-bold text-slate-700">4.92</span>
                <span className="text-[11px] text-slate-400">· 2,847 đơn</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white">
                <IconSparkles size={18} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  Hạng hiện tại
                </div>
                <div className="text-[16px] md:text-[18px] font-extrabold text-amber-900 leading-none">
                  {tier.current}
                </div>
              </div>
              <Pill tone="amber" className="ml-auto">
                +15% phí
              </Pill>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-amber-900">
                  Tiến tới <b>{tier.next}</b>
                </span>
                <span className="font-mono font-bold text-amber-900">{tier.progress}%</span>
              </div>
              <div className="h-2.5 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                  style={{ width: `${tier.progress}%` }}
                />
              </div>
              <div className="text-[11px] text-amber-800 mt-1.5">
                Còn <b>{tier.ordersToNext} đơn</b> & duy trì 4.85★ trong 30 ngày
              </div>
            </div>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-2">
            {[
              ['Email', 'tuan.n@***.com'],
              ['SĐT', '090 8***842'],
              ['Tham gia', '12/03/2024'],
              ['Khu vực', 'Q.7, Q.4, Q.8'],
            ].map(([k, v]) => (
              <div key={k} className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5">
                <div className="text-[9.5px] uppercase tracking-wider text-slate-400 font-bold">
                  {k}
                </div>
                <div className="text-[12px] font-bold text-slate-700 truncate">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5 md:mb-6">
        {stats.map((s) => {
          const I = s.icon;
          const tones = {
            emerald: ['bg-emerald-50 border-emerald-100', 'text-emerald-600', 'text-emerald-700'],
            amber: ['bg-amber-50 border-amber-100', 'text-amber-600', 'text-amber-600'],
            sky: ['bg-sky-50 border-sky-100', 'text-sky-600', 'text-sky-700'],
            rose: ['bg-rose-50 border-rose-100', 'text-rose-500', 'text-rose-600'],
          }[s.tone];
          return (
            <Card key={s.l} className="p-4 md:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  {s.l}
                </div>
                <div
                  className={`w-9 h-9 rounded-lg ${tones[0]} ${tones[1]} border flex items-center justify-center`}
                >
                  <I size={17} />
                </div>
              </div>
              <div
                className={`text-[24px] md:text-[32px] font-extrabold tabular-nums mt-1 leading-none ${tones[2]}`}
              >
                {s.v}
              </div>
              <div className="text-[11px] md:text-[11.5px] text-slate-500 mt-1.5">{s.s}</div>
            </Card>
          );
        })}
      </div>

      <Card className="p-5 md:p-6 mb-5 md:mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[15px] font-bold text-slate-900">Huy hiệu thành tích</div>
            <div className="text-[11.5px] text-slate-500">6 huy hiệu · còn 14 chưa mở khóa</div>
          </div>
          <button className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">
            <span className="hidden sm:inline">Xem tất cả</span>
            <IconChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {badges.map((b) => {
            const I = b.icon;
            return (
              <div key={b.l} className="text-center group cursor-pointer">
                <div
                  className={`relative aspect-square rounded-2xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                >
                  <I size={28} />
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center">
                    <IconCheck size={11} className="text-emerald-600" />
                  </div>
                </div>
                <div className="text-[11px] md:text-[12px] font-extrabold text-slate-900 mt-2 leading-tight">
                  {b.l}
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">{b.sub}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 mb-5 md:mb-6">
        <Card className="md:col-span-7 p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Giấy tờ xác minh</div>
              <div className="text-[11.5px] text-slate-500">5/5 đã xác minh · 1 sắp hết hạn</div>
            </div>
            <Pill tone="green">
              <IconShield size={11} /> KYC L3
            </Pill>
          </div>
          <div className="space-y-2">
            {docs.map((d) => (
              <div
                key={d.l}
                className="flex items-center gap-3 px-3 py-3 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    d.status === 'verified'
                      ? 'bg-emerald-50 border border-emerald-100 text-emerald-600'
                      : 'bg-amber-50 border border-amber-100 text-amber-600'
                  }`}
                >
                  <IconShield size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-slate-900 leading-tight">{d.l}</div>
                  <div className="text-[11px] text-slate-500 font-mono leading-tight">{d.sub}</div>
                </div>
                <div className="text-right shrink-0">
                  {d.status === 'verified' ? (
                    <Pill tone="green">
                      <IconCheck size={10} /> Đã xác minh
                    </Pill>
                  ) : (
                    <Pill tone="amber">
                      <IconClock size={10} /> Sắp hết
                    </Pill>
                  )}
                  <div className="text-[10.5px] text-slate-500 mt-0.5">{d.exp}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full h-10 rounded-lg border-2 border-dashed border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20 text-[12.5px] font-bold text-slate-500 hover:text-emerald-700 flex items-center justify-center gap-2 transition-colors">
            <IconCamera size={14} /> Thêm giấy tờ
          </button>
        </Card>

        <Card className="md:col-span-5 p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[15px] font-bold text-slate-900">Năng lực & xe</div>
              <div className="text-[11.5px] text-slate-500">Bật/tắt loại đơn nhận được</div>
            </div>
          </div>
          <div className="space-y-2">
            {skills.map((s) => (
              <div
                key={s.l}
                className="flex items-center gap-3 px-3 py-3 rounded-lg border border-slate-100"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    s.enabled
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      : 'bg-slate-50 text-slate-400 border border-slate-100'
                  }`}
                >
                  <IconTruck size={15} />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-[13px] font-bold leading-tight ${
                      s.enabled ? 'text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    {s.l}
                  </div>
                  <div className="text-[10.5px] text-slate-500 leading-tight">{s.desc}</div>
                </div>
                <div
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors shrink-0 ${
                    s.enabled ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      s.enabled ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5 md:p-6 mb-5 md:mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          <div className="md:col-span-4 md:border-r border-slate-100 md:pr-6">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              Đánh giá tổng
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[44px] md:text-[56px] font-extrabold text-amber-500 tabular-nums leading-none">
                4.92
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <IconStar
                    key={n}
                    size={14}
                    className="text-amber-400"
                    style={{ fill: '#fbbf24' }}
                  />
                ))}
              </div>
            </div>
            <div className="text-[12px] text-slate-500 mt-1">
              Từ <b>892 đánh giá</b>
            </div>
            <div className="mt-4 space-y-1.5">
              {[
                [5, 84],
                [4, 12],
                [3, 3],
                [2, 0.5],
                [1, 0.5],
              ].map(([n, pct]) => (
                <div key={n} className="flex items-center gap-2 text-[11px]">
                  <span className="w-3 text-slate-500 font-mono">{n}★</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-10 text-right font-mono text-slate-500 tabular-nums">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-8">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[15px] font-bold text-slate-900">Đánh giá gần đây</div>
              <button className="text-[12px] text-emerald-700 font-bold flex items-center gap-1">
                <span className="hidden sm:inline">Tất cả 892</span>
                <IconChevronRight size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="flex gap-3 pb-3 border-b border-slate-100 last:border-0"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0">
                    {r.name.split(' ').pop()[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-[13px] font-bold text-slate-900">{r.name}</span>
                      <span className="flex">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <IconStar
                            key={n}
                            size={11}
                            className={n <= r.stars ? 'text-amber-400' : 'text-slate-200'}
                            style={{ fill: n <= r.stars ? '#fbbf24' : '#e2e8f0' }}
                          />
                        ))}
                      </span>
                      <span className="text-[10.5px] text-slate-400 ml-auto">{r.when}</span>
                    </div>
                    <div className="text-[12.5px] text-slate-600 leading-relaxed">{r.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: 'Cài đặt thông báo', icon: IconBell, sub: 'Push, SMS, email' },
          { l: 'Bảo mật & mật khẩu', icon: IconShield, sub: '2FA đã bật' },
          { l: 'Trung tâm hỗ trợ', icon: IconInfo, sub: 'FAQ, hotline 24/7' },
          { l: 'Đăng xuất', icon: IconArrowRight, sub: 'Tất cả thiết bị', danger: true },
        ].map((s) => {
          const I = s.icon;
          return (
            <button
              key={s.l}
              className={`bg-white rounded-xl border border-slate-200 hover:border-emerald-300 px-4 py-3.5 flex items-center gap-3 lift text-left ${
                s.danger ? 'hover:border-red-300' : ''
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  s.danger
                    ? 'bg-red-50 text-red-500 border border-red-100'
                    : 'bg-slate-50 text-slate-600 border border-slate-100'
                }`}
              >
                <I size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`text-[13px] font-bold leading-tight ${
                    s.danger ? 'text-red-600' : 'text-slate-900'
                  }`}
                >
                  {s.l}
                </div>
                <div className="text-[10.5px] text-slate-500 leading-tight truncate">{s.sub}</div>
              </div>
              <IconChevronRight size={14} className="text-slate-400 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
