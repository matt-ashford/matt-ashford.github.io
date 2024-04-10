import * as d3 from "d3";
import {
  topStart,
  yScale,
  marginLeft,
  marginTop,
  determineRightPush,
} from "./LineGraphDimensions";

export const drawTargets = ({ svgId, graphData, xScale, xArray }) => {
  const svgSelection = d3.select(`#${svgId}`);

  const rightPush = determineRightPush(graphData);

  const valueline = d3
    .line()
    .x((d, i) => xScale(xArray[i]) + marginLeft + rightPush)
    .y((d) => topStart - marginTop - yScale(d.target))
    // .curve(d3.curveStepAfter);
    // .curve(d3.curveStepBefore);
    .curve(d3.curveStep);

  //   const linePath = svgSelection
  svgSelection
    .append("path")
    .datum(graphData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.52)
    .attr("stroke-dasharray", "5,5")
    .attr("class", "lineGraphTarget")
    .attr("d", valueline)
    .attr("shape-rendering", "auto")
    .style("opacity", 0.7);
  // .transition()
  // .duration(400)
  // .style("opacity", 1);
};
