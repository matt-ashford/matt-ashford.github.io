import { createTheme } from "@material-ui/core/styles";

export const colorPalleteMatt = {
  primaryColor: "#2CC6EB",
  secondaryColor: "#225CF6",
  highlightColor: "#22F6AC",
  lightGrey: "#e6e8e6",
  darkGrey: "#778380",
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
  alternateHighlight,
  alternateSecondary,
  lineGraphTitleBlock,
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
