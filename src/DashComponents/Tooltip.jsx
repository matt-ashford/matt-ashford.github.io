import { makeStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import { useEffect } from "react";

export const TooltipExtract = (props) => {
  const { xHover, yHover, hoverId, svgHeightFull, isHovering } = props;

  useEffect(() => {
    removeOnMouseOut(isHovering);
    tooltipXPoz(xHover, hoverId);
    tooltipYPoz(yHover, hoverId, svgHeightFull);
  }, [isHovering]);

  return (
    <div
      style={{
        position: "relative",
        textAlign: "center",
        width: tooltipWidth,
        height: tooltipHeight,
        font: "12px sans-serif",
        background: "lightsteelblue",
        // top: tooltipYPoz(yHover, hoverId, svgHeightFull),
        // opacity: currentOpacity(xHover, yHover),
      }}
      id="tooltipExtract"
    >
      hello
    </div>
  );
};

const tooltipWidth = 130;
const tooltipHeight = 50;

function removeOnMouseOut(isHovering) {
  const tooltipDiv = d3.select("#tooltipExtract");

  if (!isHovering) {
    tooltipDiv.style("opacity", 0).style("top", 1500);
  } else {
    tooltipDiv.style("opacity", 0.9);
  }
}

function tooltipXPoz(xHover, hoverId) {
  const tooltipDiv = d3.select("#tooltipExtract");

  let currentDotQuarter;

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
  const tooltipDiv = d3.select("#tooltipExtract");

  let currentDotQuarter;

  if (hoverId) {
    currentDotQuarter = parseInt(hoverId.match(/\d/)[0]);
  }

  let outputVal;
  outputVal = yHover;

  outputVal = svgHeightFull - outputVal;

  outputVal *= -1;

  if (currentDotQuarter > 2) {
    outputVal -= tooltipHeight;
  }

  tooltipDiv.style("top", `${outputVal}px`);
}

export default TooltipExtract;
