const convertTime = {
  toMin(min: number) {
    return Math.floor(Date.now() / 1000) + 60 * min;
  },
  toHour(hour: number) {
    return Math.floor(Date.now() / 1000) + 60 * hour;
  },
  toDays(days: number) {
    return Math.floor(Date.now() / 1000) + 86400 * days;
  },
};

export { convertTime };
