import { makeStyles } from "@material-ui/core/styles";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { useEffect, useState } from "react";

import { primaryColor, secondaryColor, liteBlue } from "../Design/MyTheme";

import * as d3 from "d3";

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

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(propData);
  }, [propData]);

  function productOrComponent(data) {
    const secondRowValues = Object.values(propData[1]);

    const isFirstClass = secondRowValues.includes("First Class Mail");

    if (isFirstClass) {
      return "Product Components";
    }

    return "Products";
  }

  const classes = useStyles();

  function createCellData(inputData) {
    let singleYear = inputData
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
    const thisProduct = data.filter((row) => row.productId === productId);

    const thisYearScore = thisProduct.filter((row) => row.fy === 2020)[0]
      .pctOnTime;
    const lastYearScore = thisProduct.filter((row) => row.fy === 2019)[0]
      .pctOnTime;

    return thisYearScore < lastYearScore;
  }

  const cellData = createCellData(data);

  console.log("cellData", cellData);

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
          {productOrComponent(data)} Decreased in FY2020
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

const ProductCountBar = (props) => {
  const { totalProductCount, thisCount, dataType } = props;

  // const [barData, setBarData] = useState(0);

  const [countPctState, setCountPctState] = useState(
    thisCount / totalProductCount
  );

  useEffect(() => {
    // setBarData(thisCount);
    setCountPctState(thisCount / totalProductCount);
    drawBar();
  }, [totalProductCount]);

  useEffect(() => {
    drawBar();
    // }, [totalProductCount, barData]);
  }, []);

  const svgId = `${dataType}_svg`;
  const barId = `${dataType}_bar`;
  const otherBarId = `${dataType}_otherBar`;

  const svgSelection = d3.select(`#${svgId}`);

  const barHeight = 10;

  const svgWidth = 300;
  const svgHeight = barHeight + 20;

  // const countPctState = thisCount / totalProductCount;

  const countPercentageDiff = 1 - countPctState;

  console.log("within cell", countPctState);

  const xScale = d3.scaleLinear().domain([0, 1]).range([0, svgWidth]);

  const fakeData = [{ value: countPctState }];

  function drawBar() {
    svgSelection
      .selectAll(`#${otherBarId}`)
      .data(fakeData)
      .enter()
      .append("rect")
      .attr("x", xScale(countPctState))
      .attr("y", 15)
      .attr("height", 15)
      .attr("width", (d) => xScale(countPercentageDiff))
      .attr("fill", "hsla(239, 100%, 100%, 0.55)")
      .attr("id", otherBarId);

    svgSelection
      .selectAll(`#${barId}`)
      .data(fakeData)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", 15)
      .attr("height", 15)
      .attr("width", (d) => xScale(countPctState))
      .attr("fill", "white")
      .attr("id", barId);
  }

  return (
    <div
      style={{
        paddingBottom: "5px",
      }}
    >
      <svg fill="black" id={svgId} height={svgHeight} width={svgWidth}></svg>
    </div>
  );
};

export default ProductCountTable;
