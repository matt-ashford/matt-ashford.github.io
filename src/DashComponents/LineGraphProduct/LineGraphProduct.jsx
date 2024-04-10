// import { useState, useEffect } from "react";
import { TooltipServiceProduct } from "./TooltipServiceProduct";
import { useEffect, useState } from "react";
import styles from "./LineGraph.module.css";
import { LineGraphTitle } from "./LineGraphTitle";
import { generateDataLineGraph } from "./GenerateDataLineGraph";
import { drawTargets } from "./DrawTargets";
import { drawLine } from "./DrawLine";
import { drawOverLay } from "./DrawOverlay";

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
  topStart,
  svgWidth,
} from "./LineGraphDimensions";

import * as d3 from "d3";

import { drawYAxis } from "./DrawYAxis";
import { drawXAxis } from "./DrawXAxis";

export const LineGraphProduct = (props) => {
  const { selectedProductId, joinedDataAnnual, joinedDataQtr } = props;

  const [isHoveringProdGraph, setIsHoveringProdGraph] = useState(false);
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);

  const [hoverSeq, setHoverSeq] = useState(-1);

  //   useEffect(()=>{

  //   })

  const [graphData, setGraphData] = useState(
    generateDataLineGraph(selectedProductId, joinedDataAnnual, joinedDataQtr)
  );
  useEffect(() => {
    setGraphData(
      generateDataLineGraph(selectedProductId, joinedDataAnnual, joinedDataQtr)
    );
  }, [selectedProductId]);

  useEffect(() => {
    removeAxes();
    removeGraphedData();
    drawOverLay(drawOverLayParams);
    drawYAxis(drawYAxisParams);
    drawXAxis(drawXAxisParams);
    drawLine(drawLineParams);
    drawTargets(drawTargetsParams);
  }, [graphData]);

  const svgId = "lineGraphProductSvg";

  const tooltipId = "tooltipProduct";
  const tooltipSelected = d3.select(`#${tooltipId}`);
  tooltipSelected.on("mouseenter", function () {
    setIsHoveringProdGraph(true);
    setIsHoveringTooltip(true);
    tooltipSelected.style("opacity", 1);
  });

  const getInterBarMargin = (graphData) => {
    const barCount = graphData.length;
    const interBarDist = svgWidth / barCount;

    return interBarDist;
  };

  function xPoz(i, graphData) {
    let interBarMargin = getInterBarMargin(graphData);
    return i * interBarMargin + barMarginLeft;
  }

  function removeAxes() {
    const svgSelected = d3.select(`#${svgId}`);

    svgSelected.selectAll(".lineGraphYAxis").remove();
    svgSelected.selectAll(".domain").remove();
    svgSelected.selectAll(".xAxisText").remove();
    svgSelected.selectAll(".tick").remove();
  }

  function removeGraphedData() {
    const svgSelected = d3.select(`#${svgId}`);

    svgSelected.selectAll(".lineGraphTarget").remove();

    svgSelected.selectAll(".lineGraphLine").remove();

    svgSelected.selectAll(".overlayRect").remove();
  }

  function createXAxisValuesArray(graphData) {
    const firstRow = graphData[0];
    let rezArray = [];
    if (!Object.keys(firstRow).includes("quarter")) {
      rezArray = graphData.map((row) => row.fy.toString());
    } else {
      rezArray = graphData.map((row) => {
        //   return `${row.fy}_Q${row.quarter}`;
        return `Q${row.quarter}_${row.fy}`;
        //   if (row.quarter === 1) {
        //     return `${row.fy}_Q${row.quarter}`;
        //   }
        //   return `Q${row.quarter}`;
      });
    }
    return rezArray;
  }

  function mouseEnterSvg() {
    setIsHoveringProdGraph(true);
    // mouseMoveSvg();
  }

  function mouseExitSvg() {
    setIsHoveringProdGraph(false);
    // mouseMoveSvg();
  }

  const xArray = createXAxisValuesArray(graphData);

  const xScale = d3
    .scaleBand()
    .domain(xArray)
    .range([0, graphWidth - marginRight - marginLeft]);

  const drawYAxisParams = {
    svgId: svgId,
  };
  const drawXAxisParams = {
    svgId: svgId,
    xArray: xArray,
    xScale: xScale,
  };

  const drawLineParams = {
    svgId: svgId,
    graphData: graphData,
    xScale: xScale,
    xArray: xArray,
  };

  const drawTargetsParams = {
    svgId: svgId,
    graphData: graphData,
    xScale: xScale,
    xArray: xArray,
  };

  const drawOverLayParams = {
    svgId: svgId,
    graphData: graphData,
    xScale: xScale,
    xArray: xArray,
    setHoverSeq: setHoverSeq,
    setIsHoveringProdGraph: setIsHoveringProdGraph,
  };

  return (
    <div className={styles.graphAndTitleContainer}>
      <LineGraphTitle graphData={graphData} />
      <svg
        className={styles.classGraphsvg}
        // onMouseMove={mouseMoveSvg}
        onMouseEnter={mouseEnterSvg}
        onMouseLeave={mouseExitSvg}
        shapeRendering="crispEdges"
        id={svgId}
        height={graphHeight}
        width={graphWidth}
      ></svg>

      <TooltipServiceProduct
        graphData={graphData}
        isHoveringProdGraph={isHoveringProdGraph}
        setIsHoveringProdGraph={setIsHoveringProdGraph}
        xArray={xArray}
        svgId={svgId}
        xScale={xScale}
        hoverSeq={hoverSeq}
      />
    </div>
  );
};

export default LineGraphProduct;
