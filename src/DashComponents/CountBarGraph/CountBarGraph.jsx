import { useEffect, useState } from "react";
import { countBarDataPrep } from "./CountBarDataPrep";
import { drawCountBars } from "./DrawCountBars";
// import { drawAxisLabels } from "./DrawAxisLabels";
import { drawAxisLabels } from "./DrawAxisLabels";
import * as d3 from "d3";
import PieGraphKey from "../PieGraphKey";
import { pinkHighlight, greenGrey } from "../../Design/MyTheme";
import styles from "./countBartGraph.module.css";

export const CountBarGraph = (props) => {
  const { propData } = props;

  useEffect(() => {
    removeGraphics();
  }, []);

  useEffect(() => {
    removeGraphics();
    drawGraphics(countData, svgId);
  }, [propData]);

  const svgId = "countBarsSvg";

  function removeGraphics() {
    d3.selectAll(".barCount").remove();
    d3.selectAll(".x-axisCountBar").remove();
    d3.selectAll(".y-axisCountBar").remove();
    d3.selectAll(".axisLabel").remove();
  }

  function drawGraphics(countData, svgId) {
    drawCountBars(countData, svgId);
    drawAxisLabels(countData, svgId);
  }

  let countData = countBarDataPrep(propData);

  const colorObj = {
    pinkHighlight: pinkHighlight,
    greenGrey: greenGrey,
  };

  return (
    <>
      <div>
        <div className={styles.graphTitleContainer}>
          Count of Product Components by Fiscal Year
        </div>
        <div className={styles.graphSvgContainer}>
          <svg id={`${svgId}`} height="550"></svg>
        </div>
        <div className={styles.graphKeyContainer}>
          <PieGraphKey colorObj={colorObj} />
        </div>
      </div>
    </>
  );
};

export default CountBarGraph;
