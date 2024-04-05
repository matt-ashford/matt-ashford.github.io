// import { useState, useEffect } from "react";
import styles from "./LineGraph.module.css";
import { LineGraphTitle } from "./LineGraphTitle";
import { FilterDataLineGraph } from "./FilterDataLineGraph";
export const LineGraphProduct = (props) => {
  const { selectedProductId, joinedDataAnnual, joinedDataQtr } = props;

  const g = FilterDataLineGraph(
    selectedProductId,
    joinedDataAnnual,
    joinedDataQtr
  );

  return (
    <div className={styles.graphAndTitleContainer}>
      <LineGraphTitle />
      <svg
        className={styles.classGraphsvg}
        // onMouseMove={mouseMoveSvg}
        //   onMouseEnter={mouseEnterSvg}
        //   onMouseLeave={mouseExitSvg}
        shapeRendering="crispEdges"
        id="lineGraphProduct"
        // height={rotateProductNames ? 350 : 330}
        // height={rotateProductNames ? 330 : 310}
        //   height={rotateProductNames ? 330 : 300}
        //   width={graphWidth}
      ></svg>
    </div>
  );
};

export default LineGraphProduct;
