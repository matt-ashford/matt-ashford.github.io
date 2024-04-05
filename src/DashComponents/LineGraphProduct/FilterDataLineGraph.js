export const FilterDataLineGraph = (
  selectedProductId,
  joinedDataAnnual,
  joinedDataQtr
) => {
  const dataQtrProduct = joinedDataQtr.filter((row) => {
    // return row.product_id === 92;
    return row.product_id === selectedProductId;
  });
  const dataAnnualProduct = joinedDataAnnual.filter((row) => {
    // return row.product_id === 92;
    return row.product_id === selectedProductId;
  });

  const rez = dataQtrProduct;

  console.log(dataQtrProduct);
  //   console.log(joinedDataQtr);
  //   console.log(joinedDataAnnual);

  //   console.log(selectedProductId);
  //   console.log(dataAnnualProduct);

  return joinedDataAnnual;

  return selectedProductId;
};
