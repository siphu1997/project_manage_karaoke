import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  typography: {
    // fontSize: 14
  },
  color: {
    success: "#28a745",
    warning: "#ffc107",
    info: "#5bc0de",
    danger: "#dc3545"
  },
  palette: {
    // error: will use the default color

    primary: {
      light: "#3f484e",
      main: "#182126",
      dark: "#000000",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#6fa5bc",
      main: "#3f768c",
      dark: "#044a5f",
      contrastText: "#ffffff"
    }
  }
});
theme = responsiveFontSizes(theme);
export default theme;
