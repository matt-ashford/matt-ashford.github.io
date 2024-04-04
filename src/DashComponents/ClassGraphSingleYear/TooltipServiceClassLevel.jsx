import * as d3 from "d3";
import { useEffect, useState } from "react";
import { pinkHighlight, greenGrey } from "../../Design/MyTheme";
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
    tooltipParams,
    isHoveringProductText,
    selectedYear,
  } = props;

  const { barXPoz, topStart, barWidth, yScale } = tooltipParams;

  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    d3.select(`#${tooltipId}`).style("opacity", 1);
    tooltipXPoz(xHover, tooltipId);
    tooltipYPoz(hoverHeight, tooltipId);
    setTooltipText(tooltipTextChange(hoverId, propData, selectedYear));
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
      hoveredBarSelection.attr("stroke", "black");
    }
  }

  const tooltipDiv = d3.select(`#${tooltipId}`);

  const pointsFromTarget = calcPointsFromTargetAnnual(hoverId, propData);

  const tooltipColor = assignColor(pointsFromTarget);

  function assignColor(pointsFromTarget) {
    if (pointsFromTarget < 0) {
      return greenGrey;
    } else {
      return pinkHighlight;
    }
  }

  tooltipDiv
    .style("width", `${tooltipWidth}px`)
    .style("height", `${tooltipHeight}px`)
    .style("background-color", tooltipColor)
    .on("mouseover", () => {
      setIsHovering(true);
      tooltipDiv.style("opacity", 1);
    });

  return (
    <div id={tooltipId} className={styles.classGraphTooltip}>
      <span style={{ marginTop: textMarginTop, marginBottom: "5px" }}>
        {tooltipText}
      </span>
    </div>
  );
};

function renderTooltip(isHovering, tooltipId, isHoveringProductText) {
  const tooltipDiv = d3.select(`#${tooltipId}`);
  if (isHovering && !isHoveringProductText) {
    tooltipDiv.transition().duration(400).style("opacity", 1);
  } else {
    tooltipDiv.transition().duration(400).style("opacity", 0);
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

function tooltipTextChange(hoverId, propData, selectedYear) {
  let pointsFromTarget;

  pointsFromTarget = calcPointsFromTargetAnnual(hoverId, propData);
  // console.log(pointsFromTarget);

  return `Points from  FY${selectedYear} Target: ${pointsFromTarget}`;
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
