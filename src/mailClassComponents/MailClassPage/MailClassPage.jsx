import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import volData from "../../Data/volume.json";
import { useEffect, useState } from "react";
// import annualData from "../Data/annualData.json";
import ClassGraphSingleYear from "../../DashComponents/ClassGraphSingleYear/ClassLevelGraph";
import ProductCountTableData from "../../DashComponents/UIBits/productCountTable/ProductCountTable";
import VolumeChange from "../../DashComponents/VolumeChange";
import ProductDropdown from "../../DashComponents/UIBits/ProductDropdown/ProductDropdown";
import YearDropdown from "../../DashComponents/UIBits/YearDropdown";

import DownloadButton from "../../DashComponents/UIBits/DownloadButton/DownloadButton";

import { lightGrey, useStyles_ClassPage } from "../../Design/MyTheme";
import { graphWidth } from "../../Design/graphDimensions";
import Footer from "../Footer";

import MailClassDef from "../../DashComponents/MailClassDef";

import { joinDataWithProdKey } from "../../DataManipulation/join";
import { filterAnnualComparison } from "../../DataManipulation/filterAnnualComparison";
import ProductPage from "../ProductPage/ProductPage";
import annualData from "../../Data/annual - Updated.json";
import quarterData from "../../Data/quarterly - Updated.json";
import styles from "./MailClassPageStyles.module.css";

export const MailClassPage = (props) => {
  const { mailClassName } = props;
  const classes = useStyles_ClassPage();
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [joinedDataAnnual, setJoinedDataAnnual] = useState(
    joinDataWithProdKey(annualData)
  );
  const [joinedDataQtr, setJoinedDataQtr] = useState(
    joinDataWithProdKey(quarterData)
  );

  useEffect(() => {
    // setSelectedProductId(mailClassFilterData[0].product_id);
    setSelectedProductId(0);
  }, []);

  useEffect(() => {
    setSelectedProductId(0);
  }, [mailClassName]);

  function changeProductSelected(e) {
    const rawValue = e.target.value;
    let matchingProductId = parseInt(rawValue.match(/\d+/)[0]);
    setSelectedProductId(matchingProductId);
  }

  function changeYearSelected(e) {
    setSelectedYear(e.target.value);
  }

  const volDataClass = volData.filter((row) => row.mailClass === mailClassName);
  function generateVolDataClass(mailClassName) {
    return volData.filter((row) => row.mailClass === mailClassName);
  }

  const isFirstClass = mailClassName === "First Class Mail" ? true : false;

  function mailClassNameTitle(mailClassName) {
    const trailingText = " Class-Level Data";
    if (isFirstClass) {
      return "First-Class Mail" + trailingText;
    } else {
      return mailClassName + trailingText;
    }
  }

  const filteredAnnualData = filterAnnualComparison(
    mailClassName,
    selectedYear,
    joinedDataAnnual
  );

  return (
    <>
      <div className={classes.root} id="allMdContainer">
        <Grid container spacing={1} justifyContent="flex-start">
          <Grid item xs={12}>
            <div className={classes.root} id="classTitleTextContainer">
              <Typography variant="h4" component="h4" gutterBottom>
                {mailClassNameTitle(mailClassName)}
              </Typography>
            </div>
          </Grid>

          <Grid
            item
            md={9}
            xs={12}
            style={{ maxWidth: "950px", minWidth: "800px" }}
          >
            <YearDropdown
              propData={annualData}
              selectedYear={selectedYear}
              changeYearSelected={changeYearSelected}
            />
            {/* <Grid item lg={7} md={12}>
              <Paper className={classes.paper}>
                <div>
                  {" "}
                  <ProductCountTableData
                    propData={joinedData}
                    selectedYear={selectedYear}
                    mailClassName={mailClassName}
                  />{" "}
                </div>
              </Paper>
            </Grid> */}

            <Paper
              // className={classes.graphDivFirstClass}
              // elevation={3}
              className={styles.classGraphPaper}
            >
              <div className={styles.classGraphOuterContainer}>
                <ClassGraphSingleYear
                  propData={filteredAnnualData}
                  mailClass={mailClassName}
                  selectedYear={selectedYear}
                />
              </div>
            </Paper>

            <MailClassDef mailClass={mailClassName} />
          </Grid>

          <Grid item xs={3} float="left">
            <Grid container direction="column" spacing={3}>
              <Grid item xs={3}>
                <Paper
                  className={classes.paper}
                  style={{ backgroundColor: lightGrey }}
                >
                  <VolumeChange propData={volDataClass} />
                </Paper>
                <div style={{ marginTop: "30%" }}></div>
                <Paper>
                  {/* <DownloadButton
                    dataName={"Class-Level Data"}
                  /> */}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <ProductDropdown
          propDataAnnual={joinedDataAnnual}
          propDataQuarterly={joinedDataQtr}
          selectedProductId={selectedProductId}
          changeProductSelected={changeProductSelected}
          mailClass={mailClassName}
        />

        <ProductPage
          selectedProductId={selectedProductId}
          joinedDataAnnual={joinedDataAnnual}
          joinedDataQtr={joinedDataQtr}
        />

        <div style={{ height: "150px" }}></div>
      </div>
      <Footer />
    </>
  );
};

export default MailClassPage;
