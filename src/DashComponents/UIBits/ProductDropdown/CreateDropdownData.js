export const createUniqueProdsList = (fullDataset, selectedClass) => {
  const filterClass = filterClassName(selectedClass);
  const classLevelData = fullDataset.filter(
    (row) => row.mail_class === filterClass
  );

  const uniqueProds = new Set();
  classLevelData.forEach((row) => {
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

  const uniqueProdsArray = Array.from(uniqueProds).map((item) =>
    JSON.parse(item)
  );

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

function filterClassName(selectedClass) {
  let filterClass = selectedClass;
  if (filterClass === "First Class Mail") {
    filterClass = "First Class";
  }
  return filterClass;
}
