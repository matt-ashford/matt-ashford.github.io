export const FilterDataLineGraph = (
  selectedProductId,
  joinedDataAnnual,
  joinedDataQtr
) => {
  const dataQtrProduct = joinedDataQtr.filter((row) => {
    return row.product_id === selectedProductId;
  });
  const dataAnnualProduct = joinedDataAnnual.filter((row) => {
    return row.product_id === selectedProductId;
  });

  let graphData = dataQtrProduct;
  let isUsingAnnual = false;

  if (dataQtrProduct.length === 0) {
    graphData = dataAnnualProduct;
    isUsingAnnual = true;
  }

  if (!isUsingAnnual) {
    graphData = graphData.map((row) => {
      let { target, quarter, ...rest } = row;
      const matchingFY = rest.fy;
      const annualDataRows = dataAnnualProduct.filter((filtRow) => {
        return filtRow.fy === matchingFY;
      });
      const firstRow = annualDataRows[0];
      const qtrInt = parseInt(quarter);

      return { target: firstRow.target, quarter: qtrInt, ...rest };
    });
  }

  const graphDataSorted = sortGraphData(graphData);
  console.log(graphDataSorted);

  return graphDataSorted;
};

function sortGraphData(graphData, isUsingAnnual) {
  const sortedData = graphData.sort((a, b) => {
    if (a.fy !== b.fy) {
      return a.fy - b.fy;
    }
    if (!isUsingAnnual) {
      if (a.quarter !== b.quarter) {
        return a.quarter - b.quarter;
      }
    }
    return 0;
  });

  return sortedData;
}
