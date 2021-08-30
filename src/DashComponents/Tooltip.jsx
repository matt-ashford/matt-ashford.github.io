import { makeStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  div: {
    position: "absolute",
    textAlign: "center",
    width: "60px",
    height: "28px",
    padding: "2px",
    font: "12px sans-serif",
    background: "lightsteelblue",
    border: "0px",
    borderRadius: "8px",
    pointerEvents: "none",
    // opacity: "0",
  },
}));

export function toolTipMotion(xPoz, yPoz) {
  const tooltip = d3.select("#graphTooltip");

  tooltip
    .transition()
    .duration(300)
    .attr("x", xPoz)
    .attr("y", yPoz)
    .style("opacity", 1);
}

export function hideTooltip(event) {
  const tooltip = d3.select("#graphTooltip");

  tooltip.transition().duration(100).style("opacity", 0);
}

export const Tooltip = (props) => {
  const { currentDotX, currentDotY } = props;

  useEffect(() => {
    toolTipMotion(currentDotX, currentDotY);
  }, [currentDotX, currentDotY]);

  const classes = useStyles();
  return (
    <>
      <rect
        className={classes.div}
        width={100}
        height={100}
        fill="green"
        id="graphTooltip"
        style={{ zIndex: 2 }}
      ></rect>
      <text
        id="tooltipText"
        x={currentDotX}
        y={currentDotY + 20}
        stroke="black"
        style={{ zIndex: 3 }}
      >
        this is a tooltip
      </text>
    </>
  );
};

export default Tooltip;
