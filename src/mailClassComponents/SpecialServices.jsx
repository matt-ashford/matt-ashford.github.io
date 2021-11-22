import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import volData from "../Data/volume.json";

import { useState } from "react";

import annualData from "../Data/annualData.json";

import ClassLevelGraph from "../DashComponents/ClassLevelGraph";
import ProductCountTableData from "../DashComponents/ProductCountTable";
import VolumeChange from "../DashComponents/VolumeChange";
import ProductPage from "./ProductPage";

import DownloadButton from "../DashComponents/DownloadButton";

import { lightGrey, useStyles_ClassPage } from "../Design/MyTheme";
import { graphWidth } from "../Design/graphDimensions";
import Footer from "./Footer";

import MailClassDef from "../DashComponents/MailClassDef";

export const SpecialServices = () => {
  const classes = useStyles_ClassPage();

  const [selectedProductId, setSelectedProductId] = useState(0);

  function changeProductSelected(e) {
    setSelectedProductId(e.target.id);
  }

  // const fcAnnualData = annualData.filter(
  //   (row) => row.class === "First Class Mail"
  // );

  const ssAnnualData = annualData.filter(
    (row) => row.class === "Special Services"
  );

  let volDataSS = volData.filter((row) => row.mailClass === "SS");

  // let volDataFC = volData.filter((row) => row.mailClass === "FC");

  return (
    <>
      <div className={classes.root} id="allMdContainer">
        <Grid container spacing={1} justifyContent="flex-start">
          <Grid item xs={12}>
            <div className={classes.root} id="classTitleTextContainer">
              <Typography variant="h4" component="h4" gutterBottom>
                Special Services Class-Level Data
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
                propData={ssAnnualData}
                mailClass={"Special Services"}
              />
            </Paper>
            <MailClassDef mailClass={"Special Services"} />
          </Grid>

          <Grid item xs={3} float="left">
            <Grid container direction="column" spacing={3}>
              <Grid item lg={7} md={12}>
                <Paper className={classes.paper}>
                  <div>
                    {" "}
                    <ProductCountTableData propData={ssAnnualData} />{" "}
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper
                  className={classes.paper}
                  style={{ backgroundColor: lightGrey }}
                >
                  <VolumeChange propData={volDataSS} />
                </Paper>
                <div style={{ marginTop: "30%" }}></div>
                <Paper>
                  <DownloadButton
                    propData={ssAnnualData}
                    dataName={"Class-Level Data"}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Paper xs={12} className={classes.paperDropdown}>
            <div>
              Quarterly Product-level data is not available for products within
              the Special Services mail class
            </div>
          </Paper>
        </Grid>

        <ProductPage selectedProductId={selectedProductId} />

        <div style={{ height: "150px" }}></div>
      </div>
      <Footer />
    </>
  );
};

export default SpecialServices;
