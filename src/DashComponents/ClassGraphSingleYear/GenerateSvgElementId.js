export const generateSvgElementId = (shape, rowData) => {
  if (typeof rowData === "undefined") {
    return 0;
  }
  const { product_id, fy } = rowData;
  const shapeTextMap = {
    line: "targetLine",
    rect: "classBar",
  };

  let idOutput = `${shapeTextMap[shape]}_${product_id}_${fy}`;

  return idOutput;
};
