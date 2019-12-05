import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as manageAccountAction from "../action/manageAccountAction";
import { Box, Typography, Zoom, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";
import api from "../common/apiService";
// import {
//   formatDataRoomCTS,
//   formatDataAcountCTS,
//   formatDataAcountSTC
// } from "../common/format";
import { withSnackbar } from "notistack";

class ManageAccount extends Component {
  doFetchData = () => {
    const { isAuth, manageAccount, manageAccountAction } = this.props;
    if (isAuth) {
      if (manageAccount.data === null) {
        manageAccountAction.doFetch();
      }
    }
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
  // printError = error => {
  //   if (error.response.data && error.response.data.errors.length > 0) {
  //     error.response.data.errors.forEach(item => {
  //       this.showNotificate(item, "error");
  //     });
  //   }
  //   if (error.response.data && error.response.data.message.length > 0) {
  //     this.showNotificate(error.response.data.message, "error");
  //   }
  // };

  componentDidMount = () => {
    this.doFetchData();
  };
  render() {
    const { manageAccount, manageAccountAction } = this.props;
    // console.log(manageAccount);
    const formatColumns = [
      {
        title: "ID",
        field: "id",
        editable: "never",
        grouping: false,
        defaultSort: "asc"
      },
      {
        title: "Tên tài khoản",
        field: "username",
        grouping: false
      },
      {
        title: "Mật khẩu",
        field: "password",
        grouping: false,
        render: rowData =>
          rowData ? (
            <Typography>
              {"*".repeat(Math.floor(Math.random() * 10 + 4))}
            </Typography>
          ) : (
            ""
          )
      },
      {
        title: "Tên hiển thị",
        field: "display_name",
        grouping: false
      },
      {
        title: "Số điện thoại",
        field: "phone",
        grouping: false
      },
      {
        title: "Quyền hạn",
        field: "role_id",
        // type: "numeric",
        // lookup: { 1: "Thường", 2: "VIP" }
        lookup: manageAccount.roles ? manageAccount.roles : {}
      },
      {
        title: "Địa chỉ",
        field: "address",
        grouping: false
      }
    ];

    if (manageAccount.loading) {
      return (
        <Box width="100%" justifyContent="center" mt={10} display="flex">
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Box padding={2}>
        {manageAccount.data && (
          <Zoom in={true}>
            <MaterialTable
              data={manageAccount.data}
              title="Quản tài khoản"
              options={{
                actionsColumnIndex: -1,
                grouping: true,
                pageSize: 10
              }}
              columns={formatColumns}
              editable={{
                onRowAdd: newData => {
                  // console.log(newData);
                  // console.log(this);
                  return api
                    .createNewAcount(newData)
                    .then(res => {
                      const { data } = res.data;
                      manageAccountAction.doAddNewAccount(data);
                      this.showNotificate("Thêm mới thành công", "success");
                    })
                    .catch(error => {
                      this.showNotificate("Thêm mới không thành công", "error");
                      console.log(new Error(error));
                      this.printError(error);
                      return new Promise.reject();
                    });
                },
                onRowUpdate: (newData, oldData) => {
                  if (newData === oldData) {
                    return Promise.resolve();
                  }
                  return api
                    .updateAcount(newData)
                    .then(res => {
                      const { data } = res.data;
                      manageAccountAction.doUpdateAcount(data);
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
                    .deleteAccount(oldData.id)
                    .then(res => {
                      console.log(res);
                      this.showNotificate("Xóa thành công", "success");
                      this.props.manageAccountAction.deleteAccount(oldData.id);
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
                    deleteText: "Bạn chắc chắn muốn xóa tài khoản này ?",
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
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  manageAccount: state.manageAccount
});

const mapDispatchToProps = dispatch => ({
  manageAccountAction: bindActionCreators(manageAccountAction, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ManageAccount));
