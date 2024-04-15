import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { countTableDataFilter } from "./countTableDataFilter";
import ProductCountBar from "./ProductCountBar";
import styles from "./ProductCountTableStyles.module.css";
import Stack from "@mui/material/Stack";
import { filterAnnualComparison } from "../../../DataManipulation/filterAnnualComparison";
import { useEffect, useState } from "react";

export const ProductCountTable = (props) => {
  const { propData, selectedYear, mailClassName } = props;

  const [cellData, setCellData] = useState(
    countTableDataFilter(propData, selectedYear)
  );

  useEffect(() => {
    const filtData = filterAnnualComparison(
      mailClassName,
      selectedYear,
      propData
    );
    setCellData(countTableDataFilter(filtData, selectedYear));
  }, [propData, selectedYear]);

  function productOrComponent(mc) {
    const isFirstClass = mc == "First Class Mail";

    if (isFirstClass) {
      return "Product Components";
    }
    return "Products";
  }

  return (
    <>
      <div className={styles.outerContainerProductCount}>
        <div className={styles.countCell} id={styles.totalCountCountainer}>
          <Typography
            variant="h4"
            align="left"
            className={styles.tableTextNumber}
          >
            {cellData.productCount}
          </Typography>
          <br />
          <Typography align="left" className={styles.tableText}>
            {productOrComponent(mailClassName)} are Rated in this Class
          </Typography>

          <ProductCountBar
            totalProductCount={cellData.productCount}
            thisCount={cellData.productCount}
            dataType="totalProductCount"
          />
        </div>

        <div className={styles.countCell} id={styles.missedCountCountainer}>
          <Typography
            variant="h4"
            align="left"
            className={styles.tableTextNumber}
          >
            {cellData.missedTarget}
          </Typography>
          <br></br>
          <Typography align="left" className={styles.tableText}>
            {productOrComponent(mailClassName)} Missed their Targets in{" "}
            {selectedYear}
          </Typography>

          <ProductCountBar
            totalProductCount={cellData.productCount}
            thisCount={cellData.missedTarget}
            dataType="missedProductCount"
          />
        </div>
        <div className={styles.countCell} id={styles.decCountContainer}>
          <Typography
            variant="h4"
            align="left"
            className={styles.tableTextNumber}
          >
            {cellData.decreasedCount}
          </Typography>
          <br></br>

          <Typography align="left" className={styles.tableText}>
            {productOrComponent(mailClassName)} Decreased in {selectedYear}
          </Typography>
          <ProductCountBar
            totalProductCount={cellData.productCount}
            thisCount={cellData.decreasedCount}
            dataType="decreasedProductCount"
          />
        </div>
      </div>
    </>
  );
};

export default ProductCountTable;
