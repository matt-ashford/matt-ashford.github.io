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
} from "./LineGraphDimensionsWeekly.js";

export const drawXAxis = ({ svgId, xScale }) => {
  let rotationDeg = 35;

  const svg = d3.select(`#${svgId}`);

  const xLabelDownPush = 42;
  const xLabelRightPush = svgWidth / 2;

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${marginLeft}, ${topStart + bottomStart})`)
    .call(d3.axisBottom(xScale).ticks(13).tickSize(5))
    .selectAll("text")
    .attr("class", "xAxisText")
    .style("text-anchor", "middle")
    .attr("shape-rendering", "crispEdges");

  svg
    .append("text")
    .attr("class", "axisLabelDS")
    .text("Fiscal Week")
    .attr(
      "transform",
      `translate(${xLabelRightPush},  ${
        topStart + bottomStart + xLabelDownPush
      })`
    )
    .attr("font-size", "0.7rem");

  // d3.select(".domain").style("opacity", 0);
  d3.selectAll(".xAxisText").style("opacity", 1);
};
