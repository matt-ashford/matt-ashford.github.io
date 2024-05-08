import * as d3 from "d3";

import { yScale } from "../../Design/graphDimensions";
import { generateSvgElementId } from "./GenerateSvgElementId";

export const transitionBars = ({
  propData,
  oldBars,
  newBars,
  selectedYear,
  topStart,
  pinkHighlight,
  mouseOutTriggersBar,
  mouseOverTriggersBar,
}) => {
  const dataNew = propData.filter((row) => row.fy === selectedYear);
  const dataOld = propData.filter((row) => row.fy === selectedYear - 1);
  const transtionMs = 800;

  d3.selectAll(newBars)
    .data(dataNew)
    .attr("id", (d) => generateSvgElementId("rect", d))
    .on("mouseover", function () {
      const currentBarSelection = d3.select(this);
      mouseOverTriggersBar(currentBarSelection);
    })
    .on("mouseout", () => {
      const currentBarSelection = d3.select(this);
      mouseOutTriggersBar(currentBarSelection);
    })
    .transition()
    .duration(transtionMs)
    .attr("y", (d) => topStart - yScale(d.pct_on_time))
    .attr("height", (d) => yScale(d.pct_on_time));
  d3.selectAll(oldBars)
    .data(dataOld)
    .attr("id", (d) => generateSvgElementId("rect", d))
    .transition()
    .duration(transtionMs)
    .attr("y", (d) => topStart - yScale(d.pct_on_time))
    .attr("height", (d) => yScale(d.pct_on_time));
  d3.selectAll(".targetLines")
    .data(dataNew)
    .attr("id", (d) => generateSvgElementId("line", d))
    .transition()
    .duration(transtionMs)
    .attr("y1", (d) => topStart - yScale(d.target))
    .attr("y2", (d) => topStart - yScale(d.target))
    .style("stroke", pinkHighlight)
    .style("stroke-width", 3)
    .attr("class", " graphicElementQuarter targetLines");
};
