import * as d3 from "d3";

const classGraphDims = {
  graphHeight: 300,
  graphWidth: 820,
  graphWidthProduct: 750,
  productTextMarginLeft: 25,
  targetMarginLeft: 11,
  barWidth: 20,
  marginLeft: 45,
  marginRight: 40,
  marginBottom: 30,
  marginTop: 20,
  barMarginLeft: 40 + 20,
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

export const yScale = d3.scaleLinear().domain([0, 100]).range([0, 250]);
export const yScaleRev = d3.scaleLinear().domain([0, 100]).range([250, 0]);

export default yScale;
