import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
// import annualData from "../Data/annualData.json";
import ClassGraphSingleYear from "../../DashComponents/ClassGraphSingleYear/ClassLevelGraph";
// import ProductCountTableData from "../../DashComponents/UIBits/productCountTable/ProductCountTable";
import ProductCountTable from "../../DashComponents/UIBits/productCountTable/ProductCountTable";
import VolumeChange from "../../DashComponents/VolumeChange";
import ProductDropdown from "../../DashComponents/UIBits/ProductDropdown/ProductDropdown";
import YearDropdown from "../../DashComponents/UIBits/YearDropdown";

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
      {/* <div className={classes.root} id="allMdContainer"> */}
      <div className={styles.allMdContainer} id="allMdContainer">
        {/* <div className={classes.root} id="classTitleTextContainer"> */}
        <div id="classTitleTextContainer">
          <Typography variant="h4" component="h4" gutterBottom>
            {mailClassNameTitle(mailClassName)}
          </Typography>
        </div>

        <YearDropdown
          propData={annualData}
          selectedYear={selectedYear}
          changeYearSelected={changeYearSelected}
        />

        <div className={styles.graphAndCountTableContainer}>
          <Paper className={styles.classGraphPaper}>
            <div className={styles.classGraphOuterContainer}>
              <ClassGraphSingleYear
                propData={filteredAnnualData}
                mailClass={mailClassName}
                selectedYear={selectedYear}
              />
            </div>
          </Paper>
          <ProductCountTable
            propData={joinedDataAnnual}
            selectedYear={selectedYear}
            mailClassName={mailClassName}
          />{" "}
        </div>

        <MailClassDef mailClass={mailClassName} />

        <Paper>
          {/* <DownloadButton
                    dataName={"Class-Level Data"}
                  /> */}
        </Paper>

        <div className={styles.productPageContainer}>
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
        </div>

        <div style={{ height: "150px" }}></div>
      </div>
      <Footer />
    </>
  );
};

export default MailClassPage;
