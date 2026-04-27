import {
  IconHome,
  IconCamera,
  IconPackage,
  IconGavel,
  IconTruck,
  IconRecycle,
} from '@reloop/ui';

export const NAV_ITEMS = [
  { to: '/', label: 'Trang chủ', icon: IconHome },
  { to: '/flow-a', label: 'Đặt thu gom', icon: IconCamera },
  { to: '/flow-b', label: 'Bán đồ cũ', icon: IconPackage },
  { to: '/auction', label: 'Đấu giá live', icon: IconGavel },
  { to: '/tracking', label: 'Theo dõi', icon: IconTruck },
  { to: '/cert', label: 'Chứng chỉ', icon: IconRecycle },
];

export const BOTTOM_NAV_ITEMS = NAV_ITEMS.filter(
  (item) => item.to !== '/auction'
);
