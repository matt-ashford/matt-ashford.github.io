import { filter } from "d3";

export const createDropDownData = (fullDataset, selectedClass) => {
  let filterClass = selectedClass;
  if (filterClass === "First Class Mail") {
    filterClass = "First Class";
  }

  const classLevelData = fullDataset.filter(
    // (row) => row.mail_class === selectedClass && row.fy === selectedYear
    (row) => row.mail_class === filterClass
  );

  console.log(classLevelData);
  //   console.log(selectedClass);

  const uniqueProds = new Set();
  classLevelData.forEach((row) => {
    if (filterClass === "First Class") {
      uniqueProds.add(`${row.product} ${row.delivery_speed}`);
    } else {
      uniqueProds.add(row.product);
    }
  });
  const productNameList = Array.from(uniqueProds).map((productName) => {
    return productName;
  });

  productNameList.unshift("none");

  return productNameList;
};

// function returnFullProductName(element) {
//   const productName = element.product;
//   const deliverySpeed = element.deliverySpeed;
//   const subProductName = element.subProductName;

//   if (isFirstClass & (productName === "none")) {
//     return productName;
//   }

//   if (isFirstClass & (productName === "Flats")) {
//     return `${subProductName} (${deliverySpeed})`;
//   } else if (isFirstClass) {
//     return `${productName} (${deliverySpeed})`;
//   } else {
//     return `${productName}`;
//   }
// }

// const isFirstClass = mailClassState === "First Class Mail" ? true : false;

// productList.push({
//   class: mailClassState,
//   fy: 2019,
//   product: "none",
//   productId: 0,
// });
