import { useEffect, useState } from "react";
import styles from "./LineGraph.module.css";
import * as d3 from "d3";
import { determineRightPush, marginLeft } from "./LineGraphDimensions";

export const TooltipServiceProduct = (props) => {
  const {
    graphData,
    setIsHoveringProdGraph,
    isHoveringProdGraph,
    xArray,
    svgId,
    hoverSeq,
    xScale,
  } = props;

  const [tooltipText, setTooltipText] = useState("");

  useEffect(() => {
    const tooltipId = "tooltipProduct";
    const tooltipSelected = d3.select(`#${tooltipId}`);

    tooltipXPoz(hoverSeq, tooltipId, xScale, isHoveringProdGraph, graphData);
  }, []);
  useEffect(() => {
    const tooltipId = "tooltipProduct";
    tooltipXPoz(hoverSeq, tooltipId, xScale, isHoveringProdGraph, graphData);
    tooltipYPoz(tooltipId, hoverSeq);
    setTooltipText(
      returnTooltipText(tooltipId, isHoveringProdGraph, hoverSeq, graphData)
    );
  }, [hoverSeq, isHoveringProdGraph]);

  useEffect(() => {
    const tooltipId = "tooltipProduct";

    fadeOutTooltip(tooltipId, isHoveringProdGraph);
  }, [isHoveringProdGraph]);

  const tooltipId = "tooltipProduct";
  const tooltipSelected = d3.select(`#${tooltipId}`);
  tooltipSelected.on("mouseenter", function () {
    setIsHoveringProdGraph(true);
  });
  const tooltipTextFill = "sdfsdf";

  const tooltipXPozParams = {};

  return (
    <>
      <div className={styles.tooltipLine}></div>
      <div id={tooltipId} className={styles.tooltipProduct}>
        {/* <div className={styles.triangleContainer}> */}
        <div className={styles.triangleDiv}></div>
        {/* </div> */}
        <div>{tooltipText}</div>
      </div>
    </>
  );
};

function tooltipXPoz(
  hoverSeq,
  tooltipId,
  xScale,
  isHoveringProdGraph,
  graphData
) {
  const tooltipSelected = d3.select(`#${tooltipId}`);
  if (isHoveringProdGraph && tooltipSelected) {
    const xArrayHovered = matchXArray(hoverSeq);
    const xScalePozTooltip = xScale(xArrayHovered);
    const rightPush = determineRightPush(graphData);
    const additionalRightPush = 20;
    const xPozTooltip =
      xScalePozTooltip + rightPush + marginLeft + additionalRightPush;
    tooltipSelected
      .transition()
      .duration(200)
      .style("left", `${xPozTooltip}px`);
  }
}

function tooltipYPoz(tooltipId, hoverSeq) {
  const tooltipSelected = d3.select(`#${tooltipId}`);

  const topPush = -210;

  tooltipSelected.style("top", `${topPush}px`);

  //   if (hoverSeq !== -1 && tooltipSelected) {

  //     const overlaySelected = d3.select(`#${hoverSeq}`);
  //     if (overlaySelected) {
  //       const overlayBoxHeight = overlaySelected.node().getBBox().height;

  //       const heightRatio = 0.4;
  //       const tooltipHeight = overlayBoxHeight * heightRatio * -1;

  //       tooltipSelected.style("top", `${tooltipHeight}px`);
  //     }
  //   }
}

function fadeOutTooltip(tooltipId, isHoveringProdGraph) {
  const tooltipSelected = d3.select(`#${tooltipId}`);
  if (tooltipSelected) {
    const newOpacity = isHoveringProdGraph ? 1 : 0;
    tooltipSelected.style("opacity", newOpacity);
  }
}

function returnTooltipText(
  tooltipId,
  isHoveringProdGraph,
  hoverSeq,
  graphData
) {
  if (hoverSeq === -1) {
    return "n/a";
  } else {
    const matchingXArray = matchXArray(hoverSeq).toString();
    let matchingQuarter;
    let matchingYear;
    let isQuarterly = false;

    if (hoverSeq.includes("Q")) {
      isQuarterly = true;
      matchingQuarter = matchingXArray.split("Q")[1][0];
      matchingYear = matchingXArray.split("_")[1];
    } else {
      matchingYear = matchingXArray;
    }

    const matchingRow = filterGraphDataSingleRow(
      matchingYear,
      matchingQuarter,
      graphData
    );

    const pointsFromTarget =
      //   matchingRow.target - matchingRow.pct_on_time.toFixed(2);
      Math.round(
        (matchingRow.target - matchingRow.pct_on_time + Number.EPSILON) * 100
      ) / 100;

    const pointsFromTargetColor =
      pointsFromTarget > 0 ? "pointsFromTargetRed" : "pointsFromTargetGreen";

    const yearAndQuarterText = isQuarterly
      ? `FY ${matchingYear} Q${matchingQuarter}`
      : `FY ${matchingYear}`;

    const targetDifferenceText = `Points form Target ${pointsFromTarget}`;

    return (
      <>
        {" "}
        <div className={styles.yearAndQuarterText}>{yearAndQuarterText}</div>
        <div className={styles.pointsFromTargetLabel}>Points from Target:</div>
        <div
          className={styles[pointsFromTargetColor]}
        >{`${pointsFromTarget}`}</div>
      </>
    );
    // return `${matchingYear} ${matchingQuarter} ${matchingRow.pct_on_time}`;
    // return `${JSON.stringify(matchingRow)}`;
    // return `${matchingRow.pct_on_time}`;
  }
}

function filterGraphDataSingleRow(matchingYear, matchingQuarter, graphData) {
  matchingYear = parseInt(matchingYear);

  let matchingRow;
  if (matchingQuarter) {
    matchingQuarter = parseInt(matchingQuarter);
    matchingRow = graphData.filter((row) => {
      return row.fy === matchingYear && row.quarter === matchingQuarter;
    });
  } else {
    matchingRow = graphData.filter((row) => {
      return row.fy === matchingYear;
    });
  }
  return matchingRow[0];
}

function matchXArray(hoverSeq) {
  if (hoverSeq === -1) {
    return 0;
  }

  const hoverSeqList = hoverSeq.split("_");
  if (hoverSeq.includes("Q")) {
    return `${hoverSeqList[1]}_${hoverSeqList[2]}`;
  }
  return hoverSeqList[1];
}

export default TooltipServiceProduct;
