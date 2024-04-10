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
} from "./LineGraphDimensions";

export const drawXAxis = ({ svgId, xScale }) => {
  let rotationDeg = 35;

  d3.select(".domain").remove();

  const svg = d3.select(`#${svgId}`);

  svg
    .append("g")
    .attr("class", "axis")
    .attr(
      "transform",
      `translate(${marginLeft}, ${graphHeight - marginBottom - 10})`
    )
    .call(d3.axisBottom(xScale).tickSize(5).ticks())
    .selectAll("text")
    .attr("class", "xAxisText")
    .style("text-anchor", "start")
    .attr("dy", "1em")
    .attr("transform", "rotate(35)");

  //   d3.selectAll(".tick").style("opacity", 0.2);

  d3.selectAll(".tick").selectAll("line");

  //   d3.select(".domain").style("opacity", 0.2);
  d3.selectAll(".xAxisText").style("opacity", 1);
};
