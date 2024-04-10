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

  useEffect(() => {
    const tooltipId = "tooltipProduct";
    const tooltipSelected = d3.select(`#${tooltipId}`);

    tooltipXPoz(hoverSeq, tooltipId, xScale, isHoveringProdGraph, graphData);
  }, []);
  useEffect(() => {
    const tooltipId = "tooltipProduct";
    tooltipXPoz(hoverSeq, tooltipId, xScale, isHoveringProdGraph, graphData);
    tooltipYPoz(tooltipId, hoverSeq);
  }, [hoverSeq, isHoveringProdGraph]);

  useEffect(() => {
    const tooltipId = "tooltipProduct";

    fadeOutTooltip(tooltipId, isHoveringProdGraph);
  }, [isHoveringProdGraph]);

  const tooltipId = "tooltipProduct";
  const tooltipSelected = d3.select(`#${tooltipId}`);
  tooltipSelected.on("mouseenter", function () {
    setIsHoveringProdGraph(true);
  });
  const tooltipText = "sdfsdf";

  const tooltipXPozParams = {};

  return (
    <div id={tooltipId} className={styles.tooltipProduct}>
      <span>{tooltipText}</span>
    </div>
  );
};

function tooltipXPoz(
  hoverSeq,
  tooltipId,
  xScale,
  isHoveringProdGraph,
  graphData
) {
  const tooltipSelected = d3.select(`#${tooltipId}`);
  if (isHoveringProdGraph && tooltipSelected) {
    const xArrayHovered = matchXArray(hoverSeq);
    const xScalePozTooltip = xScale(xArrayHovered);
    const rightPush = determineRightPush(graphData);
    const additionalRightPush = 20;
    const xPozTooltip =
      xScalePozTooltip + rightPush + marginLeft + additionalRightPush;
    tooltipSelected
      .transition()
      .duration(200)
      .style("left", `${xPozTooltip}px`);
  }
}

function tooltipYPoz(tooltipId, hoverSeq) {
  const tooltipSelected = d3.select(`#${tooltipId}`);
  if (hoverSeq !== -1 && tooltipSelected) {
    const overlaySelected = d3.select(`#${hoverSeq}`);
    const overlayBoxHeight = overlaySelected.node().getBBox().height;

    const heightRatio = 0.4;
    const tooltipHeight = overlayBoxHeight * heightRatio * -1;

    tooltipSelected.style("top", `${tooltipHeight}px`);
  }
}

function fadeOutTooltip(tooltipId, isHoveringProdGraph) {
  const tooltipSelected = d3.select(`#${tooltipId}`);
  if (tooltipSelected) {
    // const currentOpacity = parseFloat(tooltipSelected.style("opacity"));

    //   if (currentOpacity >= 0 && currentOpacity <= 1) {
    const newOpacity = isHoveringProdGraph ? 1 : 0;
    tooltipSelected.style("opacity", newOpacity);
    // .transition().duration(200).
  }
  //   }
}

function matchXArray(hoverSeq) {
  if (hoverSeq === -1) {
    return 0;
  }

  const hoverSeqList = hoverSeq.split("_");
  if (hoverSeq.includes("Q")) {
    return `${hoverSeqList[1]}_${hoverSeqList[2]}`;
  }
  return hoverSeqList[1];
}

export default TooltipServiceProduct;
