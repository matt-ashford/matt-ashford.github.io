import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

export const colorPalleteMatt = {
  primaryColor: "#2CC6EB",
  secondaryColor: "#225CF6",
  highlightColor: "#22F6AC",
  lightGrey: "#e6e8e6",
  darkGrey: "#778380",
  greenGrey: "#53aca0",
  pinkHighlight: "#f45273",
  alternateHighlight: "#1ED4C7",
  alternateSecondary: "#1E7FD4",
  lineGraphTitleBlock: "#caf3fa",
};

export const {
  primaryColor,
  secondaryColor,
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
    padding: theme.spacing(1),
    marginTop: "5%",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minWidth: 300,
  },
  graphDiv: {
    // minWidth: 850,
    // maxWidth: 1000,
    width: 850,
    padding: "1%",
  },
  classGraphContainer: {
    maxWidth: 950,
  },
}));

export default myTheme;
