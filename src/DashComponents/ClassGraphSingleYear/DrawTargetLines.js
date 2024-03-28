import * as d3 from "d3";
import {
  primaryColor,
  secondaryColor,
  pinkHighlight,
} from "../../Design/MyTheme";
import {
  yScale,
  barWidth,
  marginLeft,
  targetMarginLeft,
  barMarginLeft,
} from "../../Design/graphDimensions";

export const drawTargetLines = ({
  svgId,
  propData,
  selectedYear,
  topStart,
  getInterBarMargin,
  extraBarMargin,
}) => {
  const dataNew = propData.filter((row) => row.fy === selectedYear);
  const dataOld = propData.filter((row) => row.fy === selectedYear - 1);

  const interBarMargin = getInterBarMargin(dataNew);
  d3.select(`#${svgId}`)
    .selectAll(".targetLines")
    .data(dataNew)
    .enter()
    .append("line")
    .attr(
      "x1",
      (d, i) =>
        i * interBarMargin + marginLeft + targetMarginLeft + extraBarMargin
    )
    .attr("y1", (d) => topStart - yScale(d.target))
    .attr(
      "x2",
      (d, i) =>
        i * interBarMargin +
        barWidth * 2 +
        barMarginLeft +
        targetMarginLeft +
        extraBarMargin
    )
    .attr("y2", (d) => topStart - yScale(d.target))
    .style("stroke", pinkHighlight)
    .style("stroke-width", 3)
    .attr("class", "graphicElement targetLines nonBar");
};
