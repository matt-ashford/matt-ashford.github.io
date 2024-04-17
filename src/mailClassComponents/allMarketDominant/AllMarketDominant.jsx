import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import PieGraph from "../../DashComponents/PieGraph";
import MDCompositeContainer from "./MDCompositeContainer";
import volumeData from "../../Data/volume.json";
import ProductCountTableMD from "./ProductCountTableMD";
import DownloadButton from "../../DashComponents/UIBits/DownloadButton/DownloadButton";
import annualDataFull from "../../Data/annualData.json";
import Footer from "../Footer";
import styles from "./allMD.module.css";
import YearDropdown from "../../DashComponents/UIBits/YearDropdown";
import annualData from "../../Data/annual - Updated.json";
import generateCountData from "./genearteMDCountData";
import { joinDataWithProdKey } from "../../DataManipulation/join";
import { useEffect, useState } from "react";

export const AllMarketDominant = (props) => {
  const [selectedYear, setSelectedYear] = useState(2023);

  const joinedAnnualData = joinDataWithProdKey(annualData);

  const totalMDVol = volumeData.filter((row) => row.mailClass === "MD");

  const countDataTopLevel = generateCountData(selectedYear, joinedAnnualData);

  function changeYearSelected(e) {
    console.log(e.target.value);
    setSelectedYear(e.target.value);
  }

  return (
    <>
      <div id="allMdContainer" className={styles.allMDContainer}>
        <div className={styles.titleContainer}>
          <Typography variant="h4" component="h4" gutterBottom>
            All Market Dominant Products
          </Typography>
        </div>
        <div className={styles.barGraphAndLineContainer}>
          <div className={styles.barGraphContainer}>bargraph here </div>
          <div className={styles.lineGraphContainer}>linegrph here </div>
        </div>

        <div className={styles.yearDropdownContainer}>
          <YearDropdown
            propData={annualData}
            selectedYear={selectedYear}
            changeYearSelected={changeYearSelected}
          />
        </div>

        <div className={styles.tableAndPieGraphGrid}>
          <div className={styles.tableContainer}>
            {" "}
            <ProductCountTableMD countData={countDataTopLevel} />
          </div>
          <div className={styles.pieGraphContainer}>
            {" "}
            <PieGraph countData={countDataTopLevel} />
          </div>
          <div className={styles.downloadBtnContainer}>
            {" "}
            <DownloadButton
              propData={annualDataFull}
              dataName={"Market Dominant Data"}
            />{" "}
          </div>
        </div>
      </div>
      <div className={styles.footerSpacer}></div>
      <Footer />
    </>
  );
};

function generateCountDataTopLevel() {
  const mailClasses = [
    "First Class Mail",
    "Marketing Mail",
    "Periodicals",
    "Package Services",
    "Special Services",
    "Grand Total",
  ];

  let rez = [];

  mailClasses.forEach((mailClass) => {
    rez.push(generateCountDataByClass(mailClass));
  });
  return rez;
}

function generateCountDataByClass(mailClass) {
  let singleClassData = annualDataFull;

  if (mailClass !== "Grand Total") {
    singleClassData = annualDataFull.filter((row) => row.class === mailClass);
  }

  singleClassData = singleClassData
    .filter((row) => row.productAbbrev !== "missing")
    .filter((row) => row.subProduct === "no");

  const singleYearData = singleClassData.filter((row) => row.fy === 2020);

  const rez = {
    mailClass: mailClass,
    totalProducts: singleYearData.length,
    productsMissedTarget: countMissedTargets(singleClassData),
    negativeChange: countProductDecreases(singleClassData),
  };

  return rez;
}

function countMissedTargets(singleClassData) {
  const missedProductCount = singleClassData
    .filter((row) => row.fy === 2020)
    .filter((row) => row.pointsFromTarget > 0).length;

  return missedProductCount;
}

function countProductDecreases(singleClassData) {
  let negativeChangeCount = 0;

  const data2020 = singleClassData.filter((row) => row.fy === 2020);

  for (let i = 0; i < data2020.length; i++) {
    const currentProductId = data2020[i].productId;
    const singleProduct = singleClassData.filter(
      (row) => row.productId === currentProductId
    );
    const thisYearScore = singleProduct.filter((row) => row.fy === 2020)[0]
      .pctOnTime;
    const prevYearScore = singleProduct.filter((row) => row.fy === 2019)[0]
      .pctOnTime;

    if (thisYearScore < prevYearScore) {
      negativeChangeCount++;
    }
  }

  return negativeChangeCount;
}

export default AllMarketDominant;
