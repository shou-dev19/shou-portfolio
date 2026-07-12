export const formatStatValue = (value: number): string => {
  if (value < 10000) {
    return value.toLocaleString('ja-JP');
  }

  const tenThousands = (value / 10000).toFixed(1).replace(/\.0$/, '');
  return `${tenThousands}万`;
};
