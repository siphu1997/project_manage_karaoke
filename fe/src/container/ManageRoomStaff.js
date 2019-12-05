import React, { Component } from "react";
import RoomCtn from "./RoomCtn";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as roomStaffAction from "../action/roomStaffAction";
import { CircularProgress, Box } from "@material-ui/core";
import { LayoutDialog } from "../component";

class ManageRoomStaff extends Component {
  doFetchData = () => {
    const { isAuth, roomStaff } = this.props;
    if (isAuth) {
      if (roomStaff.roomData === null) {
        this.props.roomStaffAction.doFetch();
      }
    }
  };

  handleOpenDialog = (id, action) => {
    this.props.roomStaffAction.doOpenDialog(id, action);
  };

  handleCloseDialog = () => {
    this.props.roomStaffAction.doCloseDialog();
  };

  componentDidMount = () => {
    this.doFetchData();
  };
  render() {
    const {
      loading,
      roomData,
      dataRoomType,
      isDialogOpen,
      actionForDialog,
      idForDialog
    } = this.props.roomStaff;
    if (loading) {
      return (
        <Box width="100%" justifyContent="center" mt={10} display="flex">
          <CircularProgress />
        </Box>
      );
    }
    return (
      <div>
        <RoomCtn
          data={roomData}
          roomType={dataRoomType}
          isLoading={loading}
          handleClickOpen={this.handleOpenDialog}
        />
        <LayoutDialog
          handleClose={this.handleCloseDialog}
          isOpen={isDialogOpen}
          action={actionForDialog}
          idRoom={idForDialog}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageRoomStaff);
