import * as d3 from "d3";

import { useEffect, useState } from "react";
import GraphKey from "./GraphKey";
import {
  primaryColor,
  secondaryColor,
  highlightColor,
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

export const MarketingMailClassGraph = (props) => {
  const { propData } = props;

  const [data, setData] = useState({});

  const [xHover, setXHover] = useState(0);
  const [yHover, setYHover] = useState(0);

  useEffect(allGraphFunctions, [data, propData]);

  const tooltipWidth = 150;
  const tooltipHeight = 50;

  function allGraphFunctions() {
    d3.selectAll(".nonBarQuarter").remove();

    drawNonBarItems();

    setData(propData);
    drawBars();

    transitionBars();
    raiseBars();
    raiseTargets();
    drawTooltip();
    raiseTooltip();
  }

  function raiseTooltip() {
    d3.select("#productTooltip").raise();
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
      .attr("fill", primaryColor)
      .attr("class", "graphicElementQuarter bar2019Quarter")
      .attr("id", (d) => {
        const target = d.target;
        const score = d.pctOnTime;

        let ptsFromTarget = target - score;

        ptsFromTarget = ptsFromTarget.toFixed(1);

        return `${ptsFromTarget} points from target`;
      })
      .attr("height", (d) => yScale(d.pctOnTime));

    svg
      .selectAll(".bar2020Quarter")
      .data(data2020)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * interBarMargin + barWidth + barMarginLeft - 7)
      .attr("y", (d) => topStart - yScale(d.pctOnTime))
      .attr("width", barWidth)
      .attr("fill", secondaryColor)
      .attr("class", "graphicElementQuarter bar2020Quarter")
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("id", (d) => {
        const target = d.target;
        const score = d.pctOnTime;

        let ptsFromTarget = target - score;
        ptsFromTarget = ptsFromTarget.toFixed(1);

        return `${ptsFromTarget} points from target`;
      });
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
      .attr("y", (d) => topStart - yScale(d.pctOnTime));

    d3.selectAll(".bar2019Quarter")
      .data(data2019)
      .transition()
      .duration(500)
      .attr("height", (d) => yScale(d.pctOnTime))
      .attr("y", (d) => topStart - yScale(d.pctOnTime));

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
      .attr("class", "nonBarQuarter  graphicElementQuarter targetLines");

    // drawNonBarItems();
  }

  function drawNonBarItems() {
    const data2020 = propData.filter((row) => row.fy === 2020);

    const quarters = ["Q1", "Q2", "Q3", "Q4 "];
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

  function drawTooltip() {
    const tooltipSelection = d3.select("#productTooltip");

    tooltipSelection.remove();

    d3.select("#productTooltipText").remove();

    const svg = d3.select("#productSvg");
    svg
      .append("rect")
      .attr("width", tooltipWidth)
      .attr("height", tooltipHeight)
      .attr("id", "productTooltip")
      .attr("fill", "#888a8c")
      .attr("rx", 3)
      .style("opacity", 0);

    svg
      .append("text")
      .text("testing text")
      .attr("stroke", "black")
      .attr("id", "productTooltipText")
      .style("font-size", "14px")
      .style("opacity", 0);

    tooltipSelection.raise();
  }

  const theseBars = d3.selectAll(".bar2020Quarter, .bar2019Quarter");

  theseBars.on("mouseover", function () {
    let currentBarX = d3.select(this)._groups[0][0].x.animVal.value;
    let currentBarY = d3.select(this)._groups[0][0].y.animVal.value;

    let currentBarId = d3.select(this)._groups[0][0].id;

    console.log(currentBarX);

    let tooltipXDisplacement = 20;
    const tooltipYDisplacement = 100;

    if (currentBarX > 500) {
      tooltipXDisplacement = -155;
    }

    currentBarY += tooltipYDisplacement;
    currentBarX += tooltipXDisplacement;

    const textMarginTop = 30;
    const textMarginLeft = 5;

    d3.select("#productTooltip")
      .attr("x", currentBarX)
      .attr("y", currentBarY)
      .transition()
      .duration(300)
      .style("opacity", 0.95);

    d3.select("#productTooltipText")
      .attr("x", currentBarX + textMarginLeft)
      .attr("y", currentBarY + textMarginTop)
      .transition()
      .duration(300)
      .style("opacity", 0.95)
      .text(currentBarId);

    d3.select("#productTooltipText").raise();
  });

  theseBars.on("mouseout", function () {
    d3.select("#productTooltip").transition().duration(300).style("opacity", 0);
    d3.select("#productTooltipText")
      .transition()
      .duration(300)
      .style("opacity", 0);
  });

  return (
    <div>
      <h3 fontFamily={textNodeFont}>Product-Level Quarterly Data</h3>
      <h4>{propData[0].product}</h4>
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
  );
};

export default MarketingMailClassGraph;
