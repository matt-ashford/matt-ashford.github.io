import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
  },
  outterContainer: {
    backgroundColor: "#e6e8e6",
  },

  titleText: {
    fontSize: 20,
    marginLeft: "-75px",
    color: "black",
    fontWeight: "bold",
    marginBottom: "-0.5rem",
  },
  volText: {
    fontSize: 17,
    marginBottom: "2%",
  },
  volNumber: {
    fontSize: 18,
    marginLeft: "-75px",
    fontWeight: "bold",
  },
  changeIcon: {
    marginTop: "3%",
    marginLeft: "-2px",
    marginRight: "1px",
  },
});

export const VolumeChange = (props) => {
  const { propData } = props;

  const volumeData = propData[0];

  const classes = useStyles();

  const { FY2020, FY2019 } = volumeData;

  const volumeTextNumber = formatVolumeNumber(volumeData.FY2020);

  let volChangePct = (FY2020 - FY2019) / FY2019;

  const volumeChangeText = formatVolumeChangeNumber(volChangePct);

  function formatVolumeNumber(rawNumber) {
    let trailingLetter = "B";
    let divisor = 1000000000;

    if (rawNumber / divisor < 1) {
      trailingLetter = "M";
      divisor = divisor / 1000;
    }

    const outputNumber = rawNumber / divisor;

    let stringNum;
    if (trailingLetter === "M") {
      stringNum = outputNumber.toFixed(0);
    }

    if (trailingLetter === "B") {
      stringNum = outputNumber.toFixed(1);
    }

    return `${stringNum}${trailingLetter}`;
  }

  function formatVolumeChangeNumber(rawChange) {
    rawChange = (rawChange * 100).toFixed(1);
    if (rawChange < 0) {
      rawChange *= -1;
    }
    return `${rawChange.toString()}%`;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom className={classes.titleText}>
        Total Volume: {`${volumeTextNumber}`}
      </Typography>

      <Typography variant="h5" gutterBottom className={classes.volText}>
        Annual change
        <KeyboardArrowDownIcon
          className={classes.changeIcon}
          fontSize="small"
        />
        {volumeChangeText}
      </Typography>
    </div>
  );
};

export default VolumeChange;
