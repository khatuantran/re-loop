export const fmtVnd = (n) => n.toLocaleString('vi-VN') + ' ₫';

export const fmtNum = (n, d = 0) =>
  n.toLocaleString('vi-VN', {
    maximumFractionDigits: d,
    minimumFractionDigits: d,
  });
