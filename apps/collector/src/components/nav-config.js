import {
  IconPackage,
  IconMapPin,
  IconTruck,
  IconTrendingUp,
  IconUser,
} from '@reloop/ui';

export const NAV_ITEMS = [
  { to: '/', label: 'Đơn hàng', icon: IconPackage, badge: 4 },
  { to: '/route', label: 'Chuyến hôm nay', icon: IconMapPin, badge: 8 },
  { to: '/pickup', label: 'Tại điểm', icon: IconTruck },
  { to: '/earnings', label: 'Thu nhập', icon: IconTrendingUp },
  { to: '/profile', label: 'Hồ sơ', icon: IconUser },
];
