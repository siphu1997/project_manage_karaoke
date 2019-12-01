import React, { Component } from "react";
import { connect } from "react-redux";
import { handleLogout } from "../action/authAction";
import { handleFetch } from "../action/staffAction";
import { MainLayout } from "../component";
import { Switch } from "react-router-dom";
import { RouteWithSubRoutes } from "../component";
class HomeCtn extends Component {
  state = {
    selectedIndex: "/dashboard"
  };

  handleListItemClick = name => {
    this.setState({
      selectedIndex: name
    });
  };

  componentDidMount = () => {
    console.log("home ctn sinh ra ");
    const { tab } = this.props.match.params;
    this.setState({
      selectedIndex: "/" + tab
    });
    if (this.props.staff === null) {
      this.props.handleFetchStaffData();
    }
  };

  checkIsAdmin = () => {
    const { roles } = this.props.staff;
    for (let index = 0; index < roles.length; index++) {
      const item = roles[index];
      if (item === "ROLE_ADMIN") {
        return true;
      }
    }
    return false;
  };
  render() {
    const { handleLogout, routes, staff, isLoading } = this.props;
    const { selectedIndex } = this.state;
    return (
      <MainLayout
        handleLogout={handleLogout}
        selectedIndex={
          selectedIndex === "/undefined" ? "/dashboard" : selectedIndex
        }
        handleListItemClick={this.handleListItemClick}
        userName={staff ? staff.user.display_name : ""}
        isAdmin={staff ? this.checkIsAdmin() : null}
        isLoading={isLoading}
      >
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
  staff: state.staff.staffInfo,
  isLoading: state.staff.loading
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => {
    dispatch(handleLogout());
  },
  handleFetchStaffData: () => {
    dispatch(handleFetch());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeCtn);
