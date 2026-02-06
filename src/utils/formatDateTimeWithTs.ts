export function formatDateTimeWithTs(
  date: Date | number,
): Record<string, string> {
  const d = typeof date === "number" ? new Date(date) : date;

  const pad = (n: number) => n.toString().padStart(2, "0");

  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();

  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());

  return {
    date: `${day}.${month}.${year}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
}
