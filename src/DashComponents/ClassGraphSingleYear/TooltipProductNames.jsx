import * as d3 from "d3";
import { useEffect, useState } from "react";
import { lightGrey } from "../../Design/MyTheme";
import styles from "./classGraph.module.css";

const tooltipWidth = 130;
const tooltipColor = lightGrey;
const tooltipId = "tooltipProductName";

export const TooltipProductNames = (props) => {
  const {
    propData,
    isHoveringProductText,
    hoverTextId,
    xHoverText,
    selectedYear,
  } = props;

  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    removeOnMouseOut(isHoveringProductText);
    tooltipXPoz(xHoverText);
    setTooltipText(tooltipTextChange(hoverTextId, propData, selectedYear));
  }, [isHoveringProductText]);

  const tooltipDiv = d3.select(`#${tooltipId}`);

  tooltipDiv
    .style("width", `${tooltipWidth}px`)
    .style("background-color", tooltipColor);

  return (
    <div id="tooltipProductName" className={styles.tooltip_ProductText}>
      <span style={{}}>{tooltipText}</span>
    </div>
  );
};

function tooltipTextChange(hoverTextId, propData, selectedYear) {
  const hoverProductId = parseInt(hoverTextId.split("_")[1]);

  const hoveredRow = propData
    .filter((row) => row.product_id === hoverProductId)
    .filter((row) => row.fy === selectedYear)[0];

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

  const yPush = -110;

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
