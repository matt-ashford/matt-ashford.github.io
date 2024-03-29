export const sortPropData = (inputData) => {
  //   console.log(inputData);
  const mailClass = inputData[0].mail_class;

  const inputData_sortProp = inputData.map((row) => {
    const sortProp =
      row.product_abbrev === null ? row.product : row.product_abbrev;
    return { sortProp, ...row };
  });

  const firstClassOrder = {
    "SPLC 2 Day": 0,
    "SPLC 3-5 Day": 1,
    "Prst 2 Day": 2,
    "Prst 3-5 Day": 3,
    "Prst Overnight": 4,
    "Flats Overnight": 5,
    "Flats 2 Day": 6,
    "Flats 3-5 Day": 7,
    "Int'l Outbound": 8,
    "Int'l Inbound": 9,
  };

  const markMailOrder = {
    Letters: 0,
    Flats: 1,
    "Carrier Route": 2,
    HDSL: 3,
    HDSF: 4,
    "EDDM-Retail": 5,
    Parcels: 6,
  };

  const allClassOrders = {
    "First Class": firstClassOrder,
    "Marketing Mail": markMailOrder,
  };

  let inputDataWithOrder = inputData_sortProp;

  let rez = inputDataWithOrder;

  rez = sortByClass(mailClass, inputData_sortProp, allClassOrders);

  return rez;
};

function sortByClass(className, inputData_sortProp, allClassOrders) {
  let sortedData = inputData_sortProp;

  if (!Object.keys(allClassOrders).some((key) => key === className)) {
    return sortedData;
  }

  const orderObj = allClassOrders[className];

  const inputDataWithOrder = inputData_sortProp.map((row) => {
    const orderNumber = orderObj[row.sortProp];
    return { orderNumber, ...row };
  });

  sortedData = inputDataWithOrder.sort((a, b) => {
    return a.orderNumber - b.orderNumber;
  });

  //   console.log(sortedData.map((row) => row.product));
  //   console.log(inputDataWithOrder);

  return sortedData;
}
