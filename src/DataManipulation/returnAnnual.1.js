export const returnAnnual = (mailClass, fy, dataset) => {
  //   return dataset;
  //handle years
  let comparisonYear = fy - 1;
  if (fy == 2019) {
    comparisonYear = fy + 1;
  }
  let keepYears = [fy, comparisonYear];
  //   return keepYears;
  const rez = dataset.filter(
    // (row) => row.mailClass === mailClass && keepYears.includes(row.fy)
    // (row) => row.mailClass === mailClass && keepYears.includes(row.fy)
    (row) => row.mailClass === keepYears.includes(row.fy)
  );

  return rez;
};
