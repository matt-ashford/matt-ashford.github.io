import * as d3 from "d3";

import { yScaleRev, marginLeft, marginTop } from "./LineGraphDimensions";

export const drawYAxis = ({ svgId }) => {
  d3.select(`#${svgId}`)
    .append("g")
    .call(
      d3.axisLeft(yScaleRev).tickSize(-5).ticks(5).tickFormat(d3.format(".0%"))
    )
    .attr("transform", `translate(${marginLeft},${marginTop})`)
    .attr("class", "lineGraphYAxis");
  // d3.select(".domain").remove();
  d3.selectAll(".lineGraphYAxis").selectAll("text").style("opacity", 1);

  d3.select(`#${svgId}`)
    .append("text")
    .text("% On-Time")
    .attr("x", 190)
    .attr("y", 20)
    .style("text-anchor", "middle")
    .attr("transform", "translate(-5,325) rotate(270)")
    .attr("font-size", "0.8rem")
    .attr("class", "lineGraphYAxis");
};
