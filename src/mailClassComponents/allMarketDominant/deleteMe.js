import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import PieGraph from "../../DashComponents/PieGraph";
import MDCompositeContainer from "./MDCompositeContainer";
import volumeData from "../../Data/volume.json";
import ProductCountTableMD from "./ProductCountTableMD";
import DownloadButton from "../../DashComponents/UIBits/DownloadButton/DownloadButton";
import Footer from "../Footer";
import styles from "./allMD.module.css";
import YearDropdown from "../../DashComponents/UIBits/YearDropdown";
import annualData from "../../Data/annual - Updated.json";
import quarterlyData from "../../Data/quarterly - Updated";
import generateCountData from "./genearteMDCountData";
import { joinDataWithProdKey } from "../../DataManipulation/join";
import CountBarGraph from "../../DashComponents/CountBarGraph/CountBarGraph";
import LineGraphDoubleSeries from "../../DashComponents/LineGraphDoubleSeries/LineGraphDoubleSeries";
import LineGraphProduct from "../../DashComponents/LineGraphProduct/LineGraphProduct";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";

export const AllMarketDominant = (props) => {
  const [selectedYear, setSelectedYear] = useState(2023);

  // const [isSmallViewport, setIsSmallViewport] = useState(false);

  // useEffect(() => {
  // function handleResize() {
  // setIsSmallViewport(window.innerWidth <= 1050);
  // }

  // handleResize();

  // window.addEventListener("resize", handleResize);

  // return () => {
  // window.removeEventListener("resize", handleResize);
  // };
  // }, []);

  function handleResize() {
    console.log(":rezszz");
    // setIsSmallViewport(window.innerWidth <= 1050);
  }

  const joinedDataAnnual = joinDataWithProdKey(annualData);
  const joinedDataForDownload = joinedDataAnnual.map((row) => {
    row.quarter = "annual";
    return row;
  });

  const joinedDataQtr = joinDataWithProdKey(quarterlyData);

  const totalMDVol = volumeData.filter((row) => row.mailClass === "MD");

  const countDataTopLevel = generateCountData(selectedYear, joinedDataAnnual);

  function changeYearSelected(e) {
    setSelectedYear(e.target.value);
  }

  const lettersTwoDayId = 59;
  const lettersThreeDayId = 99;
  const keeperProds = [lettersTwoDayId, lettersThreeDayId];

  return (
    <>
      <div className={styles.allMDContainer}>
        <div className={styles.titleContainer}>
          <Typography variant="h4" component="h4" gutterBottom>
            All Market Dominant Products
          </Typography>
        </div>
        <div className={styles.barGraphAndLineContainer}>
          <div className={styles.barGraphContainer}>
            <CountBarGraph propData={joinedDataAnnual} />
          </div>
          <div className={styles.lineGraphContainer}>
            <div className={styles.lineGraphTitle}>
              <div>Service Performance Scores</div>
              <div>First Class Single-Piece Letters and Cards</div>
            </div>

            <LineGraphDoubleSeries
              keeperProds={keeperProds}
              joinedDataQtr={joinedDataQtr}
            />
          </div>
        </div>

        <div className={styles.yearDropdownContainer}>
          <div className={styles.emptyDiv_yearDropdown}></div>
          <YearDropdown
            propData={annualData}
            selectedYear={selectedYear}
            changeYearSelected={changeYearSelected}
          />
        </div>

        {/* <div className={styles.emptyDiv_tableAndPieGraphGrid}> */}
        {/* <div className={styles.tableAndPieGraphGrid}> */}
        {/* <div
          className={`${styles.tableAndPieGraphGrid} ${
            isSmallViewport ? styles.smallViewportClass : ""
          }`}
        > */}
        <div className={styles.tableContainer}>
          {" "}
          <ProductCountTableMD
            countData={countDataTopLevel}
            selectedYear={selectedYear}
          />
        </div>
        <div className={styles.pieGraphContainer}>
          {" "}
          <PieGraph countData={countDataTopLevel} selectedYear={selectedYear} />
        </div>
        <div className={styles.downloadBtnContainer}>
          {" "}
          <DownloadButton
            propData={joinedDataForDownload}
            dataName={"Market Dominant Data"}
          />{" "}
        </div>
        {/* </div> */}
      </div>
      <div className={styles.footerSpacer}></div>
      <Footer />
    </>
  );
};

export default AllMarketDominant;
