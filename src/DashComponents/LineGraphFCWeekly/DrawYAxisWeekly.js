import * as d3 from "d3";

import {
  yScaleRev,
  marginLeft,
  marginTop,
  graphWidth,
  marginRight,
  // marginLeft,
} from "./LineGraphDimensionsWeekly.js";

const leftPushYAxis = -10;

const tickWidth = graphWidth - marginRight - marginLeft;

export const drawYAxisWeekly = ({ svgId }) => {
  d3.select(`#${svgId}`)
    .append("g")
    .call(
      d3.axisLeft(yScaleRev).tickSize(5).ticks(5).tickFormat(d3.format(".0%"))
    )
    .attr("transform", `translate(${marginLeft + leftPushYAxis},${marginTop})`)
    .attr("class", "lineGraphYAxis");

  d3.select(`#${svgId}`)
    .append("text")
    .attr("class", "axisLabelDS")
    .text("% On-Time")
    .attr("transform", `translate(${10},130) rotate(270)`)
    .attr("font-size", "0.8rem");
};
