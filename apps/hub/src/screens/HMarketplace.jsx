import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Btn,
  Card,
  Field,
  Input,
  Pill,
  fmtNum,
  fmtVnd,
  IconArrowRight,
  IconCheck,
  IconChevronRight,
  IconCoins,
  IconGavel,
  IconInfo,
  IconPackage,
  IconPlus,
  IconSearch,
  IconSend,
  IconShield,
  IconTrendingUp,
} from '@reloop/ui';

const fairPrice = { low: 45000, mid: 50000, high: 58000 };

const PRICING_OPTIONS = [
  {
    id: 'fixed',
    icon: IconCoins,
    l: 'Giá cố định',
    d: 'Người mua đầu tiên trả đủ giá lấy lô',
  },
  {
    id: 'auction',
    icon: IconGavel,
    l: 'Đấu giá B2B',
    d: 'Mở 24h, người trả cao nhất thắng',
  },
];

const SHIPPING = [
  { l: 'Người mua tự đến', d: 'Tại trạm Q.7', sel: true },
  { l: 'Hub giao', d: 'Phụ phí ~5K/kg', sel: false },
  { l: 'Thương lượng', d: 'Liên hệ buyer', sel: false },
];

const BUYERS = [
  { n: 'CTCP Đồng Nam Phong', loc: 'Q.Bình Tân · 14km', tag: 'Top buyer', tone: 'green' },
  { n: 'Recycler Việt Đức', loc: 'Bình Dương · 28km', tag: 'Mua thường xuyên', tone: 'slate' },
  { n: 'Export Asia Co.', loc: 'Cát Lái · 19km', tag: 'Xuất khẩu', tone: 'amber' },
];

export default function HMarketplace() {
  const [photos, setPhotos] = useState([true, true, true, false, false, false]);
  const [pricingMode, setPricingMode] = useState('fixed');

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4 md:py-6">
      <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-3 flex-wrap">
        <Link to="/" className="hover:text-emerald-700 font-semibold">
          Dashboard
        </Link>
        <IconChevronRight size={12} />
        <span>Marketplace B2B</span>
        <IconChevronRight size={12} />
        <span className="text-slate-900 font-bold">Đăng lô mới</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5 md:mb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Pill tone="green">
              <IconPackage size={11} /> Lô đã xử lý
            </Pill>
            <Pill tone="slate" className="font-mono">
              LST-2026-0425-#42
            </Pill>
          </div>
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-slate-900 tracking-tight">
            Đăng lô vật liệu lên Marketplace
          </h1>
          <div className="text-[12px] md:text-[12.5px] text-slate-500">
            Người mua: nhà máy, recycler công nghiệp, vendor xuất khẩu
          </div>
        </div>
        <div className="flex gap-2">
          <Btn variant="secondary" radius="lg">
            Lưu nháp
          </Btn>
          <Btn variant="primary" radius="lg" icon={IconSend}>
            Đăng bán
          </Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        <div className="md:col-span-8 space-y-5">
          <Card variant="hub" className="p-5 md:p-6">
            <h3 className="text-[14px] font-bold text-slate-900 mb-4">1. Thông tin lô</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Loại vật liệu" required hint="Chọn từ danh mục chuẩn">
                <select className="w-full h-10 px-3 text-[14px] rounded-lg border border-slate-200 bg-white focus:border-emerald-500 outline-none font-semibold appearance-none">
                  <option>Đồng (Cu) — phế liệu</option>
                </select>
              </Field>
              <Field label="Phân loại" required>
                <select className="w-full h-10 px-3 text-[14px] rounded-lg border border-slate-200 bg-white focus:border-emerald-500 outline-none font-semibold appearance-none">
                  <option>Cu #1 — sạch, không pha</option>
                </select>
              </Field>
              <Field label="Khối lượng" required hint="kg, đã cân tại trạm">
                <Input defaultValue="350.0" />
              </Field>
              <Field label="Độ tinh khiết ước" hint="%">
                <Input defaultValue="92.5" />
              </Field>
              <Field label="Vị trí lô" required>
                <Input defaultValue="Kho A — Trạm Q.7 #H-005" />
              </Field>
              <Field label="Sẵn giao từ" required>
                <Input defaultValue="25/04/2026" />
              </Field>
            </div>
          </Card>

          <Card variant="hub" className="p-5 md:p-6">
            <h3 className="text-[14px] font-bold text-slate-900 mb-1">2. Ảnh vật liệu</h3>
            <div className="text-[11.5px] text-slate-500 mb-3">
              3–6 ảnh thực tế · ảnh đầu là ảnh đại diện
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {photos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const n = [...photos];
                    n[i] = !n[i];
                    setPhotos(n);
                  }}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center relative ${
                    p ? 'photo-ph border-emerald-200' : 'border-dashed border-slate-300 bg-white'
                  }`}
                >
                  {p ? (
                    <>
                      <IconCheck size={20} className="text-emerald-600" />
                      {i === 0 && (
                        <span className="absolute top-1 left-1 bg-emerald-700 text-white text-[9px] font-bold px-1 py-0.5 rounded">
                          CHÍNH
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-slate-400">
                      <IconPlus size={16} />
                      <span className="text-[9px] mt-0.5">Ảnh {i + 1}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </Card>

          <Card variant="hub" className="p-5 md:p-6">
            <h3 className="text-[14px] font-bold text-slate-900 mb-4">3. Pricing</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {PRICING_OPTIONS.map((m) => {
                const I = m.icon;
                const active = pricingMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPricingMode(m.id)}
                    className={`text-left p-4 rounded-xl border-2 ${
                      active
                        ? 'border-emerald-500 bg-emerald-50/40'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <I size={18} className={active ? 'text-emerald-700' : 'text-slate-500'} />
                      <span className="text-[14px] font-bold">{m.l}</span>
                      {active && <IconCheck size={14} className="ml-auto text-emerald-600" />}
                    </div>
                    <div className="text-[11.5px] text-slate-500">{m.d}</div>
                  </button>
                );
              })}
            </div>

            {pricingMode === 'fixed' ? (
              <div className="space-y-4">
                <Field label="Giá đăng bán" required hint="₫ / kg">
                  <Input defaultValue="50000" />
                </Field>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                      Khung giá thị trường (Cu #1, TP.HCM)
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">cập nhật 14:30</div>
                  </div>
                  <div className="relative h-12 rounded-lg bg-gradient-to-r from-amber-200 via-emerald-200 to-amber-200 border border-slate-200">
                    <div className="absolute inset-y-1 left-[20%] right-[20%] bg-emerald-500/30 rounded-md" />
                    <div className="absolute top-1/2 -translate-y-1/2 left-[50%]">
                      <div className="w-1 h-12 bg-slate-900 rounded-full" />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md font-mono whitespace-nowrap">
                        50.000 ₫
                      </div>
                    </div>
                    <div className="absolute -bottom-5 left-0 text-[10px] font-mono text-slate-500">
                      {fmtNum(fairPrice.low / 1000)}K
                    </div>
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-700 font-bold">
                      FAIR
                    </div>
                    <div className="absolute -bottom-5 right-0 text-[10px] font-mono text-slate-500">
                      {fmtNum(fairPrice.high / 1000)}K
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mt-6 flex items-start gap-2">
                  <IconTrendingUp size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-[12px] text-emerald-900">
                    <b>Tốt:</b> Giá ở giữa khung fair. Dự đoán{' '}
                    <b className="font-mono">8–12 inquiry</b> trong 48h. Tổng lô{' '}
                    <b className="font-mono">{fmtVnd(50000 * 350)}</b>.
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Field label="Giá khởi điểm ₫/kg">
                    <Input defaultValue="42000" />
                  </Field>
                  <Field label="Bước giá ₫/kg">
                    <Input defaultValue="500" />
                  </Field>
                  <Field label="Thời gian">
                    <select className="w-full h-10 px-3 text-[14px] rounded-lg border border-slate-200 font-mono">
                      <option>24 giờ</option>
                    </select>
                  </Field>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <IconInfo size={14} className="text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-[12px] text-amber-900">
                    Đấu giá phù hợp lô lớn (≥200kg) hoặc loại hiếm. Margin trung bình +6–14%.
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Card variant="hub" className="p-5 md:p-6">
            <h3 className="text-[14px] font-bold text-slate-900 mb-4">4. Vận chuyển</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SHIPPING.map((s, i) => (
                <button
                  key={i}
                  className={`p-3 rounded-lg border-2 text-left ${
                    s.sel ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200'
                  }`}
                >
                  <div className="text-[13px] font-bold text-slate-900">{s.l}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{s.d}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="md:col-span-4 space-y-4">
          <Card variant="hub" className="overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                Preview · Marketplace
              </div>
              <IconSearch size={12} className="text-slate-400" />
            </div>
            <div className="p-4">
              <div className="aspect-[16/10] rounded-lg photo-ph border border-emerald-100 mb-3 flex items-center justify-center text-emerald-700/30 font-mono text-[10px]">
                [ảnh đại diện]
              </div>
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <Pill tone="green" className="!text-[9px] !px-1.5 !py-0">
                  Verified Hub
                </Pill>
                <Pill tone="slate" className="!text-[9px] !px-1.5 !py-0 !font-mono">
                  #H-005
                </Pill>
              </div>
              <div className="text-[15px] font-extrabold text-slate-900 leading-tight">
                Đồng (Cu) #1 — 350 kg
              </div>
              <div className="text-[11.5px] text-slate-500">
                Tinh khiết ~92.5% · Q.7, TP.HCM
              </div>

              <div className="my-3 border-t border-dashed border-slate-200" />

              <div className="flex items-baseline justify-between">
                <span className="text-[11px] text-slate-500">Giá cố định</span>
                <span className="text-[20px] font-extrabold text-emerald-700 font-mono tabular-nums">
                  50.000 ₫/kg
                </span>
              </div>
              <div className="text-right text-[11px] text-slate-500 mt-0.5">
                Tổng lô{' '}
                <b className="font-mono text-slate-700">{fmtVnd(50000 * 350)}</b>
              </div>

              <button className="w-full mt-3 h-10 rounded-lg bg-emerald-500 text-white font-bold text-[13px]">
                Liên hệ mua
              </button>
            </div>
          </Card>

          <Card variant="hub" className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[13px] font-bold text-slate-900">Buyer phù hợp</div>
                <div className="text-[11px] text-slate-500">Match theo loại + khoảng cách</div>
              </div>
              <Pill tone="green">3 match</Pill>
            </div>
            <div className="space-y-2.5">
              {BUYERS.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm shrink-0">
                    {b.n.split(' ').slice(-1)[0][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-bold text-slate-900 truncate leading-tight">
                      {b.n}
                    </div>
                    <div className="text-[10.5px] text-slate-500">{b.loc}</div>
                  </div>
                  <Pill tone={b.tone} className="!text-[9px] !px-1.5 !py-0 shrink-0">
                    {b.tag}
                  </Pill>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 h-9 rounded-lg border border-slate-200 text-[12px] font-bold text-slate-700 hover:bg-slate-50">
              Gửi notify riêng (3 buyer)
            </button>
          </Card>

          <Card variant="hub" className="p-4 bg-slate-900 text-white border-slate-900">
            <div className="flex items-center gap-2 mb-2">
              <IconShield size={14} className="text-emerald-400" />
              <div className="text-[10px] uppercase tracking-wider font-bold text-white/70">
                Audit chain
              </div>
            </div>
            <div className="text-[11.5px] text-white/80 leading-relaxed">
              Lô này có nguồn gốc rõ: <b className="text-white">5 mô tơ</b> rã từ{' '}
              <b className="text-white font-mono">BAT-...09</b> → mass balance verified → ledger.
            </div>
            <button className="mt-2 text-[11.5px] text-emerald-400 font-bold flex items-center gap-1">
              Xem certificate chain <IconArrowRight size={12} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
