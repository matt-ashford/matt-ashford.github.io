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

export const FirstClass = () => {
  const classes = useStyles_ClassPage();

  const [selectedProductId, setSelectedProductId] = useState(0);

  function changeProductSelected(e) {
    setSelectedProductId(e.target.id);
  }

  const fcAnnualData = annualData.filter(
    (row) => row.class === "First Class Mail"
  );

  console.log(fcAnnualData);

  return (
    <div className={classes.root} id="allMdContainer">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.root}>
            <Typography variant="h4" component="h4" gutterBottom>
              First Class Data
            </Typography>
          </div>
        </Grid>
        <Grid item lg={9} xs={12}>
          <Paper className={classes.graphDiv} elevation={3} width={graphWidth}>
            <ClassLevelGraph
              propData={fcAnnualData}
              mailClass={"First Class"}
            />
          </Paper>
        </Grid>

        {/* <Grid item xs={3}>
      <Grid container direction="column" spacing={3}>
        <Grid item lg={7} md={12}>
          <Paper className={classes.paper}>
            <div>
              {" "}
              <ProductCountTableData propData={mmAnnualData} />{" "}
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

        <Paper className={classes.paperDropdown}>
          <ProductDropdown
            propData={mmAnnualData}
            selectedProductId={selectedProductId}
            changeProductSelected={changeProductSelected}
          />
        </Paper> */}
      </Grid>

      {/* <ProductPage selectedProductId={selectedProductId} /> */}
    </div>
  );
};

export default FirstClass;
