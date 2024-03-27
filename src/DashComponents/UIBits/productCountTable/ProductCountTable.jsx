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
  }, [propData]);

  function productOrComponent(mc) {
    const isFirstClass = mc == "First Class Mail";

    if (isFirstClass) {
      return "Product Components";
    }
    return "Products";
  }

  return (
    <>
      <Stack direction="row">
        <Container
          disableGutters={true}
          className={styles.totalCountCountainer}
          id={styles.broh}
        >
          <Typography
            variant="h4"
            align="left"
            className={styles.tableTextNumber}
          >
            {cellData.productCount}
          </Typography>
          <br></br>
          <Typography align="left" className={styles.tableText}>
            {productOrComponent(mailClassName)} are Rated in this Class
          </Typography>

          <ProductCountBar
            totalProductCount={cellData.productCount}
            thisCount={cellData.productCount}
            dataType="totalProductCount"
          />
        </Container>

        <Container
          disableGutters={true}
          className={styles.missedCountCountainer}
        >
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
        </Container>
        <Container disableGutters={true} className={styles.decCountContainer}>
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
        </Container>
      </Stack>
    </>
  );
};

export default ProductCountTable;
