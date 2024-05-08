import * as d3 from "d3";
import { useEffect, useState } from "react";
import styles from "./classGraph.module.css";

const tooltipWidth = 130;
const tooltipHeight = 30;
const textMarginTop = 10;

export const TooltipServiceClassLevel = (props) => {
  const {
    xHover,
    hoverId,
    isHovering,
    setIsHovering,
    hoverHeight,
    propData,
    tooltipId,
    isHoveringProductText,
    selectedYear,
  } = props;

  const [tooltipPtsFromTarget, setTooltipPtsFromTarget] = useState("");
  const [tooltipFY, setTooltipFY] = useState("");

  useEffect(() => {
    d3.select(`#${tooltipId}`).style("opacity", 1);
    tooltipXPoz(xHover, tooltipId);
    tooltipYPoz(hoverHeight, tooltipId);

    setTooltipFY(returnTooltipFY(selectedYear));
    setTooltipPtsFromTarget(tooltipTextChange(hoverId, propData));

    drawStroke(hoverId, isHovering);
  }, [xHover, hoverId, isHovering]);

  useEffect(() => {
    renderTooltip(isHovering, tooltipId, isHoveringProductText);
  }, [isHovering, isHoveringProductText]);

  function drawStroke(hoverId, isHovering) {
    if (!isHovering) {
      d3.selectAll("rect").attr("stroke", "none");
    }
    if (hoverId) {
      const hoveredBarSelection = d3.select(`#${hoverId}`);
      d3.selectAll("rect").attr("stroke", "none");
      hoveredBarSelection.attr("stroke", "black").attr("stroke-width", "2px");
    }
  }

  const tooltipDiv = d3.select(`#${tooltipId}`);

  // const pointsFromTarget = calcPointsFromTargetAnnual(hoverId, propData);

  tooltipDiv
    .style("width", `${tooltipWidth}px`)
    .style("height", `${tooltipHeight}px`)
    .on("mouseover", () => {
      setIsHovering(true);
      tooltipDiv.style("opacity", 1);
    });

  return (
    <div id={tooltipId} className={styles.classGraphTooltip}>
      <span style={{ marginTop: textMarginTop, marginBottom: "5px" }}>
        <div>{tooltipFY}</div>
        {tooltipPtsFromTarget}
      </span>
    </div>
  );
};

function renderTooltip(isHovering, tooltipId, isHoveringProductText) {
  const tooltipDiv = d3.select(`#${tooltipId}`);
  if (isHovering && !isHoveringProductText) {
    tooltipDiv.style("opacity", 1);
  } else {
    tooltipDiv.style("opacity", 0);
    d3.selectAll("rect").attr("stroke", "none");
  }
}

function tooltipXPoz(xHover, tooltipId) {
  const tooltipDiv = d3.select(`#${tooltipId}`);

  let outputVal;
  const xPush = 50;

  outputVal = xHover + xPush;

  tooltipDiv.transition().duration(200).style("left", `${outputVal}px`);
}

function tooltipYPoz(hoverHeight, tooltipId) {
  const tooltipDiv = d3.select(`#${tooltipId}`);
  let outputVal;
  const midpoint = hoverHeight / 1.5;

  outputVal = midpoint;

  outputVal *= -1;
  outputVal -= 100;

  tooltipDiv.style("top", `${outputVal}px`);
}

function returnTooltipFY(selectedYear) {
  return `Points from  FY${selectedYear}`;
}

function tooltipTextChange(hoverId, propData) {
  let pointsFromTarget;

  pointsFromTarget = calcPointsFromTargetAnnual(hoverId, propData);

  let pointDiffColor = "redPoints";
  if (pointsFromTarget <= 0) {
    pointDiffColor = "greenPoints";
  }

  return (
    <>
      <span className={styles.pointsFromTargetLabel}>Target:</span>
      <span className={`${styles[pointDiffColor]}`}>{pointsFromTarget}</span>
    </>
  );
}

function calcPointsFromTargetAnnual(hoverId, propData) {
  const idList = hoverId.split("_");
  const productId = parseInt(idList[1]);
  const yearVal = parseInt(idList[2]);

  let pointsFromTarget;
  let hoveredRow;

  if (propData) {
    hoveredRow = propData
      .filter((row) => row.fy === yearVal)
      .filter((row) => row.product_id === productId);

    if (hoveredRow.length > 0) {
      hoveredRow = hoveredRow[0];
      pointsFromTarget = hoveredRow.target - hoveredRow.pct_on_time;
      pointsFromTarget = pointsFromTarget.toFixed(2);
    }
  }

  return pointsFromTarget;
}

export default TooltipServiceClassLevel;
