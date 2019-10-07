import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleLogin } from "../action/authAction";
import { Login } from "../component";
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
    console.log("ngu");
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.handleAuth(email, password);
    // console.log(email, password);
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
)(LoginCtn);
