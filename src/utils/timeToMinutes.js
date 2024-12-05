/**
 *  Format string time to minutes(number)
 *  12:23 = 12 * 60 + 23 = 743
 * @param {string} time
 * @return {number}
 */
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export default timeToMinutes;