import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import PieGraph from "../DashComponents/PieGraph";
import topLevelPieData from "../Data/topLevelPieData.json";
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
    // marginLeft: "2%",
  },
  titleBox: {
    marginTop: "1%",
  },
}));

export const AllMarketDominant = (props) => {
  const classes = useStyles();

  const missesData = topLevelPieData.filter(
    (row) => row.dataSet === "missedTarget"
  );

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
        <Grid
          container
          //  alignItems="left"
          //   justifyContent="center"
          spacing={2}
        >
          <Grid
            item
            xs={5}
            className={classes.mdGraphContainer}
            style={{ marginLeft: "4%" }}
          >
            <Paper className={classes.paperTopRow}>
              <PieGraph propData={missesData} />
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
            {/* <Paper> */}
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

export default AllMarketDominant;
