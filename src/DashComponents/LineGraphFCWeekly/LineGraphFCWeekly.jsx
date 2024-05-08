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

export const LineGraphFCWeekly = (props) => {
  const { data } = props;

  console.log(data);

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

  // const dataPctConvert = data.map((row) => {
  //   const newScore = row.score * 100;
  //   const { score, ...rest } = row;
  //   return { score: newScore, ...rest };
  // });

  // console.log("new thing", dataPctConvert);

  const latestYearData = data.filter((row) => row.pstl_yr === latestYear);
  const prevYearData = data.filter((row) => row.pstl_yr === prevYear);

  const svgId = "fcWeeklySvg";

  function drawGraphElements() {
    drawYAxisWeekly(drawYAxisParams);
    drawXAxis(drawXAxisParams);
    drawLine(drawLineParamsFirst);
    drawLine(drawLineParamsSecond);
    // drawLine(drawLineParamsSecond);
  }

  // function removeGraphElements() {
  //   d3.selectAll(".lineGraphYAxis").remove();
  //   d3.selectAll(".lineGraphLine").remove();
  //   d3.selectAll(".xAxisText").remove();
  // }

  // function returnFilterGraphData(productId, dataset) {
  //   return dataset.filter((row) => row.product_id === productId);
  // }

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

  // const drawLineParamsSecond = {
  //   svgId: svgId,
  //   graphData: graphDataSecondProd,
  //   xScale: xScale,
  //   xArray: xArray,
  //   lineColor: "green",
  //   seriesSeq: 2,
  //   // lineColor: "black",
  // };

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
    </div>
  );
};

export default LineGraphFCWeekly;

// const [graphDataFirstProd, setGraphDataFirstProd] = useState(
//   returnFilterGraphData(keeperProds[0], joinedDataQtr)
// );

// const [graphDataSecondProd, setGraphDataSecondProd] = useState(
//   returnFilterGraphData(keeperProds[1], joinedDataQtr)
// );

// useEffect(() => {
//   removeGraphElements();
//   drawGraphElements();
// }, []);

// useEffect(() => {
//   removeGraphElements();
//   drawGraphElements();
// }, [graphDataFirstProd]);
