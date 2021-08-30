import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import volData from "../../Data/volume.json";

import { useState } from "react";

import annualData from "../../Data/annualData.json";

import MarketingMailClassGraph from "./MarketingMailClassGraph";
import ProductCountTableData from "../../DashComponents/ProductCountTable";
import VolumeChange from "../../DashComponents/VolumeChange";
import ProductDropdown from "../../DashComponents/ProductDropdown";
import ProductPage from "../ProductPage";

import DownloadButton from "../../DashComponents/DownloadButton";

import { lightGrey } from "../../Design/MyTheme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperDropdown: {
    minWidth: 850,
    padding: theme.spacing(1),
    marginTop: "5%",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: 300,
    // elevation: 0,
  },
  graphDiv: {
    minWidth: 850,
    maxWidth: 1000,
    padding: "1%",
  },
}));

export const MarketingMail = (props) => {
  const classes = useStyles();

  const [selectedProductId, setSelectedProductId] = useState(0);

  function changeProductSelected(e) {
    setSelectedProductId(e.target.id);
  }

  const mmAnnualData = annualData.filter(
    (row) => row.class === "Marketing Mail"
  );

  let volDataMM = volData.filter((row) => row.mailClass === "MM");

  return (
    <div className={classes.root} id="allMdContainer">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.root}>
            <Typography variant="h4" component="h4" gutterBottom>
              Marketing Mail Class-Level Data
            </Typography>
          </div>
        </Grid>
        <Grid item lg={9} xs={12}>
          <Paper className={classes.graphDiv} elevation={3}>
            <MarketingMailClassGraph propData={mmAnnualData} />
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={4}>
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
        </Paper>
      </Grid>

      <ProductPage selectedProductId={selectedProductId} />
    </div>
  );
};

export default MarketingMail;
