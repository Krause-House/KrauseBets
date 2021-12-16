const isWithinHours = (date, hours) => {
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() + hours);
  console.log(cutoff);
  console.log(date);
  console.log(date > cutoff);
  return date < cutoff && date > new Date();
};

module.exports = { isWithinHours };
