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
  } = props;

  const {
    //  svgId,
    barXPoz,
    topStart,
    barWidth,
    yScale,
  } = tooltipParams;

  // console.log(svgId);

  // console.log(props);

  const [tooltipText, setTooltipText] = useState("321321");

  useEffect(() => {
    d3.select(`#${tooltipId}`).style("opacity", 1);
    tooltipXPoz(xHover, tooltipId);
    tooltipYPoz(hoverHeight, tooltipId);
    setTooltipText(tooltipTextChange(hoverId, propData));
    drawStroke(hoverId, isHovering);
  }, [xHover, hoverId]);

  useEffect(() => {
    renderTooltip(isHovering, tooltipId);
  }, [isHovering]);

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
      // tooltipDiv.style("opacity", 0).style("top", 1500);
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

function renderTooltip(isHovering, tooltipId) {
  const tooltipDiv = d3.select(`#${tooltipId}`);
  if (isHovering) {
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

function tooltipTextChange(hoverId, propData) {
  let pointsFromTarget;

  pointsFromTarget = calcPointsFromTargetAnnual(hoverId, propData);
  // console.log(pointsFromTarget);

  return `Points from Target: ${pointsFromTarget}`;
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

// function drawTooltipRect() {
//   d3.select(`#${svgId}`)
//     .selectAll(".targetTooltipRect")
//     .data(propData)
//     .enter()
//     .append("rect")
//     .attr("x", (d, i) => barXPoz(i))
//     .attr("y", (d) => 0)
//     .attr("height", (d) => topStart - yScale(d.target))
//     .attr("width", barWidth * 2.5)
//     .style("opacity", 0)
//     .attr("class", "targetTooltipRect")
//     .attr("id", (d) => `classTarget_${d.product_name}_${d.delivery_speed}`);
// .on("mouseover", function () {
//   const currentTargetSelection = d3.select(this);
//   mouseOverTriggersTarget(currentTargetSelection);
// })
// .on("mouseout", function () {
//   const currentTargetSelection = d3.select(this);
//   mouseOutTriggersTarget(currentTargetSelection);
// });
// }
