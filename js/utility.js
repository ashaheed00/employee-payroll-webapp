const stringify = (date) => {
  const format = { year: "numeric", month: "short", day: "numeric" };
  return date === undefined
    ? "undefined"
    : new Date(Date.parse(date)).toLocaleDateString("en-GB", format);
};

const checkName = (name) => {
  let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}\\s?([A-Z]{1}[a-z]{1,}\\s?){0,2}$");
  if (!nameRegex.test(name)) throw "Given name is in wrong format";
};

const checkStartDate = (startDate) => {
  const now = new Date();
  if (startDate > now) throw "Given start date is in future";
  const diffInDay = (now - startDate) / (1000 * 60 * 60 * 24);
  if (diffInDay > 30) throw "Given start date is beyond 30days";
};


// cool shit done using github-vscode web version just pressing . while you are on the repo page