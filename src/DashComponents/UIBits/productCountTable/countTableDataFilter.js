export const createCellData = (inputData) => {
  const inputDataMailClass = inputData[0].mail_class;

  if (inputDataMailClass == "First Class") {
    inputData = filterProdsFistClass(inputData);
  }

  //   console.log(inputData);

  const maxYear = inputData.reduce((maxSoFar, row) => {
    return row.fy > maxSoFar ? row.fy : maxSoFar;
  }, 0);

  const singleYearOfData = inputData.filter((row) => row.fy === maxYear);
  const productCount = singleYearOfData.length;

  const missedTarget = singleYearOfData.reduce((countSoFar, currentRow) => {
    return currentRow.pct_on_time < currentRow.target
      ? ++countSoFar
      : countSoFar;
  }, 0);

  const decreasedCount = singleYearOfData.reduce((decSoFar, currentRow) => {
    return decreasedThisYear(inputData, currentRow.product_id, maxYear)
      ? ++decSoFar
      : decSoFar;
  }, 0);

  const rez = {
    productCount: productCount,
    missedTarget: missedTarget,
    decreasedCount: decreasedCount,
  };

  //   console.log("frm prod count", rez);

  return rez;
};

function decreasedThisYear(inputData, productId, maxFY) {
  const thisProduct = inputData.filter((row) => row.product_id === productId);
  const thisYearScore = thisProduct.filter((row) => row.fy === maxFY)[0]
    .pct_on_time;
  const lastYearScore = thisProduct.filter((row) => row.fy === maxFY - 1)[0]
    .pct_on_time;
  return thisYearScore < lastYearScore;
}

function filterProdsFistClass(inputData) {
  const deleteProds = ["Single-Piece Flats", "Presort Flats"];
  return inputData.filter((row) => !deleteProds.includes(row.product));
}
