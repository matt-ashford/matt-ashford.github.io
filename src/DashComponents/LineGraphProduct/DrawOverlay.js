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

export const drawOverLay = ({
  svgId,
  graphData,
  xScale,
  xArray,
  setHoverSeq,
  setIsHoveringProdGraph,
}) => {
  const svgSelection = d3.select(`#${svgId}`);

  const rightPush = determineRightPush(graphData);

  const rectWidth = svgWidth / xArray.length;
  // const rectWidth = svgWidth / xArray.length - 1;

  svgSelection
    .selectAll(".overlayRect")
    .data(xArray)
    .enter()
    .append("rect")
    .attr("class", "overlayRect")
    .attr("x", (d) => xScale(d) + marginLeft + rightPush)
    .attr("y", (d) => 1)
    .attr("width", rectWidth)
    .attr("height", graphHeight)
    // .attr("opacity", 0.3)
    .attr("opacity", 0)
    .attr("id", (d) => `overlay_${d}`)
    .on("mouseenter", function (event, d) {
      setHoverSeq(this.id);
      setIsHoveringProdGraph(true);
      d3.select(this).raise();
    });
  // .on("mousemove", handleMouseMove)
  // .on("mouseleave", handleMouseLeave);
};

export default drawOverLay;
