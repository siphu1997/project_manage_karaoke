import React, { Component, Fragment } from "react";
import { Room } from "../component";
import {
  Grid,
  Zoom,
  Typography,
  Box,
  CircularProgress
} from "@material-ui/core";
export default class RoomCtn extends Component {
  state = {
    isHover: false
  };

  setHover = value => {
    this.setState({ isHover: value });
  };

  render() {
    const { isHover } = this.state;
    let { data, roomType, isLoading, handleClickOpen } = this.props;
    const listRoom = roomTypeId => {
      const dataFil = data.filter(dt => dt.roomtype_id === roomTypeId);
      console.log(dataFil);
      dataFil.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }

        return 0;
      });
      console.log(dataFil);

      return (
        dataFil &&
        dataFil.map((item, index) => (
          <Grid
            item
            md={3}
            lg={2}
            key={`${item.id}_${index}`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Room
              setHover={this.setHover}
              isHover={isHover}
              isActive={item.active}
              type={item.roomtype.name}
              roomName={item.name}
              totalMoney={item.roomtype.price}
              roomId={item.id}
              handleOnclick={handleClickOpen}
            />
          </Grid>
        ))
      );
    };
    // if (data) {
    //   data.sort((a, b) => {
    //     if (a.isActive) {
    //       if (b.isActive) {
    //         return 0;
    //       }
    //       return -1;
    //     }
    //     return 1;
    //   });
    // }
    // console.log(data);
    if (isLoading) {
      return (
        <Box width="100%" justifyContent="center" mt={10} display="flex">
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Zoom in={true}>
        <div>
          {roomType &&
            roomType.map((item, index) => (
              <Fragment key={`room-type-${index}`}>
                <Box fontWeight="bold" mt={index === 0 ? 2 : 4}>
                  <Typography color="primary" variant="h5">
                    {item.name}
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
                  {listRoom(item.id)}
                </Grid>
              </Fragment>
            ))}
        </div>
      </Zoom>
    );
  }
}
