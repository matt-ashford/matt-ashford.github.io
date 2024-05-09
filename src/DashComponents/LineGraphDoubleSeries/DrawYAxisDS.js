import * as d3 from "d3";

import {
  yScaleRev,
  marginLeft,
  marginTop,
  graphWidth,
  marginRight,
  // marginLeft,
} from "./LineGraphDimensionsDS";

const leftPushYAxis = -10;

const tickWidth = graphWidth - marginRight - marginLeft;

export const drawYAxis = ({ svgId }) => {
  d3.select(`#${svgId}`)
    .append("g")
    // .style("opacity", 0.3)
    // .call(d3.axisLeft(yScaleRev).tickSize(-5).ticks(5))
    .call(
      d3
        .axisLeft(yScaleRev)
        .tickSize(-tickWidth)
        .ticks(5)
        .tickFormat(d3.format(".0%"))
    )
    // .call(d3.axisLeft(yScaleRev).tickSize(0).ticks(5))
    // .call(d3.axisLeft(yScaleRev).tickSize(-tickWidth).ticks(10))
    .attr("transform", `translate(${marginLeft + leftPushYAxis},${marginTop})`)
    .attr("class", "lineGraphYAxis")
    .style("opacity", 0.7);
  d3.select(".domain").remove();
  d3.selectAll(".lineGraphYAxis").selectAll("text").style("opacity", 1);

  d3.select(`#${svgId}`)
    .append("text")
    .attr("class", "axisLabelDS")
    .text("% On-Time")
    .attr("transform", `translate(14,140) rotate(270)`)
    .attr("font-size", "0.8rem");
};
