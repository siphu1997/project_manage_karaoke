import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./configureStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./configureRoutes";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./configureTheme";
ReactDOM.render(
  <Provider store={configureStore}>
    <Router>
      <ThemeProvider theme={theme}>
        <App routes={routes} />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
