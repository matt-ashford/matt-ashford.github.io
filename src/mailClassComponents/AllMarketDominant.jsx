import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import PieGraph from "../DashComponents/PieGraph";
import MDCompositeContainer from "./allMarketDominantComponents/MDCompositeContainer";
import VolumeChange from "../DashComponents/VolumeChange";
import volumeData from "../Data/volume.json";
import ProductCountTableMD from "./allMarketDominantComponents/ProductCountTableMD";
import DownloadButton from "../DashComponents/DownloadButton";
import annualDataFull from "../Data/annualData.json";
import Footer from "./Footer";

import { lightGrey, useStyles_MDPage } from "../Design/MyTheme";

export const AllMarketDominant = (props) => {
  const classes = useStyles_MDPage();

  const totalMDVol = volumeData.filter((row) => row.mailClass === "MD");

  const countDataTopLevel = generateCountDataTopLevel();

  return (
    <>
      <div className={classes.root} id="allMdContainer">
        <Grid item xs={12} className={classes.titleBox}>
          <div className={classes.root}>
            <Typography variant="h4" component="h4" gutterBottom>
              All Market Dominant Products
            </Typography>
          </div>
        </Grid>
        <Grid container spacing={4}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={5}
              className={classes.mdGraphContainer}
              style={{ marginLeft: "4%" }}
            >
              <Paper className={classes.paperTopRow}>
                <PieGraph countData={countDataTopLevel} />
              </Paper>
            </Grid>
            <Grid item xs={5} className={classes.mdGraphContainer}>
              <Paper className={classes.paperTopRow}>
                <MDCompositeContainer />
              </Paper>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div id="gridSpacing"></div>
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <div id="topEvents">
                  <ProductCountTableMD countData={countDataTopLevel} />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper
                className={classes.paper}
                style={{
                  backgroundColor: lightGrey,
                  paddingTop: "-10%",
                  marginTop: "-60%",
                  minWidth: "200px",
                }}
              >
                <div id="topAnnualVolume" style={{}}>
                  <VolumeChange propData={totalMDVol} />
                </div>
              </Paper>
              <div style={{ marginTop: "10%" }}> </div>
              <DownloadButton
                propData={annualDataFull}
                dataName={"Market Dominant Data"}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div style={{ height: "150px" }}></div>
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
