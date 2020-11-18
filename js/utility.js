const stringify = (date) => {
  const format = { year: "numeric", month: "short", day: "numeric" };
  return date === undefined
    ? "undefined"
    : new Date(Date.parse(date)).toLocaleDateString("en-GB", format);
};
