import { useEffect, useState } from "react";
import * as d3 from "d3";
import { drawXAxis } from "./DrawXAxisWeekly.js";
import { drawYAxisWeekly } from "./DrawYAxisWeekly.js";
import { drawLine } from "./DrawLineWeekly.js";
import styles from "./LineGraphWeekly.module.css";

import {
  graphHeight,
  graphWidth,
  xScale,
  yScale,
  yScaleRev,
  svgWidth,
  marginLeft,
  marginRight,
  barMarginLeft,
  determineRightPush,
} from "./LineGraphDimensionsWeekly.js";

import { KeyLineGraphFCWeekly } from "./KeyLineGraphFCWeekly.jsx";
import DownloadButton from "../UIBits/DownloadButton/DownloadButton.jsx";

export const LineGraphFCWeekly = (props) => {
  const { data } = props;

  useEffect(() => {
    drawGraphElements();
  }, []);

  useEffect(() => {
    drawGraphElements();
  }, [data]);

  function getUniqueYears(data) {
    const years = data.map((row) => row.pstl_yr);
    const uniqueYears = [...new Set(years)];
    let uniqueYearsList = [...uniqueYears];
    uniqueYears.sort();

    return uniqueYearsList;
  }
  const uniqueYears = getUniqueYears(data);

  const latestYear = Math.max(...uniqueYears);
  const prevYear = Math.min(...uniqueYears);

  const latestYearData = data.filter((row) => row.pstl_yr === latestYear);
  const prevYearData = data.filter((row) => row.pstl_yr === prevYear);

  const svgId = "fcWeeklySvg";

  function drawGraphElements() {
    drawYAxisWeekly(drawYAxisParams);
    drawXAxis(drawXAxisParams);
    drawLine(drawLineParamsFirst);
    drawLine(drawLineParamsSecond);
  }

  const drawYAxisParams = {
    svgId: svgId,
  };

  const drawXAxisParams = {
    svgId: svgId,
    xScale: xScale,
  };

  const drawLineParamsFirst = {
    svgId: svgId,
    graphData: latestYearData,
    seriesSeq: 1,
  };

  const drawLineParamsSecond = {
    svgId: svgId,
    graphData: prevYearData,
    seriesSeq: 2,
  };

  const sourceText =
    "Source: USPS Service Performance Dashboard Source Data Extract File, available at https://spm.usps.com/#/main.";

  return (
    <div className={styles.graphOuterContainer}>
      <div className={styles.titleContainerGraph}>
        <div className={styles.graphTitleText}>
          First-Class Mail USPS Service Performance
        </div>
        <div className={styles.graphTitleText}>
          Dashboard Weekly Data, FY2023 - FY2024
        </div>
      </div>
      <div className={styles.keyAndGraphContainer}>
        <svg
          height={graphHeight}
          width={graphWidth}
          shapeRendering="geometricPrecision"
          id="fcWeeklySvg"
        ></svg>
        <KeyLineGraphFCWeekly />
      </div>
      <div className={styles.sourceContainer}>{sourceText}</div>
    </div>
  );
};

export default LineGraphFCWeekly;
