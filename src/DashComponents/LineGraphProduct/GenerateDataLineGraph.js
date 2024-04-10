export const generateDataLineGraph = (
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

  const graphDataFCFlatsMatch = matchTargetsFCFlats(
    graphData,
    joinedDataAnnual
  );

  const graphDataSorted = sortGraphData(graphDataFCFlatsMatch);

  return graphDataSorted;
};

function matchTargetsFCFlats(graphData, joinedDataAnnual) {
  const firstObs = graphData[0];
  const productName = firstObs.product;

  if (["Presort Flats", "Single-Piece Flats"].includes(productName)) {
    const delSpeed = firstObs.delivery_speed;

    const rez = graphData.map((row) => {
      let { target, ...rest } = row;
      const matchingFY = rest.fy;
      const annualDataRows = joinedDataAnnual.filter((filtRow) => {
        return (
          filtRow.fy === matchingFY &&
          filtRow.product === "Flats" &&
          filtRow.mail_class === "First Class" &&
          filtRow.delivery_speed === delSpeed
        );
      });
      const firstMatchAnnualRow = annualDataRows[0];

      return { target: firstMatchAnnualRow.target, ...rest };
    });

    return rez;
  } else {
    return graphData;
  }
}

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
