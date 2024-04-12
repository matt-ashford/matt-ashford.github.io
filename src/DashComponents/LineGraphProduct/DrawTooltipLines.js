import * as d3 from "d3";
import {
  topStart,
  yScale,
  yScaleRev,
  marginLeft,
  marginTop,
  determineRightPush,
  svgWidth,
  graphHeight,
} from "./LineGraphDimensions";
import { svgHeight } from "../../Design/graphDimensionsLine";

export const drawTooltipLines = ({
  svgId,
  graphData,
  xScale,
  xArray,
  hoverSeq,
  setIsHoveringProdGraph,
}) => {
  const svgSelection = d3.select(`#${svgId}`);
  const rightPush = determineRightPush(graphData);
  const rectWidth = svgWidth / xArray.length;

  const bottomPush = 20;
  const extraHeight = 17;

  svgSelection
    .selectAll(".tooltipLines")
    .data(xArray)
    .enter()
    .append("line")
    .attr("class", "tooltipLines")
    .attr("x1", (d) => xScale(d) + marginLeft + rightPush)
    .attr("y1", bottomPush)
    .attr("x2", (d) => xScale(d) + marginLeft + rightPush)
    .attr("y2", svgHeight + bottomPush + extraHeight)
    .style("stroke", "black")
    .style("stroke-width", "2px")
    .attr("opacity", 0)
    .attr("id", (d) => `tooltipLineSeq_${d}`);
};

export default drawTooltipLines;
