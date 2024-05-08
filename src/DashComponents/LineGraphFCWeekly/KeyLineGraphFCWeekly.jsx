// import styles from "./LineGraphWeekly.module.css";
import styles from "./LineGraphWeekly.module.css";

export const KeyLineGraphFCWeekly = () => {
  return (
    <div className={styles.keyContainerOuter}>
      <div className={styles.keyTitle}>
        All First-Class Mail Percent On Time
      </div>
      <div className={styles.keyContentMatrix}>
        <div className={styles.firstSeries}></div>
        <div className={styles.firstLabel}>FY 2024</div>
        <div className={styles.secondSeries}></div>
        <div className={styles.secondLabel}>FY 2023</div>
      </div>
    </div>
  );
};

export default KeyLineGraphFCWeekly;
