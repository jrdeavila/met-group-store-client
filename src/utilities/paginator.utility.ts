export const calcPages = (items: any[], divisor: number) => {
  let pages = (items.length / divisor) >> 0;
  if (items.length % divisor > 0) ++pages;
  return pages;
};
