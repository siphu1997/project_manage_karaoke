import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleLogin } from "../action/authAction";
import { Login } from "../component";

import { withSnackbar } from "notistack";
class LoginCtn extends Component {
  state = {
    email: "",
    password: "",
    showPassword: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.handleAuth(email, password);
  };

  showError = message => {
    this.props.enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true
    });
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.auth.errorMes !== this.props.auth.errorMes &&
      this.props.auth.errorMes !== ""
    ) {
      this.showError(this.props.auth.errorMes);
    }
  };

  render() {
    const { auth } = this.props;
    const { password, showPassword } = this.state;

    return (
      <>
        {auth.isAuth && (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )}
        <Login
          errorMes={auth.errorMes}
          isLoading={auth.loading}
          handleChange={this.handleChange}
          handleClickShowPassword={this.handleClickShowPassword}
          handleMouseDownPassword={this.handleMouseDownPassword}
          handleSubmit={this.handleSubmit}
          password={password}
          showPassword={showPassword}
        />
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
  handleAuth: (id, pw) => {
    dispatch(handleLogin(id, pw));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(LoginCtn));
