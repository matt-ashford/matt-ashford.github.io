import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {
  primaryColor,
  secondaryColor,
  alternateHighlight,
} from "../Design/MyTheme";

const useStyles = makeStyles({
  totalCountCountainer: {
    backgroundColor: primaryColor,
    borderRadius: "1%",
  },
  missedCountCountainer: {
    backgroundColor: secondaryColor,
    borderRadius: "1%",
  },
  decCountContainer: {
    backgroundColor: alternateHighlight,
    borderRadius: "1%",
  },
  tableText: {
    color: "white",
    fontWeight: "bolder",
  },
});

export const ProductCountTable = (props) => {
  const { propData } = props;

  const classes = useStyles();

  function createCellData(propData) {
    let singleYear = propData
      .filter((row) => row.fy === 2020)
      .filter((row) => row.productAbbrev !== "missing");

    let productCount = singleYear.length;

    let decreasedCount = 0;
    let missedTarget = 0;

    for (let i = 0; i < singleYear.length; i++) {
      const currentRow = singleYear[i];
      if (currentRow.pctOnTime - currentRow.target < 0) {
        missedTarget += 1;
      }
      if (decreasedThisYear(currentRow.productId)) {
        decreasedCount += 1;
      }
    }

    const rez = {
      productCount: productCount,
      missedTarget: missedTarget,
      decreasedCount: decreasedCount,
    };

    return rez;
  }

  function decreasedThisYear(productId) {
    const thisProduct = propData.filter((row) => row.productId === productId);

    const thisYearScore = thisProduct.filter((row) => row.fy === 2020)[0]
      .pctOnTime;
    const lastYearScore = thisProduct.filter((row) => row.fy === 2019)[0]
      .pctOnTime;

    return thisYearScore < lastYearScore;
  }

  const cellData = createCellData(propData);

  return (
    <>
      <Container className={classes.totalCountCountainer}>
        <Typography className={classes.tableText}>
          Total Product Count:
        </Typography>
        <br></br>
        <Typography className={classes.tableText}>
          {cellData.productCount}
        </Typography>
      </Container>
      <Container className={classes.missedCountCountainer}>
        <Typography className={classes.tableText}>
          Products that Missed Target:
        </Typography>
        <br></br>
        <Typography className={classes.tableText}>
          {cellData.missedTarget}
        </Typography>
      </Container>
      <Container className={classes.decCountContainer}>
        <Typography className={classes.tableText}>
          Products that Decreased in FY2020:
        </Typography>
        <br></br>
        <Typography className={classes.tableText}>
          {cellData.decreasedCount}
        </Typography>
      </Container>
    </>
  );
};

export default ProductCountTable;
