import * as d3 from "d3";
import { primaryColor, secondaryColor } from "../../Design/MyTheme";
import { yScale, barWidth } from "../../Design/graphDimensions";
import { generateSvgElementId } from "./GenerateSvgElementId";

export const drawBars = ({
  svgId,
  propData,
  selectedYear,
  barXPoz,
  topStart,
  mouseOutTriggersBar,
  mouseOverTriggersBar,
}) => {
  //   propData = propData.filter((row) => row.target !== null);

  const dataNew = propData.filter((row) => row.fy === selectedYear);
  const dataOld = propData.filter((row) => row.fy === selectedYear - 1);

  const barPoz1 = barXPoz(1);
  const barPoz2 = barXPoz(2);
  const barPozDiff = barPoz1 - barPoz2;

  //   console.table("frm drawbars", propData);
  //   console.table("frm drawbars", barPozDiff);

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
    .attr("id", (d) => generateSvgElementId("rect", d))
    .attr("y", (d) => topStart - yScale(d.pct_on_time));

  // .on("mouseover", function () {
  //   const currentBarSelection = d3.select(this);

  //   mouseOverTriggersBar(currentBarSelection);
  // })
  // .on("mouseout", () => {
  //   const currentBarSelection = d3.select(this);
  //   mouseOutTriggersBar(currentBarSelection);
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
    .attr("id", (d) => generateSvgElementId("rect", d))
    .raise()

    .on("mouseover", function () {
      const currentBarSelection = d3.select(this);

      mouseOverTriggersBar(currentBarSelection);
    })
    .on("mouseout", () => {
      const currentBarSelection = d3.select(this);
      mouseOutTriggersBar(currentBarSelection);
    });
};
