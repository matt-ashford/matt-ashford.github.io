export const generateCountData = (selectedYear, annualData) => {
  const mailClasses = [
    "First Class",
    "Marketing Mail",
    "Periodicals",
    "Package Services",
    "Special Services",
    "Grand Total",
  ];

  let rez = [];

  mailClasses.forEach((mailClass) => {
    rez.push(generateCountDataByClass(annualData, mailClass, selectedYear));
  });

  //   const fcSeries = rez.filter((row) => row.mailClass === "First Class");

  return rez;
};

export default generateCountData;

function generateCountDataByClass(annualData, mailClass, selectedYear) {
  let singleClassData = annualData;

  if (mailClass !== "Grand Total") {
    singleClassData = annualData.filter((row) => row.mail_class === mailClass);
  }

  const singleYearData = singleClassData.filter(
    (row) => row.fy === selectedYear
  );

  const rez = {
    mailClass: mailClass,
    totalProducts: singleYearData.length,
    productsMissedTarget: countMissedTargets(singleYearData),
    negativeChange: countProductDecreases(singleClassData, selectedYear),
  };

  return rez;
}

function countMissedTargets(singleClassData) {
  const dataset_withPtsFromTarget = singleClassData
    .filter((row) => typeof row.target !== "undefined")
    .map((row) => {
      const pointsFromTarget = row.target - row.pct_on_time;
      row.points_from_target = pointsFromTarget;
      return row;
    });

  const missedProductCount = dataset_withPtsFromTarget.filter(
    (row) => row.points_from_target > 0
  ).length;

  return missedProductCount;
}

function countProductDecreases(singleClassData, selectedYear) {
  let negativeChangeCount = 0;

  const data_thisYear = singleClassData.filter(
    (row) => row.fy === selectedYear
  );
  const previousYear = selectedYear - 1;

  for (let i = 0; i < data_thisYear.length; i++) {
    const currentProductId = data_thisYear[i].product_id;
    const singleProduct = singleClassData.filter(
      (row) => row.product_id === currentProductId
    );
    const thisYearScore = singleProduct.filter(
      (row) => row.fy === selectedYear
    )[0].pct_on_time;
    const prevYearScore = singleProduct.filter(
      (row) => row.fy === previousYear
    )[0].pct_on_time;

    if (thisYearScore < prevYearScore) {
      negativeChangeCount++;
    }
  }

  return negativeChangeCount;
}
