import { useEffect, useState } from "react";
import styles from "./LineGraph.module.css";
import * as d3 from "d3";
import { determineRightPush, marginLeft } from "./LineGraphDimensions";

export const TooltipServiceProduct = (props) => {
  const {
    graphData,
    setIsHoveringProdGraph,
    isHoveringProdGraph,
    xArray,
    svgId,
    hoverSeq,
    xScale,
  } = props;

  //   useEffect(() => {
  //     // tooltipXPoz(hoverSeq, tooltipSelected, xScale, isHoveringProdGraph);
  //     changeTooltipColor(tooltipSelected);
  //   }, []);
  useEffect(() => {
    tooltipXPoz(
      hoverSeq,
      tooltipSelected,
      xScale,
      isHoveringProdGraph,
      graphData
    );
    tooltipYPoz(tooltipSelected, hoverSeq, svgId);
  }, [hoverSeq, isHoveringProdGraph]);
  //   }, [hoverSeq]);

  useEffect(() => {
    fadeOutTooltip(tooltipSelected, isHoveringProdGraph);
  }, [isHoveringProdGraph]);

  const tooltipId = "tooltipProduct";
  const tooltipSelected = d3.select(`#${tooltipId}`);
  const svgSelected = d3.select(`#${svgId}`);
  const tooltipText = "asdffasf";

  tooltipSelected.on("mouseenter", () => setIsHoveringProdGraph(true));

  return (
    <div id={tooltipId} className={styles.tooltipProduct}>
      <span>{tooltipText}</span>
    </div>
  );
};

// function changeTooltipColor(tooltipSelected) {
//   tooltipSelected.style("background-color", "blue").style("left", `600px`);
// }

function tooltipXPoz(
  hoverSeq,
  tooltipSelected,
  xScale,
  isHoveringProdGraph,
  graphData
) {
  if (isHoveringProdGraph) {
    const xArrayHovered = matchXArray(hoverSeq);
    const xScalePozTooltip = xScale(xArrayHovered);
    const rightPush = determineRightPush(graphData);
    const additionalRightPush = 20;
    const xPozTooltip =
      xScalePozTooltip + rightPush + marginLeft + additionalRightPush;

    fadeOutTooltip(tooltipSelected, isHoveringProdGraph);

    tooltipSelected
      .transition()
      .duration(200)
      .style("left", `${xPozTooltip}px`)
      .style("background-color", "blue");
  }
}

function tooltipYPoz(tooltipSelected, hoverSeq, svgId) {
  const overlaySelected = d3.select(`#${hoverSeq}`);
  const overlayBoxHeight = overlaySelected.node().getBBox().height;

  const heightRatio = 0.5;
  const tooltipHeight = overlayBoxHeight * heightRatio * -1;

  tooltipSelected.style("top", `${tooltipHeight}px`);
}

function fadeOutTooltip(tooltipSelected, isHoveringProdGraph) {
  const currentOpacity = parseFloat(tooltipSelected.style("opacity"));
  if (currentOpacity >= 0 && currentOpacity <= 1) {
    const newOpacity = isHoveringProdGraph ? 1 : 0;
    tooltipSelected.style("opacity", newOpacity);
    // .transition().duration(200).
  }
}

function matchXArray(hoverSeq) {
  const hoverSeqList = hoverSeq.split("_");
  if (hoverSeq.includes("Q")) {
    return `${hoverSeqList[1]}_${hoverSeqList[2]}`;
  }
  return hoverSeqList[1];
}

export default TooltipServiceProduct;
