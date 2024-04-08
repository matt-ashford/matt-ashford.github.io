import { scaleLinear } from "d3";
const classGraphDims = {
  graphHeight: 320,
  graphWidth: 820,
  graphWidthProduct: 675,
  // graphWidthProduct: 750,
  productTextMarginLeft: 25,
  targetMarginLeft: 11,
  barWidth: 20,
  marginLeft: 45,
  marginRight: 40,
  marginBottom: 30,
  marginTop: 20,
  barMarginLeft: 40 + 30,
};

export const {
  marginBottom,
  graphHeight,
  graphWidth,
  graphWidthProduct,
  productTextMarginLeft,
  targetMarginLeft,
  barWidth,
  marginLeft,
  marginRight,
  barMarginLeft,
  marginTop,
} = classGraphDims;

export const topStart = graphHeight - marginBottom;

export const yScale = scaleLinear().domain([0, 100]).range([0, 250]);
export const yScaleRev = scaleLinear().domain([0, 100]).range([250, 0]);

const svgWidth = graphWidth - marginLeft - marginRight;

export const getInterBarMargin = (graphData) => {
  const barCount = graphData.length;
  let innerGraphLen = svgWidth / 2;
  //   const interBarDist = svgWidth / barCount;
  const interBarDist = innerGraphLen / barCount;

  return interBarDist;
};

export default yScale;
