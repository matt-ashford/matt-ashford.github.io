const outsideObjMargin = { top: 10, right: 5, bottom: 10, left: 20 };

const lineDims = {
  margin: outsideObjMargin,
  svgHeightFull: 200,
  svgHeight: 200 - outsideObjMargin.top - outsideObjMargin.bottom,
  svgWidth: 350 - outsideObjMargin.right - outsideObjMargin.left,
  interDotX: 95,
};

export const { margin, svgHeight, svgHeightFull, svgWidth, interDotX } =
  lineDims;
