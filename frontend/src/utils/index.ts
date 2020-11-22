export const convertTimeToHM = (start: Date, end: Date): string => {
  const allMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  const hours = Math.floor(allMinutes / 60);
  const minutes = Math.floor(allMinutes - 60 * hours);

  return `${hours}時間 ${minutes}分`;
}
