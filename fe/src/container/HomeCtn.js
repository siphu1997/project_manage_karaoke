import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogout } from "../action/authAction";
import { handleFetch } from "../action/staffAction";
import { MainLayout } from "../component";
import { Route, Switch, Redirect } from "react-router-dom";
import { RouteWithSubRoutes } from "../component";
class HomeCtn extends Component {
  componentDidMount = () => {
    console.log("home ctn sinh ra ");
    if (this.props.staff === null) {
      this.props.handleFetchStaffData();
    }
  };
  render() {
    const { handleLogout, routes } = this.props;
    return (
      <MainLayout handleLogout={handleLogout}>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={`home-${index}`} {...route} />
          ))}
        </Switch>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  staff: state.staff.staffInfo
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => {
    dispatch(handleLogout());
  },
  handleFetchStaffData: () => {
    dispatch(handleFetch());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCtn);
