import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

export const colorPalleteMatt = {
  // primaryColor: "#225CF6",
  // secondaryColor: "#2CC6EB",
  primaryColor: "#225CF6",
  // secondaryColor: "#7bb9e5", //best
  secondaryColor: "#88b7d7", //new

  liteBlue: "#108FE0",

  highlightColor: "#E08D20",
  lightGrey: "#e6e8e6",
  darkGrey: "#8e9492",
  greenGrey: "#53aca0",
  pinkHighlight: "#f45273",
  alternateHighlight: "#1ED4C7",
  alternateSecondary: "#1E7FD4",
  lineGraphTitleBlock: "#caf3fa",
};

export const {
  primaryColor,
  secondaryColor,
  liteBlue,
  highlightColor,
  lightGrey,
  darkGrey,
  pinkHighlight,
  greenGrey,
  alternateHighlight,
  alternateSecondary,
  lineGraphTitleBlock,
} = colorPalleteMatt;

export const lightGreyAgain = "#e6e8e6";

export const textNodeFont = "'Roboto', sans-serif";

const myTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 1223,
      lg: 1550,
    },
  },
});

export const tooltipStyles = {
  position: "relative",
  textAlign: "center",
  font: "12px sans-serif",
  background: "lightsteelblue",
  textAlign: "center",
  verticalAlign: "middle",
  paddingTop: "8px",
  paddingBottom: "8px",
  borderRadius: "5px",
  fontWeight: "bolder",
  fontSize: "14px",
  fontFamily: "roboto",
  boxShadow: "5px 5px 2px hsla(0, 0%, 62%, 0.69)",
};

export const useStyles_ClassPage = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paperDropdown: {
    minWidth: 850,
    maxHeight: 50,
    // width: 50,
    padding: theme.spacing(1),
    marginTop: "1%",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: 300,
  },
  paperCountTable: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: 300,
  },
  graphDiv: {
    width: 850,
    padding: "1%",
    height: 450,
  },
  classGraphContainer: {
    maxWidth: 900,
  },
}));

export default myTheme;
