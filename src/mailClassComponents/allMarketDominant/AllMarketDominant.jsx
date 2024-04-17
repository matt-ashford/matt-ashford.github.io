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
import { Divider } from "@mui/material";

export const AllMarketDominant = (props) => {
  const [selectedYear, setSelectedYear] = useState(2023);

  const joinedAnnualData = joinDataWithProdKey(annualData);
  const joinedDataForDownload = joinedAnnualData.map((row) => {
    row.quarter = "annual";
    return row;
  });

  console.log(joinedDataForDownload);

  const totalMDVol = volumeData.filter((row) => row.mailClass === "MD");

  const countDataTopLevel = generateCountData(selectedYear, joinedAnnualData);

  function changeYearSelected(e) {
    setSelectedYear(e.target.value);
  }

  return (
    <>
      <div className={styles.allMDContainer}>
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
            <ProductCountTableMD
              countData={countDataTopLevel}
              selectedYear={selectedYear}
            />
          </div>
          <div className={styles.pieGraphContainer}>
            {" "}
            <PieGraph
              countData={countDataTopLevel}
              selectedYear={selectedYear}
            />
          </div>
          <div className={styles.downloadBtnContainer}>
            {" "}
            <DownloadButton
              propData={joinedDataForDownload}
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

export default AllMarketDominant;
