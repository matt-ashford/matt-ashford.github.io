import * as d3 from "d3";

import { yScaleRev, marginLeft, marginTop } from "./LineGraphDimensionsDS";

const leftPushYAxis = -10;

export const drawYAxis = ({ svgId }) => {
  d3.select(`#${svgId}`)
    .append("g")
    // .style("opacity", 0.3)
    .call(d3.axisLeft(yScaleRev).tickSize(-5).ticks(5))
    .attr("transform", `translate(${marginLeft + leftPushYAxis},${marginTop})`)
    .attr("class", "lineGraphYAxis");
  d3.select(".domain").remove();
  d3.selectAll(".lineGraphYAxis").selectAll("text").style("opacity", 1);
};
