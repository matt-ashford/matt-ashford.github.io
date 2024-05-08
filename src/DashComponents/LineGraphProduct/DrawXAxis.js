import * as d3 from "d3";

import {
  yScaleRev,
  marginLeft,
  marginTop,
  graphHeight,
  graphWidth,
  topStart,
  marginRight,
  marginBottom,
  svgWidth,
} from "./LineGraphDimensions";
import { svgHeight } from "../../Design/graphDimensionsLine";

export const drawXAxis = ({ svgId, xScale }) => {
  // console.log(xScale);
  // console.log("asdfdsdf");

  let rotationDeg = 35;

  const svg = d3.select(`#${svgId}`);

  function customFormat(e) {
    if (e.includes("Q1")) {
      const matchingYear = e.split("_")[1];

      return matchingYear;
    }
    if (!e.includes("_")) {
      return e;
    }
    return "";
  }
  svg.attr("shape-rendering", "geometricPrecision");

  svg
    .append("g")
    .attr("class", "axis")
    .attr(
      "transform",
      `translate(${marginLeft}, ${graphHeight - marginBottom - 10})`
    )
    .call(d3.axisBottom(xScale).tickSize(5).tickFormat(customFormat))
    .selectAll("text")
    .attr("class", "xAxisText")
    .style("text-anchor", "start")
    .attr("dx", 2)
    .attr("transform", "rotate(35)");

  svg
    .append("text")
    .selectAll("text")
    .attr("class", "xAxisText")
    .style("text-anchor", "start")
    .attr("dy", "1em")
    .attr("transform", "rotate(35)");

  svg
    .append("text")
    .attr("class", "xAxisText")
    .text("Fiscal Year")
    .attr(
      "transform",
      `translate(${svgWidth / 2 + 10}, ${graphHeight - marginBottom + 30} )`
    )
    .attr("font-size", "0.9rem");
};
