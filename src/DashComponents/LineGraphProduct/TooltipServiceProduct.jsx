import { useEffect, useState } from "react";
import styles from "./LineGraph.module.css";
import * as d3 from "d3";

export const TooltipServiceProduct = (props) => {
  const { graphData, isHoveringProdGraph, xArray, svgId, hoverSeq, xScale } =
    props;

  //   useEffect(() => {
  //     // tooltipXPoz(hoverSeq, tooltipSelected, xScale, isHoveringProdGraph);
  //     changeTooltipColor(tooltipSelected);
  //   }, []);
  useEffect(() => {
    console.log(isHoveringProdGraph);

    tooltipXPoz(hoverSeq, tooltipSelected, xScale, isHoveringProdGraph);
  }, [hoverSeq, isHoveringProdGraph]);

  const tooltipId = "tooltipProduct";
  const tooltipSelected = d3.select(`#${tooltipId}`);
  const svgSelected = d3.select(`#${svgId}`);

  const tooltipText = "asdffasf";

  return (
    <div id={tooltipId} className={styles.tooltipProduct}>
      <span>{tooltipText}</span>
    </div>
  );
};

// function changeTooltipColor(tooltipSelected) {
//   tooltipSelected.style("background-color", "blue").style("left", `600px`);
// }

function tooltipXPoz(hoverSeq, tooltipSelected, xScale, isHoveringProdGraph) {
  if (isHoveringProdGraph) {
    const xArrayHovered = matchXArray(hoverSeq);
    const xPozTooltip = xScale(xArrayHovered);
    // console.log(xPozTooltip);

    tooltipSelected
      .transition()
      .duration(200)
      .style("left", `600px`)
      .style("background-color", "blue");
  }
}

function matchXArray(hoverSeq) {
  return hoverSeq.split("_")[0];
}

export default TooltipServiceProduct;
