import * as d3 from "d3";

import { yScale } from "../../Design/graphDimensions";

export const transitionBars = ({
  propData,
  oldBars,
  newBars,
  selectedYear,
  topStart,
  pinkHighlight,
}) => {
  const dataNew = propData.filter((row) => row.fy === selectedYear);
  const dataOld = propData.filter((row) => row.fy === selectedYear - 1);
  const transtionMs = 800;

  d3.selectAll(newBars)
    .data(dataNew)
    .attr("id", (d) => `${d.product_id}_${d.fy}`)
    .transition()
    .duration(transtionMs)
    .attr("y", (d) => topStart - yScale(d.pct_on_time))
    .attr("height", (d) => yScale(d.pct_on_time));

  d3.selectAll(oldBars)
    .data(dataOld)
    .transition()
    .duration(transtionMs)
    .attr("y", (d) => topStart - yScale(d.pct_on_time))
    .attr("height", (d) => yScale(d.pct_on_time))
    .attr("id", (d) => `${d.product_id}_${d.fy}`);

  d3.selectAll(".targetLines")
    .data(dataNew)
    .transition()
    .duration(transtionMs)
    .attr("y1", (d) => topStart - yScale(d.target))
    .attr("y2", (d) => topStart - yScale(d.target))
    .style("stroke", pinkHighlight)
    .style("stroke-width", 3)
    .attr("class", " graphicElementQuarter targetLines");

  // svg
  //   .selectAll(".targetTooltipRect")
  //   .data(data2020)
  //   .enter()
  //   .append("rect")
  //   .attr("x", (d, i) => i * interBarMargin + barMarginLeft)
  //   .attr("y", (d) => 0)
  //   .attr("height", (d) => topStart - yScale(d.target))
  //   .attr("width", barWidth * 2.5)
  //   .style("opacity", 0)
  //   .attr("class", "targetTooltipRect nonBarQuarter")
  //   .attr("id", (d) => `productTarget_${d.productId}`)
  //   .on("mouseover", function () {
  //     const currentTargetSelection = d3.select(this);

  //     mouseOverTriggersTarget(currentTargetSelection);
  //   })
  //   .on("mouseout", function () {
  //     const currentTargetSelection = d3.select(this);
  //     mouseOutTriggersTarget(currentTargetSelection);
  //   });
};
