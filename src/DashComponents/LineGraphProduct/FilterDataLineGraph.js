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
      const { target, ...rest } = row;

      const matchingFY = rest.fy;
      const annualDataRows = dataAnnualProduct.filter((filtRow) => {
        return filtRow.fy === matchingFY;
      });

      const firstRow = annualDataRows[0];
      //   return firstRow;
      //   return Object.keys(firstRow); // returns ['target', 'product']
      //   return firstRow.product; // returns the product names
      return { target: firstRow.target, ...rest }; // returns null. it should not be null.

      //   const annualTarget = annualDataRow["target"];
      //   return { annualDataRow['annualDataRow']['target'] };
      //   return { annualDataRow[annualDataRow] };
      //   return { annualDataRow };
      //   return firstRow.target;
      //   return firstRow;
      //   return firstRow.product;
      //   return Object.keys(firstRow);
      return firstRow["target"];
      //   return { target: annualTarget, ...row };
      //   return { fy: matchingFY, target: annualTarget };
    });
  }

  //   const rez = dataQtrProduct;

  console.log(graphData);
  //   console.log(joinedDataQtr);
  //   console.log(joinedDataAnnual);

  //   console.log(selectedProductId);
  //   console.log(dataAnnualProduct);

  return joinedDataAnnual;

  return selectedProductId;
};
