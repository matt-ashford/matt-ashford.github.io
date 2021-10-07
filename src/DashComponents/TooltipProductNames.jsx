import * as d3 from "d3";
import { useEffect, useState } from "react";
import { darkGrey } from "../Design/MyTheme";

const tooltipWidth = 130;
const tooltipHeight = 25;
const textMarginTop = 10;
const tooltipColor = darkGrey;
const tooltipId = "tooltipProductName";

export const TooltipProductNames = (props) => {
  const { propData, isHoveringProductText, hoverTextId, xHoverText } = props;

  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    removeOnMouseOut(isHoveringProductText);
    tooltipXPoz(xHoverText);
    setTooltipText(tooltipTextChange(hoverTextId, propData));
  }, [isHoveringProductText]);

  const tooltipDiv = d3.select(`#${tooltipId}`);

  tooltipDiv
    .style("width", `${tooltipWidth}px`)
    .style("background-color", tooltipColor);

  return (
    <div id="tooltipProductName" style={tooltipStyles_ProductText}>
      <span style={{}}>{tooltipText}</span>
    </div>
  );
};

function tooltipTextChange(hoverTextId, propData) {
  const hoverProductId = parseInt(hoverTextId.split("_")[1]);

  const hoveredRow = propData
    .filter((row) => row.productId === hoverProductId)
    .filter((row) => row.fy === 2020)[0];

  let isFirstClass = false;

  let fullProductName;

  if (hoveredRow) {
    if (hoveredRow.class === "First Class Mail") {
      isFirstClass = true;
    }

    fullProductName = hoveredRow.product;
    if (isFirstClass) {
      fullProductName += ` (${hoveredRow.deliverySpeed})`;
    }
  }

  return fullProductName;
}

function tooltipXPoz(xHoverText) {
  const tooltipDiv = d3.select(`#tooltipProductName`);

  let outputVal;
  const xPush = -50;

  outputVal = xHoverText + xPush;

  console.log(outputVal);

  const yPush = -150;

  tooltipDiv.style("left", `${outputVal}px`).style("top", `${yPush}px`);
}

function removeOnMouseOut(isHoveringProductText) {
  const tooltipDiv = d3.select(`#${tooltipId}`);

  if (!isHoveringProductText) {
    tooltipDiv
      .transition()
      .duration(400)
      .style("opacity", 0)
      .style("top", 1500);
  } else {
    tooltipDiv.transition().duration(400).style("opacity", 0.95);
  }
}

export default TooltipProductNames;

const tooltipStyles_ProductText = {
  position: "relative",
  textAlign: "center",
  font: "12px sans-serif",
  textAlign: "center",
  verticalAlign: "middle",
  paddingTop: "8px",
  paddingBottom: "8px",
  borderRadius: "5px",
  fontWeight: "bolder",
  padding: "3px",
  fontSize: "14px",
  fontFamily: "roboto",
  boxShadow: "5px 5px 2px hsla(0, 0%, 62%, 0.69)",
  color: "black",
  opacity: 0,
};
