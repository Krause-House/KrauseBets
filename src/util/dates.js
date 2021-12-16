const isWithinHours = (date, hours) => {
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() + hours);
  return date < cutoff && date > new Date();
};

module.exports = { isWithinHours };
