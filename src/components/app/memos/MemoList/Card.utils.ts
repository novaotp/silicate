
const toTwoDigits = (number: number): string => {
  return number.toString().padStart(2, '0');
}

export const formattedDate = (date: Date): string => {
  const today = new Date();
  const hours = toTwoDigits(date.getHours());
  const minutes = toTwoDigits(date.getMinutes());

  if  (date.getFullYear() === today.getFullYear() &&
       date.getMonth() === today.getMonth() &&
       date.getDate() === today.getDate()
  ) {
    return `Aujourd'hui à ${hours}:${minutes}`;
  }

  const year = date.getFullYear();
  const month = toTwoDigits(date.getMonth() + 1);
  const day = toTwoDigits(date.getDate());

  return `${day}.${month}.${year} à ${hours}:${minutes}`;
}
