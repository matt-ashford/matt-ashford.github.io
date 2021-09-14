import * as d3 from "d3";
import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  margin,
  svgHeight,
  svgHeightFull,
  svgWidth,
  interDotX,
} from "../Design/graphDimensionsLine";

import { secondaryColor, lineGraphTitleBlock } from "../Design/MyTheme";

import { TooltipVolume } from "./TooltipVolume";

const useStyles = makeStyles({
  headerText: {
    color: "white",
    marginTop: "-1%",
  },
});

export const QuarterlyVolume = (props) => {
  const { propData } = props;

  const classes = useStyles();

  const [data, setData] = useState(propData);

  const [xHover, setXHover] = useState(0);
  const [yHover, setYHover] = useState(0);
  const [hoverId, setHoverId] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setData(propData);

    drawLine();
    drawDots(data2020);
  }, []);

  useEffect(() => {
    setData(propData);

    transitionLine();
    transitionDots();
  }, [data, propData]);

  const currentProductName = data[0].product;

  const data2020 = propData.filter((row) => row.fy === 2020);
  const volumes2020 = data2020.map((row) => row.volume);

  const tooltipWidth = 130;
  const tooltipHeight = 50;

  var yScale = d3
    .scaleLinear()
    .domain([d3.min(volumes2020), d3.max(volumes2020)])
    .range([svgHeight, 15]);

  function createLine(dataSet) {
    const aLine = d3
      .line()
      .x(function (d, i) {
        return i * interDotX + margin.left;
      })
      .y(function (d, i) {
        return yScale(d.volume);
      })
      .curve(d3.curveMonotoneX);

    return aLine;
  }

  function transitionLine() {
    const newLine = createLine(data2020);

    d3.select("#volumeLine")
      .datum(data2020)
      .attr("class", "volumeLine")
      .transition()
      .duration(600)
      .attr("d", newLine);
  }

  function drawLine() {
    const svg = d3.select("#qtrVolsvg");

    const line = createLine(data2020);

    svg
      .append("path")
      .datum(data2020)
      .attr("class", "volumeLine")
      .transition()
      .duration(600)
      .attr("d", line)
      .style("fill", "none")
      .style("stroke-width", "3px")
      .style("stroke", "blue")
      .attr("id", "volumeLine");
  }

  function transitionDots() {
    const svg = d3.select("#qtrVolsvg");

    svg
      .selectAll(".dot")
      .data(data2020)
      .on("mouseover", function () {
        let currentDotX = d3.select(this)._groups[0][0].cx;
        let currentDotY = d3.select(this)._groups[0][0].cy;
        let currentDotId = d3.select(this)._groups[0][0].id;

        currentDotX = currentDotX.baseVal.value;
        currentDotY = currentDotY.baseVal.value;

        setXHover(currentDotX);
        setYHover(currentDotY);
        setHoverId(currentDotId);
        setIsHovering(true);
      })
      .on("mouseout", () => {
        setIsHovering(false);
      })
      .transition()
      .duration(600)
      .attr("cy", (d) => yScale(d.volume));
  }

  function drawDots(data2020) {
    const svg = d3.select("#qtrVolsvg");

    svg
      .selectAll(".dot")
      .data(data2020)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => i * interDotX + margin.left)
      .attr("cy", (d) => yScale(d.volume))
      .attr("r", 5)
      .attr("id", (d, i) => `volumeDot_${i + 1}`)
      .attr("fill", "black")
      .attr("class", "dot");
  }

  function drawTooltip(currentDotX, currentDotY) {
    d3.select("#lineTooltip").remove();

    const svg = d3.select("#qtrVolsvg");
    svg
      .append("rect")
      .attr("width", tooltipWidth)
      .attr("height", tooltipHeight)
      .attr("id", "lineTooltip")
      .attr("fill", "#888a8c")
      .attr("rx", 3)
      .style("opacity", 0);

    svg
      .append("text")
      .text("testing text")
      .attr("stroke", "black")
      .attr("id", "tooltipText")
      .style("font-size", "14px")
      .style("opacity", 0);
  }

  return (
    <>
      <div
        style={{
          backgroundColor: secondaryColor,
          paddingTop: "1%",
          width: svgWidth,
        }}
      >
        <div style={{ marginTop: "1%" }}>
          <p
            className={classes.headerText}
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            FY 2020 Quarterly Volume
          </p>
          <p className={classes.headerText}> {currentProductName}</p>
        </div>

        <div style={{ backgroundColor: lineGraphTitleBlock }}>
          <svg height={svgHeightFull} width={svgWidth} id="qtrVolsvg"></svg>
        </div>
      </div>
      <TooltipVolume
        xHover={xHover}
        yHover={yHover}
        hoverId={hoverId}
        svgHeightFull={svgHeightFull}
        isHovering={isHovering}
        propData={data2020}
      />
    </>
  );
};

export default QuarterlyVolume;
