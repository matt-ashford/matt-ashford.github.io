import { makeStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import { useEffect } from "react";
import { darkGrey } from "../Design/MyTheme";

export const TooltipVolume = (props) => {
  const { xHover, yHover, hoverId, svgHeightFull, isHovering, propData } =
    props;

  useEffect(() => {
    removeOnMouseOut(isHovering);
    tooltipXPoz(xHover, hoverId);
    tooltipYPoz(yHover, hoverId, svgHeightFull);
  }, [isHovering]);

  const tooltipText = tooltipTextChange(hoverId, propData);

  const tooltipDiv = d3.select("#TooltipVolume");

  tooltipDiv.on("mouseover", () => {
    tooltipDiv.style("opacity", 0).style("top", 1500);
  });

  console.log("toltip", darkGrey);

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
      id="TooltipVolume"
    >
      <span style={{ marginTop: textMarginTop }}> {tooltipText}</span>
    </div>
  );
};

const tooltipWidth = 130;
const tooltipHeight = 30;
const textMarginTop = 10;

function removeOnMouseOut(isHovering) {
  const tooltipDiv = d3.select("#TooltipVolume");

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

function tooltipXPoz(xHover, hoverId) {
  const tooltipDiv = d3.select("#TooltipVolume");

  let currentDotQuarter = 0;

  if (hoverId) {
    currentDotQuarter = parseInt(hoverId.match(/\d/)[0]);
  }

  let outputVal;

  if (currentDotQuarter > 2) {
    outputVal = xHover - tooltipWidth;
  } else {
    outputVal = xHover;
  }

  tooltipDiv.style("left", `${outputVal}px`);
}

function tooltipYPoz(yHover, hoverId, svgHeightFull) {
  const tooltipDiv = d3.select("#TooltipVolume");

  let currentDotQuarter = 0;

  if (hoverId) {
    currentDotQuarter = parseInt(hoverId.match(/\d/)[0]);
  }

  let outputVal;
  outputVal = yHover;

  outputVal = svgHeightFull - outputVal;

  outputVal *= -1;

  if (currentDotQuarter > 2) {
    outputVal -= tooltipHeight;
    outputVal -= textMarginTop;
  }

  tooltipDiv.style("top", `${outputVal}px`);
}

function tooltipTextChange(currentDotId, dataIn) {
  let currentDotQuarter = 0;

  if (!currentDotId) {
    return "none";
  }

  if (currentDotId) {
    currentDotQuarter = parseInt(currentDotId.match(/\d/)[0]);
  }

  const dataSorted = dataIn.sort((a, b) => a.quarter - b.quarter);

  const currentRow = dataSorted[currentDotQuarter - 1];

  const thisVol = currentRow.volume;

  const volText = formatVolumeNumber(thisVol);

  return `Q${currentDotQuarter} volume: ${volText}`;
}

function formatVolumeNumber(rawNumber) {
  let trailingLetter = "B";
  let divisor = 1000000000;

  if (rawNumber / divisor < 1) {
    trailingLetter = "M";
    divisor = divisor / 1000;
  }

  const outputNumber = rawNumber / divisor;

  let stringNum;
  if (trailingLetter === "M") {
    stringNum = outputNumber.toFixed(0);
  }

  if (trailingLetter === "B") {
    stringNum = outputNumber.toFixed(2);
  }

  return `${stringNum}${trailingLetter}`;
}

export default TooltipVolume;
