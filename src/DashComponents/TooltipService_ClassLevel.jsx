import { makeStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { pinkHighlight, greenGrey, tooltipStyles } from "../Design/MyTheme";

const tooltipWidth = 130;
const tooltipHeight = 30;
const textMarginTop = 10;

export const TooltipService_ClassLevel = (props) => {
  const { xHover, hoverId, isHovering, hoverHeight, propData, tooltipId } =
    props;

  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    removeOnMouseOut(isHovering, tooltipId);
    tooltipXPoz(xHover, tooltipId);
    tooltipYPoz(hoverHeight, tooltipId);
    setTooltipText(tooltipTextChange(hoverId, propData));
  }, [isHovering]);

  useEffect(() => {
    removeOnMouseOut(isHovering, tooltipId);
  });

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
      tooltipDiv.style("opacity", 0).style("top", 1500);
    });

  return (
    <div style={tooltipStyles} id={tooltipId}>
      <span style={{ marginTop: textMarginTop, marginBottom: "5px" }}>
        {tooltipText}
      </span>
    </div>
  );
};

function removeOnMouseOut(isHovering, tooltipId) {
  const tooltipDiv = d3.select(`#${tooltipId}`);

  if (!isHovering) {
    tooltipDiv
      .transition()
      .duration(400)
      .style("opacity", 0)
      .style("top", 1500);
  } else {
    tooltipDiv.transition().duration(400).style("opacity", 0.95);
  }
}

function tooltipXPoz(xHover, tooltipId) {
  const tooltipDiv = d3.select(`#${tooltipId}`);

  let outputVal;
  // const xPush = 100;
  const xPush = 50;

  outputVal = xHover + xPush;

  tooltipDiv.style("left", `${outputVal}px`);
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

  return `Points from Target: ${pointsFromTarget}`;
}

function calcPointsFromTargetAnnual(hoverId, propData) {
  const idList = hoverId.split("_");
  const productId = parseInt(idList[1]);
  const yearVal = parseInt(idList[2]);

  let pointsFromTarget;

  if (propData) {
    let hoveredRow = propData
      .filter((row) => row.fy === yearVal)
      .filter((row) => row.productId === productId);

    if (hoveredRow.length > 0) {
      hoveredRow = hoveredRow[0];
      pointsFromTarget = hoveredRow.pointsFromTarget;
    }
  }

  return pointsFromTarget;
}

export default TooltipService_ClassLevel;
