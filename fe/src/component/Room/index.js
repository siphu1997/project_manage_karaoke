import React, { useState } from "react";
import RoomOnIcon from "@material-ui/icons/OndemandVideo";
import RoomOffIcon from "@material-ui/icons/PersonalVideo";
import RoomVipIcon from "@material-ui/icons/LiveTv";
import clsx from "clsx";
import {
  withStyles,
  makeStyles,
  Paper,
  Box,
  Fab,
  Zoom,
  Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import PaymentIcon from "@material-ui/icons/Payment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CurrencyFormat from "react-currency-format";

const RoomOnIconStyled = withStyles(theme => ({
  colorAction: {
    color: theme.palette.secondary.main
  }
}))(RoomOnIcon);

const RoomVipIconStyled = withStyles(theme => ({
  colorAction: {
    color: "#de4646"
    // color: theme.palette.secondary.main
  }
}))(RoomVipIcon);

const data = [
  {
    isActive: true,
    // type: 1,
    component: RoomOnIconStyled
  },
  // {
  //   isActive: true,
  //   type: 2,
  //   component: RoomVipIconStyled
  // },
  {
    isActive: false,
    // type: 1,
    component: RoomOffIcon
  }
  // {
  //   isActive: false,
  //   type: 2,
  //   component: RoomVipIconStyled
  // }
];

const useStyles = makeStyles(theme => ({
  paper: {
    display: "inline-flex",
    padding: theme.spacing(1),
    // backgroundColor: "#fafafa",
    cursor: "pointer",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    margin: theme.spacing(1, 0),
    minWidth: "200px",
    "&:hover": {
      backgroundColor: "white"
    }
  },
  paperHover: {},
  iconRoom: {
    fontSize: props => props.size
  },
  fab: {
    margin: theme.spacing(0, 1)
  },
  control: {
    position: "absolute",
    top: "75%",
    zIndex: 1
  },
  foodIcon: {
    backgroundColor: "#C25432",
    "&:hover": {
      backgroundColor: "#aa492c"
    }
  },
  paymentIcon: {
    backgroundColor: theme.color.success,
    "&:hover": {
      backgroundColor: "#23903c"
    }
  }
  // editIcon: {
  //   backgroundColor: "#C25432"
  // }
}));

const Room = props => {
  const [hover, setHover] = useState(false);
  const { isActive, type, roomName, totalMoney, roomId, handleOnclick } = props;
  const classes = useStyles(props);

  return (
    <Paper
      onClick={() => {
        if (isActive) {
          handleOnclick(roomId, "");
        } else {
          handleOnclick(roomId, "add");
        }
      }}
      elevation={hover ? 5 : 1}
      component="span"
      className={
        hover ? clsx(classes.paper, classes.paperHover) : classes.paper
      }
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      {/* {data.map((item, index) => {
        if (item.isActive === isActive && item.type === type) {
          return (
            <item.component
              key={`room_${index}`}
              color={item.isActive ? "action" : "disabled"}
              className={classes.iconRoom}
            />
          );
        }
        return false;
      })} */}
      {isActive ? (
        <RoomOnIconStyled
          key={`room_${roomId}`}
          color={isActive ? "action" : "disabled"}
          className={classes.iconRoom}
        />
      ) : (
        <RoomOffIcon
          key={`room_${roomId}`}
          color={isActive ? "action" : "disabled"}
          className={classes.iconRoom}
        />
      )}
      <Typography variant="h6">{roomName}</Typography>
      {isActive ? (
        <CurrencyFormat
          value={totalMoney}
          displayType={"text"}
          thousandSeparator={true}
          suffix=" VND"
        />
      ) : (
        ""
      )}
      <Zoom in={hover}>
        <div className={classes.control}>
          {isActive ? (
            <Box padding={1}>
              <Fab
                color="secondary"
                size="small"
                className={clsx(classes.fab)}
                onClick={e => {
                  e.stopPropagation();
                  handleOnclick(roomId, "edit");
                }}
              >
                <EditIcon />
              </Fab>
              <Fab
                color="secondary"
                size="small"
                className={clsx(classes.fab, classes.foodIcon)}
                onClick={e => {
                  e.stopPropagation();
                  handleOnclick(roomId, "order");
                }}
              >
                <FastfoodIcon />
              </Fab>
              <Fab
                color="secondary"
                size="small"
                className={clsx(classes.fab, classes.paymentIcon)}
                onClick={e => {
                  e.stopPropagation();
                  handleOnclick(roomId, "payment");
                }}
              >
                <PaymentIcon />
              </Fab>
            </Box>
          ) : (
            <Box padding={1}>
              <Fab
                color="secondary"
                size="small"
                className={classes.fab}
                onClick={e => {
                  e.stopPropagation();
                  handleOnclick(roomId, "add");
                }}
              >
                <AddCircleIcon />
              </Fab>
            </Box>
          )}
        </div>
      </Zoom>
    </Paper>
  );
};
Room.defaultProps = {
  isActive: false,
  type: 1, // 1 : normal ---- 2 : VIP
  size: "70px",
  roomName: "Phòng ---",
  totalMoney: "--"
};
export default Room;
