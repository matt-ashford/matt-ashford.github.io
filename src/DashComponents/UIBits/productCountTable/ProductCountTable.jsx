import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createCellData } from "./countTableDataFilter";
import ProductCountBar from "./ProductCountBar";
import styles from "./ProductCountTableStyles.module.css";
import Stack from "@mui/material/Stack";

import { useEffect, useState } from "react";

export const ProductCountTable = (props) => {
  const { propData } = props;

  const [data, setData] = useState(propData);

  useEffect(() => {
    setData(propData);
  }, [propData, data]);

  useEffect(() => {
    setData(propData);
  }, []);

  function productOrComponent(data) {
    const secondRowValues = Object.values(propData[1]);

    const isFirstClass = secondRowValues.includes("First Class Mail");

    if (isFirstClass) {
      return "Product Components";
    }
    return "Products";
  }

  const cellData = createCellData(data);

  const maxYear = data.reduce((maxSoFar, row) => {
    return row.fy > maxSoFar ? row.fy : maxSoFar;
  }, 0);

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
            {productOrComponent(data)} are Rated in this Class
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
            {productOrComponent(data)} Missed their Targets
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
            {productOrComponent(data)} Decreased in {maxYear}
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
