import * as d3 from "d3";

import { useEffect, useState } from "react";
import GraphKey from "./GraphKey";
import {
  primaryColor,
  secondaryColor,
  highlightColor,
  pinkHighlight,
  textNodeFont,
} from "../Design/MyTheme";

import {
  marginBottom,
  graphHeight,
  barWidth,
  marginLeft,
  barMarginLeft,
  marginTop,
  yScale,
  yScaleRev,
} from "../Design/graphDimensions";

import { TooltipService_ProductLevel } from "./TooltipService_ProductLevel";

export const ProductGraph = (props) => {
  const { propData } = props;

  const [data, setData] = useState({});

  const [xHover, setXHover] = useState(0);
  const [hoverId, setHoverId] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [hoverHeight, setHoverHeight] = useState(0);

  useEffect(allGraphFunctions, [data, propData]);

  useEffect(() => {
    setData(propData);
    drawBars();
    raiseBars();
    raiseTargets();
  });

  function allGraphFunctions() {
    d3.selectAll(".nonBarQuarter").remove();

    drawNonBarItems();

    setData(propData);
    drawBars();

    transitionBars();
    raiseBars();
    raiseTargets();
  }

  function raiseBars() {
    d3.selectAll(".bar2019Quarter").raise();
    d3.selectAll(".bar2020Quarter").raise();
  }

  function raiseTargets() {
    d3.selectAll(".targetLines").raise();
  }

  const topStart = graphHeight - marginBottom;

  const svgWidth = 850;

  const svg = d3.select("#productSvg");

  function getInterBarMargin(graphData) {
    const barCount = graphData.length;
    const interBarDist = svgWidth / barCount;

    return interBarDist;
  }

  function drawBars() {
    const data2020 = propData.filter((row) => row.fy === 2020);
    const data2019 = propData.filter((row) => row.fy === 2019);

    const interBarMargin = getInterBarMargin(data2020);

    svg
      .selectAll(".bar2019Quarter")
      .data(data2019)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * interBarMargin + barMarginLeft)
      .attr("y", (d) => topStart - yScale(d.pctOnTime))
      .attr("width", barWidth)
      .attr("fill", secondaryColor)
      .attr("class", "graphicElementQuarter bar2019Quarter")
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("id", (d) => `${d.productId}_${d.fy}_${d.quarter}`);

    svg
      .selectAll(".bar2020Quarter")
      .data(data2020)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * interBarMargin + barWidth + barMarginLeft)
      .attr("y", (d) => topStart - yScale(d.pctOnTime))
      .attr("width", barWidth)
      .attr("fill", primaryColor)
      .attr("class", "graphicElementQuarter bar2020Quarter")
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("id", (d) => `${d.productId}_${d.fy}_${d.quarter}`);
  }

  function transitionBars() {
    const data2020 = propData.filter((row) => row.fy === 2020);
    const data2019 = propData.filter((row) => row.fy === 2019);

    const interBarMargin = getInterBarMargin(data2020);

    d3.selectAll(".bar2020Quarter")
      .data(data2020)
      .transition()
      .duration(500)
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("y", (d) => topStart - yScale(d.pctOnTime))
      .attr("id", (d) => `${d.productId}_${d.fy}_${d.quarter}`);

    d3.selectAll(".bar2019Quarter")
      .data(data2019)
      .transition()
      .duration(500)
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("y", (d) => topStart - yScale(d.pctOnTime))
      .attr("id", (d) => `${d.productId}_${d.fy}_${d.quarter}`);

    svg
      .selectAll(".targetLines")
      .data(data2020)
      .enter()
      .append("line")
      .attr("x1", (d, i) => i * interBarMargin + marginLeft)
      .attr("y1", (d) => topStart - yScale(d.target))
      .attr("x2", (d, i) => i * interBarMargin + barWidth * 2 + barMarginLeft)
      .attr("y2", (d) => topStart - yScale(d.target))
      // .style("stroke", highlightColor)
      .style("stroke", pinkHighlight)
      .style("stroke-width", 3)
      .attr("class", "nonBarQuarter  graphicElementQuarter targetLines");
  }

  function drawNonBarItems() {
    const data2020 = propData.filter((row) => row.fy === 2020);

    const quarters = ["Q1", "Q2", "Q3", "Q4"];
    const interBarMargin = getInterBarMargin(data2020);

    svg
      .append("text")
      .text("On-Time (%)")
      .attr("x", 190)
      .attr("y", 20)
      .style("text-anchor", "middle")
      .attr("transform", "translate(-5,315) rotate(270)")
      .attr("font-family", textNodeFont)
      .attr("class", "nonBarQuarter graphicElementQuarter");

    svg
      .selectAll(".quarterText")
      .data(quarters)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * interBarMargin + 75)
      .attr("y", topStart + 15)
      .text((d) => d)
      .attr("text-anchor", "middle")
      .attr("class", "nonBarQuarter graphicElementQuarter nameBox")
      .attr("font-family", textNodeFont)
      .attr("id", (d, i) => `${i}`);

    svg
      .append("g")
      .call(d3.axisLeft(yScaleRev).tickSize(-svgWidth).ticks(5))
      .attr("transform", `translate(${marginLeft},${marginTop})`)
      .attr("class", " nonBarQuarter graphicElementQuarter axisTicks");

    d3.select(".domain").remove();
    d3.selectAll(".axisTicks").selectAll("text").style("opacity", 0.5);

    d3.selectAll("line").style("opacity", 0.3);
    d3.selectAll(".targetLines").style("opacity", 1);
  }

  const theseBars = d3.selectAll(".bar2020Quarter, .bar2019Quarter");

  theseBars.on("mouseover", function () {
    const currentBarSelection = d3.select(this);

    mouseOverTriggers(currentBarSelection);
  });

  theseBars.on("mouseout", function () {
    const currentBarSelection = d3.select(this);
    mouseOutTriggers(currentBarSelection);
  });

  function mouseOverTriggers(currentBarSelection) {
    const currentBarId = currentBarSelection._groups[0][0].id;
    const currentBarX = currentBarSelection._groups[0][0].x.baseVal.value;
    const currentBarHeight =
      currentBarSelection._groups[0][0].height.baseVal.value;

    setXHover(currentBarX);
    setHoverId(currentBarId);
    setIsHovering(true);
    setHoverHeight(currentBarHeight);

    currentBarSelection.attr("stroke", "black");
    // .attr("stroke-width", "2px");
  }

  function mouseOutTriggers(currentBarSelection) {
    setIsHovering(false);

    d3.selectAll("rect").attr("stroke", "none");
  }

  const firstRow = propData[0];

  let productName = firstRow.product;

  if (firstRow.class === "First Class Mail") {
    productName = `${firstRow.product} (${firstRow.deliverySpeed})`;
  }

  return (
    <>
      <div>
        <h3 fontFamily={textNodeFont}>Product-Level Quarterly Data</h3>
        <h4>{productName}</h4>
        <svg
          shapeRendering="crispEdges"
          id="productSvg"
          height={300}
          width={850}
        ></svg>
        <GraphKey
          level={"productLevel"}
          bar2019={".bar2019Quarter"}
          bar2020={".bar2020Quarter"}
        />
      </div>
      <TooltipService_ProductLevel
        xHover={xHover}
        hoverId={hoverId}
        isHovering={isHovering}
        hoverHeight={hoverHeight}
        propData={propData}
        tooltipId={"tooltipProductGraph"}
      />
    </>
  );
};

export default ProductGraph;
