// import { useState, useEffect } from "react";
import { useEffect, useState } from "react";
import styles from "./LineGraph.module.css";
import { LineGraphTitle } from "./LineGraphTitle";
import { FilterDataLineGraph } from "./FilterDataLineGraph";

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
  getInterBarMargin,
  topStart,
} from "./LineGraphDimensions";

import { drawYAxis } from "./DrawYAxis";
import { drawXAxis } from "./DrawXAxis";

export const LineGraphProduct = (props) => {
  const { selectedProductId, joinedDataAnnual, joinedDataQtr } = props;

  useEffect(() => {
    drawYAxis(drawYAxisParams);
    drawXAxis(drawXAxisParams);
  });

  const svgId = "lineGraphProductSvg";
  const graphData = FilterDataLineGraph(
    selectedProductId,
    joinedDataAnnual,
    joinedDataQtr
  );

  const drawYAxisParams = {
    svgId: svgId,
  };
  const drawXAxisParams = {
    svgId: svgId,
    graphData: graphData,
    xPoz: xPoz,
    topStart: topStart,
  };

  function xPoz(i, graphData) {
    let interBarMargin = getInterBarMargin(graphData) * 2;
    return i * interBarMargin + barMarginLeft;
  }

  return (
    <div className={styles.graphAndTitleContainer}>
      <LineGraphTitle />
      <svg
        className={styles.classGraphsvg}
        // onMouseMove={mouseMoveSvg}
        //   onMouseEnter={mouseEnterSvg}
        //   onMouseLeave={mouseExitSvg}
        shapeRendering="crispEdges"
        id={svgId}
        height={graphHeight}
        width={graphWidth}
      ></svg>
    </div>
  );
};

export default LineGraphProduct;
