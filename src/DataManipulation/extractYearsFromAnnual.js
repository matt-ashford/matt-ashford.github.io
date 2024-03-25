export const extractYearsFromAnnual = (inputData) => {
  const yearsArray = inputData.reduce((arrSoFar, currentRow) => {
    if (!arrSoFar.includes(currentRow.fy)) {
      arrSoFar.push(currentRow.fy);
    }
    return arrSoFar;
  }, []);

  return yearsArray;
};
