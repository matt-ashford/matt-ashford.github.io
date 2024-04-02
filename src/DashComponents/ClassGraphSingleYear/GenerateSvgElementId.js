export const generateSvgElementId = (shape, rowData) => {
  if (typeof rowData === "undefined") {
    return 0;
  }
  const { product, delivery_speed, fy } = rowData;
  const shapeTextMap = {
    line: "targetLine",
    rect: "classBar",
  };

  let idOutput = `${shapeTextMap[shape]}_${product}_${delivery_speed}_${fy}`;
  idOutput = idOutput.replace(/\+s/g, "_");
  idOutput = idOutput.replace(/\s/g, "_");
  return idOutput;
};
