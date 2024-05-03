export const getElapsedTimeString = (createdAt: Date) => {
  const now = new Date();
  const elapsedTime = now.getTime() - createdAt.getTime();

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const millisecondsPerWeek = millisecondsPerDay * 7;
  const millisecondsPerMonth = millisecondsPerDay * 30; // approximation for a month
  const millisecondsPerYear = millisecondsPerDay * 365; // approximation for a year

  // include seconds and minutes:
  if (elapsedTime < millisecondsPerDay) {
    const seconds = Math.floor(elapsedTime / 1000);
    if (seconds < 60) {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }

    const minutes = Math.floor(elapsedTime / (1000 * 60));
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const years = Math.floor(elapsedTime / millisecondsPerYear);
  const months = Math.floor(elapsedTime / millisecondsPerMonth);
  const weeks = Math.floor(elapsedTime / millisecondsPerWeek);
  const days = Math.floor(elapsedTime / millisecondsPerDay);

  if (years > 0) {
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
  if (months > 0) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }
  if (weeks > 0) {
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }

  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
};
