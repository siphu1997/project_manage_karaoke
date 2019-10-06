import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleLogin } from "../action/authAction";
import { Login } from "../component";
class LoginCtn extends Component {
  render() {
    const { auth, handleAuth } = this.props;
    return (
      <>
        {auth.isAuth && (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )}
        <Login />
      </>
    );
  }
}
/* <Button variant="outlined" onClick={handleAuth}>
Login <ArrowRight />
</Button> */
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  handleAuth: () => {
    dispatch(handleLogin());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCtn);
