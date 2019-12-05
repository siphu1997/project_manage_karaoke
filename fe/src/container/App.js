import React, { Component } from "react";
import { Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RouteWithSubRoutes } from "../component";
import { setAuth } from "../action/authAction";
import { CircularProgress } from "@material-ui/core";
import Notifier from "./Notifier";
// import { enqueueSnackbar, closeSnackbar } from "../action/notifierAction";
// function RouteWithSubRoutes(route) {
//   return (
//     <Route
//       path={route.path}
//       exact={route.exact}
//       render={props => <route.component {...props} routes={route.routes} />}
//     />
//   );
// }

class App extends Component {
  state = {
    loading: true
  };

  setAuth = () => {
    const auth = window.localStorage.getItem("isAuth");
    const token = window.localStorage.getItem("token");
    if (auth) {
      this.props.handleSetAuth(auth, token);
    } else {
      this.props.handleSetAuth(auth, null);
    }
  };

  componentDidMount = () => {
    this.setAuth();
    this.setState({ loading: false });
  };
  render() {
    const { routes, auth } = this.props;
    if (this.state.loading) {
      return <CircularProgress size="60" color="secondary" />;
    }

    return (
      <div>
        <Notifier />
        {!auth.isAuth && (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )}
        <Switch>
          {routes.map((route, index) => {
            if (route.isPrivate && !auth.isAuth) {
              return null;
            }
            if (route.isPrivate === auth.isAuth) {
              return <RouteWithSubRoutes key={index} {...route} />;
            }
            return <RouteWithSubRoutes key={index} {...route} />;
          })}
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  handleSetAuth: (isAuth, token) => {
    dispatch(setAuth(isAuth, token));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
