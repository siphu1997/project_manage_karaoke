import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as manageRoomAction from "../action/manageRoomAction";
import { Box, CircularProgress, Zoom } from "@material-ui/core";
import MaterialTable from "material-table";
import api from "../common/apiService";
import { withSnackbar } from "notistack";
import currencyFormatter from "currency-formatter";
class ManageRoom extends Component {
  doFetchData = () => {
    const { isAuth, manageRoom } = this.props;
    if (isAuth) {
      if (manageRoom.data === null) {
        this.props.manageRoomAction.doFetch();
      }
    }
  };

  addNewData = data => {
    console.log("oday");
    this.props.manageRoomAction.addNewData(data);
  };
  showNotificate = (message, type) => {
    this.props.enqueueSnackbar(message, {
      variant: type,
      preventDuplicate: true
    });
  };

  printError = error => {
    const { errors, message } = error.response.data;
    if (errors && errors.length > 0) {
      errors.forEach(item => {
        this.showNotificate(item, "error");
      });
    }

    if (message) {
      this.showNotificate(message, "error");
    }
  };

  componentDidMount = () => {
    this.doFetchData();
  };
  render() {
    const { manageRoom } = this.props;
    const formatRooms = [
      {
        title: "ID",
        field: "id",
        editable: "never",
        grouping: false,
        defaultSort: "asc"
      },
      {
        title: "Tên",
        field: "name",
        grouping: false,
        initialEditValue: "P."
      },
      {
        title: "Loại",
        field: "roomtype_id",

        // lookup: { 1: "Thường", 2: "VIP" }
        lookup: manageRoom.roomType ? manageRoom.roomType.dataType : []
      },
      {
        title: "Giá",
        field: "roomtype_id",
        lookup: manageRoom.roomType ? manageRoom.roomType.dataPrice : [],
        editable: "never",
        type: "currency",
        currencySetting: {
          currencyCode: "VND",
          locale: "vi-VN",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        }
        // render: rowData =>
        //   rowData ? (
        //     // <CurrencyFormat
        //     //   value={rowData.roomPrice}
        //     //   displayType={"text"}
        //     //   thousandSeparator={true}
        //     //   suffix=" VND"
        //     // />
        //     `${currencyFormatter.format(rowData.roomPrice, { code: 'VND' })}`
        //   ) : (
        //     ""
        //   )
      },
      {
        title: "Hoạt động",
        field: "active",
        type: "boolean",
        editable: "onUpdate"
      },
      {
        title: "Trạng thái",
        field: "status",
        type: "boolean",
        editable: "onUpdate"
      }
    ];

    const formatRoomTypes = [
      {
        title: "ID",
        field: "id",
        editable: "never",
        grouping: false,
        defaultSort: "asc"
      },
      {
        title: "Tên",
        field: "name",
        grouping: false,
        initialEditValue: "P."
      },
      {
        title: "Giá",
        field: "price",
        // type: "currency",
        // currencySetting: {
        //   currencyCode: "VND",
        //   locale: "vi-VN",
        //   minimumFractionDigits: 0,
        //   maximumFractionDigits: 2
        // }
        render: rowData =>
          rowData
            ? // <CurrencyFormat
              //   value={rowData.roomPrice}
              //   displayType={"text"}
              //   thousandSeparator={true}
              //   suffix=" VND"
              // />
              `${currencyFormatter.format(rowData.price, { code: "VND" })}`
            : ""
      }
    ];
    if (manageRoom.loading) {
      return (
        <Box width="100%" justifyContent="center" mt={10} display="flex">
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Box display="flex" justifyContent="space-between" alignItems="stretch">
        <Box mr={2} width="100%">
          {manageRoom.data && (
            <Zoom in={true}>
              <MaterialTable
                data={manageRoom.data}
                title="Quản lý phòng"
                options={{
                  actionsColumnIndex: -1,
                  grouping: true,
                  pageSize: 10
                }}
                columns={formatRooms}
                editable={{
                  onRowAdd: newData => {
                    console.log(newData);
                    // console.log(this);
                    return api
                      .createNewRoom(newData)
                      .then(res => {
                        // console.log(res);
                        // console.log(this);
                        const { data } = res.data;
                        this.addNewData(data);
                        this.showNotificate("Thêm mới thành công", "success");
                      })
                      .catch(error => {
                        this.showNotificate("Thêm mới thất bại", "error");
                        this.printError(error);
                        return new Promise.reject();
                      });
                  },
                  onRowUpdate: (newData, oldData) => {
                    console.log({ newData, oldData });
                    newData.active = newData.active ? 1 : 0;
                    newData.status = newData.status ? 1 : 0;
                    if (newData === oldData) {
                      return Promise.resolve();
                    }
                    return api
                      .updateRoom(newData)
                      .then(res => {
                        const { data } = res.data;
                        // const customData = {
                        //   isUsing: data.is_using === 1 ? true : false,
                        //   isActive: data.status === 1 ? true : false,
                        //   roomId: data.room_id,
                        //   roomName: data.room_name,
                        //   roomPrice: data.roomtype.roomtype_price,
                        //   roomType: data.roomtype.roomtype_id
                        // };
                        // this.props.manageRoomAction.addNewData(data);
                        this.props.manageRoomAction.addNewDataUpdate(data);
                        this.showNotificate("Cập nhật thành công", "success");
                      })
                      .catch(error => {
                        console.log(new Error(error));
                        // console.log(error.response.data);
                        // this.showNotificate(error.response.data.message, "error");
                        this.showNotificate("Cập nhật thất bại", "error");
                        this.printError(error);
                      });
                  },
                  onRowDelete: oldData => {
                    return api
                      .deleteRoom(oldData.id)
                      .then(res => {
                        console.log(res);
                        this.props.manageRoomAction.deleteRoom(oldData.id);
                        this.showNotificate("Xóa thành công", "success");
                      })
                      .catch(error => {
                        console.log(new Error(error));
                        // console.log(error.response.data);
                        // this.showNotificate(error.response.data.message, "error");
                        this.showNotificate(
                          "Xóa không thành công thất bại",
                          "error"
                        );
                        this.printError(error);
                      });
                  }
                }}
                localization={{
                  body: {
                    editRow: {
                      deleteText: "Bạn chắc chắn muốn xóa phòng này ?",
                      saveTooltip: "Đồng ý",
                      cancelTooltip: "Hủy"
                    }
                  },
                  toolbar: {
                    searchTooltip: "Tìm kiếm",
                    searchPlaceholder: "Tìm kiếm"
                  },
                  pagination: {
                    labelRowsSelect: "Dòng",
                    labelDisplayedRows: " {from}-{to} của {count}",
                    firstTooltip: "Trang đầu",
                    previousTooltip: "Trang trước",
                    nextTooltip: "Trang tiếp",
                    lastTooltip: "Trang cuối"
                  },
                  grouping: {
                    placeholder: "Kéo tựa đề  cột vào để  nhóm kết quả "
                  }
                }}
              />
            </Zoom>
          )}
        </Box>
        <Box>
          {manageRoom.dataRoomType && (
            <Zoom in={true}>
              <MaterialTable
                data={manageRoom.dataRoomType}
                title="Quản lý loại phòng"
                options={{
                  actionsColumnIndex: -1,
                  pageSize: 5
                }}
                columns={formatRoomTypes}
                editable={{
                  onRowAdd: newData => {
                    // console.log(this);
                    return api
                      .createNewRoomType(newData)
                      .then(res => {
                        // console.log(res);
                        // console.log(this);
                        const { data } = res.data;
                        this.props.manageRoomAction.addNewDataRoomType(data);
                        this.showNotificate("Thêm mới thành công", "success");
                      })
                      .catch(error => {
                        // console.log(new Error(error));
                        this.showNotificate("Thêm mới thất bại", "error");
                        // console.log(error.response.data);
                        this.printError(error);
                      });
                  },
                  onRowUpdate: (newData, oldData) => {
                    // console.log({ newData, oldData });
                    newData.active = newData.active ? 1 : 0;
                    newData.status = newData.status ? 1 : 0;
                    if (newData === oldData) {
                      return Promise.resolve();
                    }
                    return api
                      .updateRoomType(newData)
                      .then(res => {
                        const { data } = res.data;
                        this.props.manageRoomAction.doAddNewDataUpdateRoomType(
                          data
                        );
                        this.showNotificate("Cập nhật thành công", "success");
                      })
                      .catch(error => {
                        console.log(new Error(error));
                        // console.log(error.response.data);
                        // this.showNotificate(error.response.data.message, "error");
                        this.showNotificate("Cập nhật thất bại", "error");
                        this.printError(error);
                      });
                  },
                  onRowDelete: oldData => {
                    return api
                      .deleteRoomType(oldData.id)
                      .then(res => {
                        this.props.manageRoomAction.doDeleteRoomType(
                          oldData.id
                        );

                        this.showNotificate("Xóa thành công", "success");
                      })
                      .catch(error => {
                        console.log(new Error(error));
                        // console.log(error.response.data);
                        // this.showNotificate(error.response.data.message, "error");
                        this.showNotificate("Xóa thất bại", "error");
                        this.printError(error);
                      });
                  }
                }}
                localization={{
                  body: {
                    editRow: {
                      deleteText: "Bạn chắc chắn muốn xóa phòng này ?",
                      saveTooltip: "Đồng ý",
                      cancelTooltip: "Hủy"
                    }
                  },
                  toolbar: {
                    searchTooltip: "Tìm kiếm",
                    searchPlaceholder: "Tìm kiếm"
                  },
                  pagination: {
                    labelRowsSelect: "Dòng",
                    labelDisplayedRows: " {from}-{to} của {count}",
                    firstTooltip: "Trang đầu",
                    previousTooltip: "Trang trước",
                    nextTooltip: "Trang tiếp",
                    lastTooltip: "Trang cuối"
                  },
                  grouping: {
                    placeholder: "Kéo tựa đề  cột vào để  nhóm kết quả "
                  }
                }}
              />
            </Zoom>
          )}
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  manageRoom: state.manageRoom
});

const mapDispatchToProps = dispatch => ({
  manageRoomAction: bindActionCreators(manageRoomAction, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ManageRoom));
