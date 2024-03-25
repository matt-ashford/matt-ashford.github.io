import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { createCellData } from "./countTableDataFilter";
import ProductCountBar from "./ProductCountBar";

import { useEffect, useState } from "react";
import { primaryColor, secondaryColor, liteBlue } from "../../Design/MyTheme";

const useStyles = makeStyles({
  totalCountCountainer: {
    backgroundColor: primaryColor,
    borderRadius: "1%",
    justifyContent: "left",
    paddingLeft: "-5%",
    paddingRight: "-500px",
  },
  missedCountCountainer: {
    backgroundColor: liteBlue,
    borderRadius: "1%",
  },
  decCountContainer: {
    backgroundColor: secondaryColor,
    borderRadius: "1%",
  },
  tableText: {
    color: "white",
    fontWeight: "bolder",
    marginLeft: "10px",
  },
  tableTextNumber: {
    color: "white",
    fontWeight: "bolder",
    marginLeft: "3%",
  },
});

export const ProductCountTable = (props) => {
  const { propData } = props;

  const [data, setData] = useState(propData);
  // const [data, setData] = useState([]);

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

  const classes = useStyles();

  const cellData = createCellData(data);

  const maxYear = data.reduce((maxSoFar, row) => {
    return row.fy > maxSoFar ? row.fy : maxSoFar;
  }, 0);

  return (
    <>
      <Container disableGutters={true} className={classes.totalCountCountainer}>
        <Typography
          variant="h4"
          align="left"
          className={classes.tableTextNumber}
        >
          {cellData.productCount}
        </Typography>
        <br></br>
        <Typography align="left" className={classes.tableText}>
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
        className={classes.missedCountCountainer}
      >
        <Typography
          variant="h4"
          align="left"
          className={classes.tableTextNumber}
        >
          {cellData.missedTarget}
        </Typography>
        <br></br>
        <Typography align="left" className={classes.tableText}>
          {productOrComponent(data)} Missed their Targets
        </Typography>
        <ProductCountBar
          totalProductCount={cellData.productCount}
          thisCount={cellData.missedTarget}
          dataType="missedProductCount"
        />
      </Container>
      <Container disableGutters={true} className={classes.decCountContainer}>
        <Typography
          variant="h4"
          align="left"
          className={classes.tableTextNumber}
        >
          {cellData.decreasedCount}
        </Typography>
        <br></br>

        <Typography align="left" className={classes.tableText}>
          {productOrComponent(data)} Decreased in {maxYear}
        </Typography>
        <ProductCountBar
          totalProductCount={cellData.productCount}
          thisCount={cellData.decreasedCount}
          dataType="decreasedProductCount"
        />
      </Container>
    </>
  );
};

export default ProductCountTable;
