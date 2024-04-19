import { useEffect, useState } from "react";
import * as d3 from "d3";
import { drawXAxis } from "./DrawXAxisDS";
import { drawYAxis } from "./DrawYAxisDS";
import { drawLine } from "./DrawLineDS";

import {
  graphHeight,
  graphWidth,
  svgWidth,
  marginLeft,
  marginRight,
  barMarginLeft,
  determineRightPush,
} from "./LineGraphDimensionsDS";

export const LineGraphDoubleSeries = (props) => {
  const { keeperProds, joinedDataQtr } = props;

  const [graphDataFirstProd, setGraphDataFirstProd] = useState(
    returnFilterGraphData(keeperProds[0], joinedDataQtr)
  );

  const [graphDataSecondProd, setGraphDataSecondProd] = useState(
    returnFilterGraphData(keeperProds[1], joinedDataQtr)
  );

  useEffect(() => {
    removeGraphElements();
    drawGraphElements();
  }, []);

  useEffect(() => {
    removeGraphElements();
    drawGraphElements();
    // console.log(joinedDataQtr);
  }, [graphDataFirstProd]);

  function drawGraphElements() {
    drawYAxis(drawYAxisParams);
    drawXAxis(drawXAxisParams);
    drawLine(drawLineParamsFirst);
    drawLine(drawLineParamsSecond);
  }

  function removeGraphElements() {
    d3.selectAll(".lineGraphYAxis").remove();
    d3.selectAll(".lineGraphLine").remove();
  }

  function returnFilterGraphData(productId, dataset) {
    return dataset.filter((row) => row.product_id === productId);
  }
  const svgId = "lineGraphDoubleSeriesSVG";

  function createXAxisValuesArray(graphData) {
    const firstRow = graphData[0];
    let rezArray = [];

    if (firstRow.quarter === "annual") {
      rezArray = graphData.map((row) => row.fy.toString());
    } else {
      rezArray = graphData.map((row) => {
        return `Q${row.quarter}_${row.fy}`;
      });
    }
    return rezArray;
  }

  let xArray = createXAxisValuesArray(graphDataFirstProd);

  function calculateXScale(graphDataFirstProd, xArray) {
    const rightPush = determineRightPush(graphDataFirstProd);

    return d3
      .scaleBand()
      .domain(xArray)
      .range([0, graphWidth - marginRight - marginLeft]);
  }

  const xScale = calculateXScale(graphDataFirstProd, xArray);

  const drawYAxisParams = {
    svgId: svgId,
  };

  const drawXAxisParams = {
    svgId: svgId,
    xArray: xArray,
    xScale: xScale,
  };

  const drawLineParamsFirst = {
    svgId: svgId,
    graphData: graphDataFirstProd,
    xScale: xScale,
    xArray: xArray,
    seriesSeq: 1,
    // lineColor: "steelblue",
    // lineColor: "black",
  };

  const drawLineParamsSecond = {
    svgId: svgId,
    graphData: graphDataSecondProd,
    xScale: xScale,
    xArray: xArray,
    lineColor: "green",
    seriesSeq: 2,
    // lineColor: "black",
  };

  return (
    <>
      line graph go burr
      <svg
        height={graphHeight}
        width={graphWidth}
        id="lineGraphDoubleSeriesSVG"
      >
        {" "}
      </svg>
    </>
  );
};

export default LineGraphDoubleSeries;
