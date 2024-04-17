export const countTableDataFilter = (inputData, inputFy) => {
  if (typeof inputData === "undefined") {
    return inputData;
  }

  const inputDataMailClass = inputData[0].mail_class;

  // if (inputDataMailClass == "First Class") {
  //   inputData = filterProdsFistClass(inputData);
  // }

  const singleYearOfData = inputData.filter((row) => row.fy === inputFy);

  const productCount = singleYearOfData.length;

  const missedTarget = singleYearOfData.reduce((countSoFar, currentRow) => {
    return currentRow.pct_on_time < currentRow.target
      ? ++countSoFar
      : countSoFar;
  }, 0);

  const decreasedCount = singleYearOfData.reduce((decSoFar, currentRow) => {
    // return decreasedThisYear(inputData, currentRow.product_id, maxYear)
    return decreasedThisYear(inputData, currentRow.product_id, inputFy)
      ? ++decSoFar
      : decSoFar;
  }, 0);

  const rez = {
    productCount: productCount,
    missedTarget: missedTarget,
    decreasedCount: decreasedCount,
  };

  return rez;
};

function decreasedThisYear(inputData, productId, inputFy) {
  const thisProduct = inputData.filter((row) => row.product_id === productId);
  const thisYearScore = thisProduct.filter((row) => row.fy === inputFy)[0]
    .pct_on_time;
  const lastYearScore = thisProduct.filter((row) => row.fy === inputFy - 1)[0]
    .pct_on_time;
  return thisYearScore < lastYearScore;
}

function filterProdsFistClass(inputData) {
  const deleteProds = ["Single-Piece Flats", "Presort Flats"];
  return inputData.filter((row) => !deleteProds.includes(row.product));
}
