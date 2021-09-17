import * as d3 from "d3";
import { useEffect, useState } from "react";
import GraphKey from "./GraphKey";
import {
  primaryColor,
  secondaryColor,
  highlightColor,
  textNodeFont,
  lightGrey,
} from "../Design/MyTheme";

import {
  marginBottom,
  graphHeight,
  graphWidth,
  barWidth,
  marginLeft,
  barMarginLeft,
  marginTop,
  yScale,
  yScaleRev,
} from "../Design/graphDimensions";

import { TooltipService_ClassLevel } from "./TooltipService_ClassLevel";

export const ClassLevelGraph = (props) => {
  const { propData, mailClass } = props;

  const [data, setData] = useState({});

  const [xHover, setXHover] = useState(0);
  const [hoverId, setHoverId] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [hoverHeight, setHoverHeight] = useState(0);

  useEffect(() => {
    setData(propData);
    barFunctions();
  }, []);

  useEffect(() => {
    barFunctions();
  }, [data, propData]);

  const topStart = graphHeight - marginBottom;

  const svgWidth = 850;

  const svg = d3.select("#mmClassSvg");

  function barFunctions() {
    removeBars();
    if (data.length > 1) {
      removeBars();
      drawBars();
    }
  }

  function getInterBarMargin(graphData) {
    const barCount = graphData.length;
    const interBarDist = svgWidth / barCount;

    return interBarDist;
  }

  function drawBars() {
    const dataProducts = data.filter((row) => row.productAbbrev !== "missing");

    const data2020 = dataProducts.filter((row) => row.fy === 2020);
    const data2019 = dataProducts.filter((row) => row.fy === 2019);

    const interBarMargin = getInterBarMargin(data2020);

    svg
      .selectAll(".productNameText")
      .data(data2020)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * interBarMargin + 75)
      .attr("y", topStart + 15)
      .text((d) => d.productAbbrev)
      .attr("text-anchor", "middle")
      .attr("class", "graphicElement nameBox nonBar")
      .attr("font-family", textNodeFont)
      .attr("id", (d, i) => `${i}`);

    svg
      .append("g")
      .call(d3.axisLeft(yScaleRev).tickSize(-svgWidth).ticks(5))
      .attr("transform", `translate(${marginLeft},${marginTop})`)
      .attr("class", "graphicElement axisTicks nonBar");

    d3.select(".domain").remove();
    d3.selectAll(".axisTicks").selectAll("text").style("opacity", 1);
    d3.selectAll("line").style("opacity", 0.3);

    d3.selectAll(".targetLines").style("opacity", 1);

    svg
      .selectAll(".bar2019")
      .data(data2019)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * interBarMargin + barMarginLeft)
      .attr("y", (d) => topStart - yScale(d.pctOnTime))
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("width", barWidth)
      .attr("fill", primaryColor)
      .attr("class", "graphicElement bar2019")
      .attr("id", (d) => `${d.productId}_${d.fy}`)
      .on("mouseover", function () {
        const currentBarSelection = d3.select(this);

        mouseOverTriggers(currentBarSelection);
      })
      .on("mouseout", () => {
        const currentBarSelection = d3.select(this);
        mouseOutTriggers(currentBarSelection);
      });

    svg
      .selectAll(".bar2020")
      .data(data2020)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * interBarMargin + barWidth + barMarginLeft)
      .attr("y", (d) => topStart - yScale(d.pctOnTime))
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("width", barWidth)
      .attr("fill", secondaryColor)
      .attr("class", "graphicElement bar2020")
      .attr("id", (d) => `${d.productId}_${d.fy}`)
      .on("mouseover", function () {
        const currentBarSelection = d3.select(this);

        mouseOverTriggers(currentBarSelection);
      })
      .on("mouseout", () => {
        const currentBarSelection = d3.select(this);
        mouseOutTriggers(currentBarSelection);
      });

    svg
      .selectAll(".targetLines")
      .data(data2020)
      .enter()
      .append("line")
      .attr("x1", (d, i) => i * interBarMargin + marginLeft)
      .attr("y1", (d) => topStart - yScale(d.target))
      .attr("x2", (d, i) => i * interBarMargin + barWidth * 2 + barMarginLeft)
      .attr("y2", (d) => topStart - yScale(d.target))
      .style("stroke", highlightColor)
      .style("stroke-width", 2)
      .attr("class", "graphicElement targetLines nonBar");

    svg
      .append("text")
      .text("On-Time (%)")
      .attr("x", 190)
      .attr("y", 20)
      .style("text-anchor", "middle")
      .attr("transform", "translate(-5,315) rotate(270)")
      .attr("font-family", textNodeFont)
      .attr("class", "graphicElement");
  }

  function mouseOverTriggers(currentBarSelection) {
    const currentBarId = currentBarSelection._groups[0][0].id;
    const currentBarX = currentBarSelection._groups[0][0].x.baseVal.value;
    const currentBarHeight =
      currentBarSelection._groups[0][0].height.baseVal.value;

    setXHover(currentBarX);
    setHoverId(currentBarId);
    setIsHovering(true);
    setHoverHeight(currentBarHeight);

    currentBarSelection.attr("stroke", "black").attr("stroke-width", "2px");
  }

  function mouseOutTriggers(currentBarSelection) {
    setIsHovering(false);

    d3.selectAll("rect").attr("stroke", "none");
  }

  function removeBars() {
    d3.selectAll(".graphicElement").remove();
  }

  return (
    <>
      <div>
        <h3 fontFamily={textNodeFont}>{mailClass} Products</h3>
        <svg
          shapeRendering="crispEdges"
          id="mmClassSvg"
          height={300}
          width={graphWidth}
        ></svg>
        <GraphKey
          level={"classLevel"}
          bar2019={".bar2019"}
          bar2020={".bar2020"}
        />
      </div>
      <TooltipService_ClassLevel
        xHover={xHover}
        hoverId={hoverId}
        isHovering={isHovering}
        hoverHeight={hoverHeight}
        propData={propData}
        tooltipId={"tooltipClassGraph"}
      />
    </>
  );
};

export default ClassLevelGraph;
