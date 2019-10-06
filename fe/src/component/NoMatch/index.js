import React from "react";
import { Container, Grid, Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { ArrowLeft } from "@material-ui/icons";
import { Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  ctn: {
    height: "100vh"
  },
  content: {
    padding: theme.spacing(8),
    color: "red",
    textAlign: "center",
    "& button": {
      marginTop: theme.spacing(3)
    }
  },
  text: {
    color: theme.color.danger
  }
}));

export default function NoMatch() {
  const classes = useStyles();
  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.ctn}
      >
        <Grid item>
          <Paper className={classes.content} elevation={10}>
            <Typography variant="h1" className={classes.text}>
              404 PAGE NOT FOUND
            </Typography>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="outlined">
                <ArrowLeft />
                Back home
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
