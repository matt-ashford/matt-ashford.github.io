import * as d3 from "d3";
import { primaryColor, secondaryColor } from "../../Design/MyTheme";
import { yScale, barWidth } from "../../Design/graphDimensions";

export const drawBars = ({
  svgId,
  propData,
  selectedYear,
  barXPoz,
  topStart,
}) => {
  const dataNew = propData.filter((row) => row.fy === selectedYear);
  const dataOld = propData.filter((row) => row.fy === selectedYear - 1);

  console.log("frm drawbars", propData);

  d3.select(`#${svgId}`)
    .selectAll(".barOldData")
    .data(dataOld)
    .enter()
    .append("rect")
    .attr("x", (d, i) => barXPoz(i))
    .attr("width", barWidth)
    .attr("height", (d) => yScale(d.pct_on_time))
    .attr("fill", secondaryColor)
    .attr("class", "graphicElement barOldData")
    .attr("id", (d) => `classBar_${d.productId}_${d.fy}`)
    .attr("y", (d) => topStart - yScale(d.pct_on_time));

  // .on("mouseover", function () {
  //   const currentBarSelection = d3.select(this);

  //   mouseOverTriggers(currentBarSelection);
  // })
  // .on("mouseout", () => {
  //   const currentBarSelection = d3.select(this);
  //   mouseOutTriggers(currentBarSelection);
  // });

  d3.select(`#${svgId}`)
    .selectAll(".barNewData")
    .data(dataNew)
    .enter()
    .append("rect")
    .attr("x", (d, i) => barXPoz(i) + barWidth)
    .attr("y", (d) => topStart - yScale(d.pct_on_time))
    .attr("height", (d) => yScale(d.pct_on_time))
    .attr("width", barWidth)
    .attr("fill", primaryColor)
    .attr("class", "graphicElement barNewData")
    .attr("id", (d) => `classBar_${d.productId}_${d.fy}`)
    .raise();

  // .on("mouseover", function () {
  //   const currentBarSelection = d3.select(this);

  //   mouseOverTriggers(currentBarSelection);
  // })
  // .on("mouseout", () => {
  //   const currentBarSelection = d3.select(this);
  //   mouseOutTriggers(currentBarSelection);
  // });
};
