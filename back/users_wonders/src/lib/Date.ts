export function addHours(date: Date) {
  const hoursToAdd = 60 * 60 * 1000;
  date.setTime(date.getTime() + hoursToAdd);
  return date;
}
