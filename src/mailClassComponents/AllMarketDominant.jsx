import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import PieGraph from "../DashComponents/PieGraph";
import MDCompositeContainer from "./allMarketDominantComponents/MDCompositeContainer";
import VolumeChange from "../DashComponents/VolumeChange";
import volumeData from "../Data/volume.json";
import ProductCountTableMD from "../DashComponents/ProductCountTableMD";
import DownloadButton from "../DashComponents/DownloadButton";
import annualDataFull from "../Data/annualData.json";

import { lightGrey } from "../Design/MyTheme";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperTopRow: {
    paddingBottom: "10%",
    height: 400,
    paddingTop: "2%",
  },
  mdGraphContainer: {
    maxWidth: 600,
    height: 500,
    marginTop: "2%",
  },
  titleBox: {
    marginTop: "1%",
  },
}));

export const AllMarketDominant = (props) => {
  const classes = useStyles();

  const topLevelData = createTopLevelData();

  const pieData = topLevelData.filter((row) => row.dataSet === "missedTarget");

  const totalMDVol = volumeData.filter((row) => row.mailClass === "MD");

  return (
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
              <PieGraph propData={pieData} />
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

        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={8}>
            <Paper className={classes.paper}>
              <div id="topEvents">
                <ProductCountTableMD />
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
  );
};

function createTopLevelData() {
  const annualDataTopLevel = annualDataFull.filter(
    (row) => row.productAbbrev !== "missing"
  );

  const data2020 = annualDataTopLevel.filter((row) => row.fy === 2020);

  const missedTargetCount = data2020.filter(
    (row) => row.pointsFromTarget > 0
  ).length;

  const exceededTargetCount = data2020.filter(
    (row) => row.pointsFromTarget < 0
  ).length;

  let negativeChangeCount = 0;
  let positiveChangeCount = 0;
  let rowCountsDEL = 0;

  for (let i = 0; i < data2020.length; i++) {
    rowCountsDEL++;

    const currentProductId = data2020[i].productId;
    const singleProduct = annualDataTopLevel.filter(
      (row) => row.productId === currentProductId
    );
    const latestYearScore = singleProduct.filter((row) => row.fy === 2020)[0]
      .pointsFromTarget;
    const prevYearScore = singleProduct.filter((row) => row.fy === 2019)[0]
      .pointsFromTarget;

    if (latestYearScore > prevYearScore) {
      positiveChangeCount += 1;
    } else {
      negativeChangeCount += 1;
    }
  }

  const topLevelDataRez = [
    {
      dataSet: "missedTarget",
      label: "missed target",
      value: missedTargetCount,
    },
    {
      dataSet: "missedTarget",
      label: "exceeded target",
      value: exceededTargetCount,
    },
    {
      dataSet: "changeCount",
      label: "negative change",
      value: negativeChangeCount,
    },
    {
      dataSet: "changeCount",
      label: "positive change",
      value: positiveChangeCount,
    },
  ];

  return topLevelDataRez;
}

export default AllMarketDominant;
