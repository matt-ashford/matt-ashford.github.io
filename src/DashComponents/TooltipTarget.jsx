import * as d3 from "d3";
import { useEffect, useState } from "react";
import { darkGrey } from "../Design/MyTheme";

const tooltipWidth = 130;
const tooltipHeight = 15;
const textMarginTop = 10;
const tooltipColor = darkGrey;

export const TooltipTarget = (props) => {
  const { propData, isHoveringTarget, hoverTargetId, tooltipId, xHoverTarget } =
    props;

  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    removeOnMouseOut(isHoveringTarget, tooltipId);
    tooltipXPoz(xHoverTarget, tooltipId);
    tooltipYPoz(tooltipId, propData);
    setTooltipText(tooltipTextChange(hoverTargetId, propData));
  }, [isHoveringTarget]);

  const tooltipDiv = d3.select(`#${tooltipId}`);

  tooltipDiv
    .style("width", `${tooltipWidth}px`)
    .style("height", `${tooltipHeight}px`)
    .style("background-color", tooltipColor);

  return (
    <div id={tooltipId} style={tooltipStyles_Target}>
      <span style={{}}>{tooltipText}</span>
      <div
        style={{
          width: "0",
          height: "0",
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderTop: `20px solid ${darkGrey}`,
          marginLeft: `50px`,
        }}
        class="arrow-down"
      ></div>
    </div>
  );
};

function tooltipTextChange(hoverTargetId, propData) {
  const hoveredProductId = parseInt(hoverTargetId.split("_")[1]);

  const hoveredProductTargetRow = propData
    .filter((row) => row.productId === hoveredProductId)
    .filter((row) => row.fy === 2020)[0];

  let hoveredTargetValue;

  if (hoveredProductTargetRow) {
    hoveredTargetValue = hoveredProductTargetRow.target;
    hoveredTargetValue = hoveredTargetValue.toFixed(2);
  }

  const tooltipTextFinal = `Target: ${hoveredTargetValue}`;

  return tooltipTextFinal;
}

function tooltipXPoz(xHover, tooltipId) {
  const tooltipDiv = d3.select(`#${tooltipId}`);

  let outputVal;
  const xPush = -50;

  outputVal = xHover + xPush;

  tooltipDiv.style("left", `${outputVal}px`);
}

function tooltipYPoz(tooltipId, propData) {
  const tooltipDiv = d3.select(`#${tooltipId}`);

  const mailClass = propData[0].class;

  const isProductLevelGraph = tooltipId.includes("Product");

  let outputVal = -450;

  if (isProductLevelGraph) {
    outputVal += 25;
  }

  if (mailClass === "First Class Mail") {
    outputVal -= 25;
  }

  tooltipDiv.style("top", `${outputVal}px`);
}

function removeOnMouseOut(isHoveringTarget, tooltipId) {
  const tooltipDiv = d3.select(`#${tooltipId}`);

  if (!isHoveringTarget) {
    tooltipDiv
      .transition()
      .duration(400)
      .style("opacity", 0)
      .style("top", 1500);
  } else {
    tooltipDiv.transition().duration(400).style("opacity", 0.95);
  }
}

export const tooltipStyles_Target = {
  position: "relative",
  textAlign: "center",
  font: "12px sans-serif",
  textAlign: "center",
  verticalAlign: "middle",
  paddingTop: "8px",
  paddingBottom: "8px",
  borderRadius: "5px",
  fontWeight: "bolder",
  fontSize: "14px",
  fontFamily: "roboto",
  boxShadow: "5px 5px 2px hsla(0, 0%, 62%, 0.69)",
  color: "black",
  opacity: 0,
};
