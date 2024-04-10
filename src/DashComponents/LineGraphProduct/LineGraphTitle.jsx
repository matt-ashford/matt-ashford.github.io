import styles from "./LineGraph.module.css";

export const LineGraphTitle = (props) => {
  const { graphData } = props;

  const firstObs = graphData[0];
  const isAnnual = Object.keys(firstObs).includes("quarter") ? false : true;

  const delSpeed = firstObs.delivery_speed;

  const fullProductName = `${firstObs.product} ${delSpeed ? delSpeed : ""}`;

  const dataFreq = isAnnual ? "Annual" : "Quarterly";

  const fullTitle = `${fullProductName} ${dataFreq} Service Performance`;

  return <div className={styles.lineGraphTitle}>{fullTitle}</div>;
};

export default LineGraphTitle;
