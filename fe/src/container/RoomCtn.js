import React, { Component } from "react";
import { Room } from "../component";
import { Grid, Zoom, Typography, Box } from "@material-ui/core";
export default class RoomCtn extends Component {
  state = {
    isHover: false
  };

  setHover = value => {
    this.setState({ isHover: value });
  };

  render() {
    const { isHover } = this.state;
    let { data, isLoading, handleClickOpen } = this.props;
    if (data) {
      data.sort((a, b) => {
        if (a.isActive) {
          if (b.isActive) {
            return 0;
          }
          return -1;
        }
        return 1;
      });
    }

    return (
      <Zoom in={!isLoading}>
        <>
          <Box marginBottom={2} fontWeight="bold">
            <Typography color="primary" variant="h5">
              Phòng Vip
            </Typography>
          </Box>
          <Grid
            container
            spacing={5}
            wrap="wrap"
            // justify="space-around"
            alignItems="center"
            direction="row"
          >
            {data &&
              data.map(
                (item, index) =>
                  item.type === 2 && (
                    <Grid
                      item
                      md={3}
                      lg={2}
                      key={`${item.roomId}_${index}`}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Room
                        setHover={this.setHover}
                        isHover={isHover}
                        isActive={item.isActive}
                        type={item.type}
                        roomName={item.roomName}
                        totalMoney={item.totalMoney}
                        roomId={item.roomId}
                        handleOnclick={handleClickOpen}
                      />
                    </Grid>
                  )
              )}
          </Grid>
          <Box my={2} fontWeight="bold">
            <Typography color="primary" variant="h5">
              Phòng Thường
            </Typography>
          </Box>
          <Grid
            container
            spacing={5}
            wrap="wrap"
            // justify="space-around"
            alignItems="center"
            direction="row"
          >
            {data &&
              data.map(
                (item, index) =>
                  item.type === 1 && (
                    <Grid
                      item
                      md={3}
                      lg={2}
                      key={`${item.roomId}_${index}`}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Room
                        setHover={this.setHover}
                        isHover={isHover}
                        isActive={item.isActive}
                        type={item.type}
                        roomName={item.roomName}
                        totalMoney={item.totalMoney}
                        roomId={item.roomId}
                        handleOnclick={handleClickOpen}
                      />
                    </Grid>
                  )
              )}
          </Grid>
        </>
      </Zoom>
    );
  }
}
