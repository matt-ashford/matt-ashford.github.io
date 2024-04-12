import { CSVLink } from "react-csv";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TocIcon from "@material-ui/icons/Toc";
import Grid from "@material-ui/core/Grid";
import { downloadBtnDataPrep } from "./DownloadBtnDataPrep";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: "-2rem",
    width: "15rem",
    color: "black",
    font: "roboto",
    textDecoration: "none",
  },
  icon: {
    transform: "scale(1.5)",
    marginTop: "1rem",
  },
  dataName: {
    fontSize: "11px",
    marginTop: "-.8rem",
  },
}));

export const DownloadButton = (props) => {
  const { propData, dataName } = props;

  const returnedData = downloadBtnDataPrep(propData);

  const classes = useStyles();

  return (
    <>
      <CSVLink data={returnedData}>
        <Button
          className={classes.button}
          variant="contained"
          id="downloadButton"
        >
          <div>
            <Grid container direction="row">
              <Grid item xs={2}>
                <TocIcon className={classes.icon} />
              </Grid>
              <Grid item xs={10}>
                <p> Download CSV</p>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <p className={classes.dataName}>{dataName}</p>
              </Grid>
            </Grid>
          </div>
        </Button>
      </CSVLink>
    </>
  );
};

export default DownloadButton;
