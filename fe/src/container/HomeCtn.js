import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Backspace } from "@material-ui/icons";
import { connect } from "react-redux";
import { handleLogout } from "../action/authAction";

class HomeCtn extends Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <div>
        Home nhe
        <br />
        <Button
          variant="outlined"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout <Backspace />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  handleLogout: () => {
    dispatch(handleLogout());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCtn);
