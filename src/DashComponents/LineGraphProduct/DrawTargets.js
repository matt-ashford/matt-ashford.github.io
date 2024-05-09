import * as d3 from "d3";
import {
  topStart,
  yScale,
  yScaleRev,
  marginLeft,
  marginTop,
  determineRightPush,
} from "./LineGraphDimensions";

export const drawTargets = ({ svgId, graphData, xScale, xArray }) => {
  const svgSelection = d3.select(`#${svgId}`);

  const rightPush = determineRightPush(graphData);

  // console.log(graphData.map((row) => yScale(row.target)));
  // console.log(graphData.map((row) => row.pct_on_time));
  // console.log(graphData.map((row) => row.target));
  // console.log(JSON.stringify(graphData));

  //orig func, vertical lines
  const valueline = d3
    .line()
    .x((d, i) => xScale(xArray[i]) + marginLeft + rightPush)
    .y((d) => topStart - marginTop - yScale(d.target))
    .curve(d3.curveStepBefore);
  // .curve(d3.curveStep);

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

  // // omitting vertical lines (doesn't look gret)
  // function returnX2(row) {
  //   if (row.quarter === "annual") {
  //     return 136;
  //   }
  //   return 42;
  // }

  // svgSelection
  //   // .selectAll(".lineGraphSingleProductTarget")
  //   .selectAll(".lineGraphTarget")
  //   .data(graphData)
  //   .enter()
  //   .append("line")
  //   .attr(
  //     "id",
  //     (d, i) => `singleProdTarget ${i}_${d.target}_${yScale(d.target)}`
  //   )
  //   .attr("x1", (d, i) => xScale(xArray[i]) + marginLeft + rightPush - 40)
  //   // .attr("x2", (d, i) => xScale(xArray[i]) + marginLeft + rightPush + 40)
  //   .attr(
  //     "x2",
  //     (d, i) => xScale(xArray[i]) + marginLeft + rightPush + returnX2(d)
  //   )
  //   .attr("y1", (d) => topStart - marginTop - yScale(d.target))
  //   .attr("y2", (d) => topStart - marginTop - yScale(d.target))
  //   .attr("stroke-width", 1.52)
  //   .attr("stroke-dasharray", "5,5")
  //   .style("opacity", 0.7)
  //   .attr("stroke", "red")
  //   .attr("class", "lineGraphTarget");
  // // .attr("class", "lineGraphSingleProductTarget");
};
