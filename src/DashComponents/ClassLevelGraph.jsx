import * as d3 from "d3";
import { useEffect, useState } from "react";
import GraphKey from "./GraphKey";
import {
  primaryColor,
  secondaryColor,
  highlightColor,
  textNodeFont,
  pinkHighlight,
  lightGrey,
} from "../Design/MyTheme";

import {
  marginBottom,
  graphHeight,
  graphWidth,
  barWidth,
  marginLeft,
  marginRight,
  targetMarginLeft,
  barMarginLeft,
  marginTop,
  yScale,
  yScaleRev,
} from "../Design/graphDimensions";

import { TooltipTarget } from "./TooltipTarget";

import { TooltipService_ClassLevel } from "./TooltipService_ClassLevel";
import { TooltipProductNames } from "./TooltipProductNames";

export const ClassLevelGraph = (props) => {
  const { propData, mailClass } = props;

  const [data, setData] = useState({});

  const [xHover, setXHover] = useState(0);
  const [hoverId, setHoverId] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [hoverHeight, setHoverHeight] = useState(0);

  const [isHoveringTarget, setIsHoveringTarget] = useState(false);
  const [hoverTargetId, setHoverTargetId] = useState("");
  const [xHoverTarget, setXHoverTarget] = useState(0);

  const [isHoveringProductText, setIsHoveringProductText] = useState(false);
  const [hoverTextId, setHoverTextId] = useState("");
  const [xHoverText, setXhoverText] = useState(0);

  useEffect(() => {
    setData(propData);
    barFunctions();
  }, []);

  useEffect(() => {
    barFunctions();
  }, [data, propData]);

  const dataProducts = propData.filter(
    (row) => row.productAbbrev !== "missing"
  );
  const data2020 = dataProducts.filter((row) => row.fy === 2020);

  const hasManyProducts = data2020.length > 9 ? true : false;

  const topStart = graphHeight - marginBottom;

  const svgWidth = graphWidth - marginLeft - marginRight;

  const svgId = mailClass.replace(/\s+/g, "") + "ClassSvg";

  const svg = d3.select(`#${svgId}`);

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
      .text((d) => d.productAbbrev)
      .attr("text-anchor", () => {
        if (hasManyProducts) {
          return "start";
        }
        return "middle";
      })
      .attr("class", "graphicElement nameBox nonBar")
      .attr("font-family", textNodeFont)
      .attr("id", (d, i) => `nameTextid_${d.productId}`)
      .attr("transform", function (d, i) {
        let rotationDeg = 0;

        if (hasManyProducts) {
          rotationDeg = 25;
        }

        return `translate(${
          i * interBarMargin + 75
        },${topStart + 15})rotate(${rotationDeg})`;
      })
      .attr("dx", () => {
        if (hasManyProducts) {
          return "-.9em";
        } else {
          return ".3em";
        }
      })
      .attr("dy", () => {
        if (hasManyProducts) {
          return ".3em";
        } else {
          return ".2em";
        }
      })
      .on("mouseover", function () {
        const currentTextSelection = d3.select(this);
        mouseOverTriggersProductText(currentTextSelection);
      })
      .on("mouseout", function () {
        mouseOutTriggersProductText();
      });

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
      .attr("fill", secondaryColor)
      .attr("class", "graphicElement bar2019")
      .attr("id", (d) => `classBar_${d.productId}_${d.fy}`)
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
      .attr("fill", primaryColor)
      .attr("class", "graphicElement bar2020")
      .attr("id", (d) => `classBar_${d.productId}_${d.fy}`)
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
      .attr("class", "graphicElement targetLines nonBar");

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
      .attr("class", "targetTooltipRect")
      .attr("id", (d) => `classTarget_${d.productId}`)
      .on("mouseover", function () {
        const currentTargetSelection = d3.select(this);

        mouseOverTriggersTarget(currentTargetSelection);
      })
      .on("mouseout", function () {
        const currentTargetSelection = d3.select(this);
        mouseOutTriggersTarget(currentTargetSelection);
      });

    svg
      .append("text")
      .text("On-Time (%)")
      .attr("x", 190)
      .attr("y", 20)
      .style("text-anchor", "middle")
      .attr("transform", "translate(-5,315) rotate(270)")
      .attr("font-family", textNodeFont)
      .attr("class", "graphicElement");

    function rotateTextConditionally(dataset) {
      const datasetLength = dataset.length;

      console.log(datasetLength, "rotate cond");
      if (datasetLength > 8) {
        return "rotate(45)";
      } else {
        return "rotate(0)";
      }
    }
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

    currentBarSelection.attr("stroke", "black");
  }

  function mouseOutTriggers(currentBarSelection) {
    setIsHovering(false);

    d3.selectAll("rect").attr("stroke", "none");
  }

  function removeBars() {
    d3.selectAll(".graphicElement").remove();
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

  function mouseOverTriggersProductText(currentTextSelection) {
    const currentTextId = currentTextSelection._groups[0][0].id;

    // console.log(currentTextSelection._groups[0][0]);

    setIsHoveringProductText(true);
    setHoverTextId(currentTextId);
    setXhoverText(
      currentTextSelection._groups[0][0].transform.baseVal[0].matrix.e
    );
  }

  function mouseOutTriggersProductText() {
    setIsHoveringProductText(false);
  }

  return (
    <>
      <div style={{ marginLeft: "-5%" }}>
        <h3 fontFamily={textNodeFont}>{mailClass} Products</h3>
        <svg
          shapeRendering="crispEdges"
          id={svgId}
          height={hasManyProducts ? 350 : 330}
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

      <TooltipTarget
        isHoveringTarget={isHoveringTarget}
        hoverTargetId={hoverTargetId}
        tooltipId={"tooltipClassTarget"}
        propData={propData}
        xHoverTarget={xHoverTarget}
      />

      <TooltipProductNames
        isHoveringProductText={isHoveringProductText}
        hoverTextId={hoverTextId}
        propData={propData}
        xHoverText={xHoverText}
      />
    </>
  );
};

export default ClassLevelGraph;
