import React from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  ctn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  },
  paper: {
    padding: theme.spacing(5)
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: "300px"
  },
  editPadding: {
    "& .MuiInputBase-root": {
      paddingRight: theme.spacing(1.5)
    }
  },
  editBtn: {
    padding: theme.spacing(2, 5),
    marginTop: theme.spacing(3),
    minWidth: "130px"
  },
  ctnSquare: {
    position: "relative",
    minHeight: "130px",
    width: "100%"
  },
  divSquare: {
    backgroundColor: theme.palette.secondary.main,
    position: "absolute",
    top: "-30%",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const {
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    password,
    showPassword,
    handleSubmit,
    isLoading
  } = props;
  return (
    <div
      style={{
        background: "linear-gradient(45deg, rgb(43, 33, 93),rgb(81, 240, 237))"
      }}
    >
      <Container className={classes.ctn}>
        <Paper className={classes.paper} elevation={5}>
          <form onSubmit={handleSubmit}>
            <Grid container className={classes.form} spacing={3}>
              <div className={classes.ctnSquare}>
                <Paper
                  color="secondary"
                  className={classes.divSquare}
                  elevation={5}
                >
                  <Typography
                    variant="h3"
                    align="center"
                    style={{ color: "#fff" }}
                  >
                    Login
                  </Typography>
                </Paper>
              </div>
              <Grid item>
                <TextField
                  className={classes.editPadding}
                  label="Email"
                  type="text"
                  required
                  fullWidth
                  disabled={isLoading}
                  onChange={handleChange("email")}
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
                  fullWidth={true}
                  required
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChange("password")}
                  disabled={isLoading}
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
                          disabled={isLoading}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Button
                  className={classes.editBtn}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  // startIcon={
                  //   isLoading ? (
                  //     <CircularProgress color="inherit" size={30} />
                  //   ) : (
                  //     ""
                  //   )
                  // }
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "LOGIN"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
