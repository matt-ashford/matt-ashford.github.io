import libRefs from "../../../Data/lib ref - Updated.json";

export const downloadBtnDataPrep = (propData) => {
  const needlessCols = ["product_id", "examples"];

  const remainingCols = Object.keys(propData[0]).filter(
    (val) => !needlessCols.includes(val)
  );

  let datasetRemoveCols = [];

  for (let row in propData) {
    let rezRow = {};
    const currentRow = propData[row];

    for (let col in remainingCols) {
      const currenCol = remainingCols[col];

      rezRow[currenCol] = currentRow[currenCol];
    }
    datasetRemoveCols.push(rezRow);
  }

  const mergedDataset = datasetRemoveCols.map((row) => {
    let matchingLibref = libRefs.filter((filtRow) => filtRow.fy === row.fy);
    matchingLibref = matchingLibref[0];
    const { fy, ...rest } = matchingLibref;
    return { ...matchingLibref, ...row };
  });
  return mergedDataset;
};
