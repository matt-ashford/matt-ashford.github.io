import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import volData from "../Data/volume.json";

import { useState } from "react";

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

export const MarketingMail = () => {
  const classes = useStyles_ClassPage();

  const [selectedProductId, setSelectedProductId] = useState(0);

  function changeProductSelected(e) {
    setSelectedProductId(e.target.id);
  }

  const mmAnnualData = annualData.filter(
    (row) => row.class === "Marketing Mail"
  );

  let volDataMM = volData.filter((row) => row.mailClass === "MM");

  return (
    <>
      <div className={classes.root} id="allMdContainer">
        <Grid container spacing={1} justifyContent="flex-start">
          <Grid item xs={12}>
            <div className={classes.root} id="classTitleTextContainer">
              <Typography variant="h4" component="h4" gutterBottom>
                Marketing Mail Class-Level Data
              </Typography>
            </div>
          </Grid>
          <Grid
            item
            lg={9}
            md={12}
            style={{ maxWidth: "900px", minWidth: "800px" }}
          >
            <Paper
              className={classes.graphDiv}
              // className={classes.graphDivFirstClass}
              elevation={3}
              // width={graphWidth}
            >
              <ClassLevelGraph
                propData={mmAnnualData}
                mailClass={"Marketing Mail"}
              />
            </Paper>

            <MailClassDef mailClass={"Marketing Mail"} />
          </Grid>

          <Grid item xs={3} float="left">
            <Grid container direction="column" spacing={3}>
              <Grid item lg={7} md={12}>
                <Paper
                  className={classes.paper}
                  // className={classes.paperCountTable}
                >
                  <div>
                    <ProductCountTableData propData={mmAnnualData} />
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper
                  className={classes.paper}
                  style={{ backgroundColor: lightGrey }}
                >
                  <VolumeChange propData={volDataMM} />
                </Paper>
                <div style={{ marginTop: "30%" }}></div>
                <Paper>
                  <DownloadButton
                    propData={mmAnnualData}
                    dataName={"Class-Level Data"}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Paper xs={12} className={classes.paperDropdown}>
            <ProductDropdown
              propData={mmAnnualData}
              selectedProductId={selectedProductId}
              changeProductSelected={changeProductSelected}
              mailClass="Marketing Mail"
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

export default MarketingMail;
