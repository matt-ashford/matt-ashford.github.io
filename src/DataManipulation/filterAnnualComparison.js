export const filterAnnualComparison = (mailClass, fyInput, dataset) => {
  let filterClassName = mailClass;
  if (mailClass === "First Class Mail") {
    filterClassName = "First Class";
  }

  let comparisonYear = fyInput - 1;
  if (fyInput == 2019) {
    comparisonYear = fyInput + 1;
  }
  let keepYears = [fyInput, comparisonYear];

  let rez = {};

  rez = dataset.filter(
    (row) => keepYears.includes(row.fy) && row.mail_class === filterClassName
  );

  return rez;
};
