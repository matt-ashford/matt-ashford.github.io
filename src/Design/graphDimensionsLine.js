const outsideObjMargin = { top: 10, right: 20, bottom: 10, left: 40 };

const lineDims = {
  margin: outsideObjMargin,
  svgHeightFull: 200,
  svgHeight: 200 - outsideObjMargin.top - outsideObjMargin.bottom,
  svgWidth: 420 - outsideObjMargin.right - outsideObjMargin.left,
  interDotX: 95,
};

export const { margin, svgHeight, svgHeightFull, svgWidth, interDotX } =
  lineDims;
