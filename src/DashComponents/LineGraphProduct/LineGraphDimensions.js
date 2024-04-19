// import { scaleLinear } from "d3";
import * as d3 from "d3";
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

export const yScale = d3.scaleLinear().domain([0, 100]).range([0, 250]);
export const yScaleRev = d3.scaleLinear().domain([0, 100]).range([250, 0]);
// export const yScaleRev = d3.scaleLinear().domain([0, 100]).range([150, 0]);

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
