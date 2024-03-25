export const returnAnnual = (mailClass, fyInput, dataset) => {
  //handle years
  let comparisonYear = fyInput - 1;
  if (fyInput == 2019) {
    comparisonYear = fyInput + 1;
  }
  let keepYears = [fyInput, comparisonYear];

  const rez = dataset.filter(
    (row) => keepYears.includes(row.fy) && row.mail_class === mailClass
  );

  return rez;
};
