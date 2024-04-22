import styles from "./LineGraphDS.module.css";

export const LineGraphKeyDS = () => {
  return (
    <div className={styles.keyContainerOuter}>
      <div className={styles.keyTitle}>
        First Class Single-Piece Letters and Cards Percent On Time
      </div>
      <div className={styles.keyContentMatrix}>
        <div className={styles.twoDaySeries}></div>
        <div className={styles.twoDayLabel}>Two Day</div>
        <div className={styles.threeFiveDaySeries}></div>
        <div className={styles.threeFiveDayLabel}>Three-to-Five Day</div>
      </div>
    </div>
  );
};

export default LineGraphKeyDS;
