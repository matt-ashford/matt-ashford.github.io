export const createUniqueProdsList = (
  propDataAnnual,
  propDataQuarterly,
  selectedClass
) => {
  const filterClass = filterClassName(selectedClass);

  let classLevelDataAnnual = propDataAnnual.filter(
    (row) => row.mail_class === filterClass
  );

  let classLevelDataQuarterly = propDataQuarterly.filter(
    (row) => row.mail_class === filterClass
  );

  classLevelDataAnnual = removeBannedProds(classLevelDataAnnual);
  classLevelDataQuarterly = removeBannedProds(classLevelDataQuarterly);

  const classLevelDataCombined = [
    ...classLevelDataAnnual,
    ...classLevelDataQuarterly,
  ];

  const uniqueProds = new Set();
  classLevelDataCombined.forEach((row) => {
    if (filterClass === "First Class") {
      uniqueProds.add(
        JSON.stringify({
          product: row.product,
          delivery_speed: row.delivery_speed,
          product_id: row.product_id,
        })
      );
    } else {
      uniqueProds.add(
        JSON.stringify({
          product: row.product,
          product_id: row.product_id,
        })
      );
    }
  });

  let uniqueProdsArray = Array.from(uniqueProds).map((item) =>
    JSON.parse(item)
  );

  uniqueProdsArray = uniqueProdsArray.sort((a, b) => {
    return a.product < b.product ? 1 : -1;
  });

  const leadingRow = {
    product_id: 0,
    product: "none",
  };

  uniqueProdsArray.unshift(leadingRow);

  return uniqueProdsArray;
};

export const createFormattedProductList = (uniqueProds, selectedClass) => {
  const filterClass = filterClassName(selectedClass);

  const productNameList = uniqueProds.map((row) => {
    if (row.product === "none") {
      return "none";
    }
    if (
      filterClass === "First Class" &&
      String(row.delivery_speed) !== "null"
    ) {
      return `${row.product} ${row.delivery_speed}`;
    }
    return row.product;
  });

  return productNameList;
};

function removeBannedProds(aList) {
  const filt = aList.filter((row) => {
    return !(row.product === "Flats" && row.delivery_speed === "Overnight");
  });
  return filt;
}

function filterClassName(selectedClass) {
  let filterClass = selectedClass;
  if (filterClass === "First Class Mail") {
    filterClass = "First Class";
  }
  return filterClass;
}
