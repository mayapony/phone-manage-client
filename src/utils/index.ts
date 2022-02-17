export function formatTime(date: any) {
  date = new Date(date);

  return `${date.getFullYear()}-${single2Double(date.getMonth())}-${single2Double(date.getDate())} ${single2Double(
    date.getHours(),
  )}:${single2Double(date.getMinutes())}:${single2Double(date.getSeconds())}`;
}

export function single2Double(num: number): string {
  if (num < 10) return '0' + num;
  return String(num);
}
