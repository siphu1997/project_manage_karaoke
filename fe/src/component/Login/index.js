import React from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";

export default function Login() {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  return (
    <Container>
      <Grid container>
        <Grid item>
          <TextField
            label="Email"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            InputProps={{
              endAdornment: (
                // <InputAdornment>
                //   <AccountCircle />
                // </InputAdornment>
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined">LOGIN</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
