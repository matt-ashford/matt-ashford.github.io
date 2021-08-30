import { createTheme } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   root: {
//     background: "green",
//     borderRadius: "20px",
//   },
// });

export const colorPalleteMatt = {
  primaryColor: "#2CC6EB",
  secondaryColor: "#225CF6",
  highlightColor: "#22F6AC",
  lightGrey: "#e6e8e6",
  alternateHighlight: "#1ED4C7",
  alternateSecondary: "#1E7FD4",
};

export const {
  primaryColor,
  secondaryColor,
  highlightColor,
  lightGrey,
  alternateHighlight,
  alternateSecondary,
} = colorPalleteMatt;

export const lightGreyAgain = "#e6e8e6";

// const darkGrey = "#888a8c";

export const textNodeFont = "'Roboto', sans-serif";

const myTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});

export default myTheme;
