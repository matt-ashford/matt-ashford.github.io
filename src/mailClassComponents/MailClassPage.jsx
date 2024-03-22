import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import volData from "../Data/volume.json";
import { useEffect, useState } from "react";
import annualData from "../Data/annualData.json";
import ClassLevelGraph from "../DashComponents/ClassLevelGraph";
import ProductCountTableData from "../DashComponents/ProductCountTable";
import VolumeChange from "../DashComponents/VolumeChange";
import ProductDropdown from "../DashComponents/ProductDropdown";
import ProductPage from "./ProductPage";

import DownloadButton from "../DashComponents/DownloadButton";

import { lightGrey, useStyles_ClassPage } from "../Design/MyTheme";
import { graphWidth } from "../Design/graphDimensions";
import Footer from "./Footer";

import MailClassDef from "../DashComponents/MailClassDef";

import {joinDataWithProdKey, joinDataWithLibRef} from "../DataManipulation/join"
import annDat from "../Data/annual - Updated.json";


export const MailClassPage = (props) => {

  // const joinTest = joinDataWithProdKey(annDat)
  const joinTest = joinDataWithLibRef(annDat)

  console.log(joinTest)


  const { mailClassName } = props;
  const classes = useStyles_ClassPage();

  const [selectedProductId, setSelectedProductId] = useState(0);

  useEffect(() => {
    setSelectedProductId(0);
  }, []);

  useEffect(() => {
    setSelectedProductId(0);
  }, [mailClassName]);

  function changeProductSelected(e) {
    setSelectedProductId(e.target.id);
  }

  const annualDataClass = annualData.filter(
    (row) => row.class === mailClassName
  );

  const volDataClass = volData.filter((row) => row.mailClass === mailClassName);

  const isFirstClass = mailClassName === "First Class Mail" ? true : false;

  function generateAnnualClassData(mailClassName) {
    return annualData.filter((row) => row.class === mailClassName);
  }

  function generateVolDataClass(mailClassName) {
    return volData.filter((row) => row.mailClass === mailClassName);
  }

  function mailClassNameTitle(mailClassName) {
    const trailingText = " Class-Level Data";
    if (isFirstClass) {
      return "First-Class Mail" + trailingText;
    } else {
      return mailClassName + trailingText;
    }
  }

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
            <Paper
              className={classes.graphDivFirstClass}
              elevation={3}
              width={graphWidth}
            >
              <ClassLevelGraph
                propData={annualDataClass}
                mailClass={mailClassName}
              />
            </Paper>
            <MailClassDef mailClass={mailClassName} />
          </Grid>

          <Grid item xs={3} float="left">
            <Grid container direction="column" spacing={3}>
              <Grid item lg={7} md={12}>
                <Paper className={classes.paper}>
                  <div>
                    {" "}
                    <ProductCountTableData propData={annualDataClass} />{" "}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper
                  className={classes.paper}
                  style={{ backgroundColor: lightGrey }}
                >
                  <VolumeChange propData={volDataClass} />
                </Paper>
                <div style={{ marginTop: "30%" }}></div>
                <Paper>
                  <DownloadButton
                    propData={annualDataClass}
                    dataName={"Class-Level Data"}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Paper xs={12} className={classes.paperDropdown}>
            <ProductDropdown
              propData={annualDataClass}
              selectedProductId={selectedProductId}
              changeProductSelected={changeProductSelected}
              mailClass={mailClassName}
            />
          </Paper>
        </Grid>

        <ProductPage selectedProductId={selectedProductId} />

        <div style={{ height: "150px" }}></div>
      </div>
      <Footer />
    </>
  );
};

export default MailClassPage;
