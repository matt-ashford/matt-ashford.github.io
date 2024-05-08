import * as d3 from "d3";
import { textNodeFont } from "../../Design/MyTheme";

import { marginTop, marginLeft } from "../../Design/graphDimensions";

export const drawTicks = (svgId, yScaleRev, svgWidth) => {
  d3.select(`#${svgId}`)
    .append("g")
    // .call(d3.axisLeft(yScaleRev).tickSize(-svgWidth).ticks(5))
    .call(
      d3
        .axisLeft(yScaleRev)
        .tickSize(-svgWidth)
        .ticks(5)
        .tickFormat(d3.format(".0%"))
    )
    .attr("transform", `translate(${marginLeft},${marginTop})`)
    .attr("class", "graphicElement axisTicks nonBar")
    .style("opacity", 0.7);
  // d3.select(".domain").remove();
  d3.selectAll(".axisTicks").selectAll("text").style("opacity", 1);

  d3.selectAll(".targetLines").style("opacity", 1);

  d3.selectAll(".barOldData");
};
