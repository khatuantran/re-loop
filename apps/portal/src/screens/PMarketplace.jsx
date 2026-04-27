import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Pill,
  IconArrowRight,
  IconCheck,
  IconClock,
  IconFilter,
  IconGavel,
  IconMapPin,
  IconPackage,
  IconShield,
  IconStar,
  IconX,
} from '@reloop/ui';
import { LOTS } from '../data/lots.js';

const MATERIALS = ['Nhựa PET', 'Nhựa HDPE', 'Đồng', 'Sắt', 'Carton', 'Nhôm'];

function FilterPanel({ selectedMats, toggleMat, trustOnly, setTrustOnly, weight, setWeight }) {
  return (
    <div className="space-y-3">
      <Card variant="hub" className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2.5">
          Loại vật liệu
        </div>
        <div className="space-y-2">
          {MATERIALS.map((m) => {
            const on = selectedMats.includes(m);
            return (
              <label key={m} className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    on ? 'bg-emerald-700 border-emerald-700' : 'border-slate-300 bg-white'
                  }`}
                >
                  {on && <IconCheck size={11} className="text-white" />}
                </div>
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggleMat(m)}
                  className="sr-only"
                />
                <span
                  className={`text-[13px] ${on ? 'font-bold text-slate-900' : 'text-slate-600'}`}
                >
                  {m}
                </span>
              </label>
            );
          })}
        </div>
      </Card>

      <Card variant="hub" className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2.5">
          Khu vực
        </div>
        <select className="w-full h-9 px-2.5 text-[13px] rounded-lg border border-slate-200 bg-white outline-none">
          <option>TP.HCM (4)</option>
          <option>Hà Nội (1)</option>
          <option>Bình Dương (1)</option>
        </select>
      </Card>

      <Card variant="hub" className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
            Khối lượng tối thiểu
          </div>
          <span className="text-[12px] font-mono font-bold text-emerald-700">{weight} kg</span>
        </div>
        <input
          type="range"
          min="100"
          max="5000"
          step="50"
          value={weight}
          onChange={(e) => setWeight(+e.target.value)}
          className="w-full accent-emerald-600"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
          <span>100kg</span>
          <span>5,000kg</span>
        </div>
      </Card>

      <Card variant="hub" className="p-4">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2.5">
          Grade
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {['A', 'B', 'C'].map((g) => (
            <button
              key={g}
              className={`h-8 rounded-md text-[12px] font-bold border ${
                g === 'A'
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </Card>

      <Card variant="hub" className="p-4">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <button
            onClick={() => setTrustOnly(!trustOnly)}
            className={`w-9 h-5 rounded-full relative transition-colors shrink-0 ${
              trustOnly ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                trustOnly ? 'left-4' : 'left-0.5'
              }`}
            />
          </button>
          <div>
            <div className="text-[12.5px] font-bold text-slate-900">Trạm uy tín ⭐4.5+</div>
            <div className="text-[10.5px] text-slate-500">Verified KYB · Insurance</div>
          </div>
        </label>
      </Card>
    </div>
  );
}

export default function PMarketplace() {
  const [selectedMats, setSelectedMats] = useState(['Nhựa PET', 'Đồng']);
  const [trustOnly, setTrustOnly] = useState(true);
  const [weight, setWeight] = useState(500);
  const [sort, setSort] = useState('Mới nhất');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(
    () =>
      LOTS.filter(
        (l) =>
          (selectedMats.length === 0 || selectedMats.some((m) => l.mat.includes(m))) &&
          (!trustOnly || l.rating >= 4.5)
      ),
    [selectedMats, trustOnly]
  );

  const toggleMat = (m) =>
    setSelectedMats((s) => (s.includes(m) ? s.filter((x) => x !== m) : [...s, m]));

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 md:py-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 md:gap-6">
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <IconFilter size={16} className="text-slate-500" />
              <h3 className="text-[14px] font-bold text-slate-900">Bộ lọc</h3>
            </div>
            <button className="text-[11px] text-emerald-700 font-bold">Đặt lại</button>
          </div>
          <FilterPanel
            selectedMats={selectedMats}
            toggleMat={toggleMat}
            trustOnly={trustOnly}
            setTrustOnly={setTrustOnly}
            weight={weight}
            setWeight={setWeight}
          />
        </div>
      </aside>

      {filterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setFilterOpen(false)}
          />
          <div className="relative ml-auto h-full w-[300px] max-w-[85vw] bg-[#F4F6F4] shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-[#F4F6F4] px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconFilter size={16} className="text-slate-500" />
                <h3 className="text-[14px] font-bold text-slate-900">Bộ lọc</h3>
              </div>
              <button
                onClick={() => setFilterOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              >
                <IconX size={16} />
              </button>
            </div>
            <div className="p-4">
              <FilterPanel
                selectedMats={selectedMats}
                toggleMat={toggleMat}
                trustOnly={trustOnly}
                setTrustOnly={setTrustOnly}
                weight={weight}
                setWeight={setWeight}
              />
            </div>
          </div>
        </div>
      )}

      <main className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Pill tone="green">
                <IconGavel size={11} /> Sealed-bid Marketplace
              </Pill>
              <Pill tone="dark">
                <IconShield size={11} /> Buyer Protection
              </Pill>
            </div>
            <h1 className="text-[22px] md:text-[26px] font-extrabold text-slate-900 tracking-tight">
              Marketplace nguyên liệu sỉ
            </h1>
            <div className="text-[12px] md:text-[13px] text-slate-500">
              {filtered.length} lô đang mở · cập nhật real-time · 8 thành phố
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterOpen(true)}
              className="lg:hidden h-9 px-3 rounded-lg border border-slate-200 bg-white text-[12px] font-bold text-slate-700 flex items-center gap-1.5"
            >
              <IconFilter size={13} /> Lọc
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 px-3 text-[12.5px] md:text-[13px] rounded-lg border border-slate-200 bg-white font-semibold outline-none"
            >
              <option>Mới nhất</option>
              <option>Giá thấp nhất</option>
              <option>Khoảng cách</option>
              <option>Sắp đóng đấu giá</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-5 pb-4 border-b border-slate-200">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
            Đang lọc:
          </span>
          {selectedMats.map((m) => (
            <button
              key={m}
              onClick={() => toggleMat(m)}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-emerald-100 text-emerald-800 text-[11.5px] font-bold border border-emerald-200"
            >
              {m} <IconX size={11} />
            </button>
          ))}
          {trustOnly && (
            <button
              onClick={() => setTrustOnly(false)}
              className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-emerald-100 text-emerald-800 text-[11.5px] font-bold border border-emerald-200"
            >
              Uy tín 4.5+ <IconX size={11} />
            </button>
          )}
          <span className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-slate-100 text-slate-600 text-[11.5px] font-bold border border-slate-200">
            ≥ {weight} kg
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((l) => (
            <Link
              key={l.id}
              to={`/lot/${l.id}`}
              className="group text-left bg-white rounded-xl border border-slate-200 overflow-hidden lift"
            >
              <div className={`aspect-[16/10] ${l.tone} relative flex items-center justify-center`}>
                <IconPackage size={28} className="text-emerald-700/30" />
                <div className="absolute top-2.5 left-2.5 bg-slate-900/85 text-white px-2 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 backdrop-blur">
                  <IconClock size={10} /> Còn {l.countdown}
                </div>
                <div
                  className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold border-2 border-white ${
                    l.grade === 'A'
                      ? 'bg-emerald-500 text-white'
                      : l.grade === 'B'
                        ? 'bg-amber-400 text-amber-950'
                        : 'bg-slate-300 text-slate-800'
                  }`}
                >
                  {l.grade}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold ${
                      l.color === 'sky'
                        ? 'text-sky-700'
                        : l.color === 'amber'
                          ? 'text-amber-800'
                          : 'text-slate-600'
                    }`}
                  >
                    {l.mat} · Grade {l.grade}
                  </span>
                </div>
                <div className="text-[14px] md:text-[15px] font-extrabold text-slate-900 leading-tight">
                  {l.kg.toLocaleString('vi-VN')} kg · {l.desc}
                </div>
                <div className="flex items-center gap-1 mt-1.5 text-[11.5px] text-slate-500">
                  <IconMapPin size={11} /> {l.hub}
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-slate-200 flex items-end justify-between">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                      Giá khởi điểm
                    </div>
                    <div className="text-[15px] md:text-[16px] font-extrabold text-emerald-700 font-mono tabular-nums">
                      {l.price.toLocaleString('vi-VN')}
                      <span className="text-[10px] text-slate-500"> ₫/kg</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      <IconStar
                        size={11}
                        className="text-amber-400"
                        style={{ fill: '#fbbf24' }}
                      />
                      <span className="text-[11.5px] font-bold text-slate-700 font-mono">
                        {l.rating}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{l.txns} giao dịch</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[10.5px] font-mono">
                  <span className="text-slate-400">{l.id}</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Xem & Đặt giá <IconArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
