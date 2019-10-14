import React, { Component } from "react";
import { Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RouteWithSubRoutes } from "../component";
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
  render() {
    const { routes, auth } = this.props;
    return (
      <div>
        {!auth.isAuth && (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )}
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  null
)(App);
