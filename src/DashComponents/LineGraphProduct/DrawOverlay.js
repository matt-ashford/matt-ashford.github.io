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
  //   const leftPush =

  //   const rectWidth = svgWidth / xArray.length - 2;
  const rectWidth = svgWidth / xArray.length;

  svgSelection
    .selectAll(".overlayRect")
    .data(xArray)
    .enter()
    .append("rect")
    .attr("class", "overlayRect")
    .attr("x", (d) => xScale(d) + marginLeft)
    .attr("y", (d) => 1)
    .attr("width", rectWidth)
    .attr("height", graphHeight)
    .attr("opacity", 0.2)
    .style("fill", "brown")
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
