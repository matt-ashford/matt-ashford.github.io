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
  targetMarginLeft,
  graphWidthProduct,
  productTextMarginLeft,
  marginTop,
  yScale,
  yScaleRev,
} from "../Design/graphDimensions";

import { TooltipService_ProductLevel } from "./TooltipService_ProductLevel";
import { TooltipTarget } from "./TooltipTarget";

export const ProductGraph = (props) => {
  const { propData } = props;

  const [data, setData] = useState({});

  const [xHover, setXHover] = useState(0);
  const [hoverId, setHoverId] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [hoverHeight, setHoverHeight] = useState(0);

  const [isHoveringTarget, setIsHoveringTarget] = useState(false);
  const [hoverTargetId, setHoverTargetId] = useState("");
  const [xHoverTarget, setXHoverTarget] = useState(0);

  // useEffect(allGraphFunctions, [data, propData]);

  useEffect(() => {
    allGraphFunctions();
  }, [data, propData]);

  useEffect(() => {
    drawBars();
  });

  function allGraphFunctions() {
    d3.selectAll(".nonBarQuarter").remove();
    drawNonBarItems();
    setData(propData);
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

  const svgWidth = graphWidthProduct;

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

    svg
      .selectAll(".targetTooltipRect")
      .data(data2020)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * interBarMargin + barMarginLeft)
      .attr("y", (d) => 0)
      .attr("height", (d) => topStart - yScale(d.target))
      .attr("width", barWidth * 2.5)
      .style("opacity", 0)
      .attr("class", "targetTooltipRect nonBarQuarter")
      .attr("id", (d) => `productTarget_${d.productId}`)
      .on("mouseover", function () {
        const currentTargetSelection = d3.select(this);

        mouseOverTriggersTarget(currentTargetSelection);
      })
      .on("mouseout", function () {
        const currentTargetSelection = d3.select(this);
        mouseOutTriggersTarget(currentTargetSelection);
      });

    svg
      .selectAll(".targetLines")
      .data(data2020)
      .enter()
      .append("line")
      .attr("x1", (d, i) => i * interBarMargin + marginLeft + targetMarginLeft)
      .attr("y1", (d) => topStart - yScale(d.target))
      .attr(
        "x2",
        (d, i) =>
          i * interBarMargin + barWidth * 2 + barMarginLeft + targetMarginLeft
      )
      .attr("y2", (d) => topStart - yScale(d.target))
      .style("stroke", pinkHighlight)
      .style("stroke-width", 3)
      .attr("class", "graphicElementQuarter targetLines");
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
      .transition()
      .duration(500)
      .attr("y1", (d) => topStart - yScale(d.target))
      .attr("y2", (d) => topStart - yScale(d.target))
      .style("stroke", pinkHighlight)
      .style("stroke-width", 3)
      .attr("class", " graphicElementQuarter targetLines");

    svg
      .selectAll(".targetTooltipRect")
      .data(data2020)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * interBarMargin + barMarginLeft)
      .attr("y", (d) => 0)
      .attr("height", (d) => topStart - yScale(d.target))
      .attr("width", barWidth * 2.5)
      .style("opacity", 0)
      .attr("class", "targetTooltipRect nonBarQuarter")
      .attr("id", (d) => `productTarget_${d.productId}`)
      .on("mouseover", function () {
        const currentTargetSelection = d3.select(this);

        mouseOverTriggersTarget(currentTargetSelection);
      })
      .on("mouseout", function () {
        const currentTargetSelection = d3.select(this);
        mouseOutTriggersTarget(currentTargetSelection);
      });
  }

  function drawNonBarItems() {
    const data2020 = propData.filter((row) => row.fy === 2020);

    const quarters = ["Q1", "Q2", "Q3", "Q4"];
    const interBarMargin = getInterBarMargin(data2020);

    svg
      .append("text")
      .text("On-Time (%)")
      // .attr("x", 190)
      .attr("x", 190)
      .attr("y", 25)
      .style("text-anchor", "middle")
      .attr("transform", "translate(-5,315) rotate(270)")
      .attr("font-family", textNodeFont)
      .attr("class", "nonBarQuarter graphicElementQuarter");

    svg
      .selectAll(".quarterText")
      .data(quarters)
      .enter()
      .append("text")
      .attr(
        "x",
        (d, i) =>
          i * (interBarMargin - 1) + barMarginLeft + productTextMarginLeft - 2
      )
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

  function mouseOverTriggersTarget(currentTargetSelection) {
    const currentTargetId = currentTargetSelection._groups[0][0].id;

    const currentTargetX = currentTargetSelection._groups[0][0].x.baseVal.value;
    const currentTargetHeight =
      currentTargetSelection._groups[0][0].y.baseVal.value;

    setIsHoveringTarget(true);
    setHoverTargetId(currentTargetId);
    setXHoverTarget(currentTargetX);
  }

  function mouseOutTriggersTarget(currentTargetSelection) {
    setIsHoveringTarget(false);
  }

  return (
    <>
      <div style={{ paddingTop: "1%" }}>
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

      <TooltipTarget
        isHoveringTarget={isHoveringTarget}
        hoverTargetId={hoverTargetId}
        tooltipId={"tooltipProductTarget"}
        propData={propData}
        xHoverTarget={xHoverTarget}
      />
    </>
  );
};

export default ProductGraph;
