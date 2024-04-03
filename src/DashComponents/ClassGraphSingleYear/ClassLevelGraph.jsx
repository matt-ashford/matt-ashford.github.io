import * as d3 from "d3";
import { useEffect, useState } from "react";
import GraphKey from "../GraphKey";
import {
  primaryColor,
  secondaryColor,
  textNodeFont,
  pinkHighlight,
} from "../../Design/MyTheme";

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
} from "../../Design/graphDimensions";

import { TooltipTarget } from "../TooltipTarget";

import { TooltipServiceClassLevel } from "./TooltipServiceClassLevel";
import { TooltipProductNames } from "./TooltipProductNames";
import ClassGraphTitle from "./ClassGraphTitle";
import { transitionBars } from "./TransitionBars";
import { drawBars } from "./DrawBars";
import { drawTargetLines } from "./DrawTargetLines";
import { drawProductNames } from "./DrawProductNames";
import { drawYaxisText } from "./DrawYaxisText";
import { drawTicks } from "./DrawTicks";
import { sortPropData } from "./SortPropData";

export const ClassGraphSingleYear = (props) => {
  const { propData, mailClass, selectedYear } = props;

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
    removeGraphicalElements();
    drawYaxisText(svgId);
    drawTicks(svgId, yScaleRev, svgWidth);
    drawBars(drawBarsParams);
    drawTargetLines(drawTargetLinesParams);
    drawProductNames(drawProductNamesParams);
  }, []);

  useEffect(() => {
    // setPropDataNotNull(propData.filter((row) => row.target !== null));
    // setPopDataSorted(sortPropData(propDataNotNull));

    transitionBars(transitionBarsParams);
  }, [selectedYear]);

  useEffect(() => {
    // setPropDataNotNull(propData.filter((row) => row.target !== null));
    // setPopDataSorted(sortPropData(propDataNotNull));

    removeGraphicalElements();

    drawBars(drawBarsParams);
    drawTargetLines(drawTargetLinesParams);
    drawProductNames(drawProductNamesParams);
  }, [mailClass]);

  function removeGraphicalElements() {
    removeBars();
    removeTargetLines();
    removeProductNames();
  }

  const rotateProductNames = mailClass === "First Class Mail" ? true : false;
  const strippedMailClass = mailClass.replace(/\s+/g, "");
  const extraBarMarginLookup = {
    FirstClassMail: 0,
    MarketingMail: 0,
    Periodicals: 90,
    SpecialServices: 40,
    PackageServices: 90,
  };

  const extraBarMargin = extraBarMarginLookup[strippedMailClass];

  const topStart = graphHeight - marginBottom;

  const svgWidth = graphWidth - marginLeft - marginRight;

  const svgId = mailClass.replace(/\s+/g, "") + "ClassSvg";

  const svg = d3.select(`#${svgId}`);

  const propDataNotNull = propData.filter((row) => row.target !== null);

  const propDataSorted = sortPropData(propDataNotNull);

  function getInterBarMargin(graphData) {
    const barCount = graphData.length;
    const interBarDist = svgWidth / barCount;

    return interBarDist;
  }

  function barXPoz(i) {
    // let interBarMargin = getInterBarMargin(propDataNotNull) * 2;
    let interBarMargin = getInterBarMargin(propDataSorted) * 2;
    return i * interBarMargin + barMarginLeft + extraBarMargin;
  }

  const drawTargetLinesParams = {
    svgId: svgId,
    propData: propDataSorted,
    // propData: propDataNotNull,
    selectedYear: selectedYear,
    topStart: topStart,
    getInterBarMargin: getInterBarMargin,
    extraBarMargin: extraBarMargin,
  };

  const transitionBarsParams = {
    propData: propDataSorted,
    // propData: propDataNotNull,
    oldBars: ".barOldData",
    newBars: ".barNewData",
    selectedYear: selectedYear,
    topStart: topStart,
    pinkHighlight: pinkHighlight,
    mouseOverTriggersBar: mouseOverTriggersBar,
    mouseOutTriggersBar: mouseOutTriggersBar,
  };

  const drawBarsParams = {
    svgId: svgId,
    // propData: propDataNotNull,
    propData: propDataSorted,
    selectedYear: selectedYear,
    barXPoz: barXPoz,
    topStart: topStart,
    mouseOverTriggersBar: mouseOverTriggersBar,
    mouseOutTriggersBar: mouseOutTriggersBar,
  };

  const drawProductNamesParams = {
    svgId: svgId,
    // propData: propDataNotNull,
    propData: propDataSorted,
    rotateProductNames: rotateProductNames,
    selectedYear: selectedYear,
    getInterBarMargin: getInterBarMargin,
    topStart: topStart,
    extraBarMargin: extraBarMargin,
    mouseOverTriggersProductText: mouseOverTriggersProductText,
    mouseOutTriggersProductText: mouseOutTriggersProductText,
  };

  const tooltipParams = {
    svgId: svgId,
    barXPoz: barXPoz,
    topStart: topStart,
    barWidth: barWidth,
    yScale: yScale,
  };

  function removeBars() {
    d3.selectAll(".barNewData").remove();
    d3.selectAll(".barOldData").remove();
  }

  function removeTargetLines() {
    d3.select(`#${svgId}`).selectAll(".targetLines").remove();
  }

  function removeProductNames() {
    d3.select(`#${svgId}`).selectAll(".productNameText").remove();
  }

  function mouseEnterSvg() {
    console.log("we in this bitch");
    setIsHovering(true);
  }

  function mouseExitSvg() {
    setIsHovering(false);
    console.log("we out this bitch");
  }

  function mouseOverTriggersBar(currentBarSelection) {
    const currentBarId = currentBarSelection._groups[0][0].id;

    const currentBarX = currentBarSelection._groups[0][0].x.baseVal.value;
    const currentBarHeight =
      currentBarSelection._groups[0][0].height.baseVal.value;

    setXHover(currentBarX);
    setHoverId(currentBarId);
    setHoverHeight(currentBarHeight);

    currentBarSelection.attr("stroke", "black");
  }

  function mouseOutTriggersBar(currentBarSelection) {
    // d3.selectAll("rect").attr("stroke", "none");
    // d3.selectAll(currentBarSelection).attr("stroke", "none");
    // console.log(currentBarSelection);
    // setHoverId(0);
  }

  // function mouseOutTriggersTarget(currentTargetSelection) {
  //   setIsHoveringTarget(false);
  // }

  function mouseOverTriggersProductText(currentTextSelection) {
    const currentTextId = currentTextSelection._groups[0][0].id;

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
        <ClassGraphTitle mailClass={mailClass} selectedYear={selectedYear} />
        <svg
          onMouseEnter={mouseEnterSvg}
          onMouseLeave={mouseExitSvg}
          shapeRendering="crispEdges"
          id={svgId}
          height={rotateProductNames ? 350 : 330}
          width={graphWidth}
        ></svg>

        <GraphKey
          level={"classLevel"}
          oldBars={".barOldData"}
          newBars={".barNewData"}
          selectedYear={selectedYear}
        />
      </div>

      <TooltipServiceClassLevel
        xHover={xHover}
        hoverId={hoverId}
        isHovering={isHovering}
        setIsHovering={setIsHovering}
        hoverHeight={hoverHeight}
        propData={propDataSorted}
        tooltipId={"tooltipClassGraph"}
        tooltipParams={tooltipParams}
      />

      {/* 
      <TooltipTarget
        isHoveringTarget={isHoveringTarget}
        hoverTargetId={hoverTargetId}
        tooltipId={"tooltipClassTarget"}
        propData={propData}
        xHoverTarget={xHoverTarget}
      /> */}

      <TooltipProductNames
        isHoveringProductText={isHoveringProductText}
        hoverTextId={hoverTextId}
        propData={propData}
        xHoverText={xHoverText}
      />
    </>
  );
};

export default ClassGraphSingleYear;
