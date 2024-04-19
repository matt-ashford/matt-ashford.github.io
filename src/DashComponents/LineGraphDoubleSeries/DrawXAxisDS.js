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
  bottomStart,
  svgWidth,
} from "./LineGraphDimensionsDS";

export const drawXAxis = ({ svgId, xScale }) => {
  let rotationDeg = 35;

  d3.select(".domain").remove();

  const svg = d3.select(`#${svgId}`);

  function customFormat(e) {
    if (e.includes("Q1")) {
      const matchingYear = e.split("_")[1];

      return matchingYear;
    }
    return "";
  }

  const xLabelDownPush = 40;
  const xLabelRightPush = svgWidth / 2;

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${marginLeft}, ${topStart + bottomStart})`)
    .call(d3.axisBottom(xScale).tickSize(5).tickFormat(customFormat))
    .selectAll("text")
    .attr("class", "xAxisText")
    .style("text-anchor", "start")
    .attr("dx", 2)
    // .attr("dy", "1em")
    .attr("transform", "rotate(35)")
    .attr("shape-rendering", "crispEdges");
  // .attr("transform", `translate(${marginLeft}, 6)`);

  //   d3.selectAll(".tick").style("opacity", 0.2);

  svg
    .append("text")
    .attr("class", "axisLabelDS")
    .text("Fiscal Year")
    .attr(
      "transform",
      `translate(${xLabelRightPush},  ${
        topStart + bottomStart + xLabelDownPush
      })`
    )
    .attr("font-size", "0.7rem");

  d3.select(".domain").style("opacity", 0);
  d3.selectAll(".xAxisText").style("opacity", 1);
};
