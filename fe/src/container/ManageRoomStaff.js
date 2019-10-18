import React, { Component } from "react";
import RoomCtn from "./RoomCtn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as roomStaffAction from "../action/roomStaffAction";
import { CircularProgress, Box } from "@material-ui/core";

class ManageRoomStaff extends Component {
  doFetchData = () => {
    const { isAuth, roomStaff } = this.props;
    if (isAuth) {
      if (roomStaff.roomData === null) {
        this.props.roomStaffAction.doFetch();
      }
    }
  };

  componentDidMount = () => {
    this.doFetchData();
  };
  render() {
    const { roomStaff } = this.props;
    if (roomStaff.loading) {
      return (
        <Box width="100%" justifyContent="center" mt={10} display="flex">
          <CircularProgress />
        </Box>
      );
    }
    return (
      <div>
        <RoomCtn data={roomStaff.roomData} isLoading={roomStaff.loading} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  roomStaff: state.roomStaff
});

const mapDispatchToProps = dispatch => ({
  roomStaffAction: bindActionCreators(roomStaffAction, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRoomStaff);
