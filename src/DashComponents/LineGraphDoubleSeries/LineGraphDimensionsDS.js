// import { scaleLinear } from "d3";
import * as d3 from "d3";
const classGraphDims = {
  graphHeight: 300,
  graphWidth: 500,
  graphWidthProduct: 675,
  productTextMarginLeft: 25,
  targetMarginLeft: 11,
  barWidth: 20,
  marginLeft: 50,
  marginRight: 40,
  marginBottom: 10,
  marginTop: 10,
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

export const topStart = graphHeight - marginBottom - marginTop - 40;
export const bottomStart = 10;

export const yScale = d3
  .scaleLinear()
  .domain([0, 100])
  .range([bottomStart, topStart]);
export const yScaleRev = d3
  .scaleLinear()
  .domain([0, 100])
  .range([topStart, bottomStart]);

export const svgWidth = graphWidth - marginLeft - marginRight;

export const determineRightPush = (graphData) => {
  const firstObs = graphData[0];
  const annualPush = 75;
  const quarterlyPush = 18;
  // if (Object.keys(firstObs).includes("quarter")) {
  if (firstObs.quarter !== "annual") {
    return quarterlyPush;
  }

  return annualPush;
};

export default yScale;
