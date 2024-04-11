import { useEffect, useState } from "react";
import styles from "./LineGraph.module.css";

export const LineGraphKey = () => {
  return (
    <div className={styles.keyContainerOuter}>
      <div className={styles.onTimeSeries}></div>
      <div className={styles.seriesLabel}>Percent on Time</div>
      <div className={styles.targetSeries}></div>
      <div className={styles.seriesLabel}>Target </div>
    </div>
  );
};

export default LineGraphKey;
