import { makeStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { darkGrey } from "../Design/MyTheme";

const tooltipWidth = 130;
const tooltipHeight = 30;
const textMarginTop = 10;

export const TooltipService = (props) => {
  const { xHover, hoverId, isHovering, hoverHeight, propData } = props;

  const [tooltipText, setTooltipText] = useState("");

  console.log(propData);

  useEffect(() => {
    removeOnMouseOut(isHovering);
    tooltipXPoz(xHover);
    tooltipYPoz(hoverHeight);
    setTooltipText(tooltipTextChange(hoverId, propData));
  }, [isHovering]);

  useEffect(() => {
    removeOnMouseOut(isHovering);
  });

  //   const tooltipText = tooltipTextChange(hoverId, propData);
  //   const tooltipText = hoverId;

  const tooltipDiv = d3.select("#TooltipService");

  tooltipDiv.on("mouseover", () => {
    tooltipDiv.style("opacity", 0).style("top", 1500);
  });

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        width: tooltipWidth,
        height: tooltipHeight,
        font: "12px sans-serif",
        background: "lightsteelblue",
        textAlign: "center",
        verticalAlign: "middle",
        paddingTop: "10px",
        borderRadius: "5px",
        backgroundColor: darkGrey,
        fontWeight: "bold",
        fontSize: "13px",
      }}
      id="TooltipService"
    >
      <span style={{ marginTop: textMarginTop }}>{tooltipText}</span>
    </div>
  );
};

function removeOnMouseOut(isHovering) {
  const tooltipDiv = d3.select("#TooltipService");

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

function tooltipXPoz(xHover) {
  const tooltipDiv = d3.select("#TooltipService");

  let outputVal;
  const xPush = 90;

  outputVal = xHover + xPush;

  tooltipDiv.style("left", `${outputVal}px`);
}

function tooltipYPoz(hoverHeight) {
  const tooltipDiv = d3.select("#TooltipService");
  let outputVal;
  const midpoint = hoverHeight / 1.5;

  outputVal = midpoint;

  outputVal *= -1;
  outputVal -= 100;

  tooltipDiv.style("top", `${outputVal}px`);
}

function tooltipTextChange(hoverId, propData) {
  const idList = hoverId.split("_");
  const productId = parseInt(idList[0]);
  const yearVal = parseInt(idList[1]);

  let pointsFromTarget;

  if (propData) {
    let hoveredRow = propData
      .filter((row) => row.fy === yearVal)
      .filter((row) => row.productId === productId);

    if (hoveredRow.length > 0) {
      hoveredRow = hoveredRow[0];
      pointsFromTarget = hoveredRow.pointsFromTarget;
      //   pointsFromTarget *= -1;
    }
  }

  return `points from target: ${pointsFromTarget}`;
  //   return `points from target: ${hoveredRow}`;
}

export default TooltipService;
