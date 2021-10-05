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

import {
  secondaryColor,
  lineGraphTitleBlock,
  primaryColor,
} from "../Design/MyTheme";

import { TooltipVolume } from "./TooltipVolume";

const useStyles = makeStyles({
  headerText: {
    color: "white",
    marginTop: "-1%",
  },
});

export const QuarterlyVolume = (props) => {
  const { propData } = props;

  let isFirstClass = false;

  if (propData[0].class === "First Class Mail") {
    isFirstClass = true;
  }

  // console.log("qtr vol", isFirstClass);

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

  let currentProductName = data[0].product;

  if (isFirstClass) {
    const firstRow = data[0];
    currentProductName = `${firstRow.product} (${firstRow.deliverySpeed})`;
  }

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
      .selectAll(".dotTooltipRect")
      .data(data2020)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        return i * interDotX;
      })
      .attr("y", (d) => 0)
      .attr("height", (d) => svgHeight)
      .attr("width", interDotX)
      .attr("class", "dotTooltipRect")
      .style("opacity", 0)
      .attr("id", (d, i) => `tooltlipRectSeq_${i + 1}`)
      .on("mouseover", function () {
        const currentRectId = d3.select(this)._groups[0][0].id;
        const rectSequence = currentRectId.match(/\d/)[0];
        const currentDotId = `volumeDot_${rectSequence}`;
        const currentDotSelection = d3.select(`#${currentDotId}`);

        const currentDotX = currentDotSelection._groups[0][0].cx.baseVal.value;
        const currentDotY = currentDotSelection._groups[0][0].cy.baseVal.value;

        setXHover(currentDotX);
        setYHover(currentDotY);
        setHoverId(currentDotId);
        setIsHovering(true);
      })
      .on("mouseout", () => {
        setIsHovering(false);
      });

    svg
      .selectAll(".dot")
      .data(data2020)
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

  return (
    <>
      <div
        style={{
          backgroundColor: primaryColor,
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
